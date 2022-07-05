import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { msalConfig } from "./components/authConfig";

const msalInstance = new PublicClientApplication(msalConfig);

// ReactDOM.render(<App />,document.getElementById("root"));

ReactDOM.render(
    <React.StrictMode>
        <MsalProvider instance={msalInstance}>
            <App />
        </MsalProvider>
    </React.StrictMode>,
    document.getElementById("root")
);
