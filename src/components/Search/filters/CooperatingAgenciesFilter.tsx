import React, { useContext } from "react";
import SearchContext from "../SearchContext";
import {Box, Autocomplete, TextField} from "@mui/material";
import {agencies} from '../data/dropdownValues';
import { FilterOptionType } from "@/components/interfaces/interfaces";
export default function CooperatingAgenciesFilter(props) {
    const context = useContext(SearchContext);
    const {
      pagination,
      filters,
      updatePaginationStateValues,
      updateFilterStateValues,
    } = context;
    const { cooperatingAgencyRaw, cooperatingAgency, agencies,agenciesRaw } = filters;
    
    const onCooperatingAgencyChange = (evt:React.SyntheticEvent, selected, reason) => {
    console.log(`onCooperatingAgencyChange ~ reason:`, reason);
    console.log(`onCooperatingAgencyChange ~ selected:`, selected);
    console.log(`onCooperatingAgencyChange ~ evt:`, evt);
    let target = evt.target as HTMLInputElement;
    let raw = (evt.target as HTMLInputElement).value;
    console.log(`onCooperatingAgencyChange ~ target:`, raw);
    
    let filteredAgencies:FilterOptionType[] = []; 
        if (reason === "selectOption") {
          selected.map((agency:any) => {  
            filteredAgencies.push(agency);
          });
        }
        else if (reason === "removeOption") {
          const temp =  agencies.filter((v) => v.value !== selected.value);
          console.log(`onCooperatingAgencyChange ~ temp:`, temp);
          filteredAgencies = temp;
``        }
        else if (reason === "clear") {
          filteredAgencies = [];
        }
        updateFilterStateValues("cooperatingAgency", filteredAgencies);
      }
        //updateFilterStateValues("cooperatingAgencyRaw", cooperatingAgencyRaw);
        // [TODO] will need to filter the availble options based on the selected
        // filterResultsBy(this.state);
    // const onCooperatingAgencyChange = (evt, selected, reason) => {
  
    //   let filteredAgencies:FilterOptionType[] = [];
    //   if (reason === "selectOption") {
    //     selected.map(selected => {
    //       filteredAgencies.push(selected);
    //     });
    //   }
    //   else if (reason === "removeOption") {
    //     filteredAgencies = cooperatingAgency.filter((v) => selected.value !== v);
    //   }
    //   updateFilterStateValues("cooperatingAgency", filteredAgencies);
    //   updateFilterStateValues("cooperatingAgencyRaw", evt);
    //   //[TODO] Implement This 
    //   //filterResultsBy(this.state);
    // };

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
            isOptionEqualToValue={(option, value) => option.value === value.value}
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