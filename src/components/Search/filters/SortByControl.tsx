import React, { useContext, useState } from "react";
import SearchContext from "../SearchContext";
import {  FormControl, FormLabel, Autocomplete, TextField } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2

const SortByControl = () => {
    const ctx = useContext(SearchContext);
    const { pagination, updatePaginationStateValues } = ctx;
    const { page, limit, sortby } = pagination;
    return (
      <Grid container display={"flex"}>
        <Grid xs={3} display={'flex'} style={{justifyContent: 'center',alignItems: 'center'}}>
          <FormLabel htmlFor="searchAgency">Sort By:</FormLabel>
        </Grid>
        <Grid xs={9}>
          <FormControl fullWidth>
            <Autocomplete
              fullWidth
              id="sortby"
              tabIndex={5}
              defaultValue={"relevance"}
              options={["Relevance", "Title","Lead Agency" ,"Date","State"]}
              value={`${sortby}`}
              onChange={(evt, value, tag) =>
                updatePaginationStateValues("sortby", value)
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