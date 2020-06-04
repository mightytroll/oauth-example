import { Action } from "../application/Action";
import { OAuth } from "../services/OAuth";

export const IntegrationExampleAction = Action(async (request, response) => {
    let apiClient = OAuth.getApiClient(request.body.seller);

    try {
        let { data } = await apiClient.get(`/resource`);

        response.send(data);
    }
    catch (error) {
        throw new Error("Could not fetch requested resource.");
    }
});
