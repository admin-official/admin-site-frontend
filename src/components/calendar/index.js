/* eslint-disable max-len */
/* eslint-disable prefer-const */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable operator-linebreak */
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import * as Styled from './styled';
import { deleteToDo, fetchToDoList } from '../../api';

const DeleteBtn = styled.button`
    background-color: white;
    border: none;
`;
function CalendarComponent({ date }) {
    const [toDoList, setToDoList] = useState([]);
    const today = date;
    const startWeek = today.clone().startOf('month').week();
    const endWeek =
        today.clone().endOf('month').week() === 1 ? 53 : today.clone().endOf('month').week();
    const calendar = [];

    useEffect(() => {
        fetchToDoList(date, setToDoList);
    }, [date]);

    for (let week = startWeek; week <= endWeek; week += 1) {
        calendar.push(
            Array(7)
                .fill(0)
                .map((n, i) => {
                    const current = today.clone().week(week).startOf('week').add(i, 'day');
                    const dayOfMonth = current.format('D');
                    const month = current.format('M');
                    const prev = dayOfMonth > 10 && week === startWeek;
                    const next = dayOfMonth < 10 && week === endWeek;
                    const titles = toDoList.filter(
                        (item) =>
                            item.startDate.dayOfMonth === dayOfMonth &&
                            item.startDate.month === month,
                    );
                    return (
                        <Styled.DayBox key={current.format('D')} prev={prev || next}>
                            <div className='day'>{current.format('D')}</div>
                            {titles.map((item) => (
                                <div className='toDo' key={item.id}>
                                    <DeleteBtn type='button' onClick={deleteToDo} id={item.id}>
                                        {item.title}
                                    </DeleteBtn>
                                </div>
                            ))}
                        </Styled.DayBox>
                    );
                }),
        );
    }
    return calendar;
}

export default CalendarComponent;
