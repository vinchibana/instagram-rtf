import { Link, useHistory } from "react-router-dom";
import FirebaseContext from "../context/firebase";
import * as Routes from "../constants/routes";
import useUser from "../hooks/use-users";
import UserContext from "../context/user";
import { useContext } from "react";

export default function Header() {
  const { user: loggedInUser } = useContext(UserContext);
  const { user } = useUser(loggedInUser?.uid);
  const { firebase } = useContext(FirebaseContext);
  const history = useHistory();

  return (
    <header className="mb-8 h-16 border-b border-gray-400 bg-white">
      <div className="container mx-auto h-full max-w-screen-lg">
        <div className="flex h-full justify-between">
          <div className="align-items flex cursor-pointer items-center text-center text-gray-700">
            <h1 className="flex w-full justify-center">
              <Link to={Routes.DASHBOARD} aria-label="Instagram logo">
                <img src="/images/logo.png" className="mt-2 w-6/12" alt="" />
              </Link>
            </h1>
          </div>

          <div className="align-items flex items-center text-center text-gray-700">
            {loggedInUser ? (
              <>
                <Link to={Routes.DASHBOARD}>
                  <svg
                    className="text-black-light mr-6 w-8 cursor-pointer"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                </Link>

                <button
                  type="button"
                  title="Sign Out"
                  onClick={() => {
                    firebase.auth().signOut();
                    history.push(Routes.LOGIN);
                  }}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      firebase.auth().signOut();
                      history.push(Routes.LOGIN);
                    }
                  }}
                >
                  <svg
                    className="text-black-light mr-6 w-8 cursor-pointer"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                </button>
              </>
            ) : (
              <>
                <Link></Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
