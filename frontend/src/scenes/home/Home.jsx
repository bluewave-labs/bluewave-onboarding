import HomePageTemplate from '../../components/templates/HomePageTemplate';
import Dashboard from '../dashboard';
import Logo from '../../components/Logo/Logo';
import LogoBW from '../../assets/logo/introflow_logo_bw.svg'; 
import "./Home.css"

const Home = () => {
  return (
        <div className="app">
            <div className="content">
                <HomePageTemplate>
                    <Dashboard />
                </HomePageTemplate>
            </div>
        </div>
    );
};

export default Home;
