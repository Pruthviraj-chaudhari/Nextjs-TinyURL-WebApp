import dbConnect from "@/config/database";
import Url from "@/models/url";

export async function POST(req: Request) {
    try {
        await dbConnect();
        const reqBody = await req.json();
        let { alias } = reqBody;

        alias = alias?.trim();

        const maxAliasLength = 20;
        const aliasPattern = /^[a-zA-Z0-9_-]+$/; // Allow only letters, numbers, underscores, and dashes

        if (!alias || alias.length < 5 || alias.length > maxAliasLength) {
            return Response.json(
                {
                    success: false,
                    message: `Alias must be between 5 to ${maxAliasLength} characters.`,
                },
                { status: 400 }
            );
        }

        if (!aliasPattern.test(alias)) {
            return Response.json(
                {
                    success: false,
                    message: "Alias cannot contain special characters.",
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


