import { Schema, Types, model, models } from "mongoose";

interface IAccount {
  userId: string;
  type: string;
  provider: string;
  providerAccountId: string;
  refresh_token: string;
  access_token: string;
  expires_at?: number;
  token_type?: string;
  scope?: string;
  id_token?: string;
  session_state?: string;
  user : Types.ObjectId;
}

const accountSchema = new Schema<IAccount>({
    userId :{
        types :String
    },
    type : {
        type : String
    },
    provider :{
        type : String
    },
    providerAccountId :{
        types :String
    },
  refresh_token: {
    type : String
  },
  access_token :{
    type : String
  },
  expires_at :{
    type : Number
  },
  token_type : {
    type : String
  },
  scope :{
    type : String  
  },
  id_token :{
    type : String
  },
  session_state :{
    type : String
  },
  user :{
    type : Schema.Types.ObjectId,
    ref :"User"
  }
    
});


const Account = models.Account || model("Account", accountSchema);

export default Account;
