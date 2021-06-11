"use strict";
import React from "react";
import { PropTypes } from "react";
import { TileLayer } from "react-leaflet";
import { L } from "leaflet";

require("leaflet-plugins/layer/tile/Bing.js");

export default class BingTileLayer extends TileLayer {
  static propTypes = {
    bingKey: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  };

  componentWillMount() {
    super.componentWillMount();
    this.leafletElement = new L.BingLayer(this.props.bingKey, {
      type: this.props.type,
    });
  }
}
