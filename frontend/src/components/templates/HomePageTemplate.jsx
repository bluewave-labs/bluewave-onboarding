
import LeftMenu from "../../components/LeftMenu/LeftMenu";
import Header from "../Header/Header";
import "./HomePageTemplate.css"

const HomePageTemplate = ({ children }) => {  
    const user = {
        name: 'John Doe',
        role: 'Administrator',
      };

    return (
        <div className="container">
            <Header user={user} />
            <div className="content-container">
                <LeftMenu className="sidebar"/>
                {children} 
                {/* some content */}
            </div>
        </div>
    );
};

export default HomePageTemplate;