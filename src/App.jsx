import { RouterProvider } from "react-router-dom";
import router from "./Router/RouterController";

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
