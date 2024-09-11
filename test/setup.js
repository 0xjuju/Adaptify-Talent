import app from "../index.js";
import * as chai from "chai"
import GithubAccount from "../models/githubAccount.js";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";
import User from "../models/User.js";


let mongoServer;
const { expect}  = chai;

globalThis.testUser = null;
globalThis.testGithubAccount = null;


beforeEach(async () => {
    await User.deleteMany({});
    await GithubAccount.deleteMany({});

    globalThis.testUser = await User.create({ name: "Jermol", email: "test@test.com" });
    globalThis.testGithubAccount = await GithubAccount.create({ username: "0xjuju" });

    await mongoose.connection.db.dropDatabase();
});

before(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri, {});

});

after(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongoServer.stop();
});


globalThis.chai = chai;
globalThis.expect = expect;
globalThis.app = app;
globalThis.request = request;



