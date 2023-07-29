import React from "react";
import styled from "styled-components";
import avatar from "../img/Avatar.jpg";
import theme from "../utils/Theme";
import Comment from "./Comment";
const Container = styled.div``;

const NewComments = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;
const Input = styled.input`
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.soft};
  background-color: transparent;
  outline: none;
  padding: 5px;
  width: 100%;
`;

const Comments = () => {
  return (
    <Container>
      <NewComments>
        <Avatar src={avatar} />
        <Input placeholder="Add a comment..." />
      </NewComments>
      <Comment />
      <Comment />
      <Comment />
      <Comment />
      <Comment />
      <Comment />
      <Comment />
      <Comment />
    </Container>
  );
};

export default Comments;
