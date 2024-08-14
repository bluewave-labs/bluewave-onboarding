import CreateActivityButton from "../../components/CreateActivityButton/CreateActivityButton"
import HomePageTemplate from "../../components/templates/HomePageTemplate"
import { ACTIVITY_TYPES } from "../../data/CreateActivityButtonData";
import ParagraphCSS from "../../components/ParagraphCSS/ParagraphCSS";
import { useNavigate } from 'react-router-dom';

const BannerDefaultPage = () => {
    const navigate = useNavigate();
    const style = {
        "display": "flex",
        "flex-direction": "column",
        "width": "100%",
        "justify-content": "center",
        "align-items": "center",
    }
    
    return (
        <HomePageTemplate>
            <div style={style}>
                <ParagraphCSS />
                <CreateActivityButton type={ACTIVITY_TYPES.BANNERS}  onClick={() => navigate('/banner/create')}/>
            </div>

        </HomePageTemplate>
    )
}

export default BannerDefaultPage