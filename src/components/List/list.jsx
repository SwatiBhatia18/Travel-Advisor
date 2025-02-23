import React, { useEffect, useState, createRef } from "react"
import {
  CircularProgress,
  Grid,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@material-ui/core"

import PlaceDetails from "../PlaceDetails/placeDetails.jsx"

import useStyles from "./styles"

const List = ({
  places,
  childClicked,
  isLoading,
  type,
  setType,
  rating,
  setRating,
}) => {
  const classes = useStyles()
  const [elRefs, setElRefs] = useState([])

  useEffect(() => {
    const refs = Array(places?.length)
      .fill()
      .map((_, i) => elRefs[i] || createRef())
    setElRefs(refs)
  }, [places])

  console.log("elRefs", elRefs)

  return (
    <div className={classes.container}>
      <Typography
        variant="h4"
        color="primary"
        style={{
          fontWeight: "bold",
        }}
      >
        Restaurants, Hotels and Attaractions around you
      </Typography>
      {isLoading ? (
        <div className={classes.loading}>
          <CircularProgress size="5rem" />
        </div>
      ) : (
        <>
          {" "}
          <FormControl className={classes.formControl}>
            <InputLabel>Type</InputLabel>
            <Select value={type} onChange={(e) => setType(e.target.value)}>
              <MenuItem value="restaurants">Restaurants</MenuItem>
              <MenuItem value="hotels">Hotels</MenuItem>
              <MenuItem value="attractions">Attaractions</MenuItem>
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel>Rating</InputLabel>
            <Select value={rating} onChange={(e) => setRating(e.target.value)}>
              <MenuItem value={0}>All</MenuItem>
              <MenuItem value={3}>Above 3.0</MenuItem>
              <MenuItem value={4}>Above 4.0</MenuItem>
              <MenuItem value={4.5}>Above 4.5</MenuItem>
            </Select>
          </FormControl>
          <Grid container spacing={3} className={classes.list}>
            {places?.map((place, i) => {
              console.log(
                "check1",
                childClicked,
                i,
                place,
                Number(childClicked) === i
              )

              return (
                <Grid item key={i} xs={12}>
                  <PlaceDetails
                    place={place}
                    refProp={elRefs[i]}
                    selected={Number(childClicked) === i}
                  />
                </Grid>
              )
            })}
          </Grid>
        </>
      )}
    </div>
  )
}

export default List
