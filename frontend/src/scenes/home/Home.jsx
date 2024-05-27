import HomePageTemplate from '../../components/templates/HomePageTemplate';
import Dashboard from '../dashboard';
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
