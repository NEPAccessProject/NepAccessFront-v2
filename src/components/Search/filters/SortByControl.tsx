import React, { useContext, useState } from "react";
import SearchContext from "../SearchContext";
import {  FormControl, FormLabel, Autocomplete, TextField,Grid } from "@mui/material";
import Select from 'react-select'
//import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2

const SortByControl = () => {
    const ctx = useContext(SearchContext);
    const { pagination, updatePaginationStateValues,results,loading,error } = ctx;
    const { page, limit, sortby } = pagination;

    const onSortByChange = (value, action) => {
    console.log(`onSortByChange ~ action:`, action);
    console.log(`onSortByChange ~ value:`, value.value);

    //seperate to sort by and sort direction based on ("_")
    const sortBy = value.value.split("_")[0];
    const sortDir = value.value.split("_")[1];
    console.log(`onSortByChange ~ sortBy:`, sortBy);
    console.log(`onSortByChange ~ sortDir:`, sortDir);


      // if(value.toLowerCase() === "relevance") {
      //   sortSearchResults(results,`${value}`);
      // }
      // else if (value.toLowerCase() === "date") {
      //   sortSearchResults(results,`${value}`);
      // }
      // else if (value.toLowerCase() === "title") {
      //   sortSearchResults(results,`${value}`);
      // }

      // console.log(`onSortByChange ~ value:`, value,"reason:", reason);

      //This should trigger an effect to sort existing results
      updatePaginationStateValues("sortby", sortBy);
      updatePaginationStateValues("sortdir", sortDir);
      //sortSearchResults(results,`${value}`);
    }
    return (
      <Grid container display={"flex"}>
        <Grid item xs={3} display={'flex'} style={{justifyContent: 'center',alignItems: 'center'}}>
          <FormLabel htmlFor="searchAgency">Sort By:</FormLabel>
        </Grid>
        <Grid item xs={9}>
        <>  <Select
            className="basic-single"
            classNamePrefix="select"
            defaultValue={{
              label: 'Relevance',
              value: 'relavancy',
            }}
            onChange={(newValue, actionMeta) => onSortByChange(newValue, actionMeta)}
            isDisabled={loading ||!results.length}
            isLoading={loading}
            name="sort-dir-select-control"
            options={[
                { value: 'relavancy-desc', label: 'Most Relevant ' },
                { value: 'relavancy-asc', label: 'Least Relevant ' },
                { value: 'title-desc', label: 'Title: A-Z  ' },
                { value: 'title-asc', label: 'Title: Z-A  ' },
                { value: 'agency-desc', label: 'Agency Name: A-Z ' },
                { value: 'agency-asc', label: 'Agency Name: Z-A ' },
                { value: 'commentDate-desc', label: 'Date: Newest to Oldest ' },
                { value: 'commentDate-asc', label: 'Date: Oldest to Newest ' },
                
            ]}
    />
      
      </>

          {/* <FormControl fullWidth>
            <Autocomplete
              fullWidth
              id="sortby"
              tabIndex={5}
              defaultValue={"Relevance"}
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
          </FormControl> */}
        </Grid>
      </Grid>
    );
  };
  export default SortByControl;