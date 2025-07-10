import axios from 'axios'
export default axios.create({
    baseURL:"https://api.openweathermap.org",
    params:{
        appid:process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY,
        units:'metric',
        lang:'en'
    }
})