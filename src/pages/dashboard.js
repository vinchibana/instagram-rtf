import PropTypes from "prop-types";
import Header from "../components/header";
import useUser from "../hooks/use-users";
import LoggedInUserContext from "../context/logged-in-user";
import { useEffect } from "react";
import Sidebar from "../components/sidebar";
import Timeline from "../components/timeline";

export default function Dashboard({ user: loggedInUser }) {
  const { user, setActiveUser } = useUser(loggedInUser.uid);
  useEffect(() => {
    document.title = "Instagram";
  }, []);

  return (
    <LoggedInUserContext.Provider value={{ user, setActiveUser }}>
      <div className="bg-gray-600">
        <Header />
        <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
          <Timeline />
          <Sidebar />
        </div>
      </div>
    </LoggedInUserContext.Provider>
  );
}

Dashboard.prototype = {
  user: PropTypes.object.isRequired,
};
