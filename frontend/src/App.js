import { useState } from "react";
import { Routes, Route } from "react-router-dom";
// import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Logos from "./components/Logos";
import TextEditor from "./TextEditor";


function App() {
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <div className="app">
      <Sidebar isSidebar={isSidebar} />
          <main className="content">
            {/* <Topbar setIsSidebar={setIsSidebar} /> */}
            <Routes>
              <Route path="/" element={<Dashboard />} />   
               <barChart />
            <lineChart /> 
            <ToolTip />
            <Logos />
            <TextEditor />
            </Routes>
          </main>
    </div>
  );
}

export default App;
