import {
  Autocomplete,
  FormControl,
  FormLabel,
  Grid,
  TextField,
} from "@mui/material";
import React, { useContext } from "react";
import SearchContext from "../SearchContext";
import Select from "react-select";
//import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { FilterOptionType } from "@/components/interfaces/interfaces";
const DistanceControl = () => {
  const context = useContext(SearchContext);
  const results = context.results;
  const { updateFilterStateValues, filters,loading,error } = context;
  console.log("🚀 ~ DistanceControl ~ # of results:", results.length);

  const { sortby, sortdir } = context.pagination;
  const { distance } = filters;
  
  const onDistanceFilterChange = (value, action) => {
    console.log(`onDistanceFilterChange ~ action:`, action);
    console.log(`onDistanceFilterChange ~ value:`, value);
    // let target = evt.target as HTMLInputElement;
    // let raw = (evt.target as HTMLInputElement).value;
    // console.log(`onDecisionChange ~ raw:`, raw);
    // let filteredDistances: FilterOptionType[] = [];

    // if (reason === "selectOption") {
    //   filteredDistances.push(selected);
    // } else if (reason === "removeOption") {
    //   const filtered = filteredDistances.filter(
    //     (v) => v.value !== selected.value
    //   );
    //   filteredDistances = filtered;
    // } else if (reason === "clear") {
    //   filteredDistances = [];
    // }

    updateFilterStateValues("distance", value);
    //      updateFilterStateValues("decisionsRaw", evt);
  };

  return (
    <>
      <Grid container style={{ display: "flex" }}>
        <Grid item xs={3} paddingLeft={1}>
          <FormLabel htmlFor="searchAgency">Search Within...</FormLabel>
        </Grid>

        <Grid item xs={9}>
        <Select
                className="basic-single"
                classNamePrefix="select"
                isDisabled={loading}
                defaultValue={{
                  label: 'Exact Phrase',
                  value: 'Exact Phrase',
                }}
                isLoading={()=>loading}
                isClearable={true}
                name="sort-order-select"
                onChange={(newValue, actionMeta) => onDistanceFilterChange(newValue, actionMeta)}                options={[
                    { label: 'Exact Phrase',value: 'Exact Phrase' },
                    { label: '1',value: "1" },
                    { label: '5',value: '5' },
                    { label: '10',value: '10' },

                    
                ]}
        />
          {/* <FormControl fullWidth>
            <Autocomplete
              fullWidth
              id="limit"
              style={{
                width: "100%",
              }}
              value={distance}
              tabIndex={4}
              options={['Exact Phrase', '1','5','10','20']
}
              defaultValue={"Exact Phrase"}
             // value={parseInt(distance) || 0}
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
          </FormControl> */}
        </Grid>
      </Grid>
    </>
  );
};
export default DistanceControl;
