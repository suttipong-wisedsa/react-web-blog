import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { Provider } from 'react-redux';
import store from './store';
import {
  createBrowserRouter,
  RouterProvider,
  // Route,
  // Link,
} from "react-router-dom";
import Draft from "./pages/Draft";
import CreateDraft from "./pages/Create_draft";
import App from "./App";
import Nav from "./component/Nav";
import EditForm from "./pages/Edit_Form";
// import { Provider } from "react-redux";
// import  {store}  from "./api/create";
// import DraftById from "./pages/DraftById";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/draft",
    element: <Draft />,
  },
  {
    path: "/create-draft",
    element: <CreateDraft />,
  },
  {
    path: "/edit_form/:id",
    element: <EditForm />,
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
      <Nav />
      <Provider store={store}>
      <RouterProvider router={router} />
      </Provider>
  </React.StrictMode>
);
reportWebVitals();
