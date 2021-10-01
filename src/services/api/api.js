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
  } catch (error) {
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
  try {
    const res = await axios.post(`${url}/signup/cnpj`, body);
    return { sucess: true, res: res.data };
  } catch (error) {
    return { sucess: false, res: error.response.data.message };
  }
};

const postPf = async (body) => {
  try {
    const res = await axios.post(`${url}/signup/cpf`, body);
    return { sucess: true, res: res.data };
  } catch (error) {
    return { sucess: false, res: error.response.data.message };
  }
};

export { getCountries, getCep, getCnpj, postCnpj, postPf };
