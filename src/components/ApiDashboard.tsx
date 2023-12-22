import Apikey from "@/Modals/ApiKey";
import ApiRequest from "@/Modals/ApiRequest";
import { authOptions } from "@/lib/auth";
import { formatDistance } from "date-fns";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import React from "react";
import { Input } from "./ui/input";
import Table from "./Table";
import ApikeyOptions from "./ApikeyOptions";
import RequestApiKey from "./RequestApiKey";

const ApiDashboard = async () => {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  const apiKeys = await Apikey.find({ userId: user.id });
  // console.log("apiKeys", apiKeys);

  const activateApiKey = apiKeys.find((apiKey) => apiKey.enabled);

  if (!activateApiKey) {
    return <RequestApiKey />;
  }

  const keyArray = apiKeys.map((key) => key.id);


  const userRequests = await ApiRequest.find({
    apiKeyId: { $in: keyArray },
  });



  const serialzableRequests = userRequests.map((req) => ({
    ...req,
    createdAt: formatDistance(new Date(req.createdAt), new Date()),
  }));

  const stringObject = JSON.stringify(userRequests);
  // console.log("stringObject", stringObject);


  return (
    <div className="container flex flex-col gap-6 ">
      <h1 className=" text-4xl md:text-5xl lg:text-6xl text-black dark:text-white text-center lg:text-left font-extrabold leading-tight tracking-tighter ">
        Welcome back, {user?.name ?? "Guest"}
      </h1>
      <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-start items-center">
        <p className=" text-base sm:text-lg max-w-prose text-slate-700 dark:text-slate-300 mb-2 text-center">
          Your API Key :{" "}
        </p>
        <Input
          className="w-fit truncate"
          readOnly
          value={activateApiKey?.key}
        />
        <ApikeyOptions
          apiKeyId={activateApiKey.id}
          apiKey={activateApiKey?.key}
        />
      </div>

      <p className=" text-base sm:text-lg max-w-prose text-slate-700 dark:text-slate-300  text-center md:text-left mt-4 -mb-4">
        Your API history :
      </p>
      <Table userRequests={stringObject} />
    </div>
  );
};

export default ApiDashboard;
