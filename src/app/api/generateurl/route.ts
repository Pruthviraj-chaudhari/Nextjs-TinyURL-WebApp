import dbConnect from "@/config/database";
import Url from "@/models/url";
import { URL } from 'url';
import { nanoid } from "nanoid";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const reqBody = await req.json();
    const { url } = reqBody;
    const alias = 'alias' in reqBody ? reqBody.alias : null;

    // Validate URL format
    try {
      new URL(url); 
    } catch (error) {
      return Response.json({
        success: false,
        message: "Invalid URL format",
      }, { status: 400 });
    }

    let tinyId;

    const maxAliasLength = 20;
    const aliasPattern = /^[a-zA-Z0-9_-]+$/;

    if (alias && alias.trim() !== "") {
      if (alias.length < 5 || alias.length > maxAliasLength || !aliasPattern.test(alias)) {
        return Response.json({
          success: false,
          message: `Alias must be between 5 and ${maxAliasLength} characters and can only contain letters, numbers, underscores, and dashes.`,
        }, { status: 400 });
      }
      tinyId = alias;
    } else {
      tinyId = nanoid(5);
    }

    const newUrl = new Url({
      tinyUrl: tinyId,
      redirectUrl: url,
      visitHistory: [],
    });

    await newUrl.save();

    return Response.json(
      {
        success: true,
        message: "Tiny URL generated successfully",
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


