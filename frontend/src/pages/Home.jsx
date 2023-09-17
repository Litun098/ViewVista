import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import Card from '../Components/Card.js'


const Container = styled.div`
    display:flex;
    justify-content: space-between;
    flex-wrap: wrap;
`

function Home({ type }) {

  const [videos, setVideos] = useState([]);
  useEffect(() => {
    try {
      const fetchVideo = async () => {
        const res = await axios.get(`/videos/${type}`)
        setVideos(res.data)
      }
      fetchVideo()
    } catch (error) {
      console.log(error)
    }
  }, [type])
  return (
    <Container>
      {videos.map(video => (
        <Card key={video._id} video={video} />
      ))}
    </Container>
  )
}

export default Home
