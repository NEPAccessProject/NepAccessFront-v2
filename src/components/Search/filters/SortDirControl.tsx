import { Autocomplete, FormControl, FormLabel, Grid, TextField } from "@mui/material";
//import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import React, { useContext } from "react";
import SearchContext from "../SearchContext";
import Select from 'react-select'
import { loadavg } from "os";

const options = [
    "ASC","DESC"
]
const SortDirControl = () => {
    const ctx = useContext(SearchContext);
    const { pagination, updateFilterStateValues,filters,updatePaginationStateValues,loading,error,results } = ctx;
    const {sortby,sortdir} = pagination;
    
    const onSortDirChange = (value,action) => {
        console.log(`onSortDirChange ~ val:`, value,action);

  //      let filteredValues:FilterOptionType[]  = [];
        
          updatePaginationStateValues("sortdir", value);
    }
    //react-select version
    return (
      <>  
      <Grid container>
      <Grid item xs={4} display={'flex'} style={{justifyContent: 'center',alignItems: 'center'}}>
          <FormLabel htmlFor="searchAgency">Sort Order:</FormLabel>
        </Grid>
        <Grid item xs={8}>
          <Select
                className="basic-single"
                classNamePrefix="select"
                isDisabled={loading || !results.length}
                defaultValue={{
                  label: 'ASC',
                  value: 'ASC',
                }}
                isLoading={loading}
                name="sort-order-select"
                onChange={(newValue, actionMeta) => onSortDirChange(newValue, actionMeta)}                options={[
                    { value: 'ASC', label: 'ASC' },
                    { value: 'DESC', label: 'DESC' },
                ]}
        />
        </Grid>
      </Grid>
      
      </>
    )
    // return (
    //   <Grid container display={"flex"}>
    //     <Grid item xs={3} >
    //       <FormLabel htmlFor="searchAgency">Sort Direction:</FormLabel>
    //     </Grid>
    //     <Grid item xs={9}>
    //       <FormControl fullWidth>
    //         <Autocomplete
    //           fullWidth
    //           id="sortdir"
    //           tabIndex={5}
    //           options={['ASC','DESC']}
    //           defaultValue={'ASC'}
    //           value={`${sortdir}`.toUpperCase()}
    //           onChange={(evt, value, tag) =>
    //             onSortDirChange(evt,value ? value: '',tag)
    //           }
    //           renderInput={(params) => {
    //             return (
    //               <TextField
    //                 {...params}
    //                 variant="outlined"
    //                 placeholder="Sort Direction"
    //                 sx={{
    //                   wordWrap: "break-word",
    //                   overflow: "hidden",
    //                   p: 0,
    //                 }}
    //               />
    //             );
    //           }}
    //         />
    //       </FormControl>
    //     </Grid>
    //   </Grid>
    // );
  };
  export default SortDirControl;