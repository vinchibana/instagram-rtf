import { db } from "../lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export async function doseUsernameExist(username) {
  const q = query(
    collection(db, "users"),
    where("username", "==", username.toLowerCase())
  );
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    console.log(doc.id, "=>", doc.data());
  });
  return querySnapshot.docs.length > 0;
}

// This code exports an asynchronous function that takes a username as an argument. It then creates a query to the "users" collection in the database, using the username as a parameter. The query is then executed and the results are mapped to an object containing the data and the document ID. The object is then returned.
export async function getUserByUsername(username) {
  const q = query(
    collection(db, "users"),
    where("username", "==", username.toLowerCase())
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }));
}

export async function getUserByUserId(userId) {
  const q = query(collection(db, "users"), where("userId", "==", userId));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }));
}

export async function getSuggestedProfiles(userId, following) {
  let q = query(collection(db, "users"));
  if (following.length > 0) {
    q = q.where("userId", "not-in", [...following, userId]);
  } else {
    q = q.where("userId", "!=", userId);
  }
  const querySnapshot = await q.limit(10).get();
  return querySnapshot.docs.map((user) => ({
    ...user.data(),
    docId: user.id,
  }));
}
