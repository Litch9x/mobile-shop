import { Route } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux-setup/store";
import { RouterProvider } from "react-router-dom";
import router from "./routers/";
import "bootstrap"; // js
import $ from "jquery";

function App() {
  // Kiểm tra quyền Admin (có thể thay bằng logic Auth thực tế)

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  );
}

export default App;
