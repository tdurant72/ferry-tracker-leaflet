import React from "react";
import styled from "styled-components";
import Spinner from "../Spinner/Loading";
const Header = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  background-color: #092940;
  margin-top: 0px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
    margin-top: 10px;
  }
`;
const Title = styled.h2`
  color: #fdfdfd !important;
  font-size: 24px;
  margin-left: 20px;
  margin-top: 20px;
  @media (max-width: 768px) {
    font-size: 20px;
    margin-left: 8px;
    margin-top: 12px;
  }
`;

function MapHeader() {
  return (
    <Header>
      <Title>Ferry Tracker</Title>
      <Spinner />
    </Header>
  );
}

export default MapHeader;
