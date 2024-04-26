import { Route, Routes } from "react-router-dom";
import "@/App.css";
import { Concerts } from "@/pages/concerts/Concerts";
import Artists from "./pages/Artists";
import PopupStore from "@/pages/PopupStore";
import Confirm from "@/pages/concerts/Confirm";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/concerts" element={<Concerts />} />
        <Route path="/concerts/confirm" element={<Confirm />} />
        <Route path="/artists" element={<Artists />} />
        <Route path="/popup-stores" element={<PopupStore />} />
      </Routes>
    </div>
  );
}

export default App;
