import React, { useContext } from "react";
import SearchContext from "../SearchContext";
import {Box, Autocomplete, TextField,FormControlLabel,FormControl,FormLabel} from "@mui/material";
import { counties } from "../data/dropdownValues";
const CountyFilter=()=>{
    const context = useContext(SearchContext);
    const { updateFilterStateValues, filters } = context;
    const { county, countyRaw } = filters;
  
    const onCountyChange = (evt, item,tag) => {
      console.log(`onCountyChange ~ evt, item:`, evt, item,tag);
  
      const countyValues = [];
      for (var i = 0; i < evt.length; i++) {
        // countyValues.push(evt[i].value);
      }
  
      updateFilterStateValues("countyValues", countyValues);
      //updateFilterStateValues("countyRaw", evt);
    };
    return (<>
      <FormLabel
                      htmlFor='county'>
                      County/counties:
                    </FormLabel>
                    <Autocomplete
                      id='county'
                      tabIndex={5}
                      options={counties}
                      isOptionEqualToValue={(option, value) => countyRaw === value.value}
                      // value={counties.filter((v) => counties.includes({value: v.value, label: v.value
                      // }))}
                      onChange={(evt, value, reason) =>
                        onCountyChange("county", value,reason)
                      }
                      renderInput={(params) => {
                        return (
                          <TextField
                            placeholder='Type or Select a Counties'
                            {...params}
                            variant='outlined'
                            sx={{
                              width: '100%',
                              p: 0,
                            }}
                          />
                        );
                      }}
                    />
    </>)
  };
  export default CountyFilter;