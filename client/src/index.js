import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { UserProvider } from "./components/Contexts/UserContext";
import { GroupsProvider } from "./components/Contexts/GroupsContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <GroupsProvider>
        <UserProvider>
          <App />
        </UserProvider>
      </GroupsProvider>
    </GoogleOAuthProvider>
);
