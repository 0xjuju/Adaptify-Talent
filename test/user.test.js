import User from "../models/User.js";


describe("User Model Tests.. ",async () => {

    it("should create a user model", async () => {
        const user = new User({
            "name": "JJ",
            "email": "testmail@testy.net"
        })

        const savedUser = await user.save();

        expect(savedUser).to.have.property("_id");
        expect(savedUser.name).to.equal("JJ");
        expect(savedUser.email).to.equal("testmail@testy.net")
    });


    it("Should received a response that includes the POSTed data and createdAt and updatedAt parameters", async () => {
        const newUser = {
            "name": "August",
            "email": "levi@gmail.com"
        };

        const res = await request(app)
            .post("/users")
            .send(newUser);

        expect(res.body).to.have.property("name").equal("August");
        expect(res.body).to.have.property("email").equal("levi@gmail.com");
        expect(res.body).to.have.property("createdAt");
        expect(res.body).to.have.property("updatedAt");
    });

    it("Should make an invalid form submission that will fail validation and be rejected", async () => {
        const newUser = {
            "name": "",
            "email": "bademail@foo"
        };

        const res = await request(app)
            .post("/users")
            .send(newUser);

        expect(res.body.errors[0].msg).to.equal("Invalid name");
        expect(res.body.errors[1].msg).to.equal("Please use a valid email");

    });
});







