import HomePageTemplate from '../../components/templates/HomePageTemplate';
import "./Home.css"
const Home = () => {

    return (
        <div className="app">
            <div className="content">
                <HomePageTemplate>
                </HomePageTemplate>

                

                    {/* <Box display="flex" justifyContent="space-between" alignItems="center">        
                        <DataTable dasta={demoData} />
                    </Box> */}
            </div>
        </div>
    );
};

export default Home;
