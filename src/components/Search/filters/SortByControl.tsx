import React, { useContext, useState } from "react";
import SearchContext from "../SearchContext";
import {  FormControl, FormLabel, Autocomplete, TextField,Grid } from "@mui/material";
//import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2

const SortByControl = () => {
    const ctx = useContext(SearchContext);
    const { pagination, updatePaginationStateValues,results,sortSearchResults } = ctx;
    const { page, limit, sortby } = pagination;

    const onSortByChange = (evt, value, reason) => {


      if(value.toLowerCase() === "relevance") {
        sortSearchResults(results,`${value}`);
      }
      else if (value.toLowerCase() === "date") {
        sortSearchResults(results,`${value}`);
      }
      else if (value.toLowerCase() === "title") {
        sortSearchResults(results,`${value}`);
      }

      console.log(`onSortByChange ~ value:`, value,"reason:", reason);
      updatePaginationStateValues("sortby", value);
      sortSearchResults(results,`${value}`);
    }
    return (
      <Grid container display={"flex"}>
        <Grid item xs={3} display={'flex'} style={{justifyContent: 'center',alignItems: 'center'}}>
          <FormLabel htmlFor="searchAgency">Sort By:</FormLabel>
        </Grid>
        <Grid item xs={9}>
          <FormControl fullWidth>
            <Autocomplete
              fullWidth
              id="sortby"
              tabIndex={5}
              defaultValue={"relevance"}
              options={['Relevance', 'Date', 'Title']}
              value={`${sortby}`}
              onChange={(evt, value, tag) =>
                onSortByChange(evt, value, tag)
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
    );
  };
  export default SortByControl;