import { SearchOutlined } from "@mui/icons-material";
import CheckIcon from "@mui/icons-material/Check";
import {
  Alert,
  Autocomplete,
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
import SortByControl from "./filters/SortByControl";
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
    loading,
    error,
    setError,
    updatePaginationStateValues,
    updateFilterStateValues,
    setTitleRaw,
    searchNoContext,
    searched,
    setSearched
  } = context;
  const { proximityDisabled, proximityOption, titleRaw, } = filters;
  const { page, limit, sortby, sortdir } = pagination;

  const onChange = (evt) => {
    console.log("🚀 ~ onexChange ~ evt:", evt)
    evt.preventDefault();
    const titleRaw = (evt.target as HTMLInputElement).value;
    setTitleRaw(titleRaw);
    // console.log("🚀 ~ onChange ~ titleRaw:", titleRaw)
    updateFilterStateValues("titleRaw", titleRaw);
    //clear existing error if any since the user has typed
    setError("");
    setSearched(true);
  };
  //[TODO] 
  const onError = (evt: React.SyntheticEvent) => {
    setError(`Please enter a search term(s) to start searching`);
  }
  const onIconClick = (evt: React.SyntheticEvent) => {

    if (!titleRaw || titleRaw === "") {
      setError("Please enter a search term");
      return;
    }
    // evt.preventDefault();
    // const raw = (evt.target as HTMLInputElement).value;
    // console.log(`onIconClick ~ raw:`, raw);
    // updatePaginationStateValues("titleRaw", raw);
    searchNoContext()
  };

  const onKeyDown = (evt: React.KeyboardEvent) => {
    console.log('onKeyDown ~ evt: ', evt.key);
    if (evt.key === "Enter") {
      searchNoContext()
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
        display={"flex"}
        justifyContent={"flex-start"}
        borderBottom={1}
        borderColor={"#EEE"}
        padding={1}
      >

        <Grid 
          item
          id={'distance-filter'}
          display={"flex"}
          justifyContent={"center"}
          xs={12}
          alignItems={"center"}
          alignContent={"center"}
          justifyItems={"center"}
        >
          <TextField
            fullWidth
            //onError={(evt) => onError(evt)}
            error={!searched && error ? true : false} //[TODO] need to see if can be only true affer uses so it doesnt' default to true, only validate on enter
            disabled={loading ? true : false}
            value={titleRaw || ""}
            onKeyDown={(evt) => onKeyDown(evt)}
            onChange={(evt) => {
              return onChange(evt)
            }}
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
                  <Typography color={'red'}>
                    {error ? error : ""}
                  </Typography>
                </>
              ),
            }}
          />
        </Grid>
        <Grid xs={12} item>
          {error && (
            <Alert variant="filled" icon={<CheckIcon fontSize="inherit" />} severity="error">
              Error! Please enter a search term(s) to continue searching
            </Alert>
          )}
        </Grid>
      </Grid>
      <Grid container display={"flex"} justifyContent={"flex-start"} style={{}}>
        <Grid {...GridItemProps} xs={3}>
          {/* <DistanceFilter /> */}
        </Grid>
        <Grid {...GridItemProps} xs={3}>
          <SortByControl />
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
            defaultValue={{ label: "exact phrase", value: "0" }}
            options={[{ label: "exact phrase", value: "0" },
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


const LimitControl = () => {
  const context = useContext(SearchContext);
  const { pagination, updatePaginationStateValues } = context;
  const { page, limit, sortby, sortdir } = pagination;
  return (
    <Grid container>
      <Grid xs={3} item style={gridStyle} marginRight={0} paddingRight={0}>
        <FormLabel htmlFor="searchAgency"># of Results:</FormLabel>
      </Grid>
      <Grid xs={9} item>
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
