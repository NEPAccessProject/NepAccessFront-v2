import React, { FormEvent, useContext } from "react";
import {
  Autocomplete,
  Box,
  Button,
  Container,
  Checkbox,
  Paper,
  Divider,
  FormControl,
  FormLabel,
  Link,
  TextField,
  Typography,
  Stack,
  Chip,
  FormControlLabel,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import styled from "styled-components";
import SearchContext from "./SearchContext";
import { AutoComplete } from "material-ui";

const GridItem = styled(Grid)(({ theme }) => ({
  // padding: 0.5,
  // elevation: 1,
  // borderRadius: 1,
  // justifyContent: 'flex-start',
  // alignItems: 'center',
  // border: '1px solid black',
  // flexWrap: 'wrap',
}));
const GridContainer = styled(Grid)(({ theme }) => ({
  // padding: 0.5,
  // elevation: 1,
  // display: 'flex',
  // border: 0,
  // borderRadius: 1,
  // justifyContent: 'flex-start',
  // alignItems: 'center',
  // flexWrap: 'wrap',
}));

const SearchHeader = () => {
  //const {titleRaw, onInput, onKeyUp, onKeyDown, onEnter, onSearch} = ctx;
  const ctx = useContext(SearchContext);
  const {
    filters,
    pagination,
    updateFilterStateValues,
    updatePaginationStateValues,
  } = ctx;
  const { titleRaw } = filters;
  const { page, limit, sortby, sortdir } = pagination;

  const onInput = (evt: React.FormEvent<HTMLInputElement>) => {
    console.log("onInput", evt);
    evt.preventDefault();
    updateFilterStateValues("titleRaw", evt.currentTarget.value);
  };
  const onIconClick = (evt: React.ChangeEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    console.log("ON ICON CLIKC for evt:", evt);
  };

  const onKeyDown = (evt: React.FormEvent<HTMLInputElement>) => {
    console.log("ON KEY DOWN EVT", evt);
    evt.preventDefault();
  };
  const updateLimit = (key: string, val: any) => {
    console.log(`updateLimit ~ key:string,val:any:`, key, val);
    updatePaginationStateValues(key, val);
  };

  const updateFilters = (key: string, value: string) => {
    console.log(`updateFilters ~ key:string,value:string:`, key, value);
    updateFilterStateValues(key, value);
  };

  return (
    <>
      {/* <Grid xs={12}>
          <AppBar />
        </Grid> */}
      <Grid
        container
        display={"flex"}
        justifyContent={"flex-start"}
        style={{ border: "1px solid #ccc" }}
      >
        <Grid xs={3}>
          <ul>
            <li>Link 1</li>
            <li>Link 2</li>
            <li>Link 3</li>
          </ul>
        </Grid>
        <Grid
          display={"flex"}
          style={{ border: "1px solid #ccc", padding: 1, margin: 0 }}
          justifyContent={"center"}
          xs={9}
          alignItems={"center"}
          alignContent={"center"}
          justifyItems={"center"}
        >
          <TextField
            fullWidth
            focused
            id="main-search-text-field"
            name="titleRaw"
            variant="outlined"
            color="primary"
            onInput={(evt) => onInput(evt)}
            // onKeyDown={onKeyDown}
            placeholder="Search for NEPA documents"
            value={titleRaw ? titleRaw : ""}
            sx={{
              padding: 0,
              margin: 0,
              "& .MuiOutlinedInput-root": {
                border: "1px solid lightblue",
                borderRadius: "0",
                padding: "0",
              },
              "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                border: "1px solid lightblue",
              },
            }}
            // InputProps={{
            //   endAdornment: (
            //       <Grid md={1} xs={0}>
            //         <IconButton
            //           name="titleRaw"
            //             value={
            //               titleRaw
            //                 ? titleRaw
            //                 : ''
            //             }
            //             onClick={(evt)=>onIconClick(evt)}
            //         >
            //           {/* <SearchOutlined /> */}
            //         </IconButton>
            //       </Grid>
            //   ),
            // }}
          />
        </Grid>
      </Grid>
      <Grid
        container
        display={"flex"}
        justifyContent={"flex-start"}
        style={{ border: "1px solid #ccc" }}
      >
        <Grid xs={3}></Grid>
        <Grid xs={3}>
          <SortByControl />
        </Grid>
        <Grid xs={3}>
          <SortDirControl />
        </Grid>
        <Grid xs={2}>
          <LimitControl />
        </Grid>
      </Grid>
    </>
  );
};
export default SearchHeader;

const gridStyle = {
  display:'flex',
            justifyContent:'flex-end',
            alignItems:'center',
            padding:2,
}
const SortByControl = () => {
  const ctx = useContext(SearchContext);
  const { pagination, updatePaginationStateValues } = ctx;
  const { page, limit, sortby, sortdir } = pagination;
  return (
      <Grid container style={{display:'flex'}}>
          <Grid xs={3} style={gridStyle}>
            <FormLabel  htmlFor="searchAgency">
              Sort By:
            </FormLabel>
          </Grid>
        
          <Grid 
            xs={9}
            style={gridStyle}
          >
            <FormControl fullWidth>
              <Autocomplete
                fullWidth
                id="limit"
                style={{
                  width: '100%'
                }}
                tabIndex={4}
                options={["title", "date"]}
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
const SortDirControl = () => {
  const ctx = useContext(SearchContext);
  const { pagination, updatePaginationStateValues } = ctx;
  const { page, limit, sortby, sortdir } = pagination;
  return (
    <Grid container display={'flex'}>
      <Grid xs={3} style={gridStyle}>
        <FormLabel htmlFor="searchAgency">
          Sort Dir:
        </FormLabel>
      </Grid>
      <Grid
        xs={9}
      >
      <FormControl fullWidth>
        <Autocomplete
          fullWidth
          id="sortby"
          tabIndex={5}
          options={["ASC", "DESC"]}
          value={`${sortdir}`}
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

const LimitControl = () => {
  const ctx = useContext(SearchContext);
  const { pagination, updatePaginationStateValues } = ctx;
  const { page, limit, sortby, sortdir } = pagination;
  return (
    <Grid container>
      <Grid xs={3} style={gridStyle}>
        <FormLabel htmlFor="searchAgency">
          # of Results
        </FormLabel>
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
