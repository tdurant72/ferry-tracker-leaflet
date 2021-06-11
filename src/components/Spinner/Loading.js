import React, { useContext } from "react";
import { FerryAppContext } from "../../contexts/GlobalContext";
const h2Style = { maxWidth: "50%", margin: "0 auto" };
const divStyle = { display: "flex" };
const imgStyle = { padding: "10px 0px" };
const Loader = () => {
  //console.log(props)
  const { state, ferries, callFerry, fetchingMessage } =
    useContext(FerryAppContext);
  console.log("state", state, "ferries", ferries, ferries.length);
  return (
    <div style={divStyle}>
      {callFerry === true ? (
        <>
          <h2 style={h2Style}>{fetchingMessage}</h2>

          <img
            style={imgStyle}
            src="https://upload.wikimedia.org/wikipedia/commons/d/de/Ajax-loader.gif"
            alt="Loading"
          />
        </>
      ) : null}
    </div>
  );
};

export default Loader;
