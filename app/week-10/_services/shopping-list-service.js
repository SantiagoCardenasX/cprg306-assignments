import { db } from "../_utils/firebase";
import { collection, getDocs, addDoc, query } from "firebase/firestore";

export const getItems = async (userId) => {
  // Reference to the 'items' subcollection of the specific user's document
  const itemsCollection = collection(db, `users/${userId}/items`);

  // Get the documents in the 'items' subcollection
  const itemsSnapshot = await getDocs(itemsCollection);

  // Initialize an empty array to store the items
  const items = [];

  // Iterate over the snapshot and push each item's data into the array
  itemsSnapshot.forEach((doc) => {
    items.push({ id: doc.id, ...doc.data() });
  });

  // Return the array of items
  return items;
};

export const addItem = async (userId, item) => {
    // Reference to the 'items' subcollection of the specific user's document
    const itemsCollection = collection(db, `users/${userId}/items`);
    
    // Add the new item to the 'items' subcollection
    const docRef = await addDoc(itemsCollection, item);
    
    // Return the document ID of the newly created item
    return docRef.id;
  };
  
