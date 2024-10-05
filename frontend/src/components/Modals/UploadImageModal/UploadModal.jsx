import { React, useState, useCallback } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '../../Button/Button';
import styles from './UploadModal.module.scss';
import { useDropzone } from 'react-dropzone';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';

const UploadModal = ({ open, handleClose }) => {

    const [uploadedFile, setUploadedFile] = useState(null);

    const onDrop = useCallback((acceptedFiles) => {
        setUploadedFile(acceptedFiles[0]); // Only allow one file
    }, []);

    const { getRootProps, getInputProps, fileRejections } = useDropzone({
        onDrop,
        maxFiles: 1,
        maxSize: 3 * 1024 * 1024,
        accept: {
            "image/*": [".png", ".jpg"],
        }
    })

    const clearUploadedFile = () => {
        setUploadedFile(null);
    }

    const handleUpload = () => {
        // do something with uploadedFile
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="update-avatar-modal"
        >
            <Box className={styles.uploadBox}>
                <p>Upload Image</p>
                <div className={styles.uploadContainer} {...getRootProps()}>
                    <input {...getInputProps()} />
                    {!uploadedFile &&
                        <>
                            <CloudUploadOutlinedIcon style={{ border: '1px solid #ddd', padding: '0.5rem', borderRadius: '5px' }} />
                            <p><span>Click to upload</span> or drag and drop <br></br>(maximum size: 3MB)</p>
                        </>
                    }
                    {uploadedFile && <p>{uploadedFile.path}</p>}
                </div>
                {fileRejections.map(({ file, errors }) => <p>{
                    errors.map(e => (
                        <p className={styles.errorMessage} key={e.code}>{e.message}</p>
                    ))
                }</p>)}
                <p>Supported formats: JPG, PNG</p>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button buttonType='secondary-grey' text='Edit' />
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <Button disabled={!uploadedFile} onClick={clearUploadedFile} buttonType='secondary-grey' text='Remove' />
                        <Button disabled={!uploadedFile} onClick={handleUpload} text='Update' />
                    </div>
                </div>
            </Box>
        </Modal>
    )
}

export default UploadModal;