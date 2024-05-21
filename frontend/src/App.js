import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Buttons from "./components/Button";
import SwitchToggle from "./components/SwitchToggle";
import Checkbox from "./components/CheckBox";
import ButtonGroup from "./components/ButtonGroup";
import CheckIcons from "./components/CheckIcons";
import ProgressBar from "./components/ProgressBar/ProgressBar";
import RadioButton from "./components/Radio/RadioButton";
import { Avatar } from "@mui/material";


function App() {
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <div>
      <Sidebar isSidebar={isSidebar} />
      <main className="content">
        {/* <Topbar setIsSidebar={setIsSidebar} /> */}
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/buttons" element={<Buttons />} />
          <Route path="/toggle" element={<SwitchToggle />} />
          <Route path="/checkbox" element={<Checkbox />} />
          <Route path="/buttongroup" element={<ButtonGroup />} />
          <Route path="/checkicons" element={<CheckIcons />} />
          <Route path="/progressbar" element={<ProgressBar/>} />
          <Route path="/radio" element={<RadioButton/>} />
          <Route path="/avatar" element={<Avatar/>}/>
        </Routes>
      </main>
    </div>
  );
}

export default App;
