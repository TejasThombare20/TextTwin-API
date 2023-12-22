import { ButtonHTMLAttributes } from "react";
import { useToast } from "./ui/use-toast";
import { Copy } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

interface CopyButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  valueToCopy: string;
}

const CopyButton = ({ valueToCopy, className, ...props }: CopyButtonProps) => {
  const { toast } = useToast();
  return (
    <Button
      {...props}
      className={cn("", className)}
      type="button"
      variant="secondary"
      onClick={() => {
        navigator.clipboard.writeText(valueToCopy);

        toast({
          title: "Copied!",
          description: "API key copied to clipboard",
          variant: "default",
        });
      }}
    >
      <Copy className="h-5 w-5 stroke-white" />
    </Button>
  );
};

export default CopyButton;
