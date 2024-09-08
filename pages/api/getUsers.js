import { createClerkClient } from "@clerk/backend";

const clerkClient = createClerkClient(
    { secretKey: "sk_test_WWkK4hGodSbr4SHMDn9GFjzpj2q83LODpMqDyHaAct"}
);

export default async function handler(req, res) {
    try {
        const users = await clerkClient.users.getUserList();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}