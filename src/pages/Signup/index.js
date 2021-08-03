import "@fontsource/roboto";
import React, { useState, useRef, useEffect } from "react";
import $ from "jquery";
import { useFormik } from "formik";
// react component for creating beautiful carousel
import { useSnackbar } from "notistack";
import Carousel from "react-slick";
import { Backdrop, CircularProgress, Grid } from "@material-ui/core";

import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody";
import { SlideOne } from "./slides/SlideOne/index";
import { SlideTwo } from "./slides/SlideTwo/index";
import { SlideThree } from "./slides/SlideThree/index";
import { SlideFour } from "./slides/SlideFour/index";
import { SlideFive } from "./slides/SlideFive/index";
import { SlideSix } from "./slides/SlideSix/index";
import logo from "../../assets/images/logo_vileve_way.png";
import sha256 from "crypto-js/sha256";
import { ClassBackground, Loading, Spinner, useStyles } from "./styles";
import * as yup from "yup";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import {
  insertAddressCPFRequest,
  insertAddressCNPJRequest,
} from "../../store/modules/address/actions";
import { insertEnterpriseRequest } from "../../store/modules/enterprise/actions";
import { signupSuccess } from "../../store/modules/signup/actions";
import "./stylepagination.scss";
import { maskNumber } from "../../utils/string/masks";
import { validateCpf } from "../../utils/string/validateCpf";
import { postCnpj } from "../../services/api/api";

export default function SectionCarousel() {
  const slickRef = useRef();
  const classes = useStyles();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const dotActive = "pagination__link";
  const dotInactive = "pagination__link is_active";
  const [Showloading, setShowloading] = useState("none");
  // const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [celular, setCelular] = useState("");
  const [cpf, setCPF] = useState("");
  const [senha, setSenha] = useState("");
  const [senha2, setSenha2] = useState("");
  const [ColorInputClass, setColorInputClass] = useState(false);
  const [ColorInputClass2, setColorInputClass2] = useState(false);
  const [Iconsenha, setIconSenha] = useState("lock_Outline");
  const [cep, setCEP] = useState("");
  const [nascimento, setNASCIMENTO] = useState("");
  const [rg, setRG] = useState("");
  const [emissor, setEMISSOR] = useState("");
  const [emissao, setEMISSAO] = useState("");
  const [sexo, setSEXO] = useState("");
  const [endereco, setENDERECO] = useState("");
  const [numero, setNUMERO] = useState("");
  const [bairro, setBAIRRO] = useState("");
  const [complemento, setCOMPLEMENTO] = useState("");
  const [cidade, setCIDADE] = useState("");
  const [estado, setESTADO] = useState("");
  const [estado_civil, setESTADOCIVIL] = useState("");
  const [naturalidade, setNATURALIDADE] = useState("");
  const [nacionalidade, setNACIONALIDADE] = useState("");
  const [mae, setMAE] = useState("");
  const [pai, setPAI] = useState("");
  const [razaosocial, setRAZAOSOCIAL] = useState("");
  const [nome_fantasia, setNOMEFANTASIA] = useState("");
  const [cnpj, setCNPJ] = useState("");
  const [telefone, setTELEFONE] = useState("");
  const [site, setSITE] = useState("");
  const [ceppj, setCEPPJ] = useState("");
  const [cnae, setCNAE] = useState("");
  const [enderecopj, setENDERECOPJ] = useState("");
  const [numeropj, setNUMEROPJ] = useState("");
  const [bairropj, setBAIRROPJ] = useState("");
  const [estadopj, setESTADOPJ] = useState("");
  const [cidadepj, setCIDADEPJ] = useState("");
  const [complementopj, setCOMPLEMENTOPJ] = useState("");
  const [bancopj, setBANCOPJ] = useState("");
  const [agenciapj, setAGENCIAPJ] = useState("");
  const [contapj, setCONTAPJ] = useState("");
  const [pixpj, setPIXPJ] = useState("");
  const [operacaopj, setOPERACAOPJ] = useState("");
  const [dot1, setDOT1] = useState(dotActive);
  const [dot2, setDOT2] = useState(dotInactive);
  const [dot3, setDOT3] = useState(dotInactive);
  const [dot4, setDOT4] = useState(dotInactive);
  const [dot5, setDOT5] = useState(dotInactive);
  const [dot6, setDOT6] = useState(dotInactive);
  const [open, setOpen] = useState(false);
  const [hideSlide2, setHideSlide2] = useState(false);
  const [hideSlide3, setHideSlide3] = useState(false);
  const [hideSlide4, setHideSlide4] = useState(false);
  const [hideSlide5, setHideSlide5] = useState(false);
  const [hideSlide6, setHideSlide6] = useState(false);

  const validationSchema = yup.object({
    nome: yup
      .string()
      .trim()
      .required("Nome é obrigatório")
      .matches(/^[aA-zZáàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ\s]+$/, "Somente letras")
      .min(10, "Nome completo deve conter no minimo 10 caractéries")
      .max(40, "Máximo de 40 caractéries"),
    email: yup
      .string()
      .trim()
      .email("Não é um e-mail válido")
      .required("Favor informar e-mail"),
    senha: yup
      .string()
      .required("Por favor, insira sua senha")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        `A senha deve conter mínimo de oito caracteres, pelo menos, uma letra maiúscula, uma letra minúscula, números e um caractere especial`
      )
      .trim(),
    senha2: yup
      .string()
      .oneOf([yup.ref("senha")], "A senha não confere")
      .required("Por favor, insira a senha")
      .trim(),
    cpf: yup.string().required("CPF é obrigatório"),
    nascimento: yup
      .string()
      .required("Data de nascimento é obrigatória")
      .trim(),
    naturalidade: yup
      .string()
      .required("O campo naturalidade é obrigatório")
      .trim(),
    nacionalidade: yup.string().required("O campo nacionalidade é obrigatório"),
    sexo: yup.string().required("O campo sexo é obrigatório"),
    cep: yup.string().required("O campo CEP é obrigatório"),
    endereco: yup.string().required("O campo endereço é obrigatório").trim(),
    numero: yup.string().required("O campo número é obrigatório"),
    bairro: yup.string().required("O campo bairro é obrigatório").trim(),
    cidade: yup.string().required("O campo cidade é obrigatório").trim(),
    estado: yup.string().required("O campo estado é obrigatório").trim(),
    cnpj: yup.string().required("Campo CNPJ é obrigatório"),
    nome_fantasia: yup
      .string()
      .required("Campo nome fantasia é obrigatório")
      .trim(),
    telefone: yup.string().required("Campo telefone é obrigatório"),
    razaosocial: yup
      .string()
      .required("Campo Razão Social é obrigatório")
      .trim(),
    cnae: yup.number().required("Campo CNAE é obrigatório"),
    ceppj: yup.number().required("Campo CEP é obrigatório"),
    enderecopj: yup.string().required("Campo Endereço é obrigatório").trim(),
    numeropj: yup.number().required("Campo número é obrigatório"),
    bairropj: yup.string().required("Campo Bairro é obrigatório").trim(),
    cidadepj: yup.string().required("Campo cidade é obrigatório").trim(),
    estadopj: yup.string().required("Campo estado é obrigatório").trim(),
    bancopj: yup.string().required("Campo banco é obrigatório"),
    agenciapj: yup.number().required("Campo agência é obrigatório"),
    contapj: yup.number().required("Campo conta é obrigatório"),
    site: yup.string().url("Insira um site valido"),
  });

  const formik = useFormik({
    initialValues: {
      nome: "",
      email,
      senha,
      senha2,
      cpf,
      celular,
      nascimento,
      naturalidade,
      nacionalidade,
      sexo,
      estado_civil,
      rg,
      emissor,
      emissao,
      sexo,
      mae,
      pai,
      cep,
      endereco,
      numero,
      bairro,
      complemento,
      cidade,
      estado,
      cnpj,
      telefone,
      site,
      razaosocial,
      cnae,
      nome_fantasia,
      ceppj,
      enderecopj,
      numeropj,
      bairropj,
      cidadepj,
      complementopj,
      cidadepj,
      estadopj,
      bancopj,
      agenciapj,
      contapj,
      operacaopj,
      pixpj,
    },
    validationSchema,
    onSubmit: (values) => {
      if (
        !!formik.values.bancopj &&
        !!formik.values.agenciapj &&
        !!formik.values.contapj
      ) {
        // console.log(values);
        const body = {
          usuario: {
            nome: values.nome,
            email: values.email,
            senha: sha256(values.senha).toString().trim(),
          },
          pessoa: {
            cpf: maskNumber(values.cpf),
            celular: maskNumber(values.celular),
            nascimento: values.nascimento,
            naturalidade: values.naturalidade,
            nacionalidade: values.nacionalidade,
            estado_civil: values.estado_civil,
            rg: values.rg,
            emissor: values.emissor,
            emissao: values.emissao,
            sexo: values.sexo,
            mae: values.mae,
            pai: values.pai,
          },
          empresa: {
            cnpj: maskNumber(values.cnpj),
            cnae: values.cnae,
            razao_social: values.razaosocial,
            telefone_fixo: maskNumber(values.telefone),
            celular: maskNumber(values.celular),
            nome_fantasia: values.nome_fantasia,
            site: values.site,
          },
          conta: {
            banco: values.bancopj.toString(),
            agencia: maskNumber(values.agenciapj),
            conta: maskNumber(values.contapj),
            operacao: maskNumber(values.operacaopj),
            pix: values.pixpj,
          },
          endereco_cnpj: {
            cep: maskNumber(values.cep),
            complemento: values.complementopj,
            endereco: values.enderecopj,
            numero: maskNumber(values.numeropj),
            bairro: values.bairropj,
            cidade: values.cidadepj,
            estado: values.estadopj,
          },
          endereco_cpf: {
            cep: maskNumber(values.cep),
            complemento: values.complemento,
            endereco: values.endereco,
            numero: values.numeropj,
            bairro: values.bairro,
            cidade: values.cidade,
            estado: values.estado,
          },
        };

        const isPosted = async () => {
          setOpen(true);
          const res = await postCnpj(body);
          setOpen(false);
          if (res) {
            console.log("Passar para pagina de token");
            top.location.href = "/";
          } else {
            enqueueSnackbar(
              "Não foi possível cadastrar agora, por favor, tente mais tarde",
              {
                variant: "error",
              }
            );
          }
          // console.log(res);
          return res;
        };
        isPosted();
      } else {
        enqueueSnackbar("Campos obrigatórios não preenchidos", {
          variant: "error",
        });
      }
    },
  });

  const settings = {
    dots: false,
    infinite: false,
    speed: 300,
    // fade:true,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: false,
    autoplay: false,
    initialSlide: 0,
    touchMove: false,
    draggable: false,
    arrows: false,
  };

  const handleBackdrop = (isOpen) => {
    setOpen(isOpen);
  };

  const Step1NEXT = () => {
    if (
      !!formik.errors.nome ||
      !!formik.errors.email ||
      !!formik.errors.senha ||
      !!formik.errors.senha2
    ) {
      enqueueSnackbar("Preencha todos os campos como nas instruções", {
        variant: "error",
      });
    } else {
      if (
        !!formik.values.nome &&
        !!formik.values.email &&
        !!formik.values.senha &&
        !!formik.values.senha2
      ) {
        setHideSlide2(true);
        slickRef.current.slickNext();
        setDOT1(dotInactive);
        setDOT2(dotActive);
      } else {
        enqueueSnackbar("Campos obrigatórios não preenchidos", {
          variant: "error",
        });
      }
    }
  };

  const Step2PJ = () => {
    setHideSlide3(true);
    slickRef.current.slickNext();
    setDOT2(dotInactive);
    setDOT3(dotActive);
  };

  const Step2PF = () => {
    // Pessoa física será implementado
  };

  const Step3NEXT = () => {
    if (validateCpf(formik.values.cpf)) {
      if (
        !!formik.values.nascimento &&
        !!formik.values.naturalidade &&
        !!formik.values.nacionalidade &&
        !!formik.values.sexo
      ) {
        setHideSlide4(true);
        slickRef.current.slickNext();
        setDOT3(dotInactive);
        setDOT4(dotActive);
      } else {
        enqueueSnackbar("Campos obrigatórios não preenchidos", {
          variant: "error",
        });
      }
    } else {
      enqueueSnackbar("Desculpe, informe um cpf válido!", {
        variant: "error",
      });
    }
  };

  const Step4NEXT = () => {
    if (
      !!formik.values.cep &&
      !!formik.values.endereco &&
      !!formik.values.numero &&
      !!formik.values.bairro &&
      !!formik.values.cidade &&
      !!formik.values.estado
    ) {
      setHideSlide5(true);
      slickRef.current.slickNext();
      setDOT4(dotInactive);
      setDOT5(dotActive);
      insertAddressCPFRequest({
        cep: maskNumber(cep),
        complemento,
        endereco,
        bairro,
      });
    } else {
      enqueueSnackbar("Campos obrigatórios não preenchidos", {
        variant: "error",
      });
    }
  };

  const Step5NEXT = () => {
    if (
      !!formik.values.cnpj &&
      !!formik.values.telefone &&
      !!formik.values.razaosocial &&
      !!formik.values.cnae &&
      !!formik.values.nome_fantasia &&
      !!formik.values.ceppj &&
      !!formik.values.enderecopj &&
      !!formik.values.numeropj &&
      !!formik.values.bairropj &&
      !!formik.values.cidadepj &&
      !!formik.values.estadopj
    ) {
      setHideSlide6(true);
      slickRef.current.slickNext();
      setDOT5(dotInactive);
      setDOT6(dotActive);
      insertAddressCNPJRequest({
        cep: maskNumber(ceppj),
        complemento: complementopj,
        endereco: enderecopj,
        numero: maskNumber(numeropj),
        bairro: bairropj,
      });
      insertEnterpriseRequest({
        cnpj: maskNumber(cnpj),
        cnae: cnae,
        razao_social: razaosocial,
        telefone_fixo: maskNumber(telefone),
        celular: maskNumber(celular),
        nome_fantasia: nome_fantasia,
        site: site,
      });
    } else {
      enqueueSnackbar("Campos obrigatórios não preenchidos", {
        variant: "error",
      });
    }
  };

  const Step2PREV = () => {
    setHideSlide2(false);
    slickRef.current.slickPrev();
    setDOT2(dotInactive);
    setDOT1(dotActive);
  };

  const Step3PREV = () => {
    setHideSlide3(false);
    slickRef.current.slickPrev();
    setDOT3(dotInactive);
    setDOT2(dotActive);
  };

  const Step4PREV = () => {
    setHideSlide4(false);
    slickRef.current.slickPrev();
    setDOT4(dotInactive);
    setDOT3(dotActive);
  };

  const Step5PREV = () => {
    setHideSlide5(false);
    slickRef.current.slickPrev();
    setDOT5(dotInactive);
    setDOT4(dotActive);
  };

  const Step6PREV = () => {
    setHideSlide6(false);
    slickRef.current.slickPrev();
    setDOT6(dotInactive);
    setDOT5(dotActive);
  };

  const Step6NEXT = () => {
    // slickRef.current.slickNext();setDOT6(dotInactive);setDOT7(dotActive)
  };

  const [openmodal, setOpenmodal] = useState(false);
  const handleClose = () => {
    setOpenmodal(false);
    top.location.href = "/";
  };

  return (
    <>
      <Grid container direction="column" style={{ position: "absolute" }}>
        <Backdrop className={classes.backdrop} open={open}>
          <CircularProgress color="inherit" />
        </Backdrop>
        <Grid item style={{ height: "85px" }}>
          <img src={logo} className={classes.logo} alt="logotipo"></img>
        </Grid>
        <Grid item lg={12}>
          <Grid container justify="flex-end" alignItems="center">
            <Grid item style={{ height: "0px" }}>
              <ul className="pagination">
                <li className="pagination__item">
                  <a href="#" className={dot1}></a>
                </li>
                <li className="pagination__item">
                  <a href="#" className={dot2}></a>
                </li>
                <li className="pagination__item">
                  <a href="#" className={dot3}></a>
                </li>
                <li className="pagination__item">
                  <a href="#" className={dot4}></a>
                </li>
                <li className="pagination__item">
                  <a href="#" className={dot5}></a>
                </li>
                <li className="pagination__item">
                  <a href="#" className={dot6}></a>
                </li>
              </ul>
            </Grid>
          </Grid>
        </Grid>
        <Grid item zeroMinWidth xs={12} md={12} lg={12}>
          <Grid container>
            <Grid item zeroMinWidth xs={12} md={12}>
              <Grid container alignItems="center" justify="center">
                <Grid item xs={12} md={12}>
                  <form
                    onSubmit={formik.handleSubmit}
                    style={{ height: "0px" }}
                  >
                    <Card className={classes.cardStyle}>
                      <CardBody>
                        <Carousel ref={slickRef} {...settings}>
                          <SlideOne nextStep={Step1NEXT} formik={formik} />
                          {hideSlide2 ? (
                            <SlideTwo
                              nextStep={Step2PJ}
                              StepPF={Step2PF}
                              previousStep={Step2PREV}
                            />
                          ) : (
                            ""
                          )}
                          {hideSlide3 ? (
                            <SlideThree
                              nextStep={Step3NEXT}
                              previousStep={Step3PREV}
                              formik={formik}
                            />
                          ) : (
                            ""
                          )}
                          {hideSlide4 ? (
                            <SlideFour
                              nextStep={Step4NEXT}
                              previousStep={Step4PREV}
                              formik={formik}
                              waitCep={handleBackdrop}
                            />
                          ) : (
                            ""
                          )}
                          {hideSlide5 ? (
                            <SlideFive
                              nextStep={Step5NEXT}
                              previousStep={Step5PREV}
                              formik={formik}
                              waitCnpj={handleBackdrop}
                            />
                          ) : (
                            ""
                          )}
                          {hideSlide6 ? (
                            <SlideSix
                              previousStep={Step6PREV}
                              formik={formik}
                            />
                          ) : (
                            ""
                          )}
                        </Carousel>
                      </CardBody>
                    </Card>
                  </form>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <ClassBackground />
    </>
  );
}
