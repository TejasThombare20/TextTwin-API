"use client";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useToast } from "./ui/use-toast";
import { createApiKey } from "@/helpers/create-ap-keys";
import { useRouter } from "next/navigation";
import { revokeApiKey } from "@/helpers/revoke-api-key";

interface ApikeyOptionsProps {
  apiKeyId: string;
  apiKey: string;
}

const ApikeyOptions = ({ apiKeyId, apiKey }: ApikeyOptionsProps) => {
  const { toast } = useToast();
  const router = useRouter();

  const [isCreatingNew, setisCreatingNew] = useState<boolean>(false);
  const [isRevoking, setisRevoking] = useState<boolean>(false);

  const createNewApiKey = async () => {
    setisCreatingNew(true);

    try {
      await revokeApiKey({ keyId: apiKeyId });
      await createApiKey();
      router.refresh();
    } catch (error) {
      toast({
        title: "Error in creating new API key",
        description: "Please try again later",
        variant: "destructive",
      });
    }finally{
        setisCreatingNew(false)
    }
  };

  const revokeCurrentApiKey =async()=>{

    setisRevoking(true)
    try {
        await revokeApiKey({ keyId: apiKeyId }); 
        router.refresh();
      } catch (error) {
        toast({
          title: "Error in revoking API key",
          description: "Please try again later",
          variant: "destructive",
        });
      }finally{
        setisRevoking(false)
      }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger disabled={isCreatingNew || isRevoking} asChild>
        <Button variant="secondary" className={cn("flex gap-2 items-cen{ter ")}>
          <p>
            {isCreatingNew
              ? "Creating new key"
              : isRevoking
              ? "Revoking key "
              : "Options"}
            {isCreatingNew || isRevoking ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : null}
          </p>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuItem
          onClick={() => {
            navigator.clipboard.writeText(apiKey);
            toast({
              title: "Copied",
              description: "API key copied to clipboard",
              variant: "default",
            });
          }}
        >
          Copy
        </DropdownMenuItem>
        <DropdownMenuItem onClick={createNewApiKey}>Create new key</DropdownMenuItem>
        <DropdownMenuItem onClick={revokeCurrentApiKey}>Revoke key</DropdownMenuItem>
        <DropdownMenuItem></DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ApikeyOptions;
