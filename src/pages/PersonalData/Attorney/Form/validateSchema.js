import * as yup from "yup";

const validationSchema = yup.object({
  usuario: yup.object({
    nome: yup
      .string()
      .min(10, "Nome deve conter no minimo 10 caracteres")
      .required("Nome é obrigatório"),
  }),
  pessoa: yup.object({
    cpf: yup.string().required("CPF é obrigatório"),
    celular: yup.string().required("Celular é obrigatório"),
    nascimento: yup
      .string()
      .required("Nascimento é um campo obrigatório")
      .nullable(),
    naturalidade: yup.string().required("Naturalidade é um campo obrigatório"),
    nacionalidade: yup
      .string()
      .required("Nacionalidade é um campo obrigatório"),
    rg: yup.string().required("RG é um campo obrigatório"),
    emissor: yup.string().required("Orgão emissor é obrigatório"),
    emissao: yup.string().required("Data de emissão é obrigatório").nullable(),
    sexo: yup.string().required("Sexo é um campo obrigatório"),
    estado_civil: yup.string().required("Estado civil é obrigatório"),
    mae: yup.string().required("Mãe é um campo obrigatório"),
    pai: yup.string().required("Pai é um campo obrigatório"),
  }),

  // empresa: yup.object({
  //   cnpj: yup.string().required("CNPJ é um campo obrigatório"),
  //   cnae: yup.string().required("CNAE é um campo obrigatório"),
  //   razao_social: yup.string().required("Razão social é um campo obrigatório"),
  //   // telefone_fixo: yup
  //   //   .string()
  //   //   .required("Telefone fixo é um campo obrigatório"),
  //   // celular_pj: yup.string().required("Celular CNPJ é um campo obrigatório"),
  //   // telefone_fixo: yup.string().required("Telefone fixo é um campo obrigatório"),
  //   nome_fantasia: yup
  //     .string()
  //     .required("Nome fantasia é um campo obrigatório"),
  //   // site: yup.string().required("Site é um campo obrigatório"),
  // }),

  // endereco_cnpj: yup.object({
  //   endereco: yup.string().required("Endereço é um campo obrigatório"),
  //   cep: yup.string().required("CEP é um campo obrigatório"),
  //   complemento: yup.string(),
  //   bairro: yup.string().required("Bairro é um campo obrigatório"),
  //   numero: yup.string().required("Numero é um campo obrigatório"),
  //   cidade: yup.string().required("Cidade é um campo obrigatório"),
  //   estado: yup.string().required("Estado é um campo obrigatório"),
  // }),

  endereco_cpf: yup.object({
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
