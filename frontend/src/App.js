import React, { useState } from "react";

import styled, { ThemeProvider } from "styled-components";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";

import Menu from "./Components/Menu";
import Navbar from "./Components/Navbar";
import Home from "./pages/Home";
import Video from "./pages/Video";
import { darkTheme, lightTheme } from "./utils/Theme";
import Signin from "./pages/Signin";

const Container = styled.div`
  display: flex;
`;
const Main = styled.div`
  flex: 7;
  background-color: ${({ theme }) => theme.bg};
`;
const Wrapper = styled.div`
  padding:22px 96px;
`;

function App() {
  const [darkMode, setDarkMode] = useState(true);
  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Container>
        <BrowserRouter>
          <Menu darkMode={darkMode} setDarkMode={setDarkMode} />
          <Main>
            <Navbar />
            <Wrapper>
              <Routes>
                <Route path="/">
                  <Route index element={<Home type="random"/>} />
                  <Route path="trends" element={<Home type="trends"/>} />
                  <Route path="subscriptions" element={<Home type="sub"/>} />
                  <Route path="signin" element={<Signin/>} />
                  <Route path="video">
                    <Route path=":id" element={<Video />} />
                  </Route>
                </Route>
              </Routes>
            </Wrapper>
          </Main>
        </BrowserRouter>
      </Container>
    </ThemeProvider>
  );
}

export default App;
