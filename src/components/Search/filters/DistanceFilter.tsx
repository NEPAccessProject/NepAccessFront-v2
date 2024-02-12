import {
  Autocomplete,
  FormControl,
  FormLabel,
  Grid,
  TextField
} from "@mui/material";
import React, { useContext } from "react";
import SearchContext from "../SearchContext";
//import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { FilterOptionType } from "@/components/interfaces/interfaces";
const DistanceFilter = () => {

    const context = useContext(SearchContext);
    const { updateFilterStateValues, filters,sortSearchResults } = context;
    const {sortby,sortdir} = context.filters
    const { distance } = filters;
    const onDistanceFilterChange = (evt:React.SyntheticEvent, selected, reason) => {
      
      let target = evt.target as HTMLInputElement;
      let raw = (evt.target as HTMLInputElement).value;
      console.log(`onDecisionChange ~ raw:`, raw);
      let filteredDistances:FilterOptionType[] = [];

      if(reason === "selectOption") {
        filteredDistances.push(selected);
      } else if (reason === "removeOption") {
        const filtered = filteredDistances.filter((v) => v.value !== selected.value);
        filteredDistances = filtered;
      } else if (reason === "clear") {
        filteredDistances = [];
      }
      console.log(`onDecisionChange ~ filteredDistances:`, filteredDistances);
      const results = sortSearchResults(filteredDistances,sortby);
      updateFilterStateValues("distance", filteredDistances);
//      updateFilterStateValues("decisionsRaw", evt);
    }

  return (
    <>
          <Grid container style={{ display: "flex" }}>
      <Grid xs={3}paddingLeft={1}>
        <FormLabel htmlFor="searchAgency">Search Within...</FormLabel>
      </Grid>

      <Grid xs={9}>
        <FormControl fullWidth>
          <Autocomplete
            fullWidth
            id="limit"
            style={{
              width: "100%",
            }}
            tabIndex={4}
            options={["Exact Phrase", "10", "25", "50", "100"]}
            defaultValue={"Exact phrase"}
            onChange={(evt, value, tag) =>
              onDistanceFilterChange(evt,value,tag)
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
}
export default DistanceFilter;
