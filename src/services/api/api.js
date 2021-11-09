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

export { getCountries, getCep, getCnpj };
