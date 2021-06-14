import React, { useContext } from "react";
import { FerryAppContext } from "../../contexts/GlobalContext";
const h4Style = {
  maxWidth: "50%",
  margin: "0 auto",
  color: "#ffffff",
  fontSize: "16px",
  marginLeft: "5px",
};
const failStyle = {
  maxWidth: "50%",
  margin: "0 auto",
  color: "#ffffff",
  fontSize: "14px",
  marginLeft: "5px",
};
const divStyle = { display: "flex", alignItems: "center" };
const imgStyle = { padding: "10px 0px" };
const Loader = () => {
  //console.log(props)
  const [state, , , , ferries, , callFerry] = useContext(FerryAppContext);
  // console.log("state", state, "ferries", ferries, ferries.length);
  return (
    <div style={divStyle}>
      {callFerry === true ? (
        <>
          <h4 style={h4Style}>{state.fetchingMessage}</h4>

          <img
            style={imgStyle}
            src="https://upload.wikimedia.org/wikipedia/commons/d/de/Ajax-loader.gif"
            alt="Loading"
          />
        </>
      ) : null}
      {state.failMessage !== null ? (
        <>
          <h4 style={failStyle}>{state.failMessage}</h4>
        </>
      ) : null}
    </div>
  );
};

export default Loader;
