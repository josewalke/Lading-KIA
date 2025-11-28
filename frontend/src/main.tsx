import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
// globals.css is now imported only in DashboardWrapper to avoid conflicts with home page

createRoot(document.getElementById("root")!).render(<App />);