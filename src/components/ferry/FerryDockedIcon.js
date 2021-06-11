import React, { Component, useEffect, useState } from "react";

import { L, Icon } from "leaflet";

const FerryDockedIcon = () => {
  new Icon({
    iconUrl: "/dockedFerry.svg",
    iconSize: [30, 30],
  });
};
export default FerryDockedIcon;
