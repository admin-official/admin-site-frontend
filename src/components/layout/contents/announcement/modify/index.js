/* eslint-disable arrow-body-style */
/* eslint-disable function-paren-newline */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable indent */
/* eslint-disable consistent-return */
/* eslint-disable react/destructuring-assignment */
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
import { useAnnouncementDetail, modifyAnnouncement, uploadFiles } from '../../../../../api';

function AnnouncementUploadContent(id) {
    const queryClient = useQueryClient();
    const { status, data, error, isFetching } = useAnnouncementDetail(id.id);
    const { register, handleSubmit } = useForm({
        defaultValues: {
            title: data.data.title,
        },
    });
    const navigate = useNavigate();

    const editorRef = React.useRef();
    React.useEffect(() => {
        if (editorRef.current) {
            editorRef.current.getInstance().removeHook('addImageBlobHook');
            editorRef.current.getInstance().addHook('addImageBlobHook', (blob, callback) => {
                (async () => {
                    const formData = new FormData();
                    formData.append('image', blob);

                    const url = await uploadFiles(formData);
                    callback(url.data[0].fileUrl, `alt ${url.data[0].fileName}`);
                })();

                return false;
            });
        }

        return () => {};
    }, [editorRef]);

    const modifyMutation = useMutation(
        (formData) => {
            modifyAnnouncement(formData, id.id);
        },
        {
            onSuccess: () => {
                return (
                    queryClient.invalidateQueries('announcements'),
                    queryClient.invalidateQueries(['announcement', { id: id.id }])
                );
            },
        },
    );

    const onSubmit = (value) => {
        const formData = new FormData();
        value.file.length &&
            Object.values(value.file).map((file) => formData.append('files', file));
        data.data.files.length &&
            Object.values(data.data.files).map((file) =>
                formData.append('deleteFileUrls', file.fileUrl),
            );
        formData.append('title', value.title);
        formData.append('content', editorRef.current.getInstance().getMarkdown());
        modifyMutation.mutate(formData, {
            onSuccess: () => {
                navigate(`/announcement/${id.id}`, { replace: true });
            },
        });
    };

    const onError = (err) => {
        if (err.title) {
            alert(err.title.message);
        }
    };

    const renderByStatus = React.useCallback(() => {
        switch (status) {
            case 'loading':
                return <div>Loading...</div>;
            case 'error':
                if (error instanceof Error) {
                    return <div>Error: {error.message}</div>;
                }
                break;
            default:
                return (
                    <>
                        <form
                            encType='multipart/form-data'
                            onSubmit={handleSubmit(onSubmit, onError)}
                        >
                            <input
                                {...register('title', { required: '제목을 입력해주세요.' })}
                                placeholder='제목을 입력해주세요.'
                                className='title_input'
                            />
                            <input
                                type='file'
                                multiple
                                accept='파일 확장자'
                                {...register('file')}
                                className='file_input'
                            />
                            <div className='content_input'>
                                <Editor
                                    placeholder='내용을 입력해주세요.'
                                    initialValue={data.data.content}
                                    previewStyle='tab'
                                    plugins={[
                                        colorSyntax,
                                        [codeSyntaxHighlight, { highlighter: Prism }],
                                    ]}
                                    ref={editorRef}
                                    height='500px'
                                />
                            </div>
                            <div className='btn_container'>
                                <input type='submit' value='수정' className='submit_btn' />
                                <span
                                    className='back_btn'
                                    aria-hidden='true'
                                    onClick={() => {
                                        navigate(`/announcement/${id.id}`);
                                    }}
                                >
                                    취소
                                </span>
                            </div>
                        </form>
                        {isFetching && <div>Background Updating...</div>}
                    </>
                );
        }
    }, [status, isFetching]);

    return <Styled.Container>{renderByStatus()}</Styled.Container>;
}

export default AnnouncementUploadContent;
