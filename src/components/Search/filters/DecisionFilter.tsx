import React, { useContext } from "react";
import SearchContext from "../SearchContext";
import {
  Box,
  Autocomplete,
  TextField,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@mui/material";
import {  decisionOptions as options } from "../data/dropdownValues";
import { FilterOptionType,InputEvent } from "@/components/interfaces/types";
import Select from 'react-select';
import FilterSelect from "./FilterSelect";
export default function DecisionFilter() {
  const context = useContext(SearchContext);
  const {
    pagination,
    filters,
    updatePaginationStateValues,
    updateFilterStateValues,
    loading,
    error,
    searchTitlesOnly,
    getFilterValues,
    getFilteredValues,
  } = context;

  const decision = filters.decision;

  const onChange = (value,meta) => {
    const filtered = getFilteredValues(options,value,meta);
    console.log(`onDecisionChange ~ filteredDecisions:`, filtered);
    updateFilterStateValues("decisions", filtered);
    //updateFilterStateValues("decisionsRaw", evt);
  };


  return (
    <>
      <FilterSelect options={options} filterValue={decision} key="decision" placeholder="Type of Select a Decision(s)" />
    </>

  )
}
