import User from "../models/User.js";


describe("User Model Tests.. ",async () => {

    it("should create a user model", async () => {
        const user = new User({
            "name": "JJ",
            "email": "testmail@testy.net"
        })

        const savedUser = await user.save();
        assert.strictEqual(savedUser.name, "JJ");
        assert.strictEqual(savedUser.email, "testmail@testy.net");
        assert("_id" in savedUser);
    });

    it("Should received a response that includes the POSTed data and createdAt and updatedAt parameters", async () => {
        const newUser = {
            "name": "August",
            "email": "levi@gmail.com"
        };

        const res = await request(app)
            .post("/users")
            .send(newUser);
        assert("name" in res.body);
        assert.strictEqual(res.body.name, "August")
        assert.strictEqual(res.body.email, "levi@gmail.com")
        assert("createdAt" in res.body);
        assert("updatedAt" in res.body);

    });

    it("Should make an invalid form submission that will fail validation and be rejected", async () => {
        const newUser = {
            "name": "",
            "email": "bademail@foo"
        };

        const res = await request(app)
            .post("/users")
            .send(newUser);
        assert.strictEqual(res.body.errors[0].msg, "Invalid name")
        assert.strictEqual(res.body.errors[1].msg, "Please use a valid email")

    });
});







