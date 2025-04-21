import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./i18n";
import { routes } from "./constants/routes";

const router = createBrowserRouter(routes);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
