import React,{useContext,useState} from "react";
import { FormControl,FormLabel,TextField,Autocomplete } from "@mui/material";
import SearchContext from "../SearchContext";
import {FilterOptionType} from "@/components/interfaces/interfaces";
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2

const options = [
    "ASC","DESC"
]
const SortDirControl = (evt,selected,reason) => {
    const ctx = useContext(SearchContext);
    const { pagination, debouncedUpdateFilterStateValues,filters } = ctx;
    const {sortby,sortdir} = pagination;
    
    const onSortDirChange = (evt: React.SyntheticEvent,value: string,reason) => {
        let target = evt.target as HTMLInputElement;
        const raw = (evt.target as HTMLInputElement).value;

        let filteredValues:FilterOptionType[]  = [];
        if (reason === "selectOption") {
          selected.map((s:any) => {  
            console.log(`selected.map ~ s:`, s);
            return filteredValues.push(s);
          });
        }
        else if (reason === "clear") {
          filteredValues = [];
        }
        debouncedUpdateFilterStateValues("distance", filteredValues);
    }
    return (
      <Grid container display={"flex"}>
        <Grid xs={3} >
          <FormLabel htmlFor="searchAgency">Sort Direction:</FormLabel>
        </Grid>
        <Grid xs={9}>
          <FormControl fullWidth>
            <Autocomplete
              fullWidth
              id="sortdir"
              tabIndex={5}
              options={options}
              defaultValue={'ASC'}
              value={`${sortdir}`}
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