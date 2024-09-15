import { getAuth } from "@clerk/nextjs/server";
import { firestore } from "./firebase/firestore";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { clerkClient } from "@clerk/nextjs/server";

async function accessLevel(userID) {
  const user = await clerkClient.users.getUser(userID);

  // if the user is a student, they can only access their own data
  if (user.publicMetadata.student) {
    return [userID];
  }

  // if the user is a parent, they can only access their students' data
  if (user.publicMetadata.parent) {
    const snapshot = doc(firestore, "users", userID);
    const docRef = await getDoc(snapshot);
    const userData = docRef.data();

    if (!userData) {
      throw new Error("User not found");
    }

    return [userID, ...userData.students];
  }

  return [];
}

/**
 * API handler for retrieving user data from Firestore.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the response is sent.
 *
 * @throws {Error} - Throws an error if the request method is not GET,
 *                   if the user is unauthorized, or if there is an internal server error.
 */
export default async function handler(req, res) {
  try {
    if (req.method !== "GET" && req.method !== "PUT") {
      return res.status(405).send("Method Not Allowed");
    }

    // check if the request is a PUT request
    if (req.method == "PUT") {
      const { userId } = getAuth(req);
      const { body, query } = req;
      const { id } = query;

      // check if logged in
      if (!userId) {
        return res.status(401).send("Unauthorized");
      }

      // get access level for current user
      const access = await accessLevel(userId);

      // check if not admin/teacher or not right access level
      if (access.length !== 0 && !access.includes(id)) {
        return res.status(401).send("Unauthorized");
      }

      // update user data
      const snapshot = doc(firestore, "users", id);
      await setDoc(snapshot, body);
      res.status(200).send("User updated successfully");
    }

    if (req.method == "GET") {
      const { userId } = getAuth(req);

      if (!userId) {
        return res.status(401).send("Unauthorized");
      }

      // check if id is present in query
      const { id } = req.query;
      let idSelection = id;

      // if id is not present, get user data for current user
      if (!id) {
        idSelection = userId;
      }

      // check access level for current user
      const access = await accessLevel(userId);
      if (access.length !== 0 && !access.includes(idSelection)) {
        return res.status(401).send("Unauthorized");
      }

        // get user data
      const snapshot = doc(firestore, "users", idSelection);
      const docRef = await getDoc(snapshot);
      const userData = docRef.data();

      // check if user data is present
      if (!userData) {
        return res.status(404).send("User not found");
      }

      // send user data
      res.status(200).json(userData);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
}
