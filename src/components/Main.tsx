'use client'

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckIcon, CopyIcon } from "lucide-react";
import Form from "./Form";

const Main = () => {

  const [hasCopied, setHasCopied] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setHasCopied(false)
    }, 2000)
  }, [hasCopied])

  return (
    <main className="flex-1 flex flex-col items-center justify-center px-4 md:px-6 py-12 md:py-24">
      <div className="max-w-2xl w-full space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
            Shorten Your Links
          </h1>
          <p className="text-gray-500 text-lg dark:text-gray-400">
            Easily create short, branded links for your business.
          </p>
        </div>

        <Form />
        
        <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-800 space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <div className="text-gray-500 dark:text-gray-400 mb-2 sm:mb-0">
              https://example.com/very-long-url
            </div>
            <div className="flex items-center space-x-2">
              <div className="text-gray-900 dark:text-gray-50 font-medium">
                https://short.ly/abc123
              </div>
              <Button className="rounded-full" size="icon" variant="ghost" onClick={() => {
      
        setHasCopied(true)
      }}>
              {hasCopied ? <CheckIcon /> : <CopyIcon className="h-5 w-5" />}
                <span className="sr-only">Copy link</span>
              </Button>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <div className="text-gray-500 dark:text-gray-400 mb-2 sm:mb-0">
              https://example.com/another-long-url
            </div>
            <div className="flex items-center space-x-2">
              <div className="text-gray-900 dark:text-gray-50 font-medium">
                https://short.ly/def456
              </div>
              <Button className="rounded-full" size="icon" variant="ghost">
                <CopyIcon className="h-5 w-5" />
                <span className="sr-only">Copy link</span>
              </Button>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <div className="text-gray-500 dark:text-gray-400 mb-2 sm:mb-0">
              https://example.com/one-more-long-url
            </div>
            <div className="flex items-center space-x-2">
              <div className="text-gray-900 dark:text-gray-50 font-medium">
                https://short.ly/ghi789
              </div>
              <Button className="rounded-full" size="icon" variant="ghost">
                <CopyIcon className="h-5 w-5" />
                <span className="sr-only">Copy link</span>
              </Button>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
};

export default Main;
