import React from "react";
import styled from "styled-components";
import Spinner from "../Spinner/Loading";
const Header = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  background-color: #092940;
`;
const Title = styled.h2`
  color: #e3f2fd;
  font-size: 24px;
  margin-left: 20px;
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
