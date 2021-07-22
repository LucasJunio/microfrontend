import axios from "axios";

const getCountries = async () => {
  try {
    const res = await axios.get(
      "https://servicodados.ibge.gov.br/api/v1/paises"
    );
    const countries = res.data.map((country) => {
      return country.nome.abreviado;
    });

    return countries;
  } catch (e) {
    console.log(e);
    return ["Erro ao encontrar países"];
  }
};
const api = axios.create({
  baseURL: "http://localhost:80",
});

export { api, getCountries };
