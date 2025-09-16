import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CompactLanding } from "./components/CompactLanding";
import AdminPage from "./pages/AdminPage";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Routes>
          <Route path="/" element={<CompactLanding />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </div>
    </Router>
  );
}