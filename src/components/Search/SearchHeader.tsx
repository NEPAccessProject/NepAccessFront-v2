import { SearchOutlined } from "@mui/icons-material";
import {
  Autocomplete,
  Button,
  FormControl,
  FormLabel,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
//import Grid from "@mui/material/Unstable_Grid2";
import React, { useContext } from "react";
import SearchContext from "./SearchContext";
import DistanceControl from "./filters/DistanceControl";
import LimitControl from "./filters/LimitControl";
import SortByControl from "./filters/SortByControl";
import SortDirControl from "./filters/SortDirControl";

const GridItemProps = {
  padding: 1,
  alignItems: "center",
  justifyContent: "center",
  paddingRight: 2,
  item: true,
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
    loading,
    error,
    setError,
    updatePaginationStateValues,
    updateFilterStateValues,
    searchNoContext,
    searched,
    setSearched,
  } = context;
  const { proximityDisabled, proximityOption, titleRaw } = filters;
  const { page, limit, sortby, sortdir } = pagination;

  const onChange = (evt) => {
    console.log("🚀 ~ onexChange ~ evt:", evt);
    evt.preventDefault();
    const titleRaw = (evt.target as HTMLInputElement).value;
    // console.log("🚀 ~ onChange ~ titleRaw:", titleRaw)
    updateFilterStateValues("titleRaw", titleRaw);
    //clear existing error if any since the user has typed
    setError("");
    setSearched(true);
  };
  //[TODO]
  const onError = (evt: React.SyntheticEvent) => {
    setError(`Please enter a search term(s) to start searching`);
  };
  const onIconClick = async (evt: React.SyntheticEvent) => {
    if (!titleRaw || titleRaw === "") {
      setError("Please enter a search term");
      return;
    }
    evt.preventDefault();
    // const raw = (evt.target as HTMLInputElement).value;
    // console.log(`onIconClick ~ raw:`, raw);
    // updatePaginationStateValues("titleRaw", raw);
    const done = await searchNoContext();
  };

  const onKeyDown = (evt: React.KeyboardEvent) => {
    console.log("onKeyDown ~ evt: ", evt.key);
    if (evt.key === "Enter") {
      searchNoContext();
    }
  };
  const updateLimit = (key: string, val: any) => {
    console.log(`updateLimit ~ key:string,val:any:`, key, val);
    updatePaginationStateValues(key, val);
  };
  return (
    <>
      {/* <Grid xs={12}>
          <AppBar />
        </Grid> */}
      <Grid
        container
        flex={1}
        display={"flex"}
        justifyContent={"flex-start"}
        borderBottom={1}
        borderColor={"#EEE"}
        padding={1}
      >
        <Grid {...GridItemProps} id={"dis tance-filter"} xs={11} flex={1}>
          <TextField
            fullWidth
            //onError={(evt) => onError(evt)}
            error={!searched && error ? true : false} //[TODO] need to see if can be only true affer uses so it doesnt' default to true, only validate on enter
            disabled={loading ? true : false}
            value={titleRaw || ""}
            onKeyDown={(evt) => onKeyDown(evt)}
            onChange={(evt) => {
              return onChange(evt);
            }}
            onError={(evt) => onError(evt)}
            placeholder="Search for NEPA Documents..."
            InputProps={{
              endAdornment: (
                <>
                  <Grid item md={1} xs={1}>
                    <IconButton
                      name="titleRaw"
                      onClick={(evt) => onIconClick(evt)}
                    >
                      <SearchOutlined />
                    </IconButton>
                  </Grid>
                </>
              ),
            }}
          />

        </Grid>
        <Grid {...GridItemProps} id={"distance-filter"} xs={1} flex={1} justifyContent={"center"} justifyItems={"center"}  alignSelf={"center"}>
          <Button
            variant="contained"
            color="primary"
            onClick={(evt) => onIconClick(evt)}>
              Search
            </Button>
        </Grid>
        {/* <Grid xs={12} {...GridItemProps}>
          {error && (
            <Alert variant="filled" icon={<CheckIcon fontSize="inherit" />} severity="error">
              Error! Please enter a search term(s) to continue searching
            </Alert>
          )}
        </Grid> */}
      </Grid>
      <Grid container display={"flex"} justifyContent={"flex-start"} style={{}}>
        <Grid {...GridItemProps} xs={3}>
          <DistanceControl />
        </Grid>
        <Grid {...GridItemProps} xs={3}>
          <SortByControl />
        </Grid>
        <Grid {...GridItemProps} xs={3}>
            <SortDirControl />
        </Grid>
        <Grid {...GridItemProps} xs={3}>
          <LimitControl />
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
      <Grid item xs={3} style={gridStyle} paddingLeft={1}>
        <FormLabel htmlFor="searchAgency">Search Within...</FormLabel>
      </Grid>

      <Grid item xs={9} style={gridStyle}>
        <FormControl fullWidth>
          <Autocomplete
            fullWidth
            id="limit"
            style={{
              width: "100%",
            }}
            tabIndex={4}
            defaultValue={{ label: "exact phrase", value: "0" }}
            options={[
              { label: "exact phrase", value: "0" },
              { label: 10, value: 10 },
              { label: 25, value: 25 },
              { label: 50, value: 50 },
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
