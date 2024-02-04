import React, { useContext } from "react";
import SearchContext from "../SearchContext";
import {Box, Autocomplete, TextField} from "@mui/material";
import {agencies} from '../data/dropdownValues';
export default function CooperatingAgencFilter(props) {
    const context = useContext(SearchContext);
    const {
      pagination,
      filters,
      updatePaginationStateValues,
      updateFilterStateValues,
    } = context;
    const { cooperatingAgencyRaw, cooperatingAgency, agencyRaw } = filters;
    
    const onCooperatingAgencyChange = (evt, selected, reason) => {
  
      let agencies = [];
      if (reason === "selectOption") {
        agencies = cooperatingAgency || [];
        selected.map(s => {
          console.log('SSSSSSS',s);
          return agencies.push(s.value);
        });
      }
      else if (reason === "removeOption") {
        agencies = cooperatingAgency.filter((v) => selected.value !== v.value);
      }
      updateFilterStateValues("cooperatingAgency", agencies);
      updateFilterStateValues("cooperatingAgencyRaw", evt);
      //[TODO] Implement This
      //filterResultsBy(this.state);
    };
    return (
      <>
        <Box>
          <Autocomplete
            id="cooperatingAgency"
            // {...filterProps}
            tabIndex={12}
            multiple
            loading={context.loading}
            options={agencies}
            isOptionEqualToValue={(option, value) => agencyRaw === value.value}
            onChange={(evt, value, tag) =>
              onCooperatingAgencyChange(evt, value, tag)
            }
            renderInput={(params) => {
              return (
                <TextField
                  {...params}
                  placeholder="Type or Select Cooperating Agencies"
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
        </Box>
      </>
    );
  }