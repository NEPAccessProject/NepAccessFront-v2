import {
  Autocomplete,
  FormControl,
  FormLabel,
  Grid,
  TextField,
} from "@mui/material";
import React, { useContext } from "react";
import SearchContext from "../SearchContext";
//import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { FilterOptionType } from "@/components/interfaces/interfaces";
const DistanceControl = () => {
  const context = useContext(SearchContext);
  const results = context.results;
  const { updateFilterStateValues, filters, sortSearchResults } = context;
  console.log("🚀 ~ DistanceControl ~ # of results:", results.length);

  const { sortby, sortdir } = context.pagination;
  const { distance } = filters;
  const onDistanceFilterChange = (
    evt: React.SyntheticEvent,
    selected,
    reason
  ) => {
    let target = evt.target as HTMLInputElement;
    let raw = (evt.target as HTMLInputElement).value;
    console.log(`onDecisionChange ~ raw:`, raw);
    let filteredDistances: FilterOptionType[] = [];

    if (reason === "selectOption") {
      filteredDistances.push(selected);
    } else if (reason === "removeOption") {
      const filtered = filteredDistances.filter(
        (v) => v.value !== selected.value
      );
      filteredDistances = filtered;
    } else if (reason === "clear") {
      filteredDistances = [];
    }

    updateFilterStateValues("distance", filteredDistances);
    //      updateFilterStateValues("decisionsRaw", evt);
  };

  return (
    <>
      <Grid container style={{ display: "flex" }}>
        <Grid item xs={3} paddingLeft={1}>
          <FormLabel htmlFor="searchAgency">Search Within...</FormLabel>
        </Grid>

        <Grid item xs={9}>
          <FormControl fullWidth>
            <Autocomplete
              fullWidth
              id="limit"
              style={{
                width: "100%",
              }}
              // isOptionEqualToValue={(option, value) => {
              //   return option === value
              // }}
              tabIndex={4}
              options={["Exact Phrase", "10", "25", "50", "100"]}
              defaultValue={"Exact phrase"}
              onChange={(evt, value, tag) =>
                onDistanceFilterChange(evt, value, tag)
              }
              renderInput={(params) => {
                return (
                  <TextField
                    {...params}
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
          </FormControl>
        </Grid>
      </Grid>
    </>
  );
};
export default DistanceControl;
