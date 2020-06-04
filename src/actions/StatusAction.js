import { Action } from "../application/Action";

export const StatusAction = Action((request, response) => {
    response.send("OK");
});
