 import React, { useContext } from "react";
import SearchContext from "../SearchContext";
import {Box, Autocomplete, TextField,FormControl,FormLabel} from "@mui/material";
import {actionOptions as actions} from '../data/dropdownValues';

const ActionsFilter = () => {
    const context = useContext(SearchContext);
    const { updateFilterStateValues, filters } = context;
    const { action, actionRaw } = filters;
    const onActionChange = (evt) => {
      var actionLabels = [];
      for (var i = 0; i < evt.length; i++) {
        //actionLabels.push(evt[i].label.replace(/ \([A-Z]*\)/gi,""));
      }
      updateFilterStateValues("action", actionLabels);
      updateFilterStateValues("actionRaw", evt);
    };
    return (<>
      <FormLabel htmlFor='searchAction'>Action Type:</FormLabel>
                      <Autocomplete
                        id='searchAction'
                        tabIndex={10}
                        className={'classes.autocomplete'}
                        options={actions}
                        isOptionEqualToValue={(option, value) => actionRaw === value.value}
  
  //                      isOptionEqualToValue={(option, value) => actionRaw === value.value}
  //                     value={(actions.filter((v) => action.includes(v)))}
                       onChange={(evt, value, reason) => updateFilterStateValues("action", value?.value)}
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
  export default ActionsFilter;