const urlBase = "http://localhost:8000"

import axios from "axios";
const http = {};

http.urlHttp = (url) => {
  return url.startsWith('http://') || url.startsWith('https://') ? url : `${urlBase}/${url}`
}

http.getToken = () => {
  const token = localStorage.getItem('myToken');
  console.log("El token es "+token);
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };
  return config;
}

http.post = async ( url, data ) => {
  const res = await axios.post(http.urlHttp(url),data,http.getToken())
  .then(response=>{ return response.data })
  .catch(error=>{ return error; })
  return res;
}

http.get = async ( url ) => {
  const res = await axios.get(http.urlHttp(url),http.getToken())
  .then(response=>{ return response.data })
  .catch(error=>{ return error; })
  return res;
}

http.delete = async ( url ) => {
  const res = await axios.delete(http.urlHttp(url),http.getToken())
  .then(response=>{ return response.data })
  .catch(error=>{ return error; })
  return res;
}

http.patch = async ( url ) => {
  const res = await axios.patch(http.urlHttp(url),http.getToken())
  .then(response=>{ return response.data })
  .catch(error=>{ return error; })
  return res;
}

export default http;
