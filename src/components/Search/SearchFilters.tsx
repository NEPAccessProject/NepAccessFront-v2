import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  FormLabel,
  Typography
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { useContext } from "react";
//import { ThemeProvider, createUseStyles } from "react-jss";
import { makeStyles } from "@mui/styles";
import SearchContext from "./SearchContext";
//import Grid from '@mui/material/Grid'; // Grid version 1
import ActionsFilter from "./filters/ActionsFilter";
import AgencyFilter from "./filters/AgenciesFilter";
import CooperatingAgenciesFilter from "./filters/CooperatingAgenciesFilter";
import DecisionFilter from "./filters/DecisionFilter";
import StatesFilter from "./filters/StateFilter";

import CountyFilter from "./filters/CountyFilter";
import { Padding } from "@mui/icons-material";

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
    action: actions,
    agency: agencies,
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
  const formLabelProps = {
    margin:1,
    border:'1px solid black',
  }
  const gridItemProps = {
    spacing: 1,
    marginTop: 1,
    marginBottom: 1,
//    flex: 1,
 //   xs:12,
    // borderLeft: "none",
    // borderRight: "1px solid #eee",
 //   border: "1px solid #eee",
//    display: "flex",
    // justifyContent: "center",
    // justifyItems: "center",
    // alignContent: "center",
    // alignItems: "center",
    "&:hover": {
      //           backgroundColor: //theme.palette.grey[200],
      boxShadow: "0px 4px 8px rgba(0.5, 0.5, 0.5, 0.15)",
      cursor: "pointer",
      "& .addIcon": {
        color: "purple",
      },
    },
  };
  return (
    <>
      <Box alignItems={"center"}>
        <FormLabel {...formLabelProps}>
          <Typography variant="filterLabel">
            {" "}
            Search Only Within titles
          </Typography>
        </FormLabel>
      </Box>
      <Box>
        <FormLabel {...formLabelProps} htmlFor="is_fast41">Fast 41 Documents Only</FormLabel>
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
      <Grid >
        <Grid xs={12} marginTop={1}>
          <Grid xs={12}>
            <Typography variant="filterLabel">Lead Agencies:</Typography>
          </Grid>
          <Grid xs={12}>
            <AgencyFilter />
          </Grid>
        </Grid>

        <Grid {...gridItemProps} xs={12}>
          <Grid xs={12}><Typography variant="filterLabel">Cooperating Agencies:</Typography></Grid>
          <Grid xs={12}><CooperatingAgenciesFilter /></Grid>
        </Grid>
        <Grid {...gridItemProps} xs={12}>
          <Grid xs={12}><Typography variant="filterLabel">State(s) / Region(s):</Typography></Grid>
          <Grid xs={12}><StatesFilter /></Grid>
        </Grid>
        <Grid {...gridItemProps} xs={12}>
          <Grid xs={12}>
            <Typography variant="filterLabel">Counties / Locations:</Typography>
            </Grid>
          <Grid xs={12}><CountyFilter /></Grid>
        </Grid>
        <Grid {...gridItemProps} xs={12}>
          <Grid xs={12}><Typography variant="filterLabel">Actions:</Typography></Grid>
          <Grid xs={12}><ActionsFilter /></Grid>
        </Grid>
        <Grid {...gridItemProps} xs={12}>
          <Grid xs={12}><Typography variant="filterLabel">Decision(s):</Typography></Grid>
          <Grid xs={12}><DecisionFilter /></Grid>
        </Grid> 
      </Grid>
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
//   const { updateFilterStateValues, filters } = context;

//   for (var i = 0; i < evt.length; i++) {
//     //stateValues.push(evt[i].value);
//   }
//   //[TODO] need to update the countyOptions array to include all counties in the state selected
//   updateFilterStateValues("countyOptions", narrowCountyOptions(stateValues));
//   updateFilterStateValues("stateRaw", evt);
//   countyOptions: narrowCountyOptions(stateValues);

// };



