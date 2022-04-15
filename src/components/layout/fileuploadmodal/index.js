/* eslint-disable no-param-reassign */
/* eslint-disable array-callback-return */
/* eslint-disable no-restricted-syntax */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-unused-expressions */
/* eslint-disable operator-linebreak */
import React from 'react';
import { FaTimes } from 'react-icons/fa';
import { RiFileAddLine } from 'react-icons/ri';
import { BsTrash } from 'react-icons/bs';
import * as Styled from './styled';
import { uploadFiles, deleteFile } from '../../../api';

function FileUploadModal({ setFileUploadModalVisible, setNewlyAddedFiles }) {
    const [isDragging, setIsDragging] = React.useState(false);
    const [files, setFiles] = React.useState([]);
    // 각 선택했던 파일들의 고유값 id
    const fileId = React.useRef(0);
    const dragRef = React.useRef(null);
    const onChangeFiles = React.useCallback(
        async (e) => {
            let selectedFiles = [];
            const formData = new FormData();
            let temp = files;

            selectedFiles = e.type === 'change' ? e.target.files : e.dataTransfer.files;

            Object.values(selectedFiles).map((file) => {
                formData.append('files', file);
            });

            const data = await uploadFiles(formData);
            data.data.map((file) => {
                temp = [
                    ...temp,
                    {
                        id: (fileId.current += 1),
                        fileName: file.fileName,
                        fileUrl: file.fileUrl,
                    },
                ];
            });
            setFiles(temp);
        },
        [files],
    );

    const handleDragEnter = React.useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
    }, []);

    const handleDragLeave = React.useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();

        setIsDragging(false);
    }, []);

    const handleDragOver = React.useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();

        if (e.dataTransfer != null && e.dataTransfer.files != null) {
            setIsDragging(true);
        }
    }, []);

    const handleDrop = React.useCallback(
        (e) => {
            e.preventDefault();
            e.stopPropagation();

            onChangeFiles(e);
            setIsDragging(false);
        },
        [onChangeFiles],
    );

    const subscribeDragEvents = React.useCallback(() => {
        dragRef.current !== null &&
            (dragRef.current.addEventListener('dragenter', handleDragEnter),
            dragRef.current.addEventListener('dragleave', handleDragLeave),
            dragRef.current.addEventListener('dragover', handleDragOver),
            dragRef.current.addEventListener('drop', handleDrop));
    }, [handleDragEnter, handleDragLeave, handleDragOver, handleDrop]);

    const unSubscribeDragEvents = React.useCallback(() => {
        dragRef.current !== null &&
            (dragRef.current.removeEventListener('dragenter', handleDragEnter),
            dragRef.current.removeEventListener('dragleave', handleDragLeave),
            dragRef.current.removeEventListener('dragover', handleDragOver),
            dragRef.current.removeEventListener('drop', handleDrop));
    }, [handleDragEnter, handleDragLeave, handleDragOver, handleDrop]);

    React.useEffect(() => {
        subscribeDragEvents();
        return () => unSubscribeDragEvents();
    }, [subscribeDragEvents, unSubscribeDragEvents]);

    const handleDeleteFile = React.useCallback(
        (id) => {
            // setFiles(files.filter((file) => file.id !== id));
            files.map((file) => {
                if (file.id === id) {
                    console.log(file);
                    // deleteFile({
                    //     deleteFileUrls: [
                    //         {
                    //             fileName: file.fileName,
                    //             fileUrl: file.fileUrl,
                    //         },
                    //     ],
                    // });
                    deleteFile({
                        deleteFileUrls: [
                            {
                                fileName: '스크린샷 2022-04-16 오전 12.22.54.png',
                                fileUrl:
                                    'https://d260rb3auh0wa7.cloudfront.net/file/dc262af3-fef6-49ac-9fbb-bf4ce3afa27e',
                            },
                        ],
                    });
                }
            });
        },
        [files],
    );

    React.useEffect(() => {
        document.body.style.cssText = `
          position: fixed; 
          top: -${window.scrollY}px;
          overflow-y: scroll;
          width: 100%;`;
        return () => {
            const scrollY = document.body.style.top;
            document.body.style.cssText = '';
            window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
        };
    }, []);

    return (
        <Styled.Container>
            <Styled.Background onClick={() => setFileUploadModalVisible(false)} />
            <Styled.ModalContainer>
                <div className='modal_header'>
                    <div>파일 첨부</div>
                    <div onClick={() => setFileUploadModalVisible(false)} aria-hidden='true'>
                        <FaTimes size={25} />
                    </div>
                </div>
                <div className='modal_body'>
                    <input
                        type='file'
                        accept='파일 확장자'
                        id='fileUpload'
                        style={{ display: 'none' }}
                        multiple
                        onChange={onChangeFiles}
                    />
                    <label className='file_label' htmlFor='fileUpload' ref={dragRef}>
                        <RiFileAddLine size={30} />
                        <div>마우스로 업로드 할 컨텐츠 드래그 또는 클릭하여 파일 선택</div>
                    </label>
                    <div className='uploaded_file_container'>
                        {files.length > 0 &&
                            files.map((file) => {
                                const { id, fileName } = file;
                                return (
                                    <div className='uploaded_file' key={id}>
                                        <span>{fileName}</span>
                                        <BsTrash
                                            onClick={() => {
                                                handleDeleteFile(id);
                                            }}
                                        />
                                    </div>
                                );
                            })}
                    </div>
                </div>
                <div className='modal_footer'>
                    <span
                        className='save_btn'
                        aria-hidden='true'
                        onClick={() => {
                            files.map((file) => {
                                delete file.id;
                            });
                            setNewlyAddedFiles(files);
                            setFileUploadModalVisible(false);
                        }}
                    >
                        저장
                    </span>
                    <span
                        className='close_btn'
                        aria-hidden='true'
                        onClick={() => {
                            setFileUploadModalVisible(false);
                        }}
                    >
                        닫기
                    </span>
                </div>
            </Styled.ModalContainer>
        </Styled.Container>
    );
}

export default FileUploadModal;
