import React, { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { deleteQuestionComment, modifyQuestionComment } from '../../../../../../../../api';

function Comment({ qId, item }) {
    const queryClient = useQueryClient();
    const [userEmail, setUserEmail] = useState('');
    const lastDate = item.modifiedAt.split(/T|-|[.]/);
    const [isModified, setIsModified] = useState(false);
    const [modifiedValue, setModifiedValue] = useState(item.comment);

    useEffect(() => {
        if (localStorage.getItem('user')) {
            setUserEmail(JSON.parse(localStorage.getItem('user')).email);
        }
    }, []);

    const deleteMutation = useMutation((ids) => deleteQuestionComment(ids[0], ids[1]), {
        onSuccess: () => {
            queryClient.invalidateQueries('qna', { id: qId });
        },
    });

    const modifyMutation = useMutation(
        (datas) => modifyQuestionComment(datas[0], datas[1], datas[2]),
        {
            onSuccess: () => {
                queryClient.invalidateQueries('qna', { id: qId });
            },
        },
    );

    const onSubmit = (datas) => {
        const dataToSubmit = {
            comment: datas[0],
        };
        modifyMutation.mutate([dataToSubmit, datas[1], datas[2]], {
            onSuccess: () => {
                alert('λκΈ μμ !');
                setIsModified(false);
            },
        });
    };

    return (
        <div className='wrap_container'>
            <div className='comment_container'>
                <div className='comment_title_container'>
                    <span className='comment_title_author_infor'>{`${item.authorName}`}</span>
                </div>
                {!isModified ? (
                    <div className='content'>{item.comment}</div>
                ) : (
                    <textarea
                        className='input_comment_modify'
                        value={modifiedValue}
                        onChange={(event) => setModifiedValue(event.target.value)}
                    />
                )}
                <span className='comment_title_date_infor'>{`${lastDate[0]}λ ${lastDate[1]}μ ${lastDate[2]}μΌ ${lastDate[3]}`}</span>
            </div>
            <div>
                {userEmail === item.authorId && (
                    !isModified ? (
                        <div className='comment_btn_container'>
                            <span
                                className='comment_modify_btn'
                                aria-hidden='true'
                                onClick={() => setIsModified(true)}
                            >
                                μμ 
                            </span>
                            <span
                                className='comment_delete_btn'
                                aria-hidden='true'
                                onClick={() => {
                                    deleteMutation.mutate([qId, item.id], {
                                        onSuccess: () => {
                                            alert('λκΈ μ­μ !');
                                        },
                                    });
                                }}
                            >
                                μ­μ 
                            </span>
                        </div>
                    ) : (
                        <div className='comment_btn_container'>
                            <span
                                className='comment_modify_upload_btn'
                                aria-hidden='true'
                                onClick={() => onSubmit([modifiedValue, qId, item.id])}
                            >
                                λ±λ‘
                            </span>
                        </div>
                    ))}
            </div>
        </div>
    );
}

export default Comment;
