import {
  Autocomplete,
  Box,
  Button,
  Container,
  Checkbox,
  Paper,
  Divider,
  FormControl,
  FormLabel,
  Link,
  TextField,
  Typography,
  Stack,
  Chip,
  FormControlLabel,
  FormLabelOwnProps,
  FormLabelProps,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { styled, makeStyles } from "@mui/styles";
import React, { useContext, useState } from "react";
//import { ThemeProvider, createUseStyles } from "react-jss";
import SearchContext from "./SearchContext";
//import Grid from '@mui/material/Grid'; // Grid version 1
import { ThemeProvider } from "@material-ui/core";
import SearchDatePickers from "./SearchDatePickers";
import { FilterType } from "../interfaces/interfaces";
import ActionsFilter from "./filters/ActionsFilter";
import AgencyFilter from "./filters/AgenciesFilter";
import DecisionFilter from "./filters/DecisionFilter";
import StatesFilter from "./filters/StateFilter";
import CooperatingAgenciesFilter from "./filters/CooperatingAgenciesFilter";

import {
  actionOptions as actions,
  agencyOptions as agencies,
    decisionOptions as decisions,
    locations,
  counties,
} from "./data/dropdownValues";
import CountyFilter from "./filters/CountyFilter";
import ActionFilter from "./filters/ActionsFilter";
import _debounce from "lodash/debounce";

//console.log(actions.length, agencies.length, decisions.length, locations.length, counties.length);
// const actions = Array.from(new Set(actionOptions));
// const agencies = Array.from(new Set(agencyOptions));
// const counties = Array.from(new Set(countyOptions));
// const decisions = Array.from(new Set(decisionOptions));
// const states = Array.from(new Set(asLocationOptions));

const useStyles = makeStyles((theme) => ({
  checkbox: {
    padding: 0,
    margin: 0,
  },
  autoComplete: {
    fontSize: 20,
    padding: 0,
    margin: 0,
  },
}));

const SearchFilters = (props) => {
  // Remove unused import statement
  const context = useContext(SearchContext);
  const {
    pagination,
    filters,
    updatePaginationStateValues,
    updateFilterStateValues,
  } = context;
  const { page, sortby, sortdir, limit } = pagination;
  const {
    actions,
    agencies,
    agenciesRaw,
    cooperatingAgency,
    cooperatingAgencyRaw,
    county,
    countyRaw,
    isFast41,
  } = filters;

  //Common Settings used by all autocomplete filters
  const filterProps = {
    fullWidth: true,
    multiple: true,
    autoComplete: true,
    autoFocus: false,
    //autoHighlight: true,
    limitTags: 3,
    disablePortal: true,
    variant: "standard",
    closeText: "...Close",
    forcePopupIcon: true,
    selectOnFocus: true,

    //render selected values from the dropdown
    // renderTags: (props: any[]) => {
    //     return (
    //         props.map((prop: any) => (
    //             <Chip
    //                 component="div" // Add the missing component prop
    //                 size="small"
    //                 color="primary"
    //                 fontSize="small" // Remove the fontSize prop if it's not needed
    //                 key={prop.label} // Use the correct key prop
    //                 label={abbreviate(prop.label, 30)}
    //             />
    //         ))
    //     )
    // },
    //render selected values for the dropdown options
    getOptionLabel: (option) => abbreviate(option.label, 50),
    getLimitTagsText: (options) =>
      options.label.length > 10
        ? options.label.slice(0, 10) + "..."
        : options.label,

    // ),
  };
  const abbreviate = (text = "", length = 20) => {
    if (!text.length) {
      console.warn(
        `The text specified is empty this is most likely an upstream issue`
      );
      return "TEXT NOT FOUND!!!!";
    } else {
      return text.length > length ? text.slice(0, length) + "..." : text;
    }
  };

  const formControlProps = {
    p: 1,
    mb: 1,
    mt: 1,
  };

  return (
    <>
      <Box alignItems={"center"}>
        <FormLabel>
          <Typography variant="filterLabel">
            {" "}
            Search Only Within titles
          </Typography>
        </FormLabel>
      </Box>
      <Box>
        <FormLabel htmlFor="is_fast41">Fast 41 Documents Only</FormLabel>
        <Checkbox
          id="is_fast41"
          name="is_fast41"
          onChange={(e) => updatePaginationStateValues("is_fast41", !isFast41)}
        />
      </Box>
      <Box>
        <Button
          style={{ margin: 0 }}
          variant="outlined"
          fullWidth
          color="primary"
        >
          Clear Filters
        </Button>
      </Box>
      <Box>
        <Box>
          <AgencyFilter />
        </Box>

        <Box>
          <CooperatingAgenciesFilter />
        </Box>
        <Box>
          <StatesFilter />
        </Box>
        <Box>
          <CountyFilter />
        </Box>
        <Box>
          <ActionsFilter />
        </Box>
        <Box>
          <DecisionFilter />
        </Box> 
      </Box>
      <FormLabel htmlFor="searchDecision"></FormLabel>
      <Divider />
      <Box>
        <FormControlLabel
          label={
            <Typography variant="filterLabel">
              Final EIS
              {/* {EISCount ? EISCount : ''} */}
            </Typography>
          }
          control={
            <Checkbox
              name="typeDraft"
              id="typeDraft"
              tabIndex={12}
              //checked={state.typeFinal}
              //onClick={onTypeChecked}
            />
          }
        />
      </Box>
      <Box>
        <FormControlLabel
          label={
            <Typography variant="filterLabel">
              Draft EIS {/* {draftCount ? draftCount : ''} */}
            </Typography>
          }
          control={
            <Checkbox
              name="typeDraft"
              id="typeDraft"
              tabIndex={12}
              //checked={state.typeDraft}
              //onClick={onTypeChecked
            />
          }
        />
      </Box>
      <Box>
        <FormControlLabel
          label={
            <Typography variant="filterLabel">
              EA
              {/* {eaCount ? eaCount : '' */}
            </Typography>
          }
          control={
            <Checkbox
              name="typeEA"
              id="typeEA"
              tabIndex={13}
              //checked={state.eaCount}
              //onChange={onTypeChecked}
            />
          }
        />
      </Box>
      <Box>
        <FormControlLabel
          label={
            <Typography variant="filterLabel">
              NOI
              {/* {noiCount ? noiCount : ''} */}
            </Typography>
          }
          control={
            <Checkbox
              name="typeNOI"
              tabIndex={14}
              //checked={state.typeNOI}
              //onChange={onTypeChecked}
            />
          }
        />
      </Box>
      <Box>
        <FormControlLabel
          label={
            <Typography variant="filterLabel">
              ROD
              {/* {rodCount ? rodCount : ''} */}
            </Typography>
          }
          control={
            <Checkbox
              name="typeROD"
              id="typeROD"
              tabIndex={15}
              //checked={typeROD}
              //onChange={(evt) => onTypeChecked(evt)}
            />
          }
        />
      </Box>
      <Box>
        <FormControlLabel
          label={
            <Typography variant="filterLabel">
              {/* Scoping Report 
                          {scopingCount ? scopingCount : ''} */}
            </Typography>
          }
          control={
            <Checkbox name="typeScoping" id="typeScoping" tabIndex={16} />
          }
        />
      </Box>

      <Box className="sidebar-checkboxes">
        <Typography variant="h6">Advanced</Typography>
        <FormControlLabel
          label={
            <Typography variant="filterLabel">
              Final
              {/* {finalCount ? finalCount : ''} */}
            </Typography>
          }
          control={
            <Checkbox
              name="typeFinal"
              //checked={useOptionsChecked}
              //onClick={(evt) => onTypeChecked(evt)}
              onChange={(evt) => {
                console.log(
                  `file: SideBarFilters.jsx:492 ~ SideBarFilters ~ evt:`,
                  evt
                );
                //onTypeChecked(evt)
              }}
            />
          }
        />
      </Box>
    </>
  );
};
//export default withStyles(useStyles)(SideBarFilters);
export default SearchFilters;



// const onLocationChange = (evt, item) => {
//   var stateValues = [];
//   const context = useContext(SearchContext);
//   const { debouncedUpdateFilterStateValues, filters } = context;

//   for (var i = 0; i < evt.length; i++) {
//     //stateValues.push(evt[i].value);
//   }
//   //[TODO] need to update the countyOptions array to include all counties in the state selected
//   debouncedUpdateFilterStateValues("countyOptions", narrowCountyOptions(stateValues));
//   debouncedUpdateFilterStateValues("stateRaw", evt);
//   countyOptions: narrowCountyOptions(stateValues);

// };



