import { clerkClient } from "@clerk/clerk-sdk-node";
import { firestore } from "./firebase/firestore";
import { collection, getDocs, setDoc, doc } from "firebase/firestore";

/**
 * Generates a unique invitation code.
 *
 * @param {Set<number>} existingCodes - The set of existing invitation codes.
 * @returns {number} - The generated invitation code.
 */
function createInvitationCode(existingCodes) {
  let code = Math.floor(Math.random() * 1000000);
  while (existingCodes.has(code) && code == 0) {
    code = Math.floor(Math.random() * 1000000);
  }
  return code;
}

/**
 * Synchronizes users between Clerk and Firestore.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the synchronization is complete.
 * @throws {Error} - If an error occurs during the synchronization process.
 */
export default async function handler(req, res) {
  try {
    let clerkUsers = await clerkClient.users.getUserList();
    clerkUsers = clerkUsers.data;

    const default_roles = {
      parent: false,
      teacher: false,
      student: false,
      admin: false,
    };

    let users = [];

    clerkUsers.forEach((user) => {
      let emails = user.emailAddresses.map((email) => email.emailAddress);
      users.push({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        fullName: `${user.firstName} ${user.lastName}`,
        emails: emails,
        roles: default_roles,
        students: [],
        invitationCode: 0,
        students: [],
        lessons: [],
      });
    });

    let firestoreUsers = await getDocs(collection(firestore, "users"));
    let tempUsers = {};
    firestoreUsers.forEach((doc) => {
      tempUsers[doc.id] = doc.data();
    });
    firestoreUsers = tempUsers;

    let firestoreIDs = new Set(Object.keys(firestoreUsers));
    let setInvitationCode = new Set(
      Object.values(firestoreUsers).map((user) => user.invitationCode)
    );
    let newIDs = [];

    users.forEach(async (user) => {
      if (!firestoreIDs.has(user.id)) {
        user.invitationCode = createInvitationCode(setInvitationCode);
        await setDoc(doc(firestore, "users", user.id), user);
        newIDs.push(user.id);
      } else {
        if (
          Object.keys(firestoreUsers[user.id]).length !=
          Object.keys(user).length
        ) {
          let keys = new Set(Object.keys(firestoreUsers[user.id]));
          let userKeys = new Set(Object.keys(user));
          let diff = new Set([...keys].filter((x) => !userKeys.has(x)));
          diff.forEach((key) => {
            firestoreUsers[user.id][key] = user[key];
          });

          if (diff.has("invitationCode")) {
            firestoreUsers[user.id].invitationCode =
              createInvitationCode(setInvitationCode);
          }

          await setDoc(
            doc(firestore, "users", user.id),
            firestoreUsers[user.id]
          );
        }
      }
    });
    res.status(200).json({ message: "Users synced", newIDs: newIDs });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
