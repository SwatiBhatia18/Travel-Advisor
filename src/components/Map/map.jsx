import React from "react"
import GoogleMapReact from "google-map-react"
import { Paper, Typography, useMediaQuery } from "@material-ui/core"
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined"
import Rating from "@material-ui/lab/Rating"

import useStyles from "./styles"
import mapStyles from "../../mapStyles"

const Map = ({
  setCoordinates,
  setBounds,
  coordinates,
  places,
  setChildClicked,
  weatherData,
}) => {
  const classes = useStyles()
  const isMobile = useMediaQuery("min-width:600px")
  console.log("coordinates1", coordinates)

  return (
    <div className={classes.mapContainer}>
      <GoogleMapReact
        bootstrapURLKeys={{
          key: "AIzaSyAyvTWB1BwrzM1u3tC5AA4ouNhCjz_vCgo",
        }}
        defaultCenter={coordinates}
        center={coordinates}
        defaultZoom={1}
        margin={[50, 50, 50, 50]}
        options={{
          disableDefaultUI: true,
          zoomControl: true,
          styles: mapStyles,
        }}
        onChange={(e) => {
          console.log("checkmap", e)
          setCoordinates({ lat: e.center.lat, lng: e.center.lng })
          setBounds({
            ne: e?.marginBounds?.ne,
            sw: e?.marginBounds?.sw,
          })
        }}
        onChildClick={(child) => {
          setChildClicked(child)
        }}
      >
        {places?.map((place, i) => (
          <div
            className={classes.markerContainer}
            lat={Number(place.latitude)}
            lng={Number(place.longitude)}
            key={i}
          >
            {isMobile ? (
              <LocationOnOutlinedIcon color="primary" fontSize="large" />
            ) : (
              <Paper elevation={3} className={classes.paper}>
                <Typography
                  className={classes.typography}
                  variant="subtitle2"
                  gutterBottom
                >
                  {place?.name}
                </Typography>
                <img
                  className={classes.pointer}
                  src={
                    place.photo
                      ? place?.photo.images.large.url
                      : "https://plus.unsplash.com/premium_photo-1661883237884-263e8de8869b?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bHV4dXJ5JTIwcmVzdGF1cmFudHxlbnwwfHwwfHx8MA%3D%3D"
                  }
                  alt={place.name}
                />
                <Rating size="small" value={Number(place.rating)} readOnly />
              </Paper>
            )}
          </div>
        ))}
        {weatherData && (
          <div lat={weatherData?.coord?.lat} lng={weatherData?.coord?.lon}>
            <img
              src={
                weatherData?.weather?.[0]?.icon
                  ? `http://openweathermap.org/img/wn/${weatherData?.weather?.[0]?.icon}@2x.png`
                  : "https://uxwing.com/wp-content/themes/uxwing/download/weather/weather-icon.png"
              }
              alt="weather"
              height="70px"
            />
          </div>
        )}
      </GoogleMapReact>
    </div>
  )
}

export default Map
