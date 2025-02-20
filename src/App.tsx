import { RouterProvider } from "react-router-dom";
import router from "./router";
import { Provider } from "react-redux";
import Store from "./store";
function App() {
  return (
    <Provider store={Store}>
      <RouterProvider router={router} />;
    </Provider>
  );
}

export default App;
