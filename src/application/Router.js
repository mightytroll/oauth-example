import express from "express";
import { StatusAction } from "../actions/StatusAction";
import { OAuthAuthorizeAction } from "../actions/OAuthAuthorizeAction";
import { OAuthCallbackAction } from "../actions/OAuthCallbackAction";
import { IntegrationExampleAction } from "../actions/IntegrationExampleAction";

export const Router = express.Router();

Router.get("/status", StatusAction);
Router.get("/oauth/authorize", OAuthAuthorizeAction);
Router.get("/oauth/callback", OAuthCallbackAction);
Router.post("/integration/example", IntegrationExampleAction);