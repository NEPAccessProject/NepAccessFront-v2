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
import {getFilteredValues} from '../searchUtils'

const ActionsFilter = () => {

    const context = useContext(SearchContext);
    const { updateFilterStateValues, filters,searchTitlesOnly,loading } = context;
    const action = filters.action || [];
    const onChange = (value,meta) => {
      //const filtered = getFilteredValues(options,value,meta);
      const filtered = options.map((o) => o.value).filter((o) => value.includes(o));
      updateFilterStateValues("action", filtered);
//      updateFilterStateValues("decisionsRaw", evt);
    }

    return (<>
      <>
        <FilterSelect options={options} filterValue={action} keyLabel="action" placeholder="Type of Select a Action Type(s)" />
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
