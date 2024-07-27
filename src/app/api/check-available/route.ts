import dbConnect from "@/config/database";
import Url from "@/models/url";

export async function POST(req: Request) {
    try {
        await dbConnect();
        const reqBody = await req.json();
        let { alias } = reqBody;

        alias = alias?.trim();

        if (!alias || alias.length <= 4) {
            return Response.json(
                {
                    success: false,
                    message: "Alias must be at least 5 characters.",
                },
                { status: 400 }
            );
        }

        // Check if available
        const isAlreadyTaken = await Url.find({ tinyUrl: alias });

        if (isAlreadyTaken.length > 0) {
            return Response.json(
                {
                    success: false,
                    message: "Alias not available.",
                },
                { status: 400 }
            );
        }

        return Response.json(
            {
                success: true,
                message: "Alias available.",
            },
            { status: 200 }
        );
    } catch (error: any) {
        return Response.json(
            {
                success: false,
                message: "Error Checking availability.",
            },
            { status: 500 }
        );
    }
}


