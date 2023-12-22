import { Schema, Types, model, models } from "mongoose";

interface IVerificationToken {
  identifier : string;
  token : string;
  expires : Date;
}

const  verficationtokenSchema = new Schema<IVerificationToken>({

    identifier : {
        type : String,
    },
    token :{
        type : String,
        unique : true,
    },
    expires :{
        type : Date
    }
 
});

const VerificationToken = models?.VerificationToken || model("ApiVerificationTokenKey", verficationtokenSchema);

export default VerificationToken;
