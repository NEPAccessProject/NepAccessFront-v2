import React, { useContext } from "react";
import SearchContext from "../SearchContext";
import {Box, Autocomplete, TextField,FormControlLabel,FormControl,FormLabel} from "@mui/material";
import {decisionOptions as decisions,counties,locations} from '../data/dropdownValues';
import _debounce from "lodash/debounce";

export default function StateFilter(){
    const context = useContext(SearchContext);
    const {  updateFilterStateValues,updatePaginationStateValues, filters } = context;
    const { states, stateRaw, countyRaw, county } = filters;

      const { cooperatingAgencyRaw, cooperatingAgency } = filters;
  
    const onLocationChange = (evt, item, reason) => {
      console.log(`onLocationChange ~ evt,item,reason:`, evt, item, reason);
      var stateValues = [];
      for (var i = 0; i < evt.length; i++) {
        //stateValues.push(evt[i].value);
      }
      updateFilterStateValues("stateRaw", evt);
      updateFilterStateValues("county", narrowCountyOptions(stateValues));
  
      //onCountyChange(countyOptions.filter(countyObj => this.state.county.includes(countyObj.value)));
    };
    
    
    return (
      <>
        {/* <FormLabel htmlFor="state">State(s) and Location(s):</FormLabel> */}
        <Autocomplete
          id="state"
          options={locations}
          isOptionEqualToValue={(option, value) => stateRaw === value.value}
          onChange={(evt, value, reason) => onLocationChange(evt, value, reason)}
          renderInput={(params) => {
            return (
              <TextField
                {...params}
                placeholder="Type or Select a State"
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
  };

  // We have to share this between the state filter and the county filter, so we export it here, akward but works
  export const narrowCountyOptions = (stateValues) => {
    /** Filter logic for county array of specific label/value format given array of state abbreviations  */
    function countyFilter(_stateValues) {
      return function (a) {
        let returnValue = false;
        _stateValues.forEach((item) => {
          if (a.label.split(":")[0] === item) {
            // a.label.split(':')[0] gets 'AZ' from expected 'AZ: Arizona'
            returnValue = true;
          }
        });
        return returnValue;
      };
    }
  
    let filteredCounties = counties;
    if (stateValues && stateValues.length > 0) {
      filteredCounties = filteredCounties.filter(countyFilter(stateValues));
    }
  
    return filteredCounties;
  };