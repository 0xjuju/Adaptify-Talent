import app from "../index.js";
import * as chai from "chai"
import GithubAccount from "../models/githubAccount.js";
import { MongoMemoryReplSet } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";
import User from "../models/User.js";


let replSet;


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

    replSet = await MongoMemoryReplSet.create({
        replSet: { count: 3, electionTimeoutMillis: 10000 }
    });
    const mongoUri = replSet.getUri();
    await mongoose.connect(mongoUri, { readPreference: 'primary' });

    await ensurePrimaryElected(replSet);
});

after(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await replSet.stop();
});

async function ensurePrimaryElected(replSet){
    const admin = mongoose.connection.db.admin();
    const status = await admin.command({ replSetGetStatus: 1});

    const primary = status.members.find(member => member.stateStr === "PRIMARY")
    if (!primary) {
        throw new Error('No primary elected in the replica set');
    }

    console.log('Primary node elected:', primary.name);
}

globalThis.chai = chai;
globalThis.expect = expect;
globalThis.app = app;
globalThis.request = request;



