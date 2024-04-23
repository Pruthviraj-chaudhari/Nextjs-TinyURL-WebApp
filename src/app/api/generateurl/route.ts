import dbConnect from "@/config/database";
import Url from "@/models/url";
import { URL } from 'url';
import { nanoid } from "nanoid";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const reqBody = await req.json();
    const { url } = reqBody;

    // Validate URL format
    try {
      new URL(url);  // Throws an error if URL is invalid
    } catch (error) {
      return Response.json({
        success: false,
        message: "Invalid URL format",
      }, { status: 400 }); // Bad Request status code
    }

    const tinyId = nanoid(5);

    const newUrl = new Url({
      tinyUrl: tinyId,
      redirectUrl: url,
      visitHistory: [],
    });

    await newUrl.save();

    return Response.json(
      {
        success: true,
        message: "New Tiny Url created",
        tinyId: newUrl.tinyUrl,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return Response.json(
      {
        success: false,
        message: "Error Generating Tiny URL, Please try again...",
      },
      { status: 500 }
    );
  }
}


