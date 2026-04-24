import axios from 'axios';

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// Şehir ismine göre hava durumunu getir
export const getWeatherByCity = async (city) => {
  try {
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric',
        lang: 'tr'
      }
    });
    return response.data;
  } catch (error) {
    console.error('❌ API hatası:', error.response?.status, error.message);
    
    // Eğer 401 hatası alırsak, kullanıcıya bilgi ver
    if (error.response?.status === 401) {
      throw new Error('API anahtarı henüz aktif değil. Lütfen biraz bekleyin ve tekrar deneyin.');
    }
    throw error;
  }
};

// Koordinatlara göre hava durumunu getir (GPS için)
export const getWeatherByCoords = async (lat, lon) => {
  try {
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        lat: lat,
        lon: lon,
        appid: API_KEY,
        units: 'metric',
        lang: 'tr'
      }
    });
    return response.data;
  } catch (error) {
    console.error('❌ API hatası:', error.response?.status, error.message);
    
    if (error.response?.status === 401) {
      throw new Error('API anahtarı henüz aktif değil. Lütfen biraz bekleyin ve tekrar deneyin.');
    }
    throw error;
  }
};

// 5 günlük hava tahminini getir
export const getForecastByCity = async (city) => {
  try {
    const response = await axios.get(`${BASE_URL}/forecast`, {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric',
        lang: 'tr'
      }
    });
    return response.data;
  } catch (error) {
    console.error('❌ API hatası (Tahmin):', error.response?.status, error.message);
    throw error;
  }
};