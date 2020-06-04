import axios from "axios";
import config from "config";
import moment from "moment-timezone";

const client = axios.create({
    baseURL: config.get("xola.url"),
    timeout: config.get("xola.timeout"),
    headers: { "X-API-KEY": config.get("xola.apiKey") }
});

export const Xola = {
    async fetchUser(userId, headers = {}) {
        let { data } = await client.get(`/users/${userId}`, { headers });

        return data;
    },

    parseDateTime(date, time, timezone = "UTC") {
        let paddedTime = `${time}`.padStart(4, "0");
        let hours = paddedTime.substr(0, 2);
        let minutes = paddedTime.substr(2);

        return moment.tz(`${date} ${hours}:${minutes}`, timezone);
    }
};
