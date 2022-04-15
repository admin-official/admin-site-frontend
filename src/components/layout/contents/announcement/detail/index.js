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

import ReactMarkdown from 'react-markdown';

import * as Styled from './styled';
import { useAnnouncementDetail, deleteAnnouncement, downloadFile } from '../../../../../api';

function AnnouncementDetailContent(id) {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { status, data, error, isFetching } = useAnnouncementDetail(id.id);
    const deleteMutation = useMutation((deleteID) => deleteAnnouncement(deleteID), {
        onSuccess: () => {
            queryClient.invalidateQueries('announcements');
        },
    });

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
                        {/* todo: 관리자일 때만 보이게 */}
                        <div className='btn_container'>
                            <span
                                className='modify_btn'
                                aria-hidden='true'
                                onClick={() => {
                                    navigate(`/announcement/modify/${id.id}`);
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
                                            navigate('/announcement');
                                        },
                                    });
                                }}
                            >
                                삭제
                            </span>
                        </div>
                        <div className='detail_title'>
                            <div className='detail_title1'>{`${date[0]}년 ${date[1]}월 ${date[2]}일 ${date[3]} | ${data.data.authorName}`}</div>
                            <div className='detail_title2'>{data.data.title}</div>
                        </div>
                        <div className='detail_content'>
                            <div className='download_file_btn_container'>
                                {data.data.files.map((item) => (
                                    <span
                                        className='download_file_btn'
                                        aria-hidden='true'
                                        key={item.fileUrl}
                                        onClick={() => downloadFile(item.fileUrl, item.fileName)}
                                    >
                                        {item.fileName}
                                    </span>
                                ))}
                            </div>
                            <ReactMarkdown className='content'>{data.data.content}</ReactMarkdown>
                            <span
                                className='back_btn'
                                aria-hidden='true'
                                onClick={() => {
                                    navigate('/announcement');
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

export default AnnouncementDetailContent;