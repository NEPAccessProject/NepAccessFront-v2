import { FilterOptionType } from "@/components/interfaces/types";
import {
  Autocomplete,
  FormLabel,
  TextField,
  Box,
} from "@mui/material";
import React, { useContext } from "react";
import SearchContext from "../SearchContext";
import { actionOptions as options } from "../data/dropdownValues";
import Select from 'react-select'
import FilterSelect from "./FilterSelect";

const ActionsFilter = () => {

    const context = useContext(SearchContext);
    const { updateFilterStateValues, filters,searchTitlesOnly,loading,getFilterValues,getFilteredValues } = context;
    const { action } = filters;
    const onChange = (value,meta) => {
      const filtered = getFilteredValues(options,value,meta);
      updateFilterStateValues("decisions", filtered);
//      updateFilterStateValues("decisionsRaw", evt);
    }

    return (<>
      <>
        <FilterSelect options={options} filterValue={action} key="action" placeholder="Type of Select a Action Type(s)" />
      </>
    </>)
  // return (
  //   <>
  //     {/* <FormLabel htmlFor="searchAction">Action Type:</FormLabel> */}
  //     <Autocomplete
  //       id="searchAction"
  //       tabIndex={10}
  //       className={"classes.autocomplete"}
  //       options={actionOptions}
  //       loading={loading}
  //       disabled={searchTitlesOnly}
  //       isOptionEqualToValue={(option, value) =>{
  //           return option.value === value.value
  //       }}
  //       onChange={(evt, value, reason) => onActionChange(evt, value, reason)}
  //       renderInput={(params) => {
          
  //         return (
  //           <TextField
  //             {...params}
  //             placeholder="Type or Select a Action Type(s)"
  //             variant="outlined"
  //             sx={{
  //               width: "100%",
  //               p: 0,
  //             }}
  //           />
  //         );
  //       }}
  //     />
  //   </>
  // );
}
export default ActionsFilter;
