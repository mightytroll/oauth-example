import { Action } from "../src/application/Action";
import { Xola } from "../src/services/Xola";

export const AuthenticatedAction = (handler) => {
    return Action(async (req, res, next) => {
        let user = await Xola.fetchUser("me", {
            "X-API-KEY": req.headers["x-api-key"],
        });

        req.user = user;

        return handler(req, res, next);
    });
};

export const UserAction = AuthenticatedAction((req, res) => {
    res.send(req.user);
});
