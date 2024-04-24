import dbConnect from "@/config/database";
import URL from "@/models/url";

export async function GET(req: Request, {params}: any) {
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
    const baseUrl = process.env.BASE_URL || "http://localhost:3000"; 
  return Response.redirect(baseUrl + "/not-found");
  }
}
