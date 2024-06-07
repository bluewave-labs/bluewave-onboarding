import HomePageTemplate from '../../components/templates/HomePageTemplate';
import Dashboard from '../dashboard';
import Logo from '../../components/Logo/Logo';
import LogoBW from '../../assets/logo/introflow_logo_bw.svg'; 
import "./Home.css"

const Home = () => {
    const logo = {
        src: LogoBW,
        alt: 'Introflow logo',
        className: 'logo-item',
      };
    

    return (
        <div className="app">
            <Logo logo={logo} /> 
            <div className="content">
                <HomePageTemplate>
                    <Dashboard />
                </HomePageTemplate>
            </div>
        </div>
    );
};

export default Home;
