import React, { useEffect, useState } from "react"
import { CssBaseline, Grid } from "@material-ui/core"

import { getPlacesData, getWeatherData } from "./api"
import Header from "./components/Header/header.jsx"
import List from "./components/List/list.jsx"
import Map from "./components/Map/map.jsx"

const App = () => {
  const [places, setPlaces] = useState([])
  const [autocomplete, setAutocomplete] = useState(null)
  const [filteredPlaces, setFilteredPlaces] = useState([])
  const [coordinates, setCoordinates] = useState({})
  const [bounds, setBounds] = useState({})
  const [childClicked, setChildClicked] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [type, setType] = useState("restaurants")
  const [rating, setRating] = useState("")
  const [weatherData, setWeatherData] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        console.log("checking", latitude, longitude)
        setCoordinates({
          lat: latitude,
          lng: longitude,
        })
      }
    )
  }, [])

  useEffect(() => {
    const filteredPlaces = places?.filter((place) => place.rating > rating)
    setFilteredPlaces(filteredPlaces)
  }, [rating])

  useEffect(() => {
    if ( bounds.sw && bounds.ne) {
      setIsLoading(true);

      getWeatherData(coordinates.lat, coordinates.lng)
        .then((data) => setWeatherData(data));

      getPlacesData(type, bounds.sw, bounds.ne)
        .then((data) => {
          setPlaces(data?.filter((place) => place.name && place.num_reviews > 0));
          setFilteredPlaces([]);
          setRating('');
          setIsLoading(false);
        });
    }
  }, [bounds, type]);


  const onLoad = (autoC) => setAutocomplete(autoC)

  const onPlaceChanged = () => {
    const lat = autocomplete?.getPlace()?.geometry?.location?.lat()
    const lng = autocomplete?.getPlace()?.geometry?.location?.lng()

    setCoordinates({ lat, lng })
  }

  return (
    <>
      <CssBaseline />
      <Header onPlaceChanged={onPlaceChanged} onLoad={onLoad} />
      <Grid container spacing={3} style={{ width: "100%" }}>
        <Grid item xs={12} md={4}>
          <List
            places={filteredPlaces?.length > 0 ? filteredPlaces : places}
            childClicked={childClicked}
            isLoading={isLoading}
            type={type}
            setType={setType}
            rating={rating}
            setRating={setRating}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map
            setBounds={setBounds}
            setCoordinates={setCoordinates}
            coordinates={coordinates}
            places={filteredPlaces?.length > 0 ? filteredPlaces : places}
            setChildClicked={setChildClicked}
            weatherData={weatherData}
          />
        </Grid>
      </Grid>
    </>
  )
}
export default App
