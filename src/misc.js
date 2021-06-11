const createFerrMarkers = () => {
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
        .openPopup()
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
        .openPopup()
        .addTo(ferryOverlay);
    }
  });
};
