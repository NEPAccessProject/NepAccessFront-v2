import React, { useContext } from "react";
import SearchContext from "../SearchContext";
import {Box, Autocomplete, TextField} from "@mui/material";
import {agencies} from '../data/dropdownValues';

export default function AgencyFilter(props) {
    const context = useContext(SearchContext);
    const { updateFilterStateValues, filters } = context;
    const { agencyRaw, agency, cooperatingAgency, cooperatingAgencyRaw } = filters;
    const onAgencyChange = (evt, selected, reason) => {
    console.log(`onAgencyChange ~ evt, selected, reason:`, evt, selected, reason);
  
  
        let agencies = [];
        if (reason === "selectOption") {
          agencies = filters.agency || [];
          selected.map((s:any) => {  
            console.log(`selected.map ~ s:`, s);
            return agencies.push(s.value);
          });
        }
        else if (reason === "removeOption") {
          agencies = agency.filter((v) => selected.value !== v.value);
        }
        else if (reason === "clear") {
          agencies = [];
        }
        updateFilterStateValues("agency", agencies);
        updateFilterStateValues("agencyRaw", evt);
        // [TODO] will need to filter the availble options based on the selected
        // filterResultsBy(this.state);
      };
  
    return (
      <>
        <Autocomplete
          id="agency"
          // {...filterProps}
          tabIndex={4}
          multiple
          loading={context.loading}
          options={agencies}
          isOptionEqualToValue={(option, value) => {
            console.log(`option:`, option ,'vs', value);
            return option.value === value.value;
          }}
                  onChange={(evt, value, tag) => onAgencyChange(evt, value, tag)}
          renderInput={(params) => {
            return (
              <TextField
                {...params}
                value={agencies.filter((v) => agencyRaw === v.value)}
                placeholder="Type or Select Lead Agencies"
                variant="outlined"
                sx={{
                  wordWrap: "break-word",
                  overflow: "hidden",
                  p: 0,
                }}
              />
            );
          }}
        />
      </>
    );
  }