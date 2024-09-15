import {getAuth} from "@clerk/nextjs/server";
import {firestore} from "./firebase/firestore";
import {doc, getDoc} from "firebase/firestore";

export default async function handler(req, res) {
    try {
        if (req.method !== "GET") {
            return res.status(405).send("Method Not Allowed");
        }

        const {userId} = getAuth(req);

        if (!userId) {
            return res.status(401).send("Unauthorized");
        }

        const snapshot = doc(firestore, "users", userId);
        const docRef = await getDoc(snapshot);
        const userData = docRef.data();

        if (!userData) {
            return res.status(404).send("User not found");
        }

        res.status(200).json(userData);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}