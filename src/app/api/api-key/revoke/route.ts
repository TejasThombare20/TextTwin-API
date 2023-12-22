import Apikey from "@/Modals/ApiKey";
import { connectToDB } from "@/Utils/db";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { z } from "zod";

const handler = async () => {
  try {
    const session = await getServerSession(authOptions);
    const user = session?.user;

    connectToDB();
    if (!user) {
      return new Response(
        JSON.stringify({ error: "Unauthorized", success: false }),
        { status: 401 }
      );
    }

    connectToDB();
    const validApiKey = await Apikey.find({
      userId: user.id,
      enabled: true,
    });
     
    console.log("validApiKey", validApiKey);

    if (!validApiKey) {
      return new Response(
        JSON.stringify({
          error: "This API could not be revoked.",
          success: false,
        }),
        { status: 500 }
      );
    }

    //invalidate API key
    connectToDB();
    await Apikey.findByIdAndUpdate(
      { _id: validApiKey[0]._id },
      { enabled: false }
    );

    console.log()

    return new Response(JSON.stringify({ error: null, success: true }), {
      status: 200,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(
        JSON.stringify({ error: error.issues, success: false })
      );
    }

    return new Response(
      JSON.stringify({ error: "Internal Server Error", success: false })
    );
  } 
};

export { handler as POST };
