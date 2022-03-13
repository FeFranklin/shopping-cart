import axios from "axios";

const http = axios.create({
  baseURL: "/api",
  headers: {
    "Content-type": "application/json"
  }
});

const getAcima = () => {
  return http.get("/acima");
};

const getAbaixo = () => {
  return http.get("/abaixo");
};

export default { getAcima, getAbaixo };
