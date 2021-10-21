import * as yup from "yup";

const validationSchema = yup.object({
  usuario: yup.object({
    nome: yup
      .string()
      .min(10, "Nome deve conter no minimo 10 caracteres")
      .required("Nome é obrigatório"),
  }),
  pessoa: yup.object({
    nascimento: yup.date("dd/mm/yyyy", "Data tá errada"),
  }),
});

export default validationSchema;
