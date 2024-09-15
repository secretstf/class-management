import { invitationCodeDictionary } from "./syncUsers";

export default async function handler(req, res) {
    try {
        if (req.method !== "GET") {
            return res.status(405).send("Method Not Allowed");
        }

        console.log(invitationCodeDictionary)

        const { code } = req.query;

        if (!code) {
            return res.status(400).send("Bad Request");
        }

        if (invitationCodeDictionary[code]) {
            return res.status(200).send(`${invitationCodeDictionary[code]}`);
        } else {
            return res.status(404).send("Invalid Invitation Code");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}