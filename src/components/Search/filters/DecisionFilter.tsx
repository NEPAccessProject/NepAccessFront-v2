import React, { useContext } from "react";
import SearchContext from "../SearchContext";
import {
  Box,
  Autocomplete,
  TextField,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@mui/material";
import { actionOptions, decisionOptions } from "../data/dropdownValues";
import { FilterOptionType,InputEvent } from "@/components/interfaces/interfaces";
export default function DecisionFilter() {
  const context = useContext(SearchContext);
  const {
    pagination,
    filters,
    updatePaginationStateValues,
    updateFilterStateValues,
  } = context;
  const { decisions, decisionsRaw } = filters;
  const onDecisionChange = (evt:React.SyntheticEvent, selected, reason) => {
    
    let target = evt.target as HTMLInputElement;
    console.log(`onDecisionChange ~ target:`, target);
    console.log(`onDecisionChange ~ selected, reason:`, selected, reason);
    let filteredDecisions: FilterOptionType[] = [];

    if(reason === "selectOption") {
      filteredDecisions.push(selected);
    } else if (reason === "removeOption") {
      const filtered = decisionOptions.filter((v) => v.value !== selected.value);
      console.log(`onDecisionChange ~ filtered:`, filtered);
      filtered.map((v) => {
        filteredDecisions.push(v);
      });
    } else if (reason === "clear") {
      filteredDecisions = [];
    }
    console.log(`onDecisionChange ~ filteredDecisions:`, filteredDecisions);
    updateFilterStateValues("decisions", filteredDecisions);
    //updateFilterStateValues("decisionsRaw", evt);
  };
  //[TODO] need to
  return (
    <>
      <FormLabel htmlFor="searchAction">Decision:</FormLabel>
      <Autocomplete
        id="decision"
        tabIndex={10}
        className={"classes.autocomplete"}
        options={decisionOptions}
        isOptionEqualToValue={(option, value) => {
          return option.value === value.value;
        }}
        value={actionOptions.filter((v) => {
          console.log(`value={actionOptions.filter ~ v:`, v);
          return actionOptions.map((v) => v.value).includes(decisionsRaw);
        }
        )}
        
        //                      isOptionEqualToValue={(option, value) => actionRaw === value.value}
        onChange={(evt, value, reason) =>
          onDecisionChange(evt, value, reason)
        }
        renderInput={(params) => {
          return (
            <TextField
              {...params}
              placeholder="Type or Select a Decision Type(s)"
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
