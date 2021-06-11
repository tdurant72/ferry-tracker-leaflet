const views = [
  {
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: [35.264277, -76.833359],
    },
    properties: {
      id: 1,
      title: "All",
      zoom: 8,
      emergency: false,
    },
  },
  {
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: [36.467736, -75.968532],
    },
    properties: {
      id: 2,
      title: "Currituck / Knotts Island",
      zoom: 13,
      emergency: false,
      routeType: "Non-Toll No Reservation",
      ferryType: "Vehicle",
    },
  },
  {
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: [35.399628, -76.76145],
    },
    properties: {
      id: 4,
      title: "Pamlico River",
      // title: "Bayview to Aurora",
      zoom: 13,
      emergency: false,
      routeType: "Non-Toll No Reservation",
      ferryType: "Vehicle",
    },
  },
  {
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: [35.241879, -76.195476],
    },
    properties: {
      id: 5,
      title: "Ocracoke / Swan Quarter",
      zoom: 11,
      emergency: false,
      routeType: "Reservation Drive-Up",
      ferryType: "Vehicle",
    },
  },
  {
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: [35.195676, -75.764501],
    },
    properties: {
      id: 6,
      title: "Passenger",
      // title: "Ocracoke to Hatteras",
      zoom: 13,
      routeType: "Reservation Walk-Up",
      ferryType: "Passenger",
    },
  },
  {
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: [35.196538, -75.76559],
    },
    properties: {
      id: 7,
      title: "Hatteras Inlet",
      zoom: 13,
      emergency: false,
      routeType: "Non-Toll No Reservation Accepts Priority Passes",
      ferryType: "Vehicle",
    },
  },
  {
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: [35.067975, -76.17428],
    },
    properties: {
      id: 9,
      title: "Cedar Island / Ocracoke ",
      zoom: 11,
      emergency: false,
      routeType: "Reservation Drive-Up",
      ferryType: "Vehicle",
    },
  },
  {
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: [34.951115, -76.808493],
    },
    properties: {
      id: 10,
      title: "Cherry Branch / Minnesott",
      zoom: 13,
      emergency: false,
      routeType: "Non-Toll No Reservation",
      ferryType: "Vehicle",
    },
  },
  {
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: [33.947015, -77.968066],
    },
    properties: {
      id: 11,
      title: "Southport / Fort Fisher",
      zoom: 14,
      emergency: false,
      routeType: "No Reservation Drive-Up",
      ferryType: "Vehicle",
    },
  },
  {
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: [35.623659, -75.613612],
    },
    properties: {
      id: 3,
      title: "Emergency Response Route",
      // title: "Rodanthe to Stumpy Point",
      zoom: 10,
      emergency: true,
      routeType: "Emergency Non-Toll No Reservation",
      ferryType: "Vehicle",
    },
  },
  {
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: [35.401973, -75.594215],
    },
    properties: {
      id: 8,
      title: "Emergency Response Route - Secondary",
      // title: "Hatteras to Stumpy Point",
      zoom: 10,
      emergency: true,
      routeType: "Emergency Non-Toll No Reservation",
      ferryType: "Vehicle",
    },
  },
];
export default views;
