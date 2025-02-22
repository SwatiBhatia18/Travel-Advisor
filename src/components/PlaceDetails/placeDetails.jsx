import React, { useEffect } from "react"
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Chip,
  CardMedia,
  Button,
} from "@material-ui/core"
import LocationOnIcon from "@material-ui/icons/LocationOn"
import PhoneIcon from "@material-ui/icons/Phone"
import Rating from "@material-ui/lab/Rating"

import useStyles from "./styles"

const PlaceDetails = ({ place, refProp, selected }) => {
  const classes = useStyles()
  console.log("selected", selected)

  useEffect(() => {
    if (selected) {
      console.log({ refProp })

      refProp?.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  }, [selected, refProp])

  return (
    <Card elevation={6} ref={refProp}>
      <CardMedia
        style={{ height: 350 }}
        image={
          place.photo
            ? place?.photo.images.large.url
            : "https://plus.unsplash.com/premium_photo-1661883237884-263e8de8869b?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bHV4dXJ5JTIwcmVzdGF1cmFudHxlbnwwfHwwfHx8MA%3D%3D"
        }
        title={place?.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5">
          {place.name}
        </Typography>

        <Box display="flex" justifyContent="space-between">
          <Rating value={Number(place.rating)} readOnly />

          <Typography gutterBottom variant="subtitle1">
            out of {place.num_reviews} reviews
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="subtitle1">Price</Typography>
          <Typography gutterBottom variant="subtitle1">
            {place.price_level}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="subtitle1">Ranking</Typography>
          <Typography gutterBottom variant="subtitle1">
            {place.ranking}
          </Typography>
        </Box>
        {place?.awards?.map((award, i) => (
          <Box my={1} display="flex" justifyContent="space-between">
            <img src={award.images.small} alt={award.display_name} />
            <Typography variant="subtitle2" color="textSecondary">
              {award.display_name}
            </Typography>
          </Box>
        ))}
        {place?.cuisine?.map(({ name }) => (
          <Chip key={name} size="small" label={name} className={classes.chip} />
        ))}
        {place?.address && (
          <Typography
            gutterBottom
            variant="subtitle2"
            color="textSecondary"
            className={classes.subtitle}
          >
            <LocationOnIcon /> {place.address}
          </Typography>
        )}
        {place?.phone && (
          <Typography
            gutterBottom
            variant="subtitle2"
            color="textSecondary"
            className={classes.spacing}
          >
            <PhoneIcon /> {place.phone}
          </Typography>
        )}
        <CardActions>
          <Button
            size="small"
            color="primary"
            onClick={() => {
              window.open(place?.web_url, "_blank")
            }}
          >
            Trip Advisor
          </Button>
          <Button
            size="small"
            color="primary"
            onClick={() => {
              window.open(place?.website, "_blank")
            }}
          >
            Website
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  )
}

export default PlaceDetails
