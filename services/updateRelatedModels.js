import mongoose from "mongoose";


const updateManyToManyRelationship = async (model1, field1, model2, field2) => {

    const session = await mongoose.startSession();
    session.startTransaction();

    try {

        if (!model1 || !model2) {
            throw new Error("Error retrieving Model");
        }


        if (!model1[field1].includes(model2._id)) {
            model1[field1].push(model2._id)
        }

        if (!model2[field2].includes(model1._id)) {
            model2[field2].push(model1._id)
        }

        await model1.save({ session });
        await model2.save({ session });

        await session.commitTransaction();
        await session.endSession();

    } catch (err) {
        await session.abortTransaction();
        await session.endSession();
        console.log(err)

    }
};

export default updateManyToManyRelationship;

