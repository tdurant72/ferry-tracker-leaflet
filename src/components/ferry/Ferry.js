import React, { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet-rotatedmarker";

const Ferry = (props) => {
  console.log("ferry props", props);
  let SOG = props.ferry.properties.SOG;
  const ferryIcon = L.icon({
    iconUrl: "/ferry.svg",
    iconSize: [30, 30],
  });
  const ferryDockedIcon = L.icon({
    iconUrl: "/dockedFerry.svg",
    iconSize: [40, 40],
  });
  const [iconMarker, setIconMarker] = useState(ferryDockedIcon);
  const setIcon = () => {
    if (SOG == "0 knots") {
      setIconMarker(ferryDockedIcon);
    } else {
      setIconMarker(ferryIcon);
    }
  };

  useEffect(() => {
    let iconSet = true;
    setIcon();
    return () => {
      iconSet = false;
    };
  }, [SOG]);
  return null;
};

export default Ferry;
