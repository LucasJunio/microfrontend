import axios from "axios";
const url = "http://3.233.0.255:3001/api/v1";

const getCountries = async () => {
  try {
    const res = await axios.get(
      "https://servicodados.ibge.gov.br/api/v1/paises"
    );
    const countries = res.data.map((country) => {
      return country.nome.abreviado;
    });

    return countries;
  } catch (error) {
    console.error(error);
    return ["Erro ao encontrar países"];
  }
};

const getCep = async (value) => {
  try {
    const res = await axios.get(`https://viacep.com.br/ws/${value}/json`);
    const cep = res.data;
    return cep;
  } catch (error) {
    console.log(error);
  }
};

const getCnpj = async (value) => {
  try {
    const res = await axios.get(
      `https://consulta-empresa-cnpj-e-socios.p.rapidapi.com/cnpj/${value}`,
      {
        headers: {
          "x-rapidapi-key":
            "bdac259fe4msh125d80880f7225ap14cc31jsn0ee569b9cbfd",
          "x-rapidapi-host": "consulta-empresa-cnpj-e-socios.p.rapidapi.com",
        },
      }
    );
    const cnpj = res.data;
    return cnpj;
  } catch (error) {
    console.error(error);
  }
};

const postCnpj = async (body) => {
  console.log(body);
  try {
    const res = await axios.post(`${url}/signup/cnpj`, body);
    console.log("Dentro do post");
    console.log(res.status);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const api = axios.create({
  baseURL: "http://localhost:80",
});

export { api, getCountries, getCep, getCnpj, postCnpj };
