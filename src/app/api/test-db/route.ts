import dbConnect from "@/lib/mongodb";
import User from "@/models/User";

export async function GET() {
    try {
        await dbConnect();

        const count = await User.countDocuments();
        return new Response(`Database connected. user count: ${count}`, { status: 200 });
    } catch(error) {
        console.error("Error connecting to database:", error);
        return new Response("Data")
    }
}

GET()