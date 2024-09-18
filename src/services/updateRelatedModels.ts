import { Document,  Types  } from "mongoose";


interface ManyToManyModel {
    _id: Types.ObjectId;
    save(): Promise<this>;
    [key: string]: Types.ObjectId[] | Types.ObjectId | (() => Promise<this>);
}

const updateManyToManyRelationship = async <T extends ManyToManyModel, K extends ManyToManyModel>(
    model1: T, field1: string, model2: K, field2: string) => {

    try {
        if (Array.isArray(model1[field1]) && !model1[field1].includes(model2._id)) {
            (model1[field1] as Types.ObjectId[]).push(model2._id);
        }

        if (Array.isArray(model2[field2]) && !model2[field2].includes(model1._id)) {
            (model2[field2] as Types.ObjectId[]).push(model1._id);
        }

        await model1.save();
        await model2.save();


    } catch (err) {
        console.log(">>> ", err)
    }
};

export default updateManyToManyRelationship;

