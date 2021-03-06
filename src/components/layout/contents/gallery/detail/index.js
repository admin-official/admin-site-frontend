/* eslint-disable react/jsx-curly-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable react/no-children-prop */
/* eslint-disable react/button-has-type */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-case-declarations */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable indent */
/* eslint-disable consistent-return */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';
import { AiOutlineFile } from 'react-icons/ai';
import { Viewer } from '@toast-ui/react-editor';

import * as Styled from '../../detailStyled';
import { useGalleryDetail, deleteGallery, downloadFile } from '../../../../../api';

const authList = ['임원', '회장', '관리자'];

function GalleryDetailContent(id) {
    const fileId = React.useRef(0);
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { status, data, error, isFetching } = useGalleryDetail(id.id);
    const viewerRef = React.useRef(null);
    const deleteMutation = useMutation((deleteID) => deleteGallery(deleteID), {
        onSuccess: () => {
            queryClient.invalidateQueries('galleries');
        },
    });

    const [role, setRole] = React.useState('');
    React.useEffect(() => {
        if (localStorage.getItem('user')) {
            setRole(JSON.parse(localStorage.getItem('user')).role);
        }
    }, []);

    React.useEffect(() => {
        const instance = viewerRef?.current?.getInstance();
        data?.data?.content && instance.setMarkdown(data.data.content);
    }, [data?.data?.content]);

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
                const date = data.data.lastModifiedAt.split(/T|-|[.]/);
                return (
                    <>
                        {authList.includes(role) && (
                            <div className='btn_container'>
                                <span
                                    className='modify_btn'
                                    aria-hidden='true'
                                    onClick={() => {
                                        navigate(`/gallery/modify/${id.id}`);
                                    }}
                                >
                                    수정
                                </span>
                                <span
                                    className='delete_btn'
                                    aria-hidden='true'
                                    onClick={() => {
                                        deleteMutation.mutate(id.id, {
                                            onSuccess: () => {
                                                navigate('/gallery');
                                            },
                                        });
                                    }}
                                >
                                    삭제
                                </span>
                            </div>
                        )}
                        <div className='detail_title'>
                            <div className='detail_title1'>{`${date[0]}년 ${date[1]}월 ${date[2]}일 ${date[3]} | ${data.data.authorName}`}</div>
                            <div className='detail_title2'>{data.data.title}</div>
                        </div>
                        <div className='detail_content'>
                            <div className='content'>
                                <Viewer ref={viewerRef} />
                            </div>
                            {data.data.files.length !== 0 && (
                                <div className='download_file_btn_container'>
                                    {data.data.files.map((item) => {
                                        fileId.current += 1;
                                        return (
                                            <div>
                                                <AiOutlineFile />
                                                <span
                                                    className='download_file_btn'
                                                    aria-hidden='true'
                                                    key={fileId.current}
                                                    onClick={() =>
                                                        downloadFile(item.fileUrl, item.fileName)
                                                    }
                                                >
                                                    {item.fileName}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                            <span
                                className='back_btn'
                                aria-hidden='true'
                                onClick={() => {
                                    navigate('/gallery');
                                }}
                            >
                                목록 보기
                            </span>
                        </div>
                        {isFetching && <div>Background Updating...</div>}
                    </>
                );
        }
    }, [status, isFetching]);

    return <Styled.Container>{renderByStatus()}</Styled.Container>;
}

export default GalleryDetailContent;
