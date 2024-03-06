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
  } = context;

  const filterValue = filters.decision as FilterOptionType[];
  return (
    <>
      <FilterSelect options={options} filterValue={filterValue} keyLabel="decision" placeholder="Type of Select a Decision(s)" />
    </>

  )
}
