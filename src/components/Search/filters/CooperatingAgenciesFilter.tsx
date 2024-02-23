import React, { useContext } from "react";
import SearchContext from "../SearchContext";
import { Box, Autocomplete, TextField } from "@mui/material";
import { agencyOptions as options } from "../data/dropdownValues";
import { FilterOptionType } from "@/components/interfaces/types";
import FilterSelect from "./FilterSelect";
//import _ from "underscore";
import _debounce from "lodash/debounce";
import Select from "react-select";

export default function CooperatingAgenciesFilter(props) {
  const context = useContext(SearchContext);
  const {
    pagination,
    filters,
    updatePaginationStateValues,
    updateFilterStateValues,
    loading,
    searchTitlesOnly,
    getFilterValues,
    getFilteredValues,
  } = context;

  const filterValue:FilterOptionType[] = filters.cooperatingAgency;
  
  const onChange = (value, meta) => {
    let filteredAgencies = getFilteredValues(options, value, meta);
    updateFilterStateValues("cooperatingAgency", filteredAgencies);
  };

  return (
    <>
      <FilterSelect options={options} filterValue={filterValue} key="cooperatingAgency" placeholder="Type or Select an Cooperating Agencies)" />
    </>
  )
  // return (
  //   <>
  //     <Box>
  //       <Select
  //         id="cooperatingAgency"
  //         // {...filterProps}
  //         tabIndex={12}
  //         isSearchable={true}
  //         isMulti={true}
  //         isDisabled={searchTitlesOnly}
  //         isLoading={loading}
  //         options={options}
  //         isClearable={true}
  //         onChange={(newValue,meta)=>onChange(newValue,meta)}
  //         placeholder="Type or Select an Cooperating Agencies)"
  //         value={getFilterValues(options,filterValue)}
  //         />
  //     </Box>
  //   </>
  // );
}
