import express from "express";
import { StatusAction } from "../actions/StatusAction";

export const Router = express.Router();

Router.get("/status", StatusAction);
/** ADD ROUTES HERE */