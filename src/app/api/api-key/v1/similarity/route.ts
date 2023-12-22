import Apikey from "@/Modals/ApiKey";
import ApiRequest from "@/Modals/ApiRequest";
import { connectToDB } from "@/Utils/db";
import { cosineSimilarity } from "@/helpers/cosine-smilarity";
import { openai } from "@/lib/openai";
import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

const reqSchema = z.object({
  text1: z.string().max(1000),

  text2: z.string().max(1000),
});

const handler = async (req: Request, res: NextApiResponse) => {
  const body = await req.json();

  const apiKey = req.headers?.get("authorization");

  if (!apiKey) {
    return new Response(JSON.stringify({ error: "Unauthorized !" }), {
      status: 401,
    });
  }

  // const parsed = reqSchema.safeParse(body);

  //   if(!parsed.success){
  //     return new Response(JSON.stringify({ error: "Bad Request , Invalid Input" }));
  //   }

  try {
    const { text1, text2 } = reqSchema.parse(body);

    connectToDB();
    const validApiKey = await Apikey.find({
      key: apiKey,
      enabled: true,
    });


 

    if (validApiKey.length === 0 && !validApiKey ) {
      return new Response(JSON.stringify({ error: "Unauthorized!" }), {
        status: 401,
      });
    }

    console.log("Hello")

    const start = new Date();

    const embeddings = await Promise.all(
      [text1, text2].map(async (text) => {
        const res = await openai.createEmbedding({
          model: "text-embedding-ada-002",
          input: text,
        });
        return res.data.data[0].embedding;
      })
    );

    const similarity = cosineSimilarity(embeddings[0], embeddings[1]);

    const duration = new Date().getTime() - start.getTime();

    //persisit request
    await connectToDB();

    await ApiRequest.create({
      duration,
      method: req.method as string,
      path: req.url as string,
      status: 200,
      apiKeyId: validApiKey[0]._id,
      usedApiKey: validApiKey[0].key,
    });

    return new Response(
      JSON.stringify({ success: true, text1, text2, similarity }),
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.log("error : ", error);
      return new Response(JSON.stringify({ error: error.issues }), {
        status: 400,
      });
    }console.log("error", error);

    return new Response(JSON.stringify({ error: "Internal Server Error " }), {
      status: 500,
    });
  }
};

export { handler as POST };
