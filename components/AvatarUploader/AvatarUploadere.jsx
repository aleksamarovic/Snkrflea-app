import styles from './AvatarUploader.module.scss';
import React, { useEffect, useState } from 'react'

export const  AvatarUploader = ({src, onChange }) => {

    const [loading, setLoading] = useState(false);
   
    useEffect(() => {
      setLoading(false);
    },[src])

    const buildFileSelector = () => {
        const fileSelector = document.createElement('input');
        fileSelector.setAttribute('type', 'file');
        fileSelector.setAttribute('multiple', 'multiple');
        return fileSelector;
    }

     const handleFileSelect = (e) => {
        e.preventDefault();
        if(!loading) {
          fileSelector.click();
        }
     }

    const fileSelector = buildFileSelector();

    fileSelector.addEventListener("change", (e) => {
        onChange(e.target.files[0])
        setLoading(true)
    }, false)

    return (<label className={styles.avatarUploader} onClick={handleFileSelect}>
             { loading ? <div className={styles.loading}><div >Loading...</div></div> : null}
             <img src={src}/>
            </label>);
};