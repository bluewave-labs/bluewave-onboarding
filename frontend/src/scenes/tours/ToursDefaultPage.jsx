import CreateActivityButton from "../../components/CreateActivityButton/CreateActivityButton"
import HomePageTemplate from "../../components/templates/HomePageTemplate"
import { ACTIVITY_TYPES } from "../../data/CreateActivityButtonData";
import ParagraphCSS from "../../components/ParagraphCSS/ParagraphCSS";

const ToursDefaultPage = () => {
    const style = {
        "display": "flex",
        "flex-direction": "column",
        "width": "100%",
        "height": "100%",
        "justify-content": "center",
        "align-items": "center",
    }
    return (
        <HomePageTemplate>
            <div style={style}>
                <ParagraphCSS />
                <CreateActivityButton type={ACTIVITY_TYPES.TOURS} />
            </div>

        </HomePageTemplate>
    )
}

export default ToursDefaultPage

