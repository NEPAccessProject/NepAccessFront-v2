import { Autocomplete, FormControl, FormLabel, Grid, TextField } from "@mui/material";
//import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import React, { useContext } from "react";
import SearchContext from "../SearchContext";

const options = [
    "ASC","DESC"
]
const SortDirControl = () => {
    const ctx = useContext(SearchContext);
    const { pagination, updateFilterStateValues,filters,updatePaginationStateValues } = ctx;
    const {sortby,sortdir} = pagination;
    
    const onSortDirChange = (evt: React.SyntheticEvent,value: string,reason) => {
        let target = evt.target as HTMLInputElement;
        const val = (evt.target as HTMLInputElement).value;
        console.log(`onSortDirChange ~ val:`, val);

  //      let filteredValues:FilterOptionType[]  = [];
        
          updatePaginationStateValues("sortdir", val);
    }
    return (
      <Grid container display={"flex"}>
        <Grid item xs={3} >
          <FormLabel htmlFor="searchAgency">Sort Direction:</FormLabel>
        </Grid>
        <Grid item xs={9}>
          <FormControl fullWidth>
            <Autocomplete
              fullWidth
              id="sortdir"
              tabIndex={5}
              options={['ASC','DESC']}
              defaultValue={'ASC'}
              value={`${sortdir}`.toUpperCase()}
              onChange={(evt, value, tag) =>
                onSortDirChange(evt,value ? value: '',tag)
              }
              renderInput={(params) => {
                return (
                  <TextField
                    {...params}
                    variant="outlined"
                    placeholder="Sort Direction"
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
    );
  };
  export default SortDirControl;