import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import NotFound from "./pages/NotFound/NotFound";
import Help from "./pages/Help/Help";
import Reports from "./pages/Reports/Reports";
import FormMechanics from "./pages/Formmechanics/Formmechanics";
import "./App.css";
import "./components/ui/QRModal/QRModal.scss";


const BASENAME = (import.meta.env.BASE_URL || "/").replace(/\/$/, "");

function App() {
  return (
    <Router basename={BASENAME}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/help" element={<Help />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/form-mechanic" element={<FormMechanics />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
