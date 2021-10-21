import React, { useState, useEffect } from 'react';
import {
  Button,
  Grid,
  Hidden,
  Typography,
  TextField,
  MenuItem,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { ArrowForward, ArrowBack } from '@material-ui/icons';
import manPc from '../../../../assets/images/register.png';
import { useStyles } from '../../styles';
import {
  maskCpf,
  maskDate,
  formatDate,
  maskCel,
} from '../../../../utils/string/masks';
import { getCountries } from '../../../../services/api/api';
import { KeyboardDatePicker } from '@material-ui/pickers';

export const SlideSeven = ({ nextStep, previousStep, formik }) => {
  const classes = useStyles();
  const [countries, setCountries] = useState([]);
  const [selectedDateNasc, setSelectedDateNac] = React.useState(
    new Date('01/01/1980')
  );
  const [selectedDateEmissao, setSelectedDateEmissao] = React.useState(
    new Date('01/01/2010')
  );
  useEffect(() => {
    const countriesNames = async () => {
      setCountries(await getCountries());
    };

    countriesNames();
  }, []);

  useEffect(() => {
    return () => {};
  });

  const handleNationality = (event, value) => {
    formik.setFieldValue('nacionalidadePf', value);
  };
  const handleDateChangeNasci = (date, value) => {
    const newDate = formatDate(date);
    setSelectedDateNac(date);
    formik.setFieldValue('nascimentoPf', newDate);
  };

  const handleDateChangeEmissao = (date, value) => {
    const newDate = formatDate(date);
    setSelectedDateEmissao(date);
    formik.setFieldValue('emissaoPf', newDate);
  };
  return (
    <Grid item xs={12} md={12}>
      <div className={classes.divCentralization}>
        <Grid container justify='center' alignItems='center'>
          <Hidden only={['xs', 'sm']}>
            <Grid item md={4}>
              <Grid container justify='center' alignItems='center'>
                <img src={manPc} className={classes.manPc} alt='logotipo' />
              </Grid>
            </Grid>
          </Hidden>
          <Grid item md={8}>
            <Grid container direction='column' spacing={3}>
              <Grid item>
                <Grid container>
                  <Grid item>
                    <Typography
                      variant='body1'
                      gutterBottom
                      className={classes.label}
                    >
                      Informe os dados de{' '}
                      <span className={classes.labelUser}>Pessoa Física</span>
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={4}>
                    <TextField
                      id='cpfPf'
                      name='cpfPf'
                      label='CPF'
                      value={formik.values.cpfPf}
                      onChange={(e) => {
                        formik.setFieldValue(
                          e.target.id,
                          maskCpf(e.target.value)
                        );
                      }}
                      inputProps={{ maxLength: 14 }}
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      id='celularPf'
                      name='celularPf'
                      label='CELULAR'
                      value={formik.values.celularPf}
                      onChange={(e) =>
                        formik.setFieldValue(
                          e.target.id,
                          maskCel(e.target.value)
                        )
                      }
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.celularPf &&
                        Boolean(formik.errors.celularPf)
                      }
                      helperText={
                        formik.touched.celularPf && formik.errors.celularPf
                      }
                      inputProps={{ maxLength: 15 }}
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <KeyboardDatePicker
                      id='nascimentoPf'
                      name='nascimentoPf'
                      margin='normal'
                      label='NASCIMENTO'
                      className={classes.fieldCentralization}
                      format='dd/MM/yyyy'
                      value={selectedDateNasc}
                      onChange={(date, value) => {
                        handleDateChangeNasci(date, value);
                      }}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.nascimentoPf &&
                        Boolean(formik.errors.nascimentoPf)
                      }
                      helperText={
                        formik.touched.nascimentoPf &&
                        formik.errors.nascimentoPf
                      }
                      inputProps={{ maxLength: 20 }}
                      fullWidth
                      required
                    />
                    {/* <TextField
                      id="nascimentoPf"
                      name="nascimentoPf"
                      label="NASCIMENTO"
                      value={formik.values.nascimentoPf}
                      onChange={(e) =>
                        formik.setFieldValue(
                          e.target.id,
                          maskDate(e.target.value)
                        )
                      }
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.nascimentoPf &&
                        Boolean(formik.errors.nascimentoPf)
                      }
                      helperText={
                        formik.touched.nascimentoPf &&
                        formik.errors.nascimentoPf
                      }
                      inputProps={{ maxLength: 10 }}
                      fullWidth
                      required
                    /> */}
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={4}>
                    <TextField
                      id='naturalidadePf'
                      name='naturalidadePf'
                      label='NATURALIDADE'
                      value={formik.values.naturalidadePf}
                      onChange={(e) =>
                        formik.setFieldValue(
                          e.target.id,
                          e.target.value.replace(/[^a-zA-ZçÇ ]/g, '')
                        )
                      }
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.naturalidadePf &&
                        Boolean(formik.errors.naturalidadePf)
                      }
                      helperText={
                        formik.touched.naturalidadePf &&
                        formik.errors.naturalidadePf
                      }
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Autocomplete
                      options={countries}
                      getOptionLabel={(option) => option}
                      id='nacionalidadePf'
                      disableCloseOnSelect
                      noOptionsText={'País não encontrado'}
                      value={formik.values.nacionalidadePf}
                      onChange={handleNationality}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          className={classes.fieldCentralization}
                          label='NACIONALIDADE'
                          name='nacionalidadePf'
                          margin='normal'
                          onBlur={formik.handleBlur}
                          error={
                            formik.touched.nacionalidadePf &&
                            Boolean(formik.errors.nacionalidadePf)
                          }
                          helperText={
                            formik.touched.nacionalidadePf &&
                            formik.errors.nacionalidadePf
                          }
                          fullWidth
                          required
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      id='estadoCivilPf'
                      name='estadoCivilPf'
                      select
                      label='ESTADO CIVIL'
                      value={formik.values.estadoCivilPf}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.estadoCivilPf &&
                        Boolean(formik.errors.estadoCivilPf)
                      }
                      helperText={
                        formik.touched.estadoCivilPf &&
                        formik.errors.estadoCivilPf
                      }
                      fullWidth
                      required
                    >
                      <MenuItem key='sl' value='Solteiro'>
                        Solteiro
                      </MenuItem>
                      <MenuItem key='cs' value='Casado'>
                        Casado
                      </MenuItem>
                      <MenuItem key='sp' value='Separado'>
                        Separado
                      </MenuItem>
                      <MenuItem key='vi' value='Viuvo'>
                        Viúvo
                      </MenuItem>
                      <MenuItem key='dv' value='Divorciado'>
                        Divorciado
                      </MenuItem>
                    </TextField>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={3}>
                    <TextField
                      id='rgPf'
                      name='rgPf'
                      label='RG'
                      value={formik.values.rgPf}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.rgPf && Boolean(formik.errors.rgPf)}
                      helperText={formik.touched.rgPf && formik.errors.rgPf}
                      inputProps={{ maxLength: 10 }}
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      id='emissorPf'
                      name='emissorPf'
                      label='ORGÃO EMISSOR'
                      value={formik.values.emissorPf}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.emissaoPf &&
                        Boolean(formik.errors.emissaoPf)
                      }
                      helperText={
                        formik.touched.emissaoPf && formik.errors.emissaoPf
                      }
                      required
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <KeyboardDatePicker
                      id='emissaoPf'
                      name='emissaoPf'
                      margin='normal'
                      label='DATA EMISSAO'
                      className={classes.fieldCentralization}
                      format='dd/MM/yyyy'
                      value={selectedDateEmissao}
                      onChange={(date, value) => {
                        handleDateChangeEmissao(date, value);
                      }}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.emissaoPf &&
                        Boolean(formik.errors.emissaoPf)
                      }
                      helperText={
                        formik.touched.emissaoPf && formik.errors.emissaoPf
                      }
                      inputProps={{ maxLength: 20 }}
                      fullWidth
                      required
                    />
                    {/* <TextField
                      id='emissaoPf'
                      name='emissaoPf'
                      label='DATA EMISSAO'
                      value={formik.values.emissaoPf}
                      onChange={(e) =>
                        formik.setFieldValue(
                          e.target.id,
                          maskDate(e.target.value)
                        )
                      }
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.emissaoPf &&
                        Boolean(formik.errors.emissaoPf)
                      }
                      helperText={
                        formik.touched.emissaoPf && formik.errors.emissaoPf
                      }
                      inputProps={{ maxLength: 10 }}
                      fullWidth
                      required
                    /> */}
                  </Grid>
                  <Grid item xs={12} md={2}>
                    <TextField
                      id='sexoPf'
                      name='sexoPf'
                      select
                      label='SEXO'
                      fullWidth
                      value={formik.values.sexoPf}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.sexoPf && Boolean(formik.errors.sexoPf)
                      }
                      helperText={formik.touched.sexoPf && formik.errors.sexoPf}
                      required
                    >
                      <MenuItem key='M' value='M'>
                        Masculino
                      </MenuItem>
                      <MenuItem key='F' value='F'>
                        Feminino
                      </MenuItem>
                    </TextField>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                    <TextField
                      id='maePf'
                      name='maePf'
                      label='NOME DA MÃE'
                      value={formik.values.maePf}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.maePf && Boolean(formik.errors.maePf)
                      }
                      helperText={formik.touched.maePf && formik.errors.maePf}
                      inputProps={{ maxLength: 150 }}
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                    <TextField
                      id='paiPf'
                      name='paiPf'
                      label='NOME DO PAI'
                      value={formik.values.paiPf}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.paiPf && Boolean(formik.errors.paiPf)
                      }
                      helperText={formik.touched.paiPf && formik.errors.paiPf}
                      inputProps={{ maxLength: 150 }}
                      fullWidth
                      required
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <TextField
                      id='sitePf'
                      name='sitePf'
                      label='SITE DE VENDAS'
                      value={formik.values.sitePf}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.sitePf && Boolean(formik.errors.sitePf)
                      }
                      helperText={formik.touched.sitePf && formik.errors.sitePf}
                      fullWidth
                      required
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid
                  container
                  justify='flex-end'
                  alignItems='center'
                  spacing={3}
                >
                  <Grid item>
                    <Button
                      variant='contained'
                      color='secondary'
                      size='sm'
                      rel='noopener noreferrer'
                      onClick={() => previousStep()}
                    >
                      <ArrowBack className={classes.arrowIconBack} />
                      Anterior
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      variant='contained'
                      color='primary'
                      size='sm'
                      id='BTNSECONDNEXTPF'
                      rel='noopener noreferrer'
                      onClick={() => nextStep()}
                    >
                      Próximo
                      <ArrowForward className={classes.arrowIconNext} />
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </Grid>
  );
};
