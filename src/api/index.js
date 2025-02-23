/* eslint-disable consistent-return */
import axios from 'axios';

export const getPlacesData = async (type, sw, ne) => {
  try {
    const { data: { data } } = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, {
      params: {
        bl_latitude: sw.lat,
        bl_longitude: sw.lng,
        tr_longitude: ne.lng,
        tr_latitude: ne.lat,
      },
      headers: {
        'x-rapidapi-key': '5eaa605aadmsh7b3f8e07f6c68d0p118b32jsna6767d8b06b2',
        'x-rapidapi-host': 'travel-advisor.p.rapidapi.com'
      }
    });

    return data;
  } catch (error) {
    console.log(error);
  }
};


export const getWeatherData = async (lat, lng) => {
  try {
    if (lat && lng) {
      const { data } = await axios.get(`https://open-weather13.p.rapidapi.com/city/latlon/${lat}/${lng}`, {
        headers: {
          'x-rapidapi-key': '5eaa605aadmsh7b3f8e07f6c68d0p118b32jsna6767d8b06b2',
          'x-rapidapi-host': 'open-weather13.p.rapidapi.com'
        }
      });

      return data;
    }

    
  } catch (error) {
    console.log(error);
  }
}