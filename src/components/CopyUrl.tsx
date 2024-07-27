"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { CopyIcon } from "lucide-react";
import { FaCheck } from "react-icons/fa6";
import { toast } from "sonner";
import { Separator } from "./ui/separator";

const CopyUrl = ({ originalURL, tinyURL }: any) => {
  const [hasCopied, setHasCopied] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setHasCopied(false);
    }, 2000);
  }, [hasCopied]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(tinyURL);
      setHasCopied(true);
      toast.success("Copied to Clipboard");
    } catch (error) {
      console.error("Failed to copy:", error);
      toast.error("Failed to copy URL");
    }
  };

  return (
    <>
    <div className="flex flex-col sm:flex-row items-center justify-between">
      <div className="text-gray-500 dark:text-gray-400 mb-2 sm:mb-0 white-space:nowrap overflow-hidden">
        {originalURL.length > 33
          ? originalURL.substring(0, 25) + "..."
          : originalURL}
      </div>
      <div className="flex items-center space-x-2">
        <div className="text-gray-900 dark:text-gray-50 font-medium">
          {tinyURL}
        </div>
        <Button
          className="rounded-full"
          size="icon"
          variant="ghost"
          onClick={handleCopy}
        >
          {hasCopied ? (
            <FaCheck className="h-4 w-4" />
          ) : (
            <CopyIcon className="h-4 w-4" />
          )}
          <span className="sr-only">Copy link</span>
        </Button>
      </div>
    </div>
    <Separator />
    </>
  );
};

export default CopyUrl;
