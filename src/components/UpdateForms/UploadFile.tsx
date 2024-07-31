import React, {useCallback} from 'react';
import {useDropzone} from 'react-dropzone';

type UploadFileZoneProps = {
    onFileUpload?: (file: File) => void,
    name?: string,
};

const UploadFileZone = ({onFileUpload, name}: UploadFileZoneProps) => {
    const onDrop = useCallback((acceptedFiles: File[]) => {
        const file: File = acceptedFiles[0];
        if (onFileUpload) {
            onFileUpload(file);
        }
    }, [onFileUpload]);

    const {getRootProps, getInputProps} = useDropzone({onDrop});

    return (
        <div {...getRootProps()} style={{border: '2px dashed #007bff', padding: '20px', textAlign: 'center'}}>
            <input {...getInputProps()} name={name}/>
            <p>Drag and drop file here :)</p>
        </div>
    );
};

export default UploadFileZone;
