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

const sendTokenSms = (token) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.get(`${url}/validation/sms/${token}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      resolve(res.data);
    } catch (error) {
      console.log(error);
      reject(error.response.data.name); //todo correction message backend
    }
  });
};

const sendValidationStatus = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.get(`${url}/validation/status`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      resolve(res.data);
    } catch (error) {
      reject(error.response.data.message); //todo correction message backend
    }
  });
};

const changeCellphone = (cel) => {
  return new Promise(async (resolve, reject) => {
    const data = {
      celular: cel,
    };

    const options = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };

    try {
      const res = await axios.put(`${url}/person/cellphone`, data, options);
      resolve(res.data);
    } catch (error) {
      console.log(error);
      reject(error.response.data.message); //todo correction message backend
    }
  });
};

const resendTokenSms = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.get(`${url}/validation/resendsms`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      resolve(res.data.message);
    } catch (error) {
      reject(error.response.data.message); //todo correction message backend
    }
  });
};

const api = axios.create({
  baseURL: "http://localhost:80",
});

export {
  api,
  getCountries,
  getCep,
  getCnpj,
  postCnpj,
  postPf,
  sendTokenSms,
  sendValidationStatus,
  changeCellphone,
  resendTokenSms,
};
