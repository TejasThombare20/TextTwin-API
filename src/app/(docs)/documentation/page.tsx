import React from "react";
import type { Metadata } from "next";
import DocumentationTab from "@/components/DocumentationTab";
import 'simplebar-react/dist/simplebar.min.css';

export const metadata: Metadata = {
  title: "TextTwin API  | Documentation",
  description: "Free and open source TextTwin API",
};

const page = () => {
  return (
    <div className="container max-w-7xl mx-auto mt-12">
      <div className="flex flex-col items-center gap-6">
        <h1 className="text-4xl sm:text-5xl font-bold   "> making a request</h1>
        <p className="">api/api-key/v1/similarity</p>

        <DocumentationTab/>
      </div>
    </div>
  );
};

export default page;
