/* eslint-disable no-return-assign */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-unused-expressions */
/* eslint-disable operator-linebreak */
import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';

import Prism from 'prismjs';
import 'prismjs/themes/prism.css';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';

import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';

import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';

import * as Styled from './styled';
import { postAnnouncement, uploadFiles } from '../../../../../api';
import FileUploadModal from '../../../fileuploadmodal';

function AnnouncementUploadContent() {
    const queryClient = useQueryClient();
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    const [fileUploadModalVisible, setFileUploadModalVisible] = React.useState(false);
    const [newlyAddedFiles, setNewlyAddedFiles] = React.useState([]);
    // console.log(newlyAddedFiles);
    const editorRef = React.useRef();
    React.useEffect(() => {
        if (editorRef.current) {
            editorRef.current.getInstance().removeHook('addImageBlobHook');
            editorRef.current.getInstance().addHook('addImageBlobHook', (blob, callback) => {
                (async () => {
                    const formData = new FormData();
                    formData.append('files', blob);

                    const url = await uploadFiles(formData);
                    callback(url.data[0].fileUrl, `alt ${url.data[0].fileName}`);
                })();

                return false;
            });
        }

        return () => {};
    }, [editorRef]);

    const uploadMutation = useMutation((submitData) => postAnnouncement(submitData), {
        onSuccess: () => {
            queryClient.invalidateQueries('announcements');
        },
    });

    const onSubmit = (data) => {
        const submitData = {
            title: data.title,
            content: editorRef.current.getInstance().getMarkdown(),
            files: newlyAddedFiles,
        };
        // newlyAddedFiles.length && submitData.files = newlyAddedFiles;
        uploadMutation.mutate(submitData, {
            onSuccess: () => {
                navigate('/announcement');
            },
        });
    };

    const onError = (error) => {
        if (error.title) {
            alert(error.title.message);
        }
    };

    return (
        <Styled.Container>
            {fileUploadModalVisible && (
                <FileUploadModal
                    setFileUploadModalVisible={setFileUploadModalVisible}
                    setNewlyAddedFiles={setNewlyAddedFiles}
                />
            )}
            <form encType='multipart/form-data' onSubmit={handleSubmit(onSubmit, onError)}>
                <input
                    {...register('title', { required: '제목을 입력해주세요.' })}
                    placeholder='제목을 입력해주세요.'
                    className='title_input'
                />
                {/* <input
                    type='file'
                    multiple
                    accept='파일 확장자'
                    {...register('file')}
                    className='file_input'
                /> */}
                <span
                    className='add_file_btn'
                    aria-hidden='true'
                    onClick={() => {
                        setFileUploadModalVisible(!fileUploadModalVisible);
                    }}
                >
                    파일 첨부
                </span>
                <div className='content_input'>
                    <Editor
                        placeholder='내용을 입력해주세요.'
                        previewStyle='tab'
                        plugins={[colorSyntax, [codeSyntaxHighlight, { highlighter: Prism }]]}
                        ref={editorRef}
                        height='500px'
                    />
                </div>
                <div className='btn_container'>
                    <input type='submit' value='올리기' className='submit_btn' />
                    <span
                        className='back_btn'
                        aria-hidden='true'
                        onClick={() => {
                            navigate(-1);
                        }}
                    >
                        취소
                    </span>
                </div>
            </form>
        </Styled.Container>
    );
}

export default AnnouncementUploadContent;
