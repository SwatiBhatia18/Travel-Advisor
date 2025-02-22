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
        'x-rapidapi-key': 'b5f9aaa8e4mshe8cb760cc1e3bafp132fe6jsnf8297260413f',
        'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
      },
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
          'x-rapidapi-key': 'd5072d1f14msh210ab3ac6de2e53p127892jsn755011b31216',
          'x-rapidapi-host': 'open-weather13.p.rapidapi.com'
        }
      });

      return data;
    }

    
  } catch (error) {
    console.log(error);
  }
}