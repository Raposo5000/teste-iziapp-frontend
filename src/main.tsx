import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./main.css";
import AuthProvider from "./contexts/authContext.tsx";
import { Provider } from "react-redux";
import store from "./redux/store.ts";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <AuthProvider>
      <Provider store={store}>
        <Toaster
          position="bottom-center"
          reverseOrder={false}
          toastOptions={{
            duration: 5000,
            style: { color: "#000000", fontWeight: "bold" },
          }}
        />
        <App />
      </Provider>
    </AuthProvider>
);
