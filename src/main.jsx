import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";

// Mantine UI
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import { UserProvider } from "./contexts/User.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <UserProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </UserProvider>
    </React.StrictMode>
);
