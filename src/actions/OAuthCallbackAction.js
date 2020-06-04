import { Action } from "../application/Action";
import { Log } from "../services/Log";
import { OAuth } from "../services/OAuth";
import { Xola } from "../services/Xola";

export const OAuthCallbackAction = Action(async (request, response) => {
    let state = this.request.query.state;
    let code = this.request.query.code;

    Log.debug("Received authorization code.");

    let token = await OAuth.fetchToken(code, state);
    let installation = await Xola.fetchInstallation(state);

    Log.debug("Saving token information...");

    let grant = await Grant.findOne({"seller": installation.seller});

    if (grant) {
        grant.set({
            token: token.token
        });
        await grant.save();
    }
    else {
        await Grant.create({
            seller: installation.seller,
            token: token.token
        });
    }

    await Xola.updateInstallation(state, {
        status: "complete"
    });

    return "Authorization complete. You may close this window.";
});
