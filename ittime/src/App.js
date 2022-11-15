import "./css/App.css";
import "./css/Main.css";
import "./css/SignUp.css";
import "./css/FindId.css";
import "./css/FindPw.css";
import Main from "./components/Main";
import Left from "./layout/Left";
import Header from "./layout/Header";

import { useEffect, useState } from "react";
import AnimateRoutes from "./components/AnimateRoutes";

<script
  src="https://kit.fontawesome.com/468fac8028.js"
  crossorigin="anonymous"
></script>;

function App() {
  const [user, setUser] = useState(false);
  const [auth, setAuth] = useState("");

  const getAuth = (data) => {
    sessionStorage.setItem("id", data.mb_id);
    sessionStorage.setItem("nick", data.mb_nick);
    sessionStorage.setItem("email", data.mb_email);
    sessionStorage.setItem("bg", data.mb_bg);
    sessionStorage.setItem("pic", data.mb_pic);
    sessionStorage.setItem("mode", "lightMode");
    setAuth("로그인성공");
  };

  useEffect(() => {
    sessionStorage.getItem("id") !== null && setUser(true);
  }, [auth]);

  const [mode, setMode] = useState(sessionStorage.getItem("mode"));
  const getMode = (data) => {
    setMode(data);
    sessionStorage.setItem("mode", data);
  };

  const [headerName, setHeaderName] = useState("Home");
  const getHeaderName = (data) => {
    setHeaderName(data);
  };

  return (
    <div className="AppBody">
      {!user ? (
        <Main getAuth={getAuth} />
      ) : (
        <div className={`HomeBody ${mode}`}>
          <div className="leftBar">
            <div className="fixed">
              <Left
                mode={mode}
                getMode={getMode}
                getHeaderName={getHeaderName}
              />
            </div>
          </div>
          <div className="body">
            <div className="headerBar">
              <div className="fixed">
                <Header headerName={headerName} />
              </div>
            </div>
            <div className="view">
              <AnimateRoutes />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
