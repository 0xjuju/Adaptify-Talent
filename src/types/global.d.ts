import { Application } from "express";
import assert from "assert";
import GithubAccount from "../models/GithubAccount.js";
import request from "supertest";
import User from "../models/User.js";


declare global {
     var app: Application;
     var assert: assert;
     var request: request;
     var testUser: User;
     var testGithubAccount: GithubAccount;
}

export {};


