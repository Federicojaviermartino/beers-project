import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { HomePage } from "./pages/HomePage.tsx";
import { AllBeersPage } from "./pages/AllBeersPage.tsx";
import { RandomBeerPage } from "./pages/RandomBeerPage.tsx";
import { BeersDetailPage } from "./pages/BeersDetailPage.tsx";
import { NotFoundPage } from "./pages/NotFoundPage.tsx";
import { Navbar } from "./components/Navbar.tsx";
import { AddBeerPage } from "./pages/AddBeerPage.tsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./index.css"

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Navbar />
        <Outlet />
      </>
    ),
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/beers",
        element: <AllBeersPage />,
      },
      {
        path: "/random-beer",
        element: <RandomBeerPage />,
      },
      {
        path: "/new-beer",
        element: <AddBeerPage />,
      },
      {
        path: "/beers/:beerId",
        element: <BeersDetailPage />,
      },
      {
        path: "/NotFoundPage",
        element: <NotFoundPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
