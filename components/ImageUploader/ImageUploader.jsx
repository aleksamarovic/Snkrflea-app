// core
import React, { useEffect } from 'react'

// library
import ImageUploading from 'react-images-uploading';

// assets
import styles from './ImageUploader.module.scss'

const emptyArray = [0, 1, 2, 3];
export const ImageUploader = ({list = [], onChange, onDelete, update = false}) => {
    const [loading, setLoading] = React.useState(false);
    const [images, setImages] = React.useState(null);
    const maxNumber = 4;

    useEffect(() => {
        setImages(list);
        setLoading(false);
    }, [list]);

    return <label>
        <span>Photos</span>
        <ul className={styles.description}>
            <li>Drag or drop to upload photos</li>
            <li>Drag photos to reorder</li>
        </ul>
        <ImageUploading
            multiple
            value={images ? images : []}
            onChange={(imageList, addUpdateIndex) => {
                onChange(imageList, addUpdateIndex);
                setLoading(true);
            }}
            maxNumber={maxNumber}
            dataURLKey="url">
            {({
                  imageList,
                  onImageUpload,
                  onImageRemove,
                  isDragging,
                  dragProps,
              }) => (

                // write your building UI
                <div className={styles.imageUploader}>
                    {loading ? <div className={styles.loading}>
                        <div className={styles.loader}>Loading...</div>
                    </div> : null}
                    <button type='button' className={styles.dragAndDropZone}
                            style={isDragging ? {color: 'red'} : undefined}
                            onClick={onImageUpload}
                            {...dragProps}
                    >
                        Drag and drop here
                    </button>
                    <div className={styles.imageList}>
                        {imageList.map((image, index) => (
                            <div key={index} className={styles.imageItem}>
                                <img src={image['url']} alt="" width="100" />
                                <div className="image-item__btn-wrapper">
                                    {update ? <span className={styles.removeImageItem} onClick={() => {
                                        setLoading(true);
                                        onDelete(index)
                                    }} /> : <span className={styles.removeImageItem}
                                                  onClick={() => onImageRemove(index)} />}
                                </div>
                            </div>
                        ))}
                        {emptyArray.map((item) => (
                            <div key={item} className={styles.imageItem}>
                                <div className="image-item__btn-wrapper" />
                            </div>
                        )).slice(0, (emptyArray.length - imageList.length))}
                    </div>

                </div>
            )}
        </ImageUploading>
    </label>
};
