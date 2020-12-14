// core
import React, { useEffect } from 'react'

// library
import { useDropzone } from 'react-dropzone';
import classNames from "classnames";

export const DropZone = ({files, setFiles, updateProduct, maxFiles, avatar = null}) => {

    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        accept: 'image/*',
        maxFiles,
        onDrop: acceptedFiles => {
            setFiles(acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            })));
        }
    });

    const thumbs = files.map(file => (
        updateProduct ? <div key={file.id}>
                <img src={file.url} alt='' />
            </div>
            : <div key={file.name}>
                <img src={file.preview} alt='' />
            </div>
    ));

    useEffect(() => () => {
        // Make sure to revoke the data uris to avoid memory leaks
        files.forEach(file => URL.revokeObjectURL(file.preview));
    }, [files]);

    return (
        <div className={classNames('dropZoneLabel', avatar && 'avatar')}>
            <span>Photos</span>
            <div className='dropZoneInner'>
                {files.length !== 0 && thumbs}
                <div className={classNames('dropZone', files.length !== 0 && 'hidden')} {...getRootProps()}>
                    <input {...getInputProps()} />
                    {isDragActive ?
                        <p className='active'>Drop the files here ...</p> :
                        <div className='active'>Drag or drop to upload photos</div>}
                </div>
            </div>

        </div>
    )
};
