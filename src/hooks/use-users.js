import { getUserByUserId } from "../services/firebase";
import { useEffect, useState } from "react";

export default function useUser(userId) {
  const [activeUser, setActiveUser] = useState();
  useEffect(() => {
    async function getUserObjByUserId(userId) {
      const [user] = await getUserByUserId(userId);
      setActiveUser(user || {});
    }

    if (userId) {
      getUserObjByUserId(userId).then((r) => console.log(r));
    }
  }, [userId]);

  return { user: activeUser, setActiveUser };
}
