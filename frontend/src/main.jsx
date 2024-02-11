import ReactDOM from "react-dom";
import App from "./App.jsx";
import "./index.css";
import Store from "./components/Redux/ReduxStore.js";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import ThemeProvider from "./components/ThemeProvider.jsx";
axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:3000";
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={Store}>
    <BrowserRouter>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </Provider>
);
