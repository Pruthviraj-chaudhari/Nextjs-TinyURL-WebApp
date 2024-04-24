import dbConnect from "@/config/database";
import URL from "@/models/url";

export async function GET(req: Request, { params }: any) {
  try {
    await dbConnect();

    const { tinyUrl } = params;

    const data:any = await URL.findOne({ tinyUrl });

    if (!data) {
      return Response.json(
        {
          success: false,
          message: "Page Not Found",
        },
        { status: 404 }
      );
    }
    
    return Response.json(
      {
        success: true,
        totalClicks: data.visitHistory.length,
        analytics: data.visitHistory,
      },
      { status: 200 }
    );
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
