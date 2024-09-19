import { Types  } from "mongoose";

/**
 * Arbitrary model reference with many to many field that updates
 *
 * @property _id
 * @property save() - Function to save the model
 * @property key - A field that can be a list of object ids, an object id, or a Promise
 */

interface ManyToManyModel {
    _id: Types.ObjectId;
    save(): Promise<this>;
    [key: string]: Types.ObjectId[] | Types.ObjectId | (() => Promise<this>);
}

/**
 * Database transaction to update two related many-to-many models simultaneously
 *
 * @param model1 - First model to update
 * @param field1 - Name of many-to-many field of first model
 * @param model2 - Seconds model to update
 * @param field2 - Name of many-to-many field of second model
 *
 * @returns null - Update both models only if both are successfully saved to db, otherwise fail both
 */

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

