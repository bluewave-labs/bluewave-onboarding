import CreateActivityButton from "../../components/Button/CreateActivityButton/CreateActivityButton"
import { ACTIVITY_TYPES } from "../../data/createActivityButtonData";
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
            <div style={style}>
                <ParagraphCSS />
                <CreateActivityButton type={ACTIVITY_TYPES.HELPERLINKS} />
            </div>
    )
}

export default LinksDefaultPage

