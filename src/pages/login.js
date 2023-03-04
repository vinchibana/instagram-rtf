import { Link, useHistory } from "react-router-dom";
import FirebaseContext from "../context/firebase";
import { useContext, useEffect, useState } from "react";
import * as Routes from "../constants/routes";

export default function Login() {
  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const isInvalid = password === "" || emailAddress === "";

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      await firebase.auth().signInWithEmailAndPassword(emailAddress, password);
      history.push(Routes.DASHBOARD);
    } catch (error) {
      setEmailAddress("");
      setPassword("");
      setError(error.message);
    }
  };

  useEffect(() => {
    document.title = "Login - Instagram";
  }, [password]);

  return (
    <div className="container mx-auto flex h-screen max-w-screen-md items-center">
      <div className="flex w-3/5">
        <img src="/images/iphone-with-profile.jpg" className="max-w-full" />
      </div>
      <div className="flex w-2/5 flex-col">
        <div className="border-gray-primary mb-4 flex flex-col items-center rounded border bg-white p-4">
          <h1 className="flex w-full justify-center">
            <img src="/images/logo.png" className="mt-2 mb-4 w-6/12" alt="" />
          </h1>
          {error && <p className="mb-4 text-xs text-red-500">{error}</p>}
          <form onSubmit={handleLogin} method="POST">
            <input
              className="border-gray-primary mr-3 mb-2 h-2 w-full rounded border py-5 px-4 text-sm text-gray-500"
              type="text"
              aria-label="Enter your email address"
              placeholder="Email address"
              value={emailAddress}
              onChange={({ target }) => setEmailAddress(target.value)}
            />
            <input
              type="password"
              aria-label="Enter your password"
              placeholder="Password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              className="border-gray-primary mr-3 mb-2 h-2 w-full rounded border py-5 px-4 text-sm text-gray-500"
            />
            <button
              disabled={isInvalid}
              type="submit"
              className={`h-8 w-full rounded bg-blue-500 font-bold text-white ${
                isInvalid && "opacity-50"
              }`}
            >
              Login
            </button>
            <button className="mt-2 h-10 w-full rounded bg-blue-200 font-bold text-white hover:bg-green-400">
              Cancel
            </button>
          </form>
        </div>

        <div className="flex w-full flex-col items-center justify-center rounded border border-gray-100 bg-white px-4">
          <p className="text-sm">
            Don't have an account?{` `}
            <Link to={Routes.SIGN_UP} className="font-bold text-blue-500">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
