import React from 'react';
import { useRecoilValue } from 'recoil';
import { modalVisibleState } from '../../atoms';
import * as PageStyled from '../pageStyled';
import Title from '../../components/layout/title';
import GalleryContent from '../../components/layout/contents/gallery';

function Gallery() {
    const modalVisible = useRecoilValue(modalVisibleState);
    return (
        <PageStyled.Container modalVisible={modalVisible}>
            <div className='inner'>
                <Title title='📷 갤러리' description='ADMIN 역사 보관소' />
                <GalleryContent />
            </div>
        </PageStyled.Container>
    );
}

export default Gallery;
