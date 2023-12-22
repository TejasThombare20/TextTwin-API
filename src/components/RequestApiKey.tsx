"use client";

import { FormEvent, useState } from "react";
import { useToast } from "./ui/use-toast";
import { createApiKey } from "@/helpers/create-ap-keys";
import { Key, Loader2 } from "lucide-react";
import CopyButton from "./CopyButton";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

const RequestApiKey = () => {
  const { toast } = useToast();

  const [isCreating, setisCreating] = useState<boolean>(false);

  const [apiKey, setapiKey] = useState<string | null>(null);

  const createNewApiKey = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setisCreating(true);

    try {
      const generatedApiKey = await createApiKey();
      setapiKey(generatedApiKey);
    } catch (error) {
      if (error instanceof Error) {
        console.log("error", error);
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
        return;
      }
      console.log("error", error);
      toast({
        title: "Error",
        description: "something went wrong",
        variant: "destructive",
      });
    } finally {
      setisCreating(false);
    }
  };

  return (
    <div className="container md:max-w-2xl ">
      <div className="flex flex-col gap-6 items-center ">
        <Key className="mx-auto h-12 w-12 text-gray-400" />
        <h1 className="text-black dark:text-white text-center lg:text-left font-extrabold leading-tight tracking-tighter text-4xl md:text-5xl lg:text-6xl">
          Request your API key{" "}
        </h1>
        <p className=" text-base sm:text-lg max-w-prose text-slate-700 dark:text-slate-300 mb-2 text-center">
          You have &apos;t requested an API key yet.
        </p>
      </div>
      <form
        onSubmit={createNewApiKey}
        action="#"
        className="mt-6 sm:flex sm:items-center  "
      >
        <div className="relative rounded-md shadow-md sm:min-w-0 sm:flex-1">
          {apiKey ? (
            <>
              <CopyButton
                valueToCopy={apiKey}
                className="absolute inset-y-0 right-0 animate-in fade-in duration-300"
              />
            </>
          ) : null}
          <Input
            readOnly
            value={apiKey ?? ""}
            placeholder="Request an API to display it here! "
          />
        </div>
        <div className="mt-6 flex justify-center sm:mt-0 sm:ml-4 sm:flex-shrink-0">
          <Button
            disabled={!!apiKey}
            className={cn("", " disabled:cursor-not-allowed")}
          >
            {isCreating ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            Request Key
          </Button>
        </div>
      </form>
    </div>
  );
};

export default RequestApiKey;
