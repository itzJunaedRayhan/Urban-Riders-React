import React, { Component } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';
const mapStyles = {
  width: '500px',
  height: '400px',
  margin: '0',
  overflow: 'hidden'
};

export class MapContainer extends Component {
  render() {
    return (
      <Map
        google={this.props.google}
        zoom={14}
        style={mapStyles}
        initialCenter={
          {
            lat: -1.2884,
            lng: 36.8233
          }
        }
      />
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAvNEFTT643PG4-aoGh7EI3t_k4vuo9ExA'
})(MapContainer);