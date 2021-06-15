// import { useGlobalContext } from "../../contexts/GlobalContext";
import { FerryAppContext } from "../../contexts/GlobalContext";
import { key } from "../../key";
import ports from "../../data/ports";
import movingIcon from "../Images/ferry-icon.png";
import dockedIcon from "../Images/docked.png";
import terminalIcon from "../Images/terminal.png";
import TransportLight from "../../fonts/TransportNewLight_gdi.ttf";
import React, { useEffect, useState, useRef, useContext } from "react";
import L from "leaflet";

import "leaflet-touch-helper";
import ferryRoutes from "../../data/ferryRoutes";
import "leaflet-rotatedmarker";
import "leaflet/dist/leaflet.css";
import "./Map.css";
import styled from "styled-components";
require("leaflet-bing-layer");

const Wrapper = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => `calc(${props.height} - 150px)`};
`;
const Legend = styled.div`
  width: 800px;
  height: 200px;
`;
const LegendBody = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 20px;
`;
const font = TransportLight;
const Map = () => {
  // const { ferries, timeStamp } = useGlobalContext();
  // const { currentView } = useContext(AppContext);
  const [state, setState, currentView, setCurrentView, ferries] =
    useContext(FerryAppContext);
  console.log("currentView", currentView);

  console.log("initial currentView value", currentView);

  const ferryUrl = "https://gist14.dot.nc.net/Ncdotferryfeed/FerryGeoJson.ashx";
  // const ferryUrl = "https://gisd14.dot.nc.net/Ncdotferryfeed/ferrygeojson.ashx";
  const terminal = L.icon({
    iconUrl: "/terminal.svg",
    iconSize: [20, 20],
  });
  const ferryIcon = new L.icon({
    iconUrl: "/ferry.svg",
    iconSize: [15, 15],
    options: {
      customId: "",
    },
  });

  const ferryDockedIcon = L.icon({
    iconUrl: "/dockedFerry.svg",
    iconSize: [15, 15],
  });

  let ferryMap = null;
  const mapRef = useRef(null);
  const [mapCenter, setMapCenter] = useState(null);
  const [ferryMapState, setFerryMapState] = useState(null);
  let portOverlay = L.layerGroup();
  let routeStyles = {
    color: "#00cc00",
    weight: 2,
    opacity: 0.5,
  };
  let ferryRoutesOverlay = L.geoJSON(ferryRoutes, {
    style: function (feature) {
      switch (feature.properties.Type) {
        case "Daily":
          return { color: "#00cc00", weight: 2, opacity: 0.5 };
        case "Emergency":
          return { color: "#cc3300", weight: 2, opacity: 0.5 };
      }
    },
  });
  let legend = L.control({ position: "bottomright" });

  // let ferryRoutes = omnivore.kml("../data/FerryRoutes.kml");
  const [ferryOverlay, setFerryOverlay] = useState(L.layerGroup());

  const createMap = () => {
    console.log("createMap called");
    const apiKey = key;
    ports.forEach((port) => {
      const portID = port.properties.title;
      const portNum = port.properties.phone;
      let formatPhoneNumber = (str) => {
        let cleaned = ("" + str).replace(/\D/g, "");
        let match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
        if (match) {
          return "(" + match[1] + ") " + match[2] + "-" + match[3];
        }
        return null;
      };
      L.marker([port.geometry.coordinates[1], port.geometry.coordinates[0]], {
        icon: terminal,
      })
        .bindPopup(
          `<div style='text-align:center;font-size:14px; font-family:${font}'><h3 style="margin-bottom:0;">${
            port.properties.title
          }
             </h3> <p style="margin:7px 0; font-size:14px;"> <a href="tel:${portNum}"> Phone: ${formatPhoneNumber(
            portNum
          )}</a></p>
             <p style="margin:7px 0; font-size:14px;"> ${
               port.properties.address
             }</p>
             ${
               port.properties.Site !== null
                 ? `<p style="margin:7px 0; font-size:14px;"> <a href="${port.properties.Site}" target="_blank">Visitor Information</a></p> `
                 : ``
             }
             ${
               port.properties.Reservations !== null
                 ? `<p style="margin:7px 0; font-size:14px;"> <a href="${port.properties.Reservations}" target="_blank">Next-Day Ferry Reservations</a></p> `
                 : ``
             }
              </div>`
        )
        // .bindPopup(
        //   "<div style='text-align:center;'><strong>" +
        //     port.properties.title +
        //     "</strong> <br/> phone: " +
        //     port.properties.phone +
        //     "<br/> address: " +
        //     port.properties.address +
        //     "<br/> Visitor Information:"+
        //     port.properties.Site+
        //     "</div>"
        // )
        .addTo(portOverlay);
    });

    ferryMap = new L.map("bingmap", {
      layers: [portOverlay, ferryOverlay, ferryRoutesOverlay],
    }).setView([currentView[0], currentView[1]], currentView[2]);

    const mapOptions = {
      bingMapsKey: apiKey,
      imagerySet: "RoadOnDemand",
      // showLocateMeButton: true,
      // showTrafficButton: true,
      // style:
      //   "&st=wt|fc:ffffff_me|lbc:FF042AFF;loc:ffffff_cah|lbc:CCCCCC;fc:CCCCCC;sc:CCCCCC_tr|lbc:CCCCCC;fc:CCCCCC;sc:CCCCCC_nh|v:0;lv:0_pl|v:0;lv:0_vg|v:0;lv:0_ad|v:0;lv:0_wr|sc:FF001D94;sws:5;v:1",
    };

    L.tileLayer.bing(mapOptions).addTo(ferryMap);
    // ferryMap.panTo(new L.LatLng(lat,lng))
    legend.onAdd = function (ferryMap) {
      let div = L.DomUtil.create("div", "legend");
      div.innerHTML = `<h4>Legend</h4>
        <i class="icon" style="background-image: url(${movingIcon});background-repeat: no-repeat;background-position:center;"></i><span>Ferry Underway</span><br>
                      <i class="icon" style="background-image: url(${dockedIcon});background-repeat: no-repeat;background-position:center;"></i><span>Ferry Stopped</span><br>
                      <i class="icon" style="background-image: url(${terminalIcon});background-repeat: no-repeat;background-position:center;"></i><span>Terminals</span><br>
                      <i style="background: #00cc00"></i><span>Daily Route</span><br>
                      <i style="background: #cc3300"></i><span>Emergency Route</span><br>                   
                      `;
      return div;
    };
    legend.addTo(ferryMap);
    // Microsoft.Maps.loadModule("Microsoft.Maps.Traffic", function () {
    //   var manager = new Microsoft.Maps.Traffic.TrafficManager(FerryMap);
    //   manager.show();
    // });
    // const map = mapRef.current.leafletElement;
    setMapCenter(ferryMap.getCenter());
    setFerryMapState(ferryMap);
  };

  useEffect(() => {
    console.log("useeffect called for createMap", ferries);
    createMap();
    // createFerryMarkers();
    return () => {
      // console.log("ferryMap", ferryMap, "ferryOverlay", ferryOverlay);
      if (ferryMap !== null) {
        ferryMap.remove();
      }
    };
  }, []);

  const createFerryMarkers = () => {
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
            `<div><h3 style="text-align:center;margin-bottom:0;"><strong>${
              ferry.properties.VesselName
            }</strong><br/><p style="margin:7px 0; font-size:14px;"> Destination: ${
              ferry.properties.Destination !== ""
                ? ferry.properties.Destination
                : "No destination reported"
            }</p><br/><p style="margin:7px 0; font-size:14px;">ETA: ${
              ferry.properties.ETA !== null
                ? new Date(ferry.properties.ETA).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : "No ETA reported"
            }</p><p style="margin:7px 0;font-size:14px;"> Speed: ${
              ferry.properties.SOG
            }</p>`
          )
          .addTo(ferryOverlay);
      } else {
        L.marker(latlang, {
          icon: ferryIcon,
          rotationAngle: bearing,
          rotationOrigin: "center",
        })
          .bindPopup(
            `<div><h3 style="text-align:center;margin-bottom:0;"><strong>${
              ferry.properties.VesselName
            }</strong></h3><p style="margin:7px 0; font-size:14px;"> Destination: ${
              ferry.properties.Destination !== ""
                ? ferry.properties.Destination
                : "No destination reported"
            }</p><p style="margin:7px 0; ; font-size:14px;">ETA: ${
              ferry.properties.ETA !== null
                ? new Date(ferry.properties.ETA).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : "No ETA reported"
            }</p><p style="margin:7px 0; font-size:14px;"> Speed: ${
              ferry.properties.SOG
            }</p>`
          )

          .addTo(ferryOverlay);
      }
    });
  };

  const centerMapView = () => {
    // let {leafletElement}=mapRef.current;
    console.log("centerMapView called", currentView);

    if (ferryMapState !== null) {
      let lat = currentView[1];
      let lng = currentView[0];
      let zoom = currentView[2];

      ferryMapState.setView([currentView[0], currentView[1]], currentView[2]);
      // setState({
      //   ...state,
      //   currentView: [
      //     state.currentView[0],
      //     state.currentView[1],
      //     state.currentView[2],
      //   ],
      // });
    }
  };
  useEffect(() => {
    createFerryMarkers();
    centerMapView();
    // return () => {
    //   cleanup
    // }
  }, [state.timeStamp, currentView]);
  // useEffect(() => {
  //   centerMapView();
  // }, [updatedView]);

  return <Wrapper width="100VW" height="100vh" id="bingmap" ref={mapRef} />;
};
export default Map;
