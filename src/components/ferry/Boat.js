import React, { Component, useEffect, useState } from "react";
import { Marker, Popup } from "react-leaflet";

import { L, Icon } from "leaflet";
// import Moment from "react-moment";
// import "./Boat.css";
// import FerryIcon from "../images/FerryIcon";
// import ferryIcon from "../images/ferry-icon.png";
const Boat = (props) => {
  console.log(props);
  const rotationRaw = props.ferry.properties.COG;
  const rotation = parseInt(rotationRaw, 10);
  // const ferryIcon = new Icon({
  //   iconUrl: getIcon(),
  //   iconSize: [30, 30],
  //   // html: `<img
  //   // style="transform: rotate(${rotation}deg);"
  //   // `,
  // });
  // const ferryDockedIcon = new Icon({
  //   iconUrl: getIcon(),
  //   iconSize: [40, 40],
  // });

  // useEffect(() => {
  //   let COG = props.ferry.properties.COG;
  //   let bearing = parseInt(COG, 10);
  //   ferryIcon.current.style.transform = `rotate(${bearing}deg)`;
  // }, []);
  // constructor(props) {
  //   super(props);
  //   // this.renderBoatPin = this.renderBoatPin.bind(this);
  // }
  // componentDidMount() {
  //   //   this.leafletElement.setIconAngle(this.props.COG);
  //   this.renderBoatPin();
  // }

  //   componentDidUpdate(nextProps, nextState) {
  //     // const newProps = this.props;
  //     if (this.props.timeStamp !== nextProps.timeStamp) {
  //       //   this.renderBoatPin();
  //       //this.loadMapScenario();
  //       this.leafletElement.setIconAngle(nextProps.COG);
  //     }
  //   }

  // renderBoatPin(props) {
  let COG = props.ferry.properties.COG;
  let bearing = parseInt(COG, 10);
  let time = props.ferry.properties.Time;
  let SOG = props.ferry.properties.SOG;
  // let VesselName = this.props.VesselName;
  //console.log(this.props);
  const [fIcon, setFIcon] = useState("/dockedFerry.svg");

  // const getIcon = (SOG) => {
  //   if (SOG === "0 knots") {
  //     boatIcon = dockedIcon;
  //   } else {
  //     boatIcon = movingIcon;
  //     //boatIcon = ferryIcon;
  //     //console.log(movingIcon)
  //   }
  //   return boatIcon;
  // };

  // let color = new window.Microsoft.Maps.Color.fromHex("#002445");
  const movingIcon =
    '<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg xmlns="http://www.w3.org/2000/svg"  width="30" height="30" viewBox="0 0 30 30" ><defs><style>.cls-1{fill:none;}.cls-2{fill:#efe9e1;transform-origin:center}.cls-3{fill:#002445;}.cls-4{fill:#004544;stroke:#002445;stroke-miterlimit:10;}</style></defs><title>ferry-icon</title><g id="Layer_2" data-name="Layer 2"><rect class="cls-1" width="24" height="24"/></g><g x="12" y="12" transform="rotate(' +
    bearing +
    ' 12,12)" id="Layer_1" data-name="Layer 1" ><path class="cls-2" d="M13.39,18.09l-.1.07-.1-.07L9,19.19V7.47A2,2,0,0,1,9.78,6l3.51-2.82L16.8,6a2,2,0,0,1,.77,1.51V19.19Z"/><path class="cls-3" d="M13.29,4.42l2.88,2.32a1,1,0,0,1,.4.73V17.89l-2.5-.65-.61-.16-.1-.06-.07,0-.07,0-.1.06-.61.16L10,17.89V7.47a1,1,0,0,1,.4-.73l2.89-2.32m0-2.42a.52.52,0,0,0-.32.11L9.15,5.18A3,3,0,0,0,8,7.47V20.12a.38.38,0,0,0,.18.31L13,19.17a.46.46,0,0,0,.28.08.45.45,0,0,0,.27-.08l4.83,1.26a.36.36,0,0,0,.18-.31V7.47a2.93,2.93,0,0,0-1.15-2.29L13.6,2.11A.51.51,0,0,0,13.29,2Z"/><path class="cls-4" d="M12,23.89"/></g></svg>';
  const dockedIcon =
    '<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg id="docked" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 50 50"><defs><style>.cls-1{fill:#EAEAEA;}.cls-2{fill:#002445;}.heavy { font: bold 14px sans-serif;color:#002445; }</style></defs><rect class="cls-1" x="7" y="7" width="11" height="11" transform="translate(-8.49 9.19) rotate(-45)"/><path class="cls-2" d="M12.5,6.14l6.36,6.36L12.5,18.86,6.14,12.5,12.5,6.14m0-2.83L3.31,12.5l9.19,9.19,9.19-9.19L12.5,3.31Z" transform="translate(-3.31 -3.31)"/><circle class="cls-1" cx="9.19" cy="9.19" r="0.5"/><path class="cls-2" d="M12.5,12a.5.5,0,1,0,.5.5.5.5,0,0,0-.5-.5Z" transform="translate(-3.31 -3.31)"/></svg>';

  console.log("COG: ", COG, "Bearing: ", bearing, "SOG", SOG, "time:", time);
  // let Latitude = parseFloat(this.props.Latitude);
  // let Longitude = parseFloat(this.props.Longitude);
  // let title = VesselName;
  // let SOG = this.props.SOG;
  // let boatId = this.props.boatId;
  // let summary = this.props.summary;
  // let summary = "Vessel: " + VesselName + "<br>" + "Is traveling at " + SOG + "<br>" + "at bearing " + COG;

  // let boatIcon = null;
  // if (SOG === "0 knots") {
  //   boatIcon = dockedIcon;
  // } else {
  //   boatIcon = movingIcon;
  //   //boatIcon = ferryIcon;
  //   //console.log(movingIcon)
  // }
  useEffect(() => {
    if (SOG === "0 knots") {
      setFIcon("/dockedFerry.svg");
    } else {
      setFIcon("/ferry.svg");
      //boatIcon = ferryIcon;
      //console.log(movingIcon)
    }
  }, [time]);

  const ferryIcon = new Icon({
    iconUrl: fIcon,
    iconSize: [30, 30],
    className: "iconRotate",
  });
  useEffect(() => {
    let icon = document.getElementsByClassName("iconRotate");
    console.log(icon.style);
    // icon.style.transform += " rotate(20deg)";
    // if (SOG === "0 knots") {
    //   setFIcon("/dockedFerry.svg");
    // } else {
    //   setFIcon("/ferry.svg");
    //   //boatIcon = ferryIcon;
    //   //console.log(movingIcon)
    // }
  }, [time]);
  // this.boatPin.style = {
  //     styleStatic: {
  //         fontGlow: true,
  //         glowColor: "rgb(0,36,69)",

  //     }
  // };

  // console.log(this.boatPin)
  //this.boatPin.style.styleDynamic.fontColor = "rgb(0,36,69)";
  // const boatPin = this.boatPin;
  // this.renderBoatPin(COG, time, SOG);
  // }

  return (
    <Marker
      // icon={
      //   props.ferry.properties.SOG == "0 knots" ? ferryDockedIcon : ferryIcon
      // }
      icon={ferryIcon}
      key={props.ferry.properties.MMSI}
      position={[
        props.ferry.geometry.coordinates[1],
        props.ferry.geometry.coordinates[0],
      ]}
      title={`${props.ferry.properties["Vessel Name"]}`}
      rotationAngle={bearing}
      rotationOrigin="center"
    >
      <Popup>
        <div>
          <h3>{props.ferry.properties["Vessel Name"]}</h3>
          <p>Bearing:{props.ferry.properties.COG}</p>
          <p> Speed:{props.ferry.properties.SOG}</p>
        </div>
      </Popup>
    </Marker>
  );
};

export default Boat;
