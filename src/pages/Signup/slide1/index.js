import React from 'react'

export default function Slide1() {
    return (

          <div>
          <ContainerCard>
            <Card style={{ width: "80%", padding: 20 }}>
              <Containerform>
                <Containerleft>
                  <Imageleft1></Imageleft1>
                </Containerleft>

                <Containerright>
                  <TitleWelcome>
                    Informe os dados de{" "}
                    <span style={{ color: "#9D2AB1" }}>Usuário</span>
                  </TitleWelcome>

                  <MarginField style={{ width: "100%" }}>
                    <CustomInput
                      labelText="NOME COMPLETO"
                      id="NOME"
                      name="NOME"
                      formControlProps={{ fullWidth: true }}
                      inputProps={{
                        type: "text",
                        onChange: (e) => OnchangeNOME(e.target.value),
                        autoComplete: "off",
                      }}
                    />
                    <DescriptionText>
                      <div id="descriptionnome"></div>
                    </DescriptionText>
                  </MarginField>

                  <MarginField style={{ width: "100%" }}>
                    <CustomInput
                      labelText="EMAIL"
                      id="EMAIL"
                      name="EMAIL"
                      formControlProps={{ fullWidth: true }}
                      inputProps={{
                        type: "text",
                        onChange: (e) => OnchangeEMAIL(e.target.value),
                        autoComplete: "off",
                      }}
                    />
                    <DescriptionText>
                      <div id="descriptionemail"></div>
                    </DescriptionText>
                  </MarginField>

                  {/* <MarginField >
                    <CustomInput
                      labelText="NICKNAME"
                      // id="SENHA"
                      name="NICKNAME"
                      formControlProps={{ fullWidth: false }}
                      success={ColorInputClass}
                      inputProps={{
                        type: "nickname",
                        onChange: (e) => OnchangeNICKNAME(e.target.value),
                        value: nickname,
                        autoComplete: "off",
                      }}
                    />
                  </MarginField> */}

                  <MarginField>
                    <CustomInput
                      labelText="SENHA"
                      id="SENHA"
                      name="SENHA"
                      formControlProps={{ fullWidth: false }}
                      success={ColorInputClass}
                      inputProps={{
                        type: "password",
                        onChange: (e) => OnchangeSENHA(e.target.value),
                        value: senha,
                        // endAdornment: (
                        //   <InputAdornment position="end">
                        //     <Icon className={classes.inputIconsColor}>{Iconsenha}</Icon>
                        //   </InputAdornment>
                        // ),
                        autoComplete: "off",
                      }}
                    />
                    <DescriptionText>
                      <div id="descriptionpassword">
                        A senha deve conter mínimo de oito caracteres, pelo
                        menos, uma letra maiúscula, uma letra minúscula, um
                        número e um caractere especial{" "}
                      </div>
                    </DescriptionText>
                  </MarginField>

                  <MarginField>
                    <CustomInput
                      labelText="CONFIRME SUA SENHA"
                      id="SENHA2"
                      name="SENHA2"
                      formControlProps={{ fullWidth: false }}
                      success={ColorInputClass2}
                      inputProps={{
                        type: "password",
                        onChange: (e) => OnchangeSENHA2(e.target.value),
                        value: senha2,
                        // endAdornment: (
                        //   <InputAdornment position="end">
                        //     <Icon className={classes.inputIconsColor}>{Iconsenha}</Icon>
                        //   </InputAdornment>
                        // ),
                        autoComplete: "off",
                      }}
                    />
                    <DescriptionText>
                      <div id="descriptionpassword2">Confirme sua senha </div>
                    </DescriptionText>
                  </MarginField>

                  <PositionButton>
                    <Button
                      // simple
                      color="primary"
                      size="sm"
                      // href="#"
                      // target="_blank"
                      id="BTNFIRSTNEXT"
                      rel="noopener noreferrer"
                      onClick={() => Step1NEXT()}
                    >
                      Próximo
                      <ArrowForward style={{ marginLeft: 10 }} />
                    </Button>
                  </PositionButton>
                </Containerright>
              </Containerform>
            </Card>
          </ContainerCard>
        </div>
    )
}

        