import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    padding: 60px 0;
    @media screen and (max-width: 1023px) {
        display: flex;
        flex-direction: column-reverse;
    }
`;

export const Logo = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 100px;
    font-weight: 600;
    @media screen and (max-width: 1023px) {
        font-size: 90px;
        margin-bottom: 20px;
    }
    @media screen and (max-width: 767px) {
        font-size: 75px;
        margin-bottom: 20px;
    }
`;

export const Box = styled.div`
    display: flex;
    flex-direction: column;
    border: 1px solid lightgray;
    width: 90%;
    margin: auto;
    padding: 35px 40px;
    border-radius: 16px;
    box-shadow: 0px 0px 15px lightgray;
    @media screen and (max-width: 1023px) {
        width: 70%;
    }
    @media screen and (max-width: 767px) {
        width: 90%;
    }
    div:nth-child(1) {
        font-size: 24px;
        font-weight: 400;
    }
    div:nth-child(2) {
        font-size: 30px;
        font-weight: 500;
        margin-top: 35px;
    }
    .inputDiv {
        font-size: 15px;
        font-weight: 400;
        margin-top: 20px;
    }
    #rememberDiv {
        display: flex;
        align-items: center;
        margin-top: 20px;
        font-size: 15px;
        font-weight: 400;

        input[type='checkbox'] {
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none;
            border: 1px solid black;
            border-radius: 4px;
            cursor: pointer;
            height: 16px;
            width: 16px;
        }
        input[type='checkbox']::after {
            border: solid #fff;
            border-width: 0 2px 2px 0;
            content: '';
            display: none;
            height: 40%;
            left: 40%;
            position: relative;
            top: 20%;
            transform: rotate(45deg);
            width: 15%;
        }
        input[type='checkbox']:checked {
            background: black;
        }
        input[type='checkbox']:checked::after {
            display: block;
        }
        span {
            margin-left: 8px;
        }
    }
    #loginBtnDiv {
        margin-top: 30px;
    }
    #signupDiv {
        margin-top: 10px;
        display: flex;
        justify-content: center;
        a {
            margin-left: 5px;
            font-weight: 400;
        }
    }
`;

export const Input = styled.input`
    margin-top: 5px;
    height: 40px;
    width: 100%;
    font-size: 18px;
    padding: 10px 20px;
    border-radius: 16px;
    border: 1px solid black;
    :focus {
        outline: none;
        border: 2px solid black;
    }
`;

export const LoginBtn = styled.button`
    height: 45px;
    width: 100%;
    background-color: black;
    color: white;
    border-radius: 16px;
    border: none;
    cursor: pointer;
`;
