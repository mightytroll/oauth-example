import mongoose from "mongoose";

const GrantSchema = new mongoose.Schema({
    seller: { type: String, index: true },
    token: {
        "access_token": String,
        "expires_in": Number,
        "scope": String,
        "endpoint": String,
        "refresh_token": String,
        "expires_at": Date
    }

}, {
    versionKey: false,
});

export const Grant = mongoose.model("Grant", GrantSchema);