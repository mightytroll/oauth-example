import { Action } from "../application/Action";
import { Log } from "../services/Log";
import { OAuth } from "../services/OAuth";

export const OAuthAuthorizeAction = Action((request, response) => {
    let installationId = request.query.installation;

    if (!installationId) {
        throw new Error('Missing installation ID');
    }

    let authorizationUri = OAuth.getAuthorizationUri(installationId);

    Log.debug("Redirecting to 3rd party authorization page...");

    response.redirect(authorizationUri);
});
