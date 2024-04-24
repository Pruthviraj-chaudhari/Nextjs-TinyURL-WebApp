import dbConnect from "@/config/database";
import URL from "@/models/url";

export async function GET(req: Request, {params}: any) {

  const baseUrl = `https://${process.env.NEXT_PUBLIC_BASE_URL}`; 

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
        return Response.redirect(baseUrl + "/not-found");
    }

    let redirectUrl = data.redirectUrl;
    if (!redirectUrl.startsWith("https://") && !redirectUrl.startsWith("http://")) {
      redirectUrl = "https://" + redirectUrl;
    }

    
    return Response.redirect(redirectUrl)

  } catch (error: any) {
    return Response.redirect(baseUrl + "/not-found");
  }
}
