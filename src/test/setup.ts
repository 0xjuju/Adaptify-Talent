import app from "../index.js";
import assert from "assert";
import GithubAccount from "../models/GithubAccount.js";
import { MongoMemoryReplSet } from "mongodb-memory-server";
import mongoose from "mongoose";
import ReplicaSetMember from "../interfaces/mongoose.interface.js";
import request from "supertest";
import User from "../models/User.js";


let replSet: MongoMemoryReplSet;
const db = mongoose.connection.useDb(process.env.DB_NAME || "test");

globalThis.testUser = null;
globalThis.testGithubAccount = null;


beforeEach(async () => {
    await User.deleteMany({});
    await GithubAccount.deleteMany({});

    try {
        await db.dropDatabase();

    } catch (err) {
        console.log(err);
    }

    globalThis.testUser = await User.create({ name: "Jermol", email: "test@test.com" });
    globalThis.testGithubAccount = await GithubAccount.create({ username: "0xjuju" });


});

before(async () => {

    replSet = await MongoMemoryReplSet.create({
        replSet: { count: 3 }
    });

    const mongoUri = replSet.getUri();
    await mongoose.connect(mongoUri, { readPreference: 'primary' });

    await ensurePrimaryElected();
});

after(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await replSet.stop();
});

async function ensurePrimaryElected(){
    if (mongoose.connection.db) {
        const admin = mongoose.connection.db.admin();

        const status = await admin.command({ replSetGetStatus: 1});

        const primary = status.members.find((member: ReplicaSetMember) => member.stateStr === "PRIMARY")
        if (!primary) {
            throw new Error('No primary elected in the replica set');
        }

        console.log('Primary node elected:', primary.name);
    } else {
        console.log("Database not connected")
    }

}

globalThis.app = app;
globalThis.request = request;
globalThis.assert = assert;



