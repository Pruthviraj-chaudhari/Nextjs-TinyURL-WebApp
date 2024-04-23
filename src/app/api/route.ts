import dbConnect from "@/config/database";
import Url from "@/models/url";
import { nanoid } from "nanoid";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const reqBody = await req.json();
    const { url } = reqBody;

    const tinyId = nanoid(8);

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
        message: error.message,
      },
      { status: 500 }
    );
  }
}


