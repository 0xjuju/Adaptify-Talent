import mongoose from "mongoose";


const updateManyToManyRelationship = async (m1, model1Id, field1, m2, model2Id, field2) => {

    const session = await mongoose.startSession();
    session.startTransaction();

    try {


        const model1 = await m1.findById(model1Id).session(session);
        const model2 = await m2.findById(model2Id).session(session);

        console.log(model1, model2);


        if (!model1 || !model2) {
            throw new Error("Error retrieving Model");
        }


        if (!model1[field1].includes(model2._id)) {
            model1[field1].push(model2._id)
        }

        if (!model2[field2].includes(model1._id)) {
            model2[field2].push(model1._id)
        }

        await model1.save({ session, optimisticConcurrency: false });
        await model2.save({ session, optimisticConcurrency: false });

        await session.commitTransaction();
        await session.endSession();

    } catch (err) {
        console.log(">>> ", err.message)
        await session.abortTransaction();
        await session.endSession();


    }
};

export default updateManyToManyRelationship;

