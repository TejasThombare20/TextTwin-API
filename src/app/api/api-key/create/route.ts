import Apikey from "@/Modals/ApiKey";
import { CreateApiData } from "@/Types/api";
import { connectToDB } from "@/Utils/db";
import { authOptions } from "@/lib/auth";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { nanoid } from "nanoid";
import { z } from "zod";
import { withMethods } from "@/lib/api-middlewares/with-methodes";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<CreateApiData>
) => {
  try {
    // const user = await getServerSession(req, res, authOptions).then(
    //   (res) => res?.user
    // );
    const session = await getServerSession(authOptions);
    const user = session?.user;

    if (!user) {
      return new Response(
        JSON.stringify({
          error: "Unauthorized to perform this action",
          createdApiKey: null,
        }),
        { status: 401 }
      );
    }

    await connectToDB();
    const existingApiKey = await Apikey.find({
      userId: user.id, enabled : true
    });

    if (existingApiKey && existingApiKey.length > 0) {
      return new Response(
        JSON.stringify({
          error: "You already have a valid API key",
          createdApiKey: null,
        }),
        { status: 400 }
      );
    }

    await connectToDB();
    const createdApiKey = await Apikey.create({
      userId: user.id,
      key: nanoid(),
    });

    return new Response(JSON.stringify(createdApiKey), { status: 200 });
   
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(
        JSON.stringify({ error: error.issues, createdApiKey: null }),
        { status: 404 }
      );
    }
    return new Response(
      JSON.stringify({ error: "Internal Server Error", createdApiKey: null }),
      { status: 500 }
    );
  }
};

// export default withMethods(["GET"], handler);
export { handler as GET };
