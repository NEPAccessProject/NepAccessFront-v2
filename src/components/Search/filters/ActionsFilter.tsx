import React, { useContext } from "react";
import SearchContext from "../SearchContext";
import {
  Box,
  Autocomplete,
  TextField,
  FormControl,
  FormLabel,
} from "@mui/material";
import { actionOptions } from "../data/dropdownValues";
import { FilterOptionType, InputEvent } from "@/components/interfaces/interfaces";
const ActionsFilter = () => {

    const context = useContext(SearchContext);
    const { updateFilterStateValues, filters } = context;
    const { actions, actionsRaw } = filters;
    const onActionChange = (evt:React.SyntheticEvent, selected, reason) => {
      
      let target = evt.target as HTMLInputElement;
      let raw = (evt.target as HTMLInputElement).value;
      console.log(`onDecisionChange ~ target:`, raw);
      console.log(`onDecisionChange ~ selected, reason:`, selected, reason);
      let filteredActions: FilterOptionType[] = [];

      if(reason === "selectOption") {
        filteredActions.push(selected);
      } else if (reason === "removeOption") {
        const filtered = filteredActions.filter((v) => v.value !== selected.value);
        filteredActions = filtered;
      } else if (reason === "clear") {
        filteredActions = [];
      }
      console.log(`onDecisionChange ~ filteredDecisions:`, filteredActions);
      updateFilterStateValues("decisions", filteredActions);
//      updateFilterStateValues("decisionsRaw", evt);
    }

  return (
    <>
      <FormLabel htmlFor="searchAction">Action Type:</FormLabel>
      <Autocomplete
        id="searchAction"
        tabIndex={10}
        className={"classes.autocomplete"}
        options={actionOptions}
        isOptionEqualToValue={(option, value) =>{
            return option.value === value.value
        }}
        onChange={(evt, value, reason) => onActionChange(evt, value, reason)}
        renderInput={(params) => {
          console.log(`ActionsFilter ~ params:`, params);
          
          return (
            <TextField
              {...params}
              placeholder="Type or Select a Action Type(s)"
              variant="outlined"
              sx={{
                width: "100%",
                p: 0,
              }}
            />
          );
        }}
      />
    </>
  );
}
export default ActionsFilter;
