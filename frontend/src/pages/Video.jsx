import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import DownloadIcon from "@mui/icons-material/Download";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import FlagIcon from "@mui/icons-material/Flag";
import OutlinedFlagIcon from "@mui/icons-material/OutlinedFlag";
import PlaylistAddOutlinedIcon from "@mui/icons-material/PlaylistAddOutlined";
import ContentCutIcon from "@mui/icons-material/ContentCut";
import ShareIcon from "@mui/icons-material/Share";

import { current } from "@reduxjs/toolkit";

import React, { useEffect, useState } from "react";

import styled from "styled-components";

import { useLocation } from "react-router-dom";

import axios from "axios";

import { format } from "timeago.js";

import Comments from "../Components/Comments";
import { fetchSuccess } from "../redux/videoSlice";
import { useDispatch, useSelector } from 'react-redux'

const Container = styled.div`
  display: flex;
  gap: 24px;
`;
const Content = styled.div`
  flex: 5;
`;
const VideoWrapper = styled.div``;
const Title = styled.h1`
  font-size: 18px;
  font-weight: 400;
  margin-top: 20px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.text};
`;
const Detail = styled.p`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Info = styled.span`
  color: ${({ theme }) => theme.textSoft};
`;

const Buttons = styled.div`
  display: flex;
  gap: 20px;
  color: ${({ theme }) => theme.text};
`;
const Button = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`;

const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

const Recommendation = styled.div`
  flex: 2;
`;

const Channel = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ChannelInfo = styled.div`
  display: flex;
  gap: 20px;
`;
const Image = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;
const ChannelDetail = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.text};
`;
const ChannelName = styled.span`
  font-weight: 500;
`;
const ChannelCounter = styled.span`
  margin-top: 5px;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.textSoft};
  font-size: 12px;
`;
const Description = styled.p`
  font-size: 14px;
`;
const Subscribe = styled.button`
  color: white;
  font-weight: 500;
  background-color: red;
  border: none;
  border-radius: 3px;
  height: max-content;
  padding: 10px 20px;
  cursor: pointer;
`;

function Video() {

  const { currentUser } = useSelector((state) => state.user)
  const { currentVideo } = useSelector((state) => state.video)
  const dispatch = useDispatch()
  const path = useLocation().pathname.split('/')[2]


  const [channel, setChannel] = useState({})

  useEffect(() => {
    const fetchDate = async () => {
      try {
        console.log(path)
        const videoRes = await axios.get(`/videos/find/${path}`)
        console.log(videoRes)
        const channelRes = await axios.get(`/users/find/${videoRes.data.userId}`)
        setChannel(channelRes.data)
        dispatch(fetchSuccess(videoRes.data))
      } catch (error) {
        console.log(error)
      }
    }
    fetchDate()
  }, [path, dispatch]);

  console.log(currentVideo.title)
  return (
    <Container>
      <Content>
        <VideoWrapper>
          <iframe
            width="100%"
            height="450"
            src="https://www.youtube-nocookie.com/embed/IEfBBYmxtIo"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        </VideoWrapper>
        <Title>{currentVideo.title}</Title>
        <Detail>
          <Info>{currentVideo.views} views * {format(currentVideo.createdAt)}</Info>
          <Buttons>
            <Button>
              <ThumbUpIcon /> {currentVideo.likes}
            </Button>
            <Button>
              <ThumbDownIcon /> {currentVideo.dislikes}
            </Button>
            <Button>
              <ShareIcon /> Share
            </Button>
            <Button>
              <PlaylistAddOutlinedIcon /> Save
            </Button>
          </Buttons>
        </Detail>
        <Hr />
        <Channel>
          <ChannelInfo>
            <Image src="" />
            <ChannelDetail>
              <ChannelName>{channel.name}</ChannelName>
              <ChannelCounter>{channel.subscribers}</ChannelCounter>
              <Description>
                {currentVideo.desc}
              </Description>
            </ChannelDetail>
          </ChannelInfo>
          <Subscribe>SUBSCRIBE</Subscribe>
        </Channel>
        <Hr />
        <Comments />
      </Content>
      {/* <Recommendation>
        <Card type="sm" />
        <Card type="sm" />
        <Card type="sm" />
        <Card type="sm" />
        <Card type="sm" />
        <Card type="sm" />
        <Card type="sm" />
        <Card type="sm" />
        <Card type="sm" />
        <Card type="sm" />
        <Card type="sm" />
        <Card type="sm" />
        <Card type="sm" />
      </Recommendation> */}
    </Container>
  );
}

export default Video;

