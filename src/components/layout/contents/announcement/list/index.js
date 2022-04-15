/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-case-declarations */
/* eslint-disable consistent-return */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable indent */
import * as React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../../../../images/logo/admin_logo.png';
import Paging from '../../../paging';
import * as Styled from './styled';
import { useAnnouncements } from '../../../../../api';

function AnnouncementList() {
    const [currentPage, setCurrentPage] = React.useState(0);
    const { status, data, error } = useAnnouncements(currentPage, 6);

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
                        <Styled.FlexContainer>
                            {data.data.map((item) => {
                                const date = item.lastModifiedAt.split(/T|-|[.]/);
                                return (
                                    <li className='item_card' key={item.id}>
                                        <div className='wrap_container'>
                                            <div className='announcement_title'>
                                                <Link to={`/announcement/${item.id}`}>
                                                    {item.title.length > 10
                                                        ? `${item.title.substr(0, 10)}...`
                                                        : item.title}
                                                </Link>
                                            </div>
                                            <div className='announcement_content'>
                                                {item.content.length > 20
                                                    ? `${item.content.substr(0, 20)}...`
                                                    : item.content}
                                            </div>
                                            <div className='same'>
                                                <span className='announcement_date'>{`${date[0]}년 ${date[1]}월 ${date[2]}일 ${date[3]}`}</span>
                                                <span className='announcement_author_name'>{`작성자 ${item.authorName}`}</span>
                                            </div>
                                            {item.content.includes(
                                                'https://d260rb3auh0wa7.cloudfront.net/file/',
                                            ) ? (
                                                <img
                                                    className='item_img'
                                                    alt='image_alt'
                                                    src={item.content.substring(
                                                        item.content.indexOf(
                                                            'https://d260rb3auh0wa7.cloudfront.net/file/',
                                                        ),
                                                        item.content.indexOf(
                                                            ')',
                                                            item.content.indexOf(
                                                                'https://d260rb3auh0wa7.cloudfront.net/file/',
                                                            ),
                                                        ),
                                                    )}
                                                />
                                            ) : (
                                                <img
                                                    className='item_img'
                                                    alt='admin_logo'
                                                    src={Logo}
                                                />
                                            )}
                                        </div>
                                    </li>
                                );
                            })}
                        </Styled.FlexContainer>
                        <Paging
                            currentPage={currentPage + 1}
                            setCurrentPage={setCurrentPage}
                            totalCount={data.pageInfo.totalElements}
                            pageSize={data.pageInfo.pageSize}
                        />
                    </>
                );
        }
    }, [status, data]);

    return <Styled.Container>{renderByStatus()}</Styled.Container>;
}

export default AnnouncementList;
