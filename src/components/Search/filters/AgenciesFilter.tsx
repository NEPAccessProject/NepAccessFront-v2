import React, { useContext } from "react";
import SearchContext from "../SearchContext";
import {Box, Autocomplete, TextField,FormControl,FormLabel} from "@mui/material";
import {agencies, agencyOptions} from '../data/dropdownValues';
import { FilterOptionType } from "@/components/interfaces/interfaces";
export default function AgencyFilter(props) {
    const context = useContext(SearchContext);
    const { updateFilterStateValues, filters } = context;
    const { agenciesRaw, agencies, cooperatingAgency, cooperatingAgencyRaw } = filters;
    const onAgencyChange = (evt, selected, reason) => {
    console.log(`onAgencyChange ~ evt, selected, reason:`, evt, selected, reason);
  
        const raw = (evt.target as HTMLInputElement).value;
        console.log(`onAgencyChange ~ raw:`, raw);

        let agencies:FilterOptionType[]  = [];
        if (reason === "selectOption") {
          selected.map((s:any) => {  
            console.log(`selected.map ~ s:`, s);
            return agencies.push(s);
          });
        }
        else if (reason === "removeOption") {
          agencies = agencyOptions.filter((v) => selected.value !== v.value);
        }
        else if (reason === "clear") {
          agencies = [];
        }
        updateFilterStateValues("agency", agencies);
        //updateFilterStateValues("agencyRaw", evt);
        // [TODO] will need to filter the availble options based on the selected
        // filterResultsBy(this.state);
      };
  
    return (
      <>
       <FormControl>
                  <FormLabel htmlFor='searchAgency'>
                    Lead Agencies:
                  </FormLabel>
                  <Autocomplete
                    id='agency'
                    tabIndex={4}
                    options={agencyOptions}
                    //value={agencyOptions.filter((v) => agencies.includes(v.value))}
                    onChange={(evt, value, tag) => onAgencyChange(evt, value, tag)}
                    renderInput={(params) => {
                      return (
                        <TextField
                          {...params}
                          placeholder='Type or Select Lead Agencies'
                          variant='outlined'
                          sx={{
                            wordWrap: 'break-word',
                            overflow: 'hidden',
                            p: 0,
                          }}
                        />
                      );
                    }}
                  />
                </FormControl>
      </>
    );
  }