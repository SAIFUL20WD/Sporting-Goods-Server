import { Schema, model } from "mongoose";
import { TUser } from "./user.interface";
import bcrypt from "bcrypt";
import config from "../../config";

const userSchema = new Schema<TUser>(
    {
        name: { type: String, require: true },
        email: { type: String, require: true, unique: true },
        password: { type: String, require: true },
    },
    { timestamps: true, versionKey: false },
);

userSchema.pre("save", async function (next) {
    // const user = this; // current document
    this.password = await bcrypt.hash(this.password, Number(config.SALT_ROUND));
    next();
});

userSchema.post("save", function (doc, next) {
    doc.password = "";
    next();
});

const UserModel = model<TUser>("user", userSchema);

export default UserModel;
