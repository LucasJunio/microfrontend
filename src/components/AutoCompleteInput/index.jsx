import React, { useEffect } from "react";
import { Checkbox, Grid, TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import { CheckBox } from "@material-ui/icons";
import { useDispatch } from "react-redux";
import { addSelectedGroups, clearSelectedGroups } from "../../store/ducks/User";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBox fontSize="small" />;
//The prop "data" need be a array of objects, with a prop "name"
const AutoCompleteInput = ({ data, selectedValue }) => {
  const dispatch = useDispatch();

  const handleAutoComp = (event, value) => {
    dispatch(addSelectedGroups(value));
  };

  // useEffect(() => {
  //   return () => {
  //     dispatch(clearSelectedGroups());
  //   };
  // }, []);

  return (
    <Grid container direction="column" spacing={3}>
      <Grid item>
        <Autocomplete
          multiple
          id="checkboxes-tags-demo"
          options={data}
          disableCloseOnSelect
          getOptionLabel={(option) => option.nome}
          getOptionSelected={(value, options) => value.id === options?.id}
          onChange={handleAutoComp}
          value={selectedValue}
          renderOption={(option, { selected }) => (
            <React.Fragment>
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                style={{ marginRight: 8 }}
                checked={selected}
              />
              {option.nome}
            </React.Fragment>
          )}
          style={{ width: 400 }}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              label="Grupos"
              placeholder="Digite o grupo"
            />
          )}
        />
        {/* <Autocomplete
          multiple
          id="autoCompleteInput"
          options={data}
          disableCloseOnSelect
          getOptionLabel={(option) => option.nome}
          // getOptionSelected={(value, options) => value.id === options?.id}
          onChange={handleAutoComp}
          value={selectedValue}
          renderOption={(option, { selected }) => (
            <React.Fragment>
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                style={{ marginRight: 8 }}
                checked={selected}
              />
              {option.nome}
            </React.Fragment>
          )}
          style={{ width: 500 }}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              label="Grupos"
              placeholder="Procurar grupo"
              onChange={handleAutoComp}
            />
          )}
        /> */}
      </Grid>
      {/* <Grid item>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Button variant="contained" color="primary">
              Salvar
            </Button>
          </Grid>
        </Grid>
      </Grid> */}
    </Grid>
  );
};

export default AutoCompleteInput;
