import ports from "../../data/ports";
import React, { useEffect, useState, useRef } from "react";
import L, { Map } from "leaflet";
import "leaflet-rotatedmarker";
import "leaflet/dist/leaflet.css";
import styled from "styled-components";
require("leaflet-bing-layer");

const Wrapper = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => `calc(${props.height} - 100px)`};
`;

const TestMap = ({ ferries, timeStamp, updatedView }) => {
    const mapRef = useRef(null)
const [views, setViews] =useState([35.264277,-76.833359, 8]); 
  console.log("updatedView map component",updatedView, "views", views)
  
  const ferryUrl = "https://gisd14.dot.nc.net/Ncdotferryfeed/ferrygeojson.ashx";
  const terminal = L.icon({
    iconUrl: "/terminal.svg",
    iconSize: [20, 20],
  });
  const ferryIcon = new L.icon({
    iconUrl: "/ferry.svg",
    iconSize: [30, 30],
    options: {
      customId: "",
    },
  });

  const ferryDockedIcon = L.icon({
    iconUrl: "/dockedFerry.svg",
    iconSize: [40, 40],
  });

  
 
  let portOverlay = L.layerGroup();

  const [ferryOverlay, setFerryOverlay] = useState(L.layerGroup());
  // const [ferryMapState, setFerryMapState]= useState(ferryMap)

  const createMap = () => {
    // console.log("ferryMap", ferryMap);
    const apiKey =
      "AsYvNI-GHrtArcRybTU256h6zvO5I3G9zzdC0kFwiXkdoA81Ux9RRPSjxm_o_Aqi";
    ports.forEach((port) => {
      L.marker([port.geometry.coordinates[1], port.geometry.coordinates[0]], {
        icon: terminal,
      })
        .bindPopup(
          `<div style="text-align:center;"><strong>${port.properties.title}</strong> <br/> phone: ${port.properties.phone} <br/> address: ${port.properties.address}</div>`
        )
        .addTo(portOverlay);
    });

    // ferryMap = new L.map("bingmap", {
    //   // center: [views[0], views[1]],
    //   zoom: views[2],
    //   layers: [portOverlay, ferryOverlay],
    // }).setView([views[0], views[1]]);
    // setFerryMapState(L.map("bingmap", {
    //   center: [views[0], views[1]],
    //   zoom: views[2],
    //   layers: [portOverlay, ferryOverlay],
    // }))
    var map = mapRef.current.leafletElement;
    const image = L.imageOverlay().addTo(map)

    const mapOptions = {
      bingMapsKey: apiKey,
      imagerySet: "RoadOnDemand",
      style:
        "&st=wt|fc:ffffff_me|lbc:FF042AFF;loc:ffffff_cah|lbc:CCCCCC;fc:CCCCCC;sc:CCCCCC_tr|lbc:CCCCCC;fc:CCCCCC;sc:CCCCCC_nh|v:0;lv:0_pl|v:0;lv:0_vg|v:0;lv:0_ad|v:0;lv:0_wr|sc:FF001D94;sws:5;v:1",
    };

    L.tileLayer.bing(mapOptions).addTo(map);
    // ferryMap.panTo(new L.LatLng(lat,lng))
  };

  useEffect(() => {
    console.log("useeffect called for createMap", ferries);
    createMap();

    // return () => {
    // //   console.log("ferryMap", map, "ferryOverlay", ferryOverlay);
    //   if (map !== null) {
    //     map.remove();
    //   }
    // };
  }, []);

  const createFerrMarkers = () => {
    // map.remove(ferryOverlay);
    ferryOverlay.clearLayers();
    ferries.forEach((ferry) => {
      let COG = ferry.properties.COG;
      let SOG = ferry.properties.SOG;
      let bearing = parseInt(COG, 10);
      let latlang = L.latLng(
        ferry.geometry.coordinates[1],
        ferry.geometry.coordinates[0]
      );
      if (SOG == "0 knots") {
        L.marker(latlang, {
          icon: ferryDockedIcon,
        })
          .bindPopup(
            `<div style="text-align:center;"><strong>${ferry.properties["Vessel Name"]}</strong> <br/> Speed: ${ferry.properties.SOG} <br/> Destination: ${ferry.properties.Destination}</div>`
          )
          .addTo(ferryOverlay);
      } else {
        L.marker(latlang, {
          icon: ferryIcon,
          rotationAngle: bearing,
          rotationOrigin: "center",
        })
          .bindPopup(
            `<div style="text-align:center;"><strong>${ferry.properties["Vessel Name"]}</strong> <br/> Speed: ${ferry.properties.SOG} <br/> Destination: ${ferry.properties.Destination}</div>`
          )
          .addTo(ferryOverlay);
      }
    });
  };
  useEffect(() => {
    createFerrMarkers();
    // return () => {
    //   cleanup
    // }
  }, [timeStamp]);

// function zoomTo(){
//   console.log("zoomTo called")
//   let lat = updatedView[0];
//   let lng = updatedView[1];
//   map.panTo(new L.LatLng(lat,lng))
// }
useEffect(() => {
//   console.log("zoomTo called","lat",views[0],"lng",views[1],"updatedView lat",updatedView[0],"updatedView lng", updatedView[1],"ferrymap",map)
  let lat = views[0];
  let lng = views[1]; 
  if(updatedView[0] === null){
    lat = views[1];
    lng = views[0]; 
  }else{
    lat = updatedView[0];
    lng = updatedView[1]; 
  }
  
  // ferryMap.panTo(new L.LatLng(lat,lng))
  
}, [updatedView])
// const updateMap=()=>{
//   // console.log("ferryMap", ferryMap,"updatedView", updatedView, "views", views)
//   if(ferryMap !== null){
//     ferryMap.panTo(new L.LatLng(updatedView[0],updatedView[1]))
//   }
  
//   // setViews(updatedView)
// }
// useEffect(()=>{
//   updateMap()
// },updatedView)
  // ferryMap.on("zoomend", function () {
  //   let currentZoom = ferryMap.getZoom();
  //   if (currentZoom >= 13) {
  //     console.log("currentzoom", currentZoom);
  //     // iconMarker.setIcon(ferryIconBg);
  //   } else {
  //     console.log("currentzoom", currentZoom);
  //     // iconMarker.setIcon(ferryIcon);
  //   }
  // });
  const centerMapView=(e)=>{
      let {leafletElement} = mapRef.current;
      if(e){
          leafletElement.setView(updatedView[0],updatedView[1])
      }
  }
  return <Map ref={mapRef} id="bingmap" />;
};
export default TestMap;
