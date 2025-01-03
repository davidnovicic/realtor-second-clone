import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function Header() {
  const [pageState, setPageState] = useState("Sign In");
  const location = useLocation();
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setPageState("Profile");
      } else {
        setPageState("Sign In");
      }
    });
  });

  function pathMatchRoute(route) {
    if (route === location.pathname) {
      return true;
    }
  }
  return (
    <div className="bg-white border-b shadow-sm sticky top-0 zero-40">
      <header className="flex justify-between items-center px-3 max-w-6xl mx-auto">
        <div>
          <img
            src="https://static.rdc.moveaws.com/rdc-ui/logos/logo-brand.svg"
            alt=""
            className="h-7 cursor-pointer"
            onClick={() => navigate("/")}
          />
        </div>

        <div>
          <ul className="flex space-x-10">
            <li
              className={`cursor-pointer py-3 font-semibold text-black border-b-[3px] border-b-transparent ${
                pathMatchRoute("/") && "text-black border-b-red-500 "
              }`}
              onClick={() => navigate("/")}
            >
              Home
            </li>
            <li
              className={`cursor-pointer py-3 font-semibold text-black border-b-[3px] border-b-transparent ${
                pathMatchRoute("/") && "text-black border-b-red-500 "
              }`}
              onClick={() => navigate("/offers")}
            >
              Offers
            </li>
            <li
              className={`cursor-pointer py-3 font-semibold text-black border-b-[3px] border-b-transparent ${
                pathMatchRoute("/sing-in") || pathMatchRoute("/profile")
              }`}
              onClick={() => navigate("/profile")}
            >
              {pageState}
            </li>
          </ul>
        </div>
      </header>
    </div>
  );
}
