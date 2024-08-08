import styles from './PopupPreview.module.scss'
import { React } from 'react';
import RichTextEditor from '../../RichTextEditor/RichTextEditor';
import CustomTextField from '../../TextFieldComponents/CustomTextField/CustomTextField';

const PopupPreview = (
    {
        isContent = true,
        header = '',
        content = '',
        setContent,
        setHeader,
        setIsContent
    }) => {
    const editor = (
        <>
            <RichTextEditor
                header={header}
                content={content}
                setHeader={setHeader}
                setContent={setContent}
            />
        </>
    );

    return (<div className={styles.container}>
        {editor}
    </div>)
}

export default PopupPreview