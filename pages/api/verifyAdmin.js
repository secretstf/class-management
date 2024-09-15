import { getAuth } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/nextjs/server";

export default async function handler(req, res) {
    try {
        const {userId} = getAuth(req);

        if (!userId) {
            return res.status(401).send("Unauthorized");
        }

        const user = await clerkClient.users.getUser(userId);
        
        if (!user.publicMetadata.admin) {
            return res.status(401).send("Unauthorized");
        }

        res.status(200).send("Authorized");
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}