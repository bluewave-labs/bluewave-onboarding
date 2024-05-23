import HomePageTemplate from '../../components/templates/HomePageTemplate';
import PopUpMessages from '../../components/organisms/PopUpMessages/PopUpMessages';
import "./Home.css"
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
