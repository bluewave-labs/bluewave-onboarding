import HomePageTemplate from '../../components/templates/HomePageTemplate';
import Dashboard from '../dashboard/Dashboard';
import "./Home.css"

const Home = () => {
    const logo = {
        src: LogoBW,
        alt: 'Introflow logo',
        className: 'logo-item',
      };
      
    return (
        <div className="app">
            <div className="content">
                <HomePageTemplate>
                    <Dashboard username={'Gorkem'}/>
                </HomePageTemplate>
            </div>
        </div>
    );
};

export default Home;
