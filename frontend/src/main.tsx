import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Route, createRoutesFromElements } from "react-router-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/features/store.ts";
import Register from "./pages/auth/register.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(<Route path="/" element={<App />}>
    <Route path="/register" element={<Register />} />
  </Route>)
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
