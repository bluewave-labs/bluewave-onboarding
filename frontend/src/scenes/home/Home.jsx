import HomePageTemplate from '../../components/templates/HomePageTemplate';
import PopUpMessages from '../../components/PopUpMessages/PopUpMessages';
import "./Home.css"
import Settings from '../../components/Settings/Settings';
const Home = () => {

    return (
        <div className="app">
            <div className="content">
                <HomePageTemplate>
                    <PopUpMessages/>
                </HomePageTemplate>
                

                    {/* <Box display="flex" justifyContent="space-between" alignItems="center">        
                        <DataTable dasta={demoData} />
                    </Box> */}
            </div>
        </div>
    );
};

export default Home;
