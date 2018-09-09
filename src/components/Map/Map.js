import React from "react";
import MapStyles from '../../utils/mapStyles.json';
import { GoogleMap, withGoogleMap, withScriptjs, Marker } from "react-google-maps"

const Map =  withScriptjs(withGoogleMap((props) =>
<GoogleMap
  defaultZoom={10}
  defaultCenter={{ lat: 33.6701727, lng: -7.3920681 }}
  defaultOptions={{ styles: MapStyles }}
>
  {props.isMarkerShown && <Marker position={{ lat: 33.6701727, lng: -7.3920681 }} />}
</GoogleMap>
))

export default Map;