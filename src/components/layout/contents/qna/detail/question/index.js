import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Viewer } from '@toast-ui/react-editor';
import { useMutation, useQueryClient } from 'react-query';
import { AiOutlineFile } from 'react-icons/ai';
import Comments from './comments';
import * as Styled from './styled';
import { deleteQuestion, downloadFile } from '../../../../../../api';

function QnAQuestionContent(props) {
    const fileId = React.useRef(0);
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { id, authorEmail, authorName, title, content, date, files, comments } = props;
    const lastDate = date.split(/T|-|[.]/);
    const viewerRef = useRef();

    const deleteMutation = useMutation((deleteID) => deleteQuestion(deleteID), {
        onSuccess: () => {
            queryClient.invalidateQueries('qnas');
        },
    });

    const [userEmail, setUserEmail] = useState('');
    useEffect(() => {
        if (localStorage.getItem('user')) {
            setUserEmail(JSON.parse(localStorage.getItem('user')).email);
        }
    }, []);

    useEffect(() => {
        console.log(viewerRef.current);
        const instance = viewerRef.current.getInstance();
        instance.setMarkdown(content);
    }, [content]);

    return (
        <Styled.Container>
            <div className='wrap_container'>
                <div className='detail_title_container'>
                    <div className='q_marker'>Q</div>
                    <div className='detail_title'>
                        {title}
                        <div className='detail_author'>
                            <span className='detail_title2_author_infor'>{`${authorName} | ${authorEmail}`}</span>
                            <span className='detail_title2_date_infor'>{`${lastDate[0]}년 ${lastDate[1]}월 ${lastDate[2]}일 ${lastDate[3]}`}</span>
                        </div>
                    </div>
                </div>
                {userEmail === authorEmail && (
                    <div className='btn_container'>
                        <span
                            className='modify_btn'
                            aria-hidden='true'
                            onClick={() => {
                                navigate(`/qna/modify/${id}`, {
                                    state: props,
                                });
                            }}
                        >
                            수정
                        </span>
                        <span
                            className='delete_btn'
                            aria-hidden='true'
                            onClick={() => {
                                deleteMutation.mutate(id, {
                                    onSuccess: () => {
                                        navigate('/qna');
                                    },
                                });
                            }}
                        >
                            삭제
                        </span>
                    </div>
                )}
            </div>
            <div className='questionContent'>
                <Viewer ref={viewerRef} />
            </div>
            <div className='download_file_btn_container'>
                {files.map((item) => {
                    fileId.current += 1;
                    return (
                        <span
                            className='download_file_btn'
                            aria-hidden='true'
                            key={fileId.current}
                            onClick={() => downloadFile(item.fileUrl, item.fileName)}
                        >
                            <AiOutlineFile />
                            {item.fileName}
                        </span>
                    );
                })}
            </div>

            <Comments comments={comments} qId={id} />
        </Styled.Container>
    );
}

export default QnAQuestionContent;
