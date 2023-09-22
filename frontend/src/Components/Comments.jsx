import React, { useEffect, useState } from "react";

import styled from "styled-components";

import axios from "axios";

import { useSelector } from "react-redux";

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

const Comments = ({videoId}) => {
  const { currentUser } = useSelector((state) => state.user)
  const [comments, setComments] = useState([]);
  useEffect(()=>{
    const fetchComments = async ()=>{
      try{
        const res = await axios.get(`/comments/${videoId}`)
        setComments(res.data)
      }catch(err){
        
      }
    }
    fetchComments()
  },[videoId])
  return (
    <Container>
      <NewComments>
        <Avatar src={currentUser.Img} />
        <Input placeholder="Add a comment..." />
      </NewComments>
      {comments.map(comment=>(
        <Comment key={comment._id} comment = {comment}/>
      ))}
    </Container>
  );
};

export default Comments;
