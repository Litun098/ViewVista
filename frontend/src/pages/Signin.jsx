import axios from "axios";

import React, { useState } from "react";

import { useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";

import styled from "styled-components";

import { loginFailure, loginStart, loginSuccess } from "../redux/userSlice";
import { auth, provider } from '../firebase'
import { signInWithPopup } from 'firebase/auth'


const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 56px);
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: ${({ theme }) => theme.bgLighter};
  border: 1px solid ${({ theme }) => theme.soft};
  padding: 20px 50px;
  gap: 10px;
`;

const Title = styled.h1`
  font-size: 24px;
  color: ${({ theme }) => theme.text};
`;
const SubTitle = styled.h2`
  font-size: 20px;
  font-weight: 400;
  color: ${({ theme }) => theme.text};
`;
const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  color: 1px solid ${({ theme }) => theme.textSoft};
  width: 100%;
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
`;
const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};
`;
const More = styled.div`
  display: flex;
  margin-top: 10px;
  font-size: 12px;
  color: ${({ theme }) => theme.textSoft};
`;
const Links = styled.div`
  margin-left: 50px;
  color: ${({ theme }) => theme.text};
`;

const Link = styled.span`
  margin-left: 30px;
`;
const Signin = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginStart())
    try {
      const res = await axios.post('/auth/signin', { name, password });
      dispatch(loginSuccess(res.data))
      if (res.status === 200) navigate('/')
    } catch (error) {
      dispatch(loginFailure())
    }
  }

  const signInWithGoogle = async () => {
    dispatch(loginStart())
    signInWithPopup(auth, provider).then((result) => {
      axios.post('/auth/google', {
        name: result.user.displayName,
        email: result.user.email,
        img: result.user.photoURL,
      }).then((res) => {
        dispatch(loginSuccess(res.data))
      })
    })
      .catch(error => {
        dispatch(loginFailure())
      })
  }

  return (
    <Container>
      <Wrapper>
        <Title>Sign in</Title>
        <SubTitle>to continue with UTUBE</SubTitle>
        <Input placeholder="username" onChange={e => setName(e.target.value)} />
        <Input type="password" placeholder="password" onChange={e => setPassword(e.target.value)} />
        <Button onClick={handleLogin}>Sign in</Button>
        <Title>Or</Title>
        <Button onClick={signInWithGoogle}>Signin with Google</Button>
        <Title>Or</Title>
        <Input placeholder="username" onChange={e => setName(e.target.value)} />
        <Input type="email" placeholder="email" onChange={e => setEmail(e.target.value)} />
        <Input type="password" placeholder="password" onChange={e => setPassword(e.target.value)} />
        <Button>Sign up</Button>
      </Wrapper>
      <More>
        English(USA)
        <Links>
          <Link>Help</Link>
          <Link>Privacy</Link>
          <Link>Terms</Link>
        </Links>
      </More>
    </Container>
  );
};

export default Signin;
