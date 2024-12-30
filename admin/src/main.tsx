import { createRoot } from "react-dom/client";
import "./app/layouts/index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./app/routes/router.tsx";
import { Provider } from "react-redux";
import { store } from "./app/redux/store.ts";
import "@fontsource/roboto/100.css";
import "@fontsource/roboto/500.css";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
