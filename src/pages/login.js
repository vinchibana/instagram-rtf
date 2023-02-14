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
    <div className="container flex mx-auto max-w-screen-md items-center h-screen">
      <div className="flex w-3/5">
        <img src="/images/iphone-with-profile.jpg" className="max-w-full" />
      </div>
      <div className="flex flex-col w-2/5">
        <div className="flex flex-col items-center bg-white p-4 border border-gray-primary mb-4 rounded">
          <h1 className="flex justify-center w-full">
            <img src="/images/logo.png" className="mt-2 w-6/12 mb-4" alt="" />
          </h1>
          {error && <p className="mb-4 text-xs text-red-500">{error}</p>}
          <form onSubmit={handleLogin} method="POST">
            <input
              className="text-sm text-gray-500 w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
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
              className="text-sm text-gray-500 w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
            />
            <button
              disabled={isInvalid}
              type="submit"
              className={`bg-blue-500 text-white w-full rounded h-8 font-bold ${
                isInvalid && "opacity-50"
              }`}
            >
              Login
            </button>
          </form>
        </div>

        <div className="flex justify-center items-center flex-col w-full bg-white px-4 rounded border border-gray-100">
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
