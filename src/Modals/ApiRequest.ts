import { Schema, Types, model, models } from "mongoose";

interface IApiRequest {
  method: string;
  path: string;
  status: number;
  duration: number;
  usedApiKey: string;
  apiKey: Types.ObjectId;
  apiKeyId: string;
}

const apiRequestSchema = new Schema<IApiRequest>(
  {
    method: {
      type: String,
    },
    path: {
      type: String,
    },
    status: {
      type: Number,
    },
    duration: {
      type: Number,
    },
    usedApiKey: {
      type: String,
    },
    apiKey: {
      type: Schema.Types.ObjectId,
      ref: "ApiKey",
    },
    apiKeyId: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

apiRequestSchema.index({ apiKeyId: 1, timestamps: 1 });

const ApiRequest = models?.ApiRequest || model("ApiRequest", apiRequestSchema);

export default ApiRequest;
