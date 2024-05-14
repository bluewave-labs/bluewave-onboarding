import { useState } from "react";
import Sidebar from "./Sidebar";
import Dashboard from '../dashboard';
import Header from "../../components/Header";
import Footer from "./Footer";

const Home = () => {
    return (
        <div className="app">
            <Header className="header" title="DASHBOARD" subtitle="Welcome to your dashboard" />
            <div className="content">
                <Sidebar className="sidebar"/>
                <Dashboard className="dashboard" />
            </div>
            <Footer />
        </div>
    );
};

export default Home;
