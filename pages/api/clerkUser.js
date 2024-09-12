import { clerkClient } from "@clerk/clerk-sdk-node";

export default async function handler(req, res) {
    try {
        if (req.method == "DELETE") {
            // check if id is in the query
            if (!("id" in req.query)) {
                res.status(400).json({ error: "Missing id in query" });
                return;
            }

            // delete the user with the id
            const { id } = req.query.id;
            await clerkClient.users.deleteUser(id);

            res.status(200).json({ message: `User ${id} deleted` });
        } else if (req.method == "GET"){
            if ("all" in req.query) {
                // get all users
                const users = await clerkClient.users.getUserList();
                res.status(200).json(users);
            } else if ("id" in req.query) {
                // get the user with the id
                const { id } = req.query.id;
                const user = await clerkClient.users.getUser(id);
                res.status(200).json(user);
            } else {
                res.status(400).json({ error: "Missing id in query" });
            }

        } else {
            res.status(400).json({ error: "Invalid request method" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

