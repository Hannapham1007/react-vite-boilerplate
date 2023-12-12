import React from "react";
import Lottie from "lottie-react";
import loading from "../lotties/loading.json";
import styled from "styled-components";

export const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
  padding: 0;
`;

export const H1 = styled.h1`
  color: var(--primary);
  margin-bottom: 0;
`;
const LoadingPage = () => {
  return (
    <LoadingContainer>
      <H1>Welcome to Expenso</H1>
      <Lottie
        animationData={loading}
        style={{ width: "300px", height: "300px" }}
      />
    </LoadingContainer>
  );
};

export default LoadingPage;
