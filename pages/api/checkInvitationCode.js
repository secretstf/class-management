import { firestore } from "./firebase/firestore";
import {getDoc, doc} from "firebase/firestore";

export default async function handler(req, res) {
    try {
        if (req.method !== "GET") {
            return res.status(405).send("Method Not Allowed");
        }

        const { code } = req.query;

        if (!code) {
            return res.status(400).send("Bad Request");
        }
        
        let invitationCodeDictionary = await getDoc(doc(firestore, "invitationCodes", "dictionary"));
        invitationCodeDictionary = invitationCodeDictionary.data();

        if (!invitationCodeDictionary) {
            console.error("Invitation Code Dictionary not found");
            return res.status(500).send("Internal Server Error");
        }

        if (invitationCodeDictionary[code]) {
            console.log(`Invitation Code ${code} is valid`);
            return res.status(200).send(`${invitationCodeDictionary[code]}`);
        } else {
            console.log("Invalid Invitation Code");
            return res.status(404).send("Invalid Invitation Code");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}