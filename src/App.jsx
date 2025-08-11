import { useState } from "react";
import Home from "./pages/Home/Home";
import "./App.css";
import "./components/ui/QRModal/QRModal.scss"

function App() {
  const [count, setCount] = useState(0);

  return <Home />;
}

export default App;
