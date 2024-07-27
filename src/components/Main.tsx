"use client";
import { useEffect, useState } from "react";
import Form from "./Form";

const Main = () => {
  const [hasCopied, setHasCopied] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setHasCopied(false);
    }, 4000);
  }, [hasCopied]);

  function handleCopy() {
    setHasCopied(true);
  }

  return (
    <main className="flex-1 flex flex-col items-center justify-center px-4 md:px-6 py-12 md:py-24">
      <div className="max-w-2xl w-full space-y-6 z-10">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
            Shorten Your Links
          </h1>
          <p className="text-gray-500 text-lg dark:text-gray-400">
            Easily create short, branded links for your business.
          </p>
        </div>
        <Form />
      </div>
    </main>
  );
};

export default Main;
