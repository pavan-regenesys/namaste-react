import { StrictMode, Suspense, lazy, type ComponentType } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import AppLayout from "./App.tsx";
import Body from "./components/Body";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ErrorComponent from "./components/Error";
import Cart from "./pages/Cart.tsx";

const RestaurantMenu = lazy(
  () =>
    import("./pages/RestaurantMenu.tsx") as Promise<{
      default: ComponentType<unknown>;
    }>,
);
const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <ErrorComponent />,
    children: [
      { index: true, element: <Body /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "cart", element: <Cart /> },
      {
        path: "restaurant/:resId",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            {" "}
            <RestaurantMenu />{" "}
          </Suspense>
        ) as React.ReactNode,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
