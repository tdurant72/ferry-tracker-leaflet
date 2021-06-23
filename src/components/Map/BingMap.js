import React from "react";
import { MapContainer, TileLayer, LayersControl } from "react-leaflet";
import { BingLayer } from "../../Bing/Bing";

const { BaseLayer } = LayersControl;
import { key } from "../../key";
export default class BingExample extends React.Component {
  constructor() {
    super();
    this.state = {
      geodata: null,
      isadded: false,
    };
  }

  render() {
    const bing_key = key;
    return (
      <MapContainer
        center={[35.264277, -76.833359]}
        zoom={8}
        zoomControl={true}
      >
        <LayersControl position="topright">
          <BaseLayer name="OpenStreetMap.Mapnik">
            <TileLayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" />
          </BaseLayer>
          <BaseLayer checked name="Bing Maps Roads">
            <BingLayer bingkey={bing_key} type="Road" />
          </BaseLayer>
          <BaseLayer checked name="Bing Maps Satelite">
            <BingLayer bingkey={bing_key} />
          </BaseLayer>
          <BaseLayer checked name="Bing Maps Satelite with Labels">
            <BingLayer bingkey={bing_key} type="AerialWithLabels" />
          </BaseLayer>
        </LayersControl>
      </MapContainer>
    );
  }
}
