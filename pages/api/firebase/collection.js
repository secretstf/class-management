import { collection, getDocs } from "firebase/firestore";
import { firestore } from "./firestore";

export default async function handler(req, res) {
  try {
    if (req.method == "GET") {
      // check if id is in the query
      if (!("id" in req.query)) {
        res.status(400).json({ error: "Missing id in query" });
      }

      // get the user with the id
      const id  = req.query.id;
      const snapshot = collection(firestore, id);
      const collectionRef = await getDocs(snapshot);

      if (!collectionRef.empty) {
        const data = collectionRef.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        res.status(200).json(data);
      } else {
        res.status(404).json({ error: "Collection does not exist!" });
      }
    } else {
      res.status(405).json({ error: "Invalid request method" });
    }

  } catch (error) {
    res.status(500).json({ error: error.message });
  }

}