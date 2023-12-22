import { Schema, Types, model, models } from "mongoose";

interface IApiKey {
  key: string;
  enabled: boolean;
  user: Types.ObjectId;
  userId: string;
}

const apiKeySchema = new Schema<IApiKey>({
  key: {
    type: String,
    unique: true,
  },
  enabled: {
    type: Boolean,
    default: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  userId: {
    type: String,
  },
});

const Apikey = models?.ApiKey || model("ApiKey", apiKeySchema);

export default Apikey;
