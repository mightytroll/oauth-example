import cors from "cors";
import express from "express";
import { ErrorHandler } from "./ErrorHandler";
import { Router } from "./Router";

export const Application = express();

Application.use(cors());
Application.use(express.json());

Application.use(Router);
Application.use(ErrorHandler);