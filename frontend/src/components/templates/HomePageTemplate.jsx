
import LeftMenu from "../../components/organisms/LeftMenu/LeftMenu";
import Header from "../organisms/Header/Header";
import "./HomePageTemplate.css"

const HomePageTemplate = () => {  
    const user = {
        name: 'John Doe',
        role: 'Administrator',
      };

    return (
        <div className="container">
            <Header user={user} />
            <div className="content-container">
                <LeftMenu className="sidebar"/> 
                {/* some content */}
            </div>
        </div>
    );
};

export default HomePageTemplate;