/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-param-reassign */
/* eslint-disable operator-linebreak */
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';
import * as Styled from './styled';
import { fetchSignup } from '../../api';
import { signupInputList } from '../../constant/login';

function SignupContainer() {
    const [visible, setVisible] = useState(false);
    const [visible2, setVisible2] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm();
    const navigate = useNavigate();
    const onValid = (data) => {
        if (data.password !== data.password2) {
            setError('password2', { message: '비밀번호가 일치하지 않습니다.' });
        } else {
            fetchSignup(data, navigate, setError);
        }
    };
    return (
        <Styled.Container>
            <form onSubmit={handleSubmit(onValid)}>
                <Styled.Box>
                    <div>Welcome !</div>
                    <div>회원가입</div>
                    {signupInputList.map((item) => (
                        <div className='inputDiv' key={item.id}>
                            <span>{item.name}</span>
                            <br />
                            <Styled.Input
                                type={
                                    (item.name === 'Password' && !visible) ||
                                    (item.name === 'Password 확인' && !visible2)
                                        ? 'password'
                                        : 'text'
                                }
                                {...register(item.id, { required: item.errorMsg })}
                                placeholder={item.placeholder}
                            />
                            {item.name === 'Password' && (
                                <Styled.EyeIcon onClick={() => setVisible((prev) => !prev)}>
                                    {visible ? <BsFillEyeFill /> : <BsFillEyeSlashFill />}
                                </Styled.EyeIcon>
                            )}
                            {item.name === 'Password 확인' && (
                                <Styled.EyeIcon onClick={() => setVisible2((prev) => !prev)}>
                                    {visible2 ? <BsFillEyeFill /> : <BsFillEyeSlashFill />}
                                </Styled.EyeIcon>
                            )}
                            <Styled.ErrorMsg>{errors[item.id]?.message}</Styled.ErrorMsg>
                        </div>
                    ))}
                    <div id='loginBtnDiv'>
                        <Styled.LoginBtn type='submit'>회원가입</Styled.LoginBtn>
                    </div>
                    <div id='signupDiv'>
                        <span>이미 계정이 있다면 ?</span>
                        <Link to='/login'>
                            <span>로그인</span>
                        </Link>
                    </div>
                </Styled.Box>
            </form>

            <Styled.Logo>ADMIN</Styled.Logo>
        </Styled.Container>
    );
}

export default SignupContainer;
