import styled from 'styled-components';

export const Container = styled.section`
    width: 100%;
    padding-top: 30px;
    margin-bottom: 60px;
    border-radius: 16px;
    box-shadow: 0px 0px 15px lightgrey;

    form {
        display: flex;
        flex-flow: column wrap;
    }
    input {
        border: none;
    }

    input:focus {
        outline: none;
    }

    .title_input {
        border-bottom: 1.5px solid black;
        width: 74%;
        margin: 50px 13%;
        font-size: 35px;
    }

    .content_input {
        width: 80%;
        min-height: 400px;
        margin: 15px 10% 50px 10%;
        font-size: 20px;
        resize: none;
        padding: 10px;
        border-radius: 16px;
    }

    .file_input {
        margin-left: 12%;
    }

    .back_btn,
    .submit_btn {
        height: 44px;
        border-radius: 30px;
        background: lightgray;
        line-height: 44px;
        font-size: 17px;
        letter-spacing: -0.5px;
        border: none;
        width: 20%;
        margin: 0 20px;
        padding: 0;
        cursor: pointer;
    }

    .add_file_btn {
        height: 40px;
        border-radius: 6px;
        background: lightgray;
        line-height: 40px;
        font-size: 20px;
        letter-spacing: -0.5px;
        border: none;
        width: 15%;
        margin: 0 11%;
        text-align: center;
        font-weight: 440;
        cursor: pointer;
    }

    .back_btn:hover,
    .submit_btn:hover,
    .add_file_btn:hover {
        background: black;
        color: white;
    }

    .btn_container {
        display: flex;
        flex-direction: row;
        justify-content: center;
        margin-bottom: 50px;
    }

    .back_btn {
        text-align: center;
        font-weight: 440;
    }

    @media screen and (max-width: 1023px) {
        padding-top: 20px;
        margin-bottom: 40px;

        .title_input {
            border-bottom: 1px solid black;
            width: 70%;
            margin: 30px 15%;
            font-size: 24px;
        }

        .content_input {
            margin: 7px 10% 50px 10%;
            font-size: 15px;
            padding: 8px;
            border-radius: 10px;
        }

        .add_file_btn {
            height: 32px;
            line-height: 32px;
            font-size: 16px;
            width: 17%;
        }
    }

    @media screen and (max-width: 767px) {
        .content_input {
            margin: 0 10% 50px 10%;
        }

        .add_file_btn {
            height: 28px;
            line-height: 28px;
            font-size: 13px;
            width: 22%;
            margin: 0 12%;
        }
    }
`;
