import React, { useContext } from "react";
import SearchContext from "../SearchContext";
import {Box, Autocomplete, TextField,FormControl,FormLabel} from "@mui/material";
import { agencyOptions as options} from '../data/dropdownValues';
import { FilterOptionType } from "@/components/interfaces/types";
import Select from 'react-select';
import FilterSelect from "./FilterSelect";

export default function AgencyFilter(props) {
    const context = useContext(SearchContext);
    const { updateFilterStateValues, filters,loading,error,results,searchTitlesOnly,getFilterValues } = context;
    const { agency } = filters;
//    const { agency, cooperatingAgency } = filters;

      
      
      return (<>
        <Box>
          <FilterSelect options={options} filterValue={agency} key="agency" placeholder="Type of Select a Lead Agency(s)" />
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