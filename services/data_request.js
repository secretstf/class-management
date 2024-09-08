import {firestore} from "@/services/firebase";
import {
    collection,
    getDocs,
} from "firebase/firestore";


const getAllData = async (collectionName) => {
    const data = [];
    const snapshot = await getDocs(collection(firestore, collectionName));

    snapshot.forEach((doc) => {
        data.push({
            id: doc.id,
            ...doc.data(),
        });
    });

    return data;
}

export { getAllData };