import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { firestore } from "./firestore";

export default async function handler(req, res) {
  try {
    if (req.method == "GET") {
      // check if id is in the query
      if (!("id" in req.query)) {
        res.status(400).json({ error: "Missing document id in query" });
      } else if (!("collection" in req.query)) {
        res.status(400).json({ error: "Missing collection name in query" });
      }

      // get the user with the id
      const id = req.query.id;
      const collection_name = req.query.collection;

      const snapshot = doc(firestore, collection_name, id);
      const docRef = await getDoc(snapshot);

      if (docRef.exists()) {
        const data = docRef.data();

        res.status(200).json(data);
      } else {
        res.status(404).json({ error: "Document does not exist!" });
      }
    } else if (req.method == "PUT") {
      console.log("PUT request for document");
      // check if collection in the query
      if (!("collection" in req.query)) {
        res.status(400).json({ error: "Missing collection name in query" });
      }

      let collection_name = req.query.collection;
      let data = req.body;
      data = await JSON.parse(data);
      console.log(data);
      await setDoc(doc(firestore, collection_name, data.id), data);

      res.status(200).json({ message: "Document updated" , data: data});
    } else if (req.method == 'POST') {
      // check if collection and id in the query
      if (!("collection" in req.query)) {
        res.status(400).json({ error: "Missing collection name in query" });
      } else if (!("id" in req.query)) {
        res.status(400).json({ error: "Missing document id in query" });
      }

      let collection_name = req.query.collection;
      let doc_id = req.query.id;
      let data = req.body;

      data = await JSON.parse(data);
      await setDoc(doc(firestore, collection_name, doc_id), data);

    } else if (req.method == "DELETE") {
      // check if id is in the query
      if (!("id" in req.query)) {
        res.status(400).json({ error: "Missing document id in query" });
      } else if (!("collection" in req.query)) {
        res.status(400).json({ error: "Missing collection name in query" });
      }

      // get the user with the id
      const id = req.query.id;
      const collection_name = req.query.collection;

      const snapshot = doc(firestore, collection_name, id);
      const docRef = await getDoc(snapshot);

      if (docRef.exists()) {
        await snapshot.delete();
        res.status(200).json({ message: "Document deleted" });
      } else {
        res.status(404).json({ error: "Document does not exist!" });
      }
    }else {
      res.status(405).json({ error: "Invalid request method" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
