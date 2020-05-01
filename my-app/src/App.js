import React from 'react';
import './App.css';
import Form from "./Form"
import styled from "styled-components"

const AppDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  `;



function App() {
  return (
    <AppDiv> 
      <Form />
    </AppDiv>
  );
}

export default App;
