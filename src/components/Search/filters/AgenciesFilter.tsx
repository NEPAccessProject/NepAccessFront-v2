import React, { useContext } from "react";
import SearchContext from "../SearchContext";
import {Box, Autocomplete, TextField,FormControl,FormLabel} from "@mui/material";
import {agencies, agencyOptions} from '../data/dropdownValues';
import { FilterOptionType } from "@/components/interfaces/interfaces";
import Select from 'react-select';
//import _ from "lodash";
import _debounce from "lodash/debounce";


export default function AgencyFilter(props) {
    const context = useContext(SearchContext);
    const { updateFilterStateValues, filters,loading,error } = context;
    const { agenciesRaw, agencies, cooperatingAgency, cooperatingAgencyRaw } = filters;

    const onAgencyChange = (value,meta) => {
        console.log(`onAgencyChange ~ value,meta:`, value,meta);
        let filteredAgencies:FilterOptionType[] = [];

        if(meta.action === "select-option"){
          agencies.push(value);
        }
        else if(meta.action === "remove-value"){
            agencies.filter((v) => v.value !== value.value);
        }
        else if (meta.action === "clear"){
          filteredAgencies = [];
        }
        updateFilterStateValues("agencies", agencies);
        //updateFilterStateValues("agencyRaw", evt);
        // [TODO] will need to filter the availble options based on the selected
        // filterResultsBy(this.state);
      };
      return (<>
        <Box>
        <Select
            className="basic-single"
            isSearchable={true}
            isMulti={true} 
            classNamePrefix="select"
            isDisabled={loading}
            isClearable={true}
            defaultValue={agencies}
            placeholder="Type or Select Lead Agencies"
            onChange={(newValue, actionMeta) =>
              onAgencyChange(newValue, actionMeta)
            }
            isLoading={loading}
            name="color"
            options={agencyOptions}
          />
        </Box>
      </>)
    // return (
    //   <>
    //    <Box>
    //               {/* <FormLabel htmlFor='searchAgency'>
    //                 Lead Agencies:
    //               </FormLabel> */}
    //               <Autocomplete
    //                 fullWidth
    //                 id='agency'
    //                 tabIndex={4}
    //                 options={agencyOptions}
    //                 //value={agencyOptions.filter((v) => agencies.includes(v.value))}
    //                 onChange={(evt, value, tag) => onAgencyChange(evt, value, tag)}
    //                 renderInput={(params) => {
    //                   return (
    //                     <TextField
    //                       {...params}
    //                       placeholder='Type or Select Lead Agencies'
    //                       variant='outlined'
    //                       sx={{
    //                         wordWrap: 'break-word',
    //                         overflow: 'hidden',
    //                         p: 0,
    //                       }}
    //                     />
    //                   );
    //                 }}
    //               />
    //             </Box>
    //   </>
    // );
  }