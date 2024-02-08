import React, { FormEvent, useContext } from "react";

import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  Chip,
  Container,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  Input,
  Link,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { SearchOutlined } from "@mui/icons-material";
import Grid from "@mui/material/Unstable_Grid2";
import styled from "styled-components";
import SearchContext from "./SearchContext";
import SortByControl from "./filters/SortByControl";
import SortDirControl from "./filters/SortDirControl";
import { AutoComplete } from "material-ui";
import _ from "lodash";
const GridItemProps = {
  borderRight: 1,
  borderColor: "#ddd",
  padding: 1,
  alignItems: "center",
  justifyContent: "center",
  paddingRight: 2,
  // elevation: 1,
  // borderRadius: 1,
  // justifyContent: 'flex-start',
  // alignItems: 'center',
  // border: '1px solid black',
  // flexWrap: 'wrap',
};

const SearchHeader = () => {
  //const {titleRaw, onInput, onKeyUp, onKeyDown, onEnter, onSearch} = context;
  const context = useContext(SearchContext);
  const {
    filters,
    pagination,
    debouncedUpdateFilterStateValues,
    updatePaginationStateValues,
  } = context;
  const { proximityDisabled,proximityOption } = filters;
  const { page, limit, sortby, sortdir } = pagination;
  const onInput = (evt) => { 
    evt.preventDefault();
    const titleRaw = (evt.target as HTMLInputElement).value;
    console.log(`onInput ~ searchTerm:`, titleRaw);
    debouncedUpdateFilterStateValues("titleRaw", titleRaw);
  };
  //[TODO] 

  const onIconClick = (evt: React.SyntheticEvent) => {
    evt.preventDefault();
    const raw = (evt.target as HTMLInputElement).value;
    console.log(`onIconClick ~ raw:`, raw);
    debouncedUpdateFilterStateValues("titleRaw", raw);
  };

  const onKeyDown = (evt) => {
    evt.preventDefault();
    const key = (evt.target as HTMLInputElement).value;
    //check if it's the enter key otherwise ignore
    if (evt.key === "Enter") {
      console.log(`onKeyDown ~ key:`, key);
      debouncedUpdateFilterStateValues("titleRaw", key);
    }
  };
  const updateLimit = (key: string, val: any) => {
    console.log(`updateLimit ~ key:string,val:any:`, key, val);
    updatePaginationStateValues(key, val);
  };

  const updateFilters = (key: string, value: string) => {
    console.log(`updateFilters ~ key:string,value:string:`, key, value);
    debouncedUpdateFilterStateValues(key, value);
  };
  const {titleRaw} = filters;
  return (
    <>
      {/* <Grid xs={12}>
          <AppBar />
        </Grid> */}
      <Grid
        container
        display={"flex"}
        justifyContent={"flex-start"}
        borderBottom={1}
        borderColor={"#EEE"}
        padding={1}
      >
  
        <Grid id={'distance-filter'}
          display={"flex"}
          justifyContent={"center"}
          xs={12}
          alignItems={"center"}
          alignContent={"center"}
          justifyItems={"center"}
          >
          <Input
            fullWidth
//            onKeyDown={(evt)=>onKeyDown(evt)}
            //disabled={proximityOption === false}
            id="titleRaw"
            name="titleRaw"
            onInput={(evt) => onInput(evt)}
            onKeyDown={(evt) => onKeyDown(evt)}
            placeholder="Search for NEPA Documents..."
//            value={titleRaw}
            sx={{
              padding: 0,
              margin: 1,
            }}
            // InputProps={{
            //   endAdornment: (
            //     <Grid md={1} xs={0}>
            //       <IconButton 
            //         name="titleRaw"
            //         onClick={(evt) => onIconClick(evt)}
            //       >
            //         <SearchOutlined />
            //       </IconButton>
            //     </Grid>
            //   ),
            // }}
          />
        </Grid>
      </Grid>
      <Grid container display={"flex"} justifyContent={"flex-start"} style={{}}>
        <Grid {...GridItemProps} xs={3}>
          {/* <DistanceFilter /> */}
          </Grid>
        <Grid {...GridItemProps} xs={3}>
          {/* <SortByControl /> */}
        </Grid>
        <Grid {...GridItemProps} xs={3}>
          {/* <SortDirControl /> */}
        </Grid>
        <Grid {...GridItemProps} xs={3}>
          {/* <LimitControl /> */}
        </Grid>
      </Grid>
    </>
  );
};
export default SearchHeader;

const gridStyle = {
  display: "flex",
  justifyContent: "flex-end",
  alignContent: "center",
  alignItems: "center",
  padding: 2,
};
const DistanceFilter = () => {
  const context = useContext(SearchContext);
  const { pagination, updatePaginationStateValues } = context;
  const { page, limit, sortby, sortdir } = pagination;
  return (
    <Grid container style={{ display: "flex" }}>
      <Grid xs={3} style={gridStyle} paddingLeft={1}>
        <FormLabel htmlFor="searchAgency">Search Within...</FormLabel>
      </Grid>

      <Grid xs={9} style={gridStyle}>
        <FormControl fullWidth>
          <Autocomplete
            fullWidth
            id="limit"
            style={{
              width: "100%",
            }}
            tabIndex={4}
            defaultValue={{label: "exact phrase",value:"0"}}
            options={[{ label: "exact phrase",value:"0" },
              {label:10,value:10}, 
              {label:'25', value:25}, 
              {label:'50', value: 50},
          ]}
                          onChange={(evt, value, tag) =>
              updatePaginationStateValues("distance", value)
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


const LimitControl = () => {
  const context = useContext(SearchContext);
  const { pagination, updatePaginationStateValues } = context;
  const { page, limit, sortby, sortdir } = pagination;
  return (
    <Grid container>
      <Grid xs={3} style={gridStyle} marginRight={0} paddingRight={0}>
        <FormLabel htmlFor="searchAgency"># of Results:</FormLabel>
      </Grid>
      <Grid xs={9}>
        <FormControl fullWidth>
          <Autocomplete
            fullWidth
            id="limit"
            tabIndex={4}
            options={["1", "10", "25", "50", "100"]}
            value={`${limit}`}
            onChange={(evt, value, tag) =>
              updatePaginationStateValues("limit", value)
            }
            renderInput={(params) => {
              return (
                <TextField
                  {...params}
                  placeholder="Set A limit"
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
