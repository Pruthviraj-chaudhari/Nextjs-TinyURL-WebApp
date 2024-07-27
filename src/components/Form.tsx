import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import CopyUrl from "./CopyUrl";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { IoSparklesSharp } from "react-icons/io5";
import axios from "axios";
import { Separator } from "./ui/separator";
import Customize from "./Customize";

const Form = () => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const [url, setUrl] = useState("");
  const [alias, setAlias] = useState("");
  const [loading, setLoading] = useState(false);
  const [tinyUrl, setTinyUrl] = useState([
    {
      originalURL: "https://example.com",
      tinyURL: `${baseUrl}/alias`,
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
      const response = await axios.post("/api/generateurl", { url: url, alias });
      setTinyUrl([
        ...tinyUrl,
        {
          originalURL: url,
          tinyURL: `${baseUrl}/${response.data.tinyId}`,
        },
      ]);
      setUrl("");
      toast.success("Tiny URL generated successfully");
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
    setLoading(false);
  }

  return (
    <>
      <form className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-2">
        <Input
          className="flex-1 bg-white dark:bg-gray-900 dark:border-gray-800"
          placeholder="Enter a long URL"
          type="url"
          name="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <div className="flex gap-2">

          <Customize alias={alias} setAlias={setAlias} />

          {loading ? (
            <Button className="whitespace-nowrap" disabled>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />{' '}
              Generating...
            </Button>
          ) : (
            <Button className="whitespace-nowrap" onClick={handleSubmit}>
              Shorten
            </Button>
          )}
        </div>
      </form>

      <Separator/>

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
