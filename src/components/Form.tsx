import React from 'react'
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Form = () => {
  return (
    <form className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
          <Input
            className="flex-1 bg-white dark:bg-gray-900 dark:border-gray-800"
            placeholder="Enter a long URL"
            type="url"
          />
          <Button className="whitespace-nowrap" type="submit">
            Shorten
          </Button>
        </form>
  )
}

export default Form