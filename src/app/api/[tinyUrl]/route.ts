import dbConnect from "@/config/database";
import URL from "@/models/url";
import { NextApiRequest } from "next";

export async function GET(req: NextApiRequest, {params}: any) {
  try {
    await dbConnect();
    
    const { tinyUrl } = params;

    const data = await URL.findOneAndUpdate(
      {
        tinyUrl,
      },
      {
        $push: {
          visitHistory: {
            timestamp: Date.now(),
          },
        },
      }
    );

    if(!data){
        return Response.json({
            success: false,
            message: "Page Not Found"
        }, {status: 404})
    }

    let redirectUrl = data.redirectUrl;
    if (!redirectUrl.startsWith("https://") && !redirectUrl.startsWith("http://")) {
      redirectUrl = "https://" + redirectUrl;
    }

    
    return Response.redirect(redirectUrl)

  } catch (error: any) {
    return Response.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}
