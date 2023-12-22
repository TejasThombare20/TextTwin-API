"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SimpleBar from "simplebar-react";
import Code from "./Code";
import { nodejs, python } from "@/helpers/Documentation";
import 'simplebar-react/dist/simplebar.min.css';

const DocumentationTab = () => {
  return (
    <Tabs defaultValue="nodeJS" className="max-w-2xl w-full">
      <TabsList>
        <TabsTrigger value="nodeJS">nodeJS</TabsTrigger>
        <TabsTrigger value="python">python</TabsTrigger>
      </TabsList>
      <TabsContent
        value="nodeJS"
        className="dark:bg-slate-900 py-2 px-3 rounded-lg shadow-md dark:shadow-slate-800 dark:border dark:border-slate-500"
      >
        <SimpleBar forceVisible="y">
          <Code animated language="tsx" code={nodejs} show />
        </SimpleBar>
      </TabsContent>
      <TabsContent
        value="python"
        className="dark:bg-slate-900 py-2 px-3 rounded-lg shadow-md dark:shadow-slate-800 dark:border dark:border-slate-500"
      >
        <SimpleBar forceVisible="y">
          <Code animated language="python" code={python} show />
        </SimpleBar>
      </TabsContent>
    </Tabs>
  );
};

export default DocumentationTab;
