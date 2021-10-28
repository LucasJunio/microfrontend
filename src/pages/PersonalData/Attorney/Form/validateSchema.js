import * as yup from "yup";

const validationSchema = yup.object({
  usuario: yup.object({
    nome: yup
      .string()
      .min(10, "Nome deve conter no minimo 10 caracteres")
      .required("Nome é obrigatório"),
    email: yup
      .string()
      .email("Insira um email valido")
      .required("Email é obrigatório"),
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
  conta: yup.object({
    banco: yup.string().required("Estado é um campo obrigatório"),
    agencia: yup.string().required("Agência é um campo obrigatório"),
    conta: yup.string().required("Conta é um campo obrigatório"),
    pix: yup.string().required("Pix é um campo obrigatório"),
  }),
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
