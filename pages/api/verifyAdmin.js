import { getAuth } from "@clerk/nextjs/server";
import { firestore } from "./firebase/firestore";
import { doc, getDoc } from "firebase/firestore";

export default async function handler(req, res) {
    try {
        const {userId} = getAuth(req);

        if (!userId) {
            return res.status(401).send("Unauthorized");
        }

        const snapshot = doc(firestore, "users", userId);
        const userData = await getDoc(snapshot);

        if (!userData.exists()) {
            return res.status(404).send("User not found");
        }

        const user = userData.data();
        
        if (!user.roles.admin) {
            return res.status(401).send("Unauthorized");
        }

        res.status(200).send("Authorized");
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}