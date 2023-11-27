import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {
  createBrowserRouter,
  RouterProvider,
  // Route,
  // Link,
} from "react-router-dom";
import Draft from "./pages/Draft";
import App from "./App";
import Nav from "./component/Nav";
import DraftById from "./pages/DraftById";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/draft",
    element: <Draft />,
    children: [
      {
        path: "by_id/:id",
        element: <DraftById />,
      },
    ],
  },
  {
    path: "/draft",
    element: <Draft />
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Nav />
   <RouterProvider router={router} />
  </React.StrictMode>
);
reportWebVitals();
