import React, { useContext } from "react";
import { FerryAppContext } from "../../contexts/GlobalContext";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const H4 = styled.h4`
  margin: 0 auto;
  color: #ffffff;
  font-size: 16px;
  margin-left: 5px;
  padding: 10px;
  @media (max-width: 768px) {
    font-size: 14px;
    padding: 5px;
  }
`;
const StyledFail = styled.div`
  max-width: 50%;
  margin: "0 auto";
  color: #ffffff;
  font-size: 14px;
  margin-left: 5px;
`;
const ImageWrapper = styled.img`
  padding: 10px 0px;
  height: 50px;
  width: 50px;
`;
const h4Style = {
  maxWidth: "50%",
  margin: "0 auto",
  color: "#ffffff",
  fontSize: "16px",
  marginLeft: "5px",
};
const FailStyle = {
  maxWidth: "50%",
  margin: "0 auto",
  color: "#ffffff",
  fontSize: "14px",
  marginLeft: "5px",
};
const divStyle = { display: "flex", alignItems: "center" };
const imgStyle = { padding: "10px 0px", height: "50px", width: "50px" };
const Loader = () => {
  //console.log(props)
  const [state, , , , ferries, , callFerry] = useContext(FerryAppContext);
  // console.log("state", state, "ferries", ferries, ferries.length);
  return (
    <Wrapper>
      {callFerry === true ? (
        <>
          <H4>{state.fetchingMessage}</H4>
        </>
      ) : null}
      {state.fetchingMessage !== null ? (
        <>
          {/* <StyledFail>{state.failMessage}</StyledFail> */}
          <ImageWrapper
            src="https://upload.wikimedia.org/wikipedia/commons/d/de/Ajax-loader.gif"
            alt="Loading"
          />
        </>
      ) : null}
    </Wrapper>
  );
};

export default Loader;
