import React, { useContext } from "react";
import SearchContext from "../SearchContext";
import {Box, Autocomplete, TextField,FormControlLabel,FormControl,FormLabel} from "@mui/material";
import {decisionOptions as decisions} from '../data/dropdownValues';
export default function DecisionFilter() {
    const context = useContext(SearchContext);
    const {
      pagination,
      filters,
      updatePaginationStateValues,
      updateFilterStateValues,
    } = context;
    const { cooperatingAgencyRaw, cooperatingAgency, agencyRaw } = filters;

    const { decision, decisionRaw } = filters;
    const onDecisionChange = (evt, selected, reason) => {
      let decisions = [];
      if (reason === "selectOption") {
        selected.map((s:any) => {
            console.log(s.value);
          decisions.push(s.value)
        })
      }
      else if (reason && reason === "removeOption") {
        decisions = decision || [];
        if (decision && decision.length > 0) {
          selected.map(s => {
            decisions = decisions.filter(decision => decision !== s.value)
          })
        }
      }
      updateFilterStateValues("decision", decisions);
      updateFilterStateValues("decisionRaw", evt);
    };
    //[TODO] need to
    return (<>
    
    <FormLabel htmlFor='searchAction'>Decision:</FormLabel>
                      <Autocomplete
                        id='decision'
                        tabIndex={10}
                        className={'classes.autocomplete'}
                        options={decisions}
                        isOptionEqualToValue={(option, value) => decisionRaw === value.value}
  
  //                      isOptionEqualToValue={(option, value) => actionRaw === value.value}
  //                     value={(actions.filter((v) => action.includes(v)))}
                       onChange={(evt, value, reason) => onDecisionChange("decision", value?.value,reason)}
                        renderInput={(params) => {
                          return (
                            <TextField
                              {...params}
                              placeholder='Type or Select a Action Type(s)'
                              variant='outlined'
                              sx={{
                                width: '100%',
                                p: 0,
                              }}
                            />
                          );
                        }}
                      />
    </>);
  };