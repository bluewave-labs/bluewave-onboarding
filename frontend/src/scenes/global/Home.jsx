import { useState } from "react";
import Sidebar from "./Sidebar";
import Dashboard from '../dashboard';

const Home = () => {
    const [isSidebar, setIsSidebar] = useState(true);
    return (
        <div className="app">
            <Sidebar isSidebar={isSidebar} />
            <main className="content">
                <Dashboard />
            </main>
        </div>
    );
};

export default Home;
