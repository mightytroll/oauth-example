import axios from "axios";
import config from "config";
import moment from "moment-timezone";
import simpleOAuth2 from "simple-oauth2";
import { Grant } from "../models/Grant";
import { Log } from "./Log";

const authClient = simpleOAuth2.create({
	client: {
		id: config.get("oauth.clientId"),
		secret: config.get("oauth.clientSecret"),
	},

	auth: {
		tokenHost: config.get("oauth.tokenHost"),
		authorizePath: config.get("oauth.authorizePath"),
		tokenPath: config.get("oauth.tokenPath")
	}
});

export const OAuth = {
	getAuthorizationUri(state) {
		return authClient.authorizationCode.authorizeURL({
			redirect_uri: config.get("oauth.redirectUri"),
			scope: config.get("oauth.scope"),
			state: state
		});
	},

	async fetchToken(code, state) {
		Log.debug("Exchanging authorization code for access token...");

		return this.authClient.authorizationCode.getToken({
			redirect_uri: config.get("oauth.redirectUri"),
			scope: config.get("oauth.scope"),
			code: code
		}).then((data) => {
			Log.debug("Successfully exchanged authorization code for access token.");

			let token = this.authClient.accessToken.create(data);
			return token;
		}).catch((error) => {
			let message = "Could not exchange authorization code for access token.";

			Log.error(message, { state: state, response: error.output && error.output.payload });

			throw new Error(message);
		});
	},

	async refreshToken(token) {
		Log.debug("Refreshing access token...", token);

		// Each token might have a different `tokenHost`. Create disposable `authClient`.
		let authClient = simpleOAuth2.create({
			client: {
				id: config.get("oauth.clientId"),
				secret: config.get("oauth.clientSecret"),
			},

			auth: {
				tokenHost: token.endpoint,
				authorizePath: config.get("oauth.authorizePath"),
				tokenPath: config.get("oauth.tokenPath")
			}
		});

		return authClient.accessToken.create(token)
			.refresh()
			.then((token) => {
				Log.debug("Successfully refreshed token.");

				return token;
			}).catch((error) => {
				let message = "Could not refresh token.";

				Log.error(message, { response: error.output && error.output.payload });

				throw new Error(message);
			});
	},

	async getApiClient(seller) {
		let grant = await Grant.findOne({"seller": seller});

		let expiresAt = moment(grant.token.expires_at);
		if (expiresAt.isBefore(moment().subtract(12, "hours"))) {
			let response = await this.refreshToken(grant.token);

			grant.set({
				token: response.token
			});
			await grant.save();
		}

		let client = axios.create({
			baseURL: `${ grant.token.endpoint }/api/v1`,
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json",
				"Authorization": `OAuth ${ grant.token.access_token }`,
			}
		});

		return client;
	}
};