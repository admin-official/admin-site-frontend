import React from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { modalVisibleState } from '../../../atoms';
import * as PageStyled from '../../pageStyled';
import Title from '../../../components/layout/title';
import QnADetailContent from '../../../components/layout/contents/qna/detail';

function QnADetail() {
    const { id } = useParams();
    const modalVisible = useRecoilValue(modalVisibleState);

    return (
        <PageStyled.Container modalVisible={modalVisible}>
            <div className='inner'>
                <QnADetailContent id={id} />
            </div>
        </PageStyled.Container>
    );
}

export default QnADetail;
