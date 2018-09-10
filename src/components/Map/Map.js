import React from "react";
import L from "leaflet";
import markerIcon from "../../utils/img/marker-icon.png";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
const position = [33.6701727, -7.3920681];
const URL =
  "https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png";
//const MapURL ='https://api.mapbox.com/styles/v1/jamalhassouni/cjlwg7vu43bqf2snxsv9dkt9h/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiamFtYWxoYXNzb3VuaSIsImEiOiJjamtzZ2x2bGQzc2NiM2twajdkaXQ3cG56In0.yqMUK9U4dpm_hlDqq7cuvw';
const customMarker = L.icon({
  iconUrl: markerIcon
});
const Mapy = () => {
  return (
    <Map center={position} zoom={13}>
      <TileLayer
        attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
        url={URL}
      />
      <Marker position={position} icon={customMarker}>
        <Popup>
          LOTISSEMENT EL Fath 2 N° 509, <br />
          Mohammedia, Morocco.
        </Popup>
      </Marker>
    </Map>
  );
};

export default Mapy;
