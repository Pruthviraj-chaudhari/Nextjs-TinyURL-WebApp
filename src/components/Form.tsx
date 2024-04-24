import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import CopyUrl from "./CopyUrl";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import axios from "axios";

const Form = () => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;


  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [tinyUrl, setTinyUrl] = useState([
    {
      originalURL: "https://example.com",
      tinyURL: `${baseUrl}/api/hgasb`,
    },
  ]);

  async function handleSubmit(e: any) {
    e.preventDefault();
    if (url === "") {
      toast.warning("Please Enter URL to be shorten");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("/api/generateurl", { url: url });
      setTinyUrl([
        ...tinyUrl,
        {
          originalURL: url,
          tinyURL: `${baseUrl}/api/${response.data.tinyId}`,
        },
      ]);
      toast.success("Tiny URL Generated Successfully");
    } catch (error: any) {
      toast.success(error.response.data.message);
    }
    setLoading(false);
  }

  return (
    <>
      <form className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
        <Input
          className="flex-1 bg-white dark:bg-gray-900 dark:border-gray-800"
          placeholder="Enter a long URL"
          type="url"
          name="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />

        {loading ? (
          <Button className="whitespace-nowrap" disabled>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Generating...
          </Button>
        ) : (
          <Button className="whitespace-nowrap" onClick={handleSubmit}>
            Shorten
          </Button>
        )}
      </form>

      <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-800 space-y-4">
        {tinyUrl.map((element, index) => (
            <CopyUrl
              key={index}
              originalURL={element.originalURL}
              tinyURL={element.tinyURL}
            />
          )).reverse()}
      </div>
    </>
  );
};

export default Form;
