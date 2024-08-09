import CreateActivityButton from "../../components/CreateActivityButton/CreateActivityButton"
import HomePageTemplate from "../../components/templates/HomePageTemplate"
import { ACTIVITY_TYPES } from "../../data/CreateActivityButtonData";
import ParagraphCSS from "../../components/ParagraphCSS/ParagraphCSS";

const HintDefaultPage = () => {
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
                <CreateActivityButton type={ACTIVITY_TYPES.HINTS} />
            </div>

        </HomePageTemplate>
    )
}

export default HintDefaultPage

