import React, { useContext } from "react";
import SearchContext from "../SearchContext";
import {Box, Autocomplete, TextField,FormControl,FormLabel} from "@mui/material";
import {agencies, agencyOptions} from '../data/dropdownValues';
import { FilterOptionType } from "@/components/interfaces/types";
import Select from 'react-select';
//import _ from "lodash";
import _debounce from "lodash/debounce";


export default function AgencyFilter(props) {
    const context = useContext(SearchContext);
    const { updateFilterStateValues, filters,loading,error,results } = context;
    const { agency: agencies, cooperatingAgency } = filters;

    const onAgencyChange = (value,meta) => {
      console.log('onAgencyChange META',meta)
        console.log(`onAgencyChange VALUE: `,value);
        let filteredAgencies:string[] = [];

        if(meta.action === "select-option"){
          console.log('PUSHING VALUE LABEL',value[0]);
          filteredAgencies.push(value[0].label);

            const res = results.filter((v) =>{ 
              v.doc.agency === value.label
            })
            console.log('TEST FILTERED BY AGENCY',res);
        }
        else if(meta.action === "remove-value"){
            filteredAgencies = agencies.filter((v) => v !== value.label);
        }
        else if (meta.action === "clear"){
          filteredAgencies = [];
        }
        console.log(`onAgencyChange ~ filteredAgencies:`, filteredAgencies);

        updateFilterStateValues("agencies", filteredAgencies);
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