import * as yup from "yup";

const validationSchema = yup.object({
  empresa: yup.object({
    cnpj: yup.string().required("CNPJ é um campo obrigatório"),
    cnae: yup.string().required("CNAE é um campo obrigatório"),
    razao_social: yup.string().required("Razão social é um campo obrigatório"),
    celular: yup.string().required("Celular é um campo obrigatório"),
    telefone_fixo: yup
      .string()
      .required("Telefone fixo é um campo obrigatório"),
    nome_fantasia: yup
      .string()
      .required("Nome fantasia é um campo obrigatório"),
    site: yup
      .string()
      .required("Campo Site é obrigatório")
      .url("Insira um site valido ex: 'https://www.google.com'"),
  }),

  endereco_cnpj: yup.object({
    endereco: yup.string().required("Endereço é um campo obrigatório"),
    cep: yup.string().required("CEP é um campo obrigatório"),
    complemento: yup.string(),
    bairro: yup.string().required("Bairro é um campo obrigatório"),
    numero: yup.string().required("Numero é um campo obrigatório"),
    cidade: yup.string().required("Cidade é um campo obrigatório"),
    estado: yup.string().required("Estado é um campo obrigatório"),
  }),
});

export default validationSchema;
