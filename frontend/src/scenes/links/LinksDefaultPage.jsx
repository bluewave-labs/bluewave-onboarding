import CreateActivityButton from "../../components/Button/CreateActivityButton/CreateActivityButton"
import HomePageTemplate from "../../templates/HomePageTemplate"
import { ACTIVITY_TYPES } from "../../data/CreateActivityButtonData";
import ParagraphCSS from "../../components/ParagraphCSS/ParagraphCSS";

const LinksDefaultPage = () => {
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
                <CreateActivityButton type={ACTIVITY_TYPES.HELPERLINKS} />
            </div>

        </HomePageTemplate>
    )
}

export default LinksDefaultPage

