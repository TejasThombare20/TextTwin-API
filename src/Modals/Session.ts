import { Schema, Types, model, models } from "mongoose";

interface ISession {
  sessionToken: string;
  userId: string;
  expire: Date;
  user: Types.ObjectId;
}

const sessionSchema = new Schema<ISession>({
  sessionToken: {
    type: String,
    unique: true,
  },
  userId: {
    type: String,
  },
  expire: {
    type: Date,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const sessionModel =
  models?.sessionModel || model("sessionModel", sessionSchema);

export default sessionModel;
