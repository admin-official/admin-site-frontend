import React from 'react';
import { useRecoilValue } from 'recoil';
import { modalVisibleState } from '../../atoms';
import * as PageStyled from '../pageStyled';

function Board() {
    const modalVisible = useRecoilValue(modalVisibleState);
    return (
        <PageStyled.Container modalVisible={modalVisible}>
            <div className='inner'>Board</div>
        </PageStyled.Container>
    );
}

export default Board;
