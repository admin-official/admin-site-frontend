import styled from 'styled-components';

export const Container = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 100;
    /* header size */
    top: -72px;
    left: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
`;
export const Background = styled.div`
    position: fixed;
    width: 100%;
    height: 200%;
    background-color: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(5px);
`;
export const ModalContainer = styled.div`
    width: 924px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    border: 0.8px solid black;
    border-radius: 16px;
    z-index: 999;
    display: flex;
    flex-direction: column;
    padding: 1rem;
    box-shadow: 10px 10px 5px lightgrey;

    .modal_header {
        padding: 1rem;
        font-size: 24px;
        font-weight: 600;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        border-bottom: 1px solid black;
    }

    .modal_header svg {
        cursor: pointer;
    }

    .file_label {
        margin-top: 1rem;
        padding: 1rem;
        font-size: 18px;
        font-weight: 600;
        height: 200px;
        display: flex;
        justify-content: center;
        flex-direction: column;
        text-align: center;
        align-items: center;
        border: 1px dashed black;
        cursor: pointer;
        background-color: #fcfcfc;
        margin-bottom: 1rem;
    }

    .file_label svg {
        margin-bottom: 0.5rem;
    }

    .modal_footer {
        margin-top: 1rem;
        padding-top: 1rem;
        display: flex;
        flex-direction: row;
        justify-content: center;
        border-top: 1px solid black;
    }

    .save_btn,
    .close_btn {
        height: 40px;
        border-radius: 4px;
        background: lightgray;
        line-height: 40px;
        font-size: 18px;
        letter-spacing: -0.5px;
        border: none;
        margin: 0 16px;
        padding: 0 40px;
        cursor: pointer;
    }

    .save_btn:hover,
    .close_btn:hover {
        background: black;
        color: white;
    }

    .uploaded_file {
        font-size: 15px;
        display: flex;
        justify-content: space-between;
    }

    .uploaded_file svg {
        cursor: pointer;
        margin-left: 10px;
    }

    @media screen and (max-width: 1023px) {
        width: 612px;

        .file_label {
            font-size: 16px;
        }

        .save_btn,
        .close_btn {
            height: 36px;
            line-height: 36px;
            font-size: 16px;
            margin: 0 8px;
            padding: 0 30px;
        }
    }

    @media screen and (max-width: 767px) {
        width: 352px;

        .modal_header {
            font-size: 18px;
        }

        .modal_header svg {
            width: 20px;
            height: 20px;
        }

        .file_label {
            font-size: 12px;
        }

        .file_label svg {
            width: 24px;
            height: 24px;
        }

        .save_btn,
        .close_btn {
            height: 32px;
            line-height: 32px;
            font-size: 12px;
            padding: 0 20px;
        }

        .uploaded_file {
            font-size: 9px;
        }

        .uploaded_file svg {
            margin-left: 0;
        }
    }
`;
