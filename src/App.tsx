import { Route, Routes } from "react-router-dom";
import "@/App.css";
import { Concerts } from "@/pages/Concerts";
import Artists from "./pages/Artists";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/concerts" element={<Concerts />} />
        <Route path="/artists" element={<Artists />} />
      </Routes>
    </div>
  );
}

export default App;
