import Apikey from "@/Modals/ApiKey";
import ApiDashboard from "@/components/ApiDashboard";
import RequestApiKey from "@/components/RequestApiKey";
import { authOptions } from "@/lib/auth";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "TextTwin API | Dashboard",
  description: "Free and open source text TextTwin API.",
};

const page = async () => {
  const user = await getServerSession(authOptions);
  // console.log("user", user);

  if (!user) notFound();

  const apiKey = await Apikey.find({ userId: user.user.id });
  //  console.log("apiKey", apiKey);
  
  return (
    <div className="max-w-7xl mx-auto mt-16">
      {apiKey ? <ApiDashboard /> : <RequestApiKey />}
     
    </div>
  );
};

export default page;
