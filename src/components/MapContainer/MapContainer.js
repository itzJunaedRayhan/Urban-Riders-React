import React, { Component } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';
const mapStyles = {
  width: '100%',
  minHeight: '400px',
  margin: '0',
  overflow: 'hidden',
  boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.5)'
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
  apiKey: 'AIzaSyBU4y0Nztn8WrQhh0fQRMNLrKsRs-WVJcU'
})(MapContainer);