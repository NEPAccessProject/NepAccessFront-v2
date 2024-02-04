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
import { FilterType } from "@/components/interfaces/interfaces";

import {
  actionOptions as actions,
  agencyOptions as agencies,
    decisionOptions as decisions,
    locations,
  counties,
} from "./data/dropdownValues";
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
    action,
    agency,
    agencyRaw,
    cooperatingAgency,
    cooperatingAgencyRaw,
    county,
    countyRaw,
    isFast41,
  } = filters;

  // Add missing prop validation
  interface ISearchFiltersProps {
    filtersHidden: boolean;
  }

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
          onChange={(e) => updateFilterStateValues("is_fast41", !isFast41)}
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
          {/* <CooparingAgencyFilter /> */}
        </Box>
        <Box>
          {/* <StatesFilter /> */}
        </Box>
        <Box>
          {/* <CountiesFilter /> */}
        </Box>
        <Box>
          {/* <ActionsFilter /> */}
        </Box>
        <Box>
          {/* <DecisionFilter /> */}
        </Box>
      </Box>
      <FormLabel htmlFor="searchDecision"></FormLabel>
      <Typography variant="filterLabel">Decision Type</Typography>
      <Autocomplete
        id="searchDecision"
        {...filterProps}
        tabIndex={11}
        options={decisions}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            placeholder="Type or select decision type(s)"
            sx={{
              width: "100%",
              p: 0,
            }}
          />
        )}
      />
      {/* #endregion */}

      <Divider />
      {/* #region document type filters */}
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

export function AgencyFilter(props) {
  const context = useContext(SearchContext);
  const { updateFilterStateValues, filters } = context;
  const { agencyRaw, agency, cooperatingAgency, cooperatingAgencyRaw } =
    filters;
  const onAgencyChange = (evt:React.SyntheticEvent<c>, value, tag) => {
    console.log(`onAgencyChange ~ value:`, typeof value);
    console.log(`onAgencyChange ~ evt:`, typeof evt);
    console.log(`onAgencyChange ~ tag:`, tag);
    console.log(`onAgencyChange ~ evt,value:`, evt, value);
    var agencyLabels = [];
    //agencyLabels.push(:value.value);
    // this.setState(prevState => {
    //     let inputs = { ...prevState.inputs };  // creating copy of state variable inputs
    //     inputs.agency = agencyLabels;                     // update the name property, assign a new value
    //     return { inputs };                                 // return new object inputs object
    // }, () =>{
    //     this.debouncedSearch(this.state.inputs);
    // });

    updateFilterStateValues("agencyRaw", evt);
    updateFilterStateValues("cooperatingAgencyRaw", evt);
  };

  return (
    <>
      <Autocomplete
        id="agency"
        // {...filterProps}
        tabIndex={4}
        multiple
        loading={context.loading}
        options={agencies}
        isOptionEqualToValue={(option, value) => {
          return option.value === value.value
          agencies.filter(agency=> {
             
              //console.log(`Agency:`,agency.value,'option',option,'value',value)
              agency.value !== value.value
          })
        }}
                onChange={(evt, value, tag) => onAgencyChange(evt, value, tag)}
        renderInput={(params) => {
          return (
            <TextField
              {...params}
              value={agencies.filter((v) => agencyRaw === v.value)}
              placeholder="Type or Select Lead Agencies"
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
    </>
  );
}
export function CooparingAgencyFilter(props) {
  const context = useContext(SearchContext);
  const {
    pagination,
    filters,
    updatePaginationStateValues,
    updateFilterStateValues,
  } = context;
  const { cooperatingAgencyRaw, cooperatingAgency, agencyRaw } = filters;
  const onCooperatingAgencyChange = (evt, value, tag) => {
    console.log(`onCooperatingAgencyChange ~ value:`, value, "tag", tag);
    console.log(`evt:`, evt);
    var agencyLabels = [];
    for (var i = 0; i < evt.length; i++) {
      //agencyLabels.push(evt[i].label.replace(/ \([A-Z]*\)/gi,""));
    }
    updateFilterStateValues("cooperatingAgency", agencyLabels);
  };
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
          isOptionEqualToValue={(option, value) => agencyRaw === value.value}
          onChange={(evt, value, tag) =>
            onCooperatingAgencyChange(evt, value, tag)
          }
          renderInput={(params) => {
            return (
              <TextField
                {...params}
                placeholder="Type or Select Lead Agencies"
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

/** Helper method for onLocationChange limits county options to selected states in filter,
 * or resets to all counties if no states selected */
const narrowCountyOptions = (stateValues) => {
  /** Filter logic for county array of specific label/value format given array of state abbreviations  */
  function countyFilter(_stateValues) {
    return function (a) {
      let returnValue = false;
      _stateValues.forEach((item) => {
        if (a.label.split(":")[0] === item) {
          // a.label.split(':')[0] gets 'AZ' from expected 'AZ: Arizona'
          returnValue = true;
        }
      });
      return returnValue;
    };
  }

  let filteredCounties = counties;
  if (stateValues && stateValues.length > 0) {
    filteredCounties = filteredCounties.filter(countyFilter(stateValues));
  }

  return filteredCounties;
};

const StatesFilter = () => {
  const context = useContext(SearchContext);
  const { updateFilterStateValues, filters } = context;
  const { states, stateRaw, countyRaw, county } = filters;
  const onLocationChange = (evt, item, reason) => {
    console.log(`onLocationChange ~ evt,item,reason:`, evt, item, reason);
    var stateValues = [];
    for (var i = 0; i < evt.length; i++) {
      //stateValues.push(evt[i].value);
    }
    updateFilterStateValues("stateRaw", evt);
    updateFilterStateValues("countyRaw", stateValues);
    updateFilterStateValues("county", narrowCountyOptions(stateValues));

    //onCountyChange(countyOptions.filter(countyObj => this.state.county.includes(countyObj.value)));
  };
  return (
    <>
      <FormLabel htmlFor="state">State(s) and Location(s):</FormLabel>
      <Autocomplete
        id="state"
        options={states}
        isOptionEqualToValue={(option, value) => stateRaw === value}
        onChange={(evt, value, reason) => onLocationChange(evt, value, reason)}
        renderInput={(params) => {
          return (
            <TextField
              {...params}
              placeholder="Type or Select a State"
              variant="outlined"
              sx={{
                width: "100%",
                p: 0,
              }}
            />
          );
        }}
      />
    </>
  );
};


const CountiesFilter = () => {
  const context = useContext(SearchContext);
  const { updateFilterStateValues, filters } = context;
  const { county, countyRaw } = filters;

  const onCountyChange = (evt, item,tag) => {
    console.log(`onCountyChange ~ evt, item:`, evt, item,tag);

    const countyValues = [];
    for (var i = 0; i < evt.length; i++) {
      // countyValues.push(evt[i].value);
    }

    updateFilterStateValues("countyValues", countyValues);
    updateFilterStateValues("countyRaw", evt);
  };
  return (<>
    <FormLabel
                    htmlFor='county'>
                    County/counties:
                  </FormLabel>
                  <Autocomplete
                    id='county'
                    tabIndex={5}
                    options={counties}
                    isOptionEqualToValue={(option, value) => countyRaw === value.value}
                    // value={counties.filter((v) => counties.includes({value: v.value, label: v.value
                    // }))}
                    onChange={(evt, value, reason) =>
                      onCountyChange("county", value,reason)
                    }
                    renderInput={(params) => {
                      return (
                        <TextField
                          placeholder='Type or Select a Counties'
                          {...params}
                          variant='outlined'
                          sx={{
                            width: '100%',
                            p: 0,
                          }}
                        />
                      );
                    }}
                  />
  </>)
};

const onLocationChange = (evt, item) => {
  var stateValues = [];
  const context = useContext(SearchContext);
  const { updateFilterStateValues, filters } = context;

  for (var i = 0; i < evt.length; i++) {
    //stateValues.push(evt[i].value);
  }
  //[TODO] need to update the countyOptions array to include all counties in the state selected
  updateFilterStateValues("countyOptions", narrowCountyOptions(stateValues));
  updateFilterStateValues("stateRaw", evt);
  countyOptions: narrowCountyOptions(stateValues);

};

const ActionsFilter = () => {
  const context = useContext(SearchContext);
  const { updateFilterStateValues, filters } = context;
  const { action, actionRaw } = filters;
  const onActionChange = (evt) => {
    var actionLabels = [];
    for (var i = 0; i < evt.length; i++) {
      //actionLabels.push(evt[i].label.replace(/ \([A-Z]*\)/gi,""));
    }
    updateFilterStateValues("action", actionLabels);
    updateFilterStateValues("actionRaw", evt);
  };
  return (<>
    <FormLabel htmlFor='searchAction'>Action Type:</FormLabel>
                    <Autocomplete
                      id='searchAction'
                      tabIndex={10}
                      className={'classes.autocomplete'}
                      options={actions}
                      isOptionEqualToValue={(option, value) => actionRaw === value.value}

//                      isOptionEqualToValue={(option, value) => actionRaw === value.value}
//                     value={(actions.filter((v) => action.includes(v)))}
                     onChange={(evt, value, reason) => updateFilterStateValues("action", value?.value)}
                      renderInput={(params) => {
                        return (
                          <TextField
                            {...params}
                            placeholder='Type or Select a Action Type(s)'
                            variant='outlined'
                            sx={{
                              width: '100%',
                              p: 0,
                            }}
                          />
                        );
                      }}
                    />
   </>);
};

const DecisionFilter = () => {
  const context = useContext(SearchContext);
  const { filters, updateFilterStateValues } = context;
  const { decision, decisionRaw } = filters;
  const onDecisionChange = (evt,value,reason) => {
    console.log(`onDecisionChange ~ evt,value,reason:`, evt,value,reason);
    var decisionLabels = [];
    for (var i = 0; i < evt.length; i++) {
      // decisionLabels.push(evt[i].label.replace(/ \([A-Z]*\)/gi,""));
    }
    updateFilterStateValues("decisionLabels", decisionLabels);
    updateFilterStateValues("decisionRaw", evt);
  };
  //[TODO] need to
  return (<>
  
  <FormLabel htmlFor='searchAction'>Decision:</FormLabel>
                    <Autocomplete
                      id='decision'
                      tabIndex={10}
                      className={'classes.autocomplete'}
                      options={decisions}
                      isOptionEqualToValue={(option, value) => decisionRaw === value.value}

//                      isOptionEqualToValue={(option, value) => actionRaw === value.value}
//                     value={(actions.filter((v) => action.includes(v)))}
                     onChange={(evt, value, reason) => onDecisionChange("decision", value?.value,reason)}
                      renderInput={(params) => {
                        return (
                          <TextField
                            {...params}
                            placeholder='Type or Select a Action Type(s)'
                            variant='outlined'
                            sx={{
                              width: '100%',
                              p: 0,
                            }}
                          />
                        );
                      }}
                    />
  </>);
};
