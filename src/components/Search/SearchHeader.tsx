import { SearchOutlined } from "@mui/icons-material";
import {
  Autocomplete,
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  IconButton,
  TextField,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import React, { useContext } from "react";
import SearchContext from "./SearchContext";
import DistanceControl from "./filters/DistanceControl";
import LimitControl from "./filters/LimitControl";
import SortByControl from "./filters/SortByControl";

const GridItemProps = {
  padding: 1,
  alignItems: "center",
  justifyContent: "center",
  paddingRight: 2,
  borderLeft: '1px solid #ccc'
  // elevation: 1,
  // borderRadius: 1,
  // justifyContent: 'flex-start',
  // alignItems: 'center',
  // flexWrap: 'wrap',
};
const GridContainerProps = {
  padding: 1,
  container: true,
  // elevation: 1,
  // borderRadius: 1,
  // justifyContent: 'flex-start',
  // alignItems: 'center',
  // flexWrap: 'wrap',
};

const SearchHeader = () => {
  //const {title, onInput, onKeyUp, onKeyDown, onEnter, onSearch} = context;
  const context = useContext(SearchContext);
  const {
    filters,
    pagination,
    loading,
    error,
    setError,
    showSnippets,
    updatePaginationStateValues,
    updateFilterStateValues,
    searchNoContext,
    searched,
    setSearched,
    searchTop,
    setShowSnippets,
  } = context;
  const { proximityDisabled, proximityOption, title } = filters;
  const { page, limit, sortby, sortdir } = pagination;

  const onChange = (evt: React.SyntheticEvent) => {
    console.log("🚀 ~ onexChange ~ evt:", evt);
    evt.preventDefault();
    const title = (evt.target as HTMLInputElement).value;
    console.log("🚀 ~ onChange ~ title:", title)
    // console.log("🚀 ~ onChange ~ title:", title)
    
    updateFilterStateValues("title", title);
    //clear existing error if any since the user has typed
    setError("");
    setSearched(true);
  };
  //[TODO]
  const onError = (evt: React.SyntheticEvent) => {
    setError(`Please enter a search term(s) to start searching`);
  };
  const onIconClick = async (evt: React.SyntheticEvent) => {
    if (!title || title === "") {
      setError("Please enter a search term");
      return;
    }
    evt.preventDefault();
    // const raw = (evt.target as HTMLInputElement).value;
    // console.log(`onIconClick ~ raw:`, raw);
    // updatePaginationStateValues("title", raw);
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

  const onShowSnippetsChange = (evt:React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = (evt.target as HTMLInputElement).value;
    console.log(`onShowSnippetsChange ~ isChecked:`, isChecked);
//    const isChecked = evt.target.checked;
      setShowSnippets(!showSnippets);
    console.log(`onShowSnippetsChange ~ isChecked:`, isChecked);
    //setShowSnippets(isChecked);
 
//    console.log(`onShowSnippetsChange ~ evt:`, evt.target, ' Value', evt.target.value);
    //const showSnippets = (evt.target as HTMLInputElement).value;
    // console.log(`onShowSnippetsChange ~ showSnippets:`, showSnippets);
    // if (showSnippets === "on") {
    //   setShowSnippets(false);
    // }
    // else{
    //   setShowSnippets(true);
    // }
  
  };

  return (
    <>
      {/* <Grid xs={12}>
          <AppBar />
        </Grid> */}
      <Grid xs={12} container style={{
        background: "#A3C2C9",
        borderBottom: "4px solid #3D669C",
      }}>
        <Grid xs={12} {...GridContainerProps}>
          <Grid
            xs={10}
            {...GridItemProps}
            id={"dis tance-filter"}
            flex={1}
            border={0}
          >
            <TextField
              fullWidth
              //onError={(evt) => onError(evt)}
              //error={!searched && error ? true : false}
              //[TODO] need to see if can be only true affer uses so it doesnt' default to true, only validate on enter
              disabled={loading ? true : false}
              value={title || ""}
              onKeyDown={(evt) => onKeyDown(evt)}
              onChange={(evt) => {
                return onChange(evt);
              }}
              onError={(evt) => onError(evt)}
              placeholder="Search for NEPA Documents..."
             style={{
              background: "#FAFAFA",
             }}
              InputProps={{
                endAdornment: (
                  <>
                    <Grid md={1} xs={1}>
                      <IconButton
                      style={{
                        backgroundColor:"#FFC31B"
                      }}
                        name="title"
                        onClick={async () => await searchTop()}
                      >
                        <SearchOutlined />
                      </IconButton>
                    </Grid>
                  </>
                ),
              }}
            />
          </Grid>
          {/* <Grid {...GridItemProps} alignSelf={'center'} >
            <Button
              variant="contained"
              color="primary"
              onClick={async(evt) => await searchTop()}
            >
              Search
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={async(evt) => await searchNoContext()}
            > No Context
              </Button>
          </Grid> */}
        </Grid>
        <Grid
          {...GridContainerProps}
          xs={12}
          justifyContent={"flex-start"}
        >
          <Grid  {...GridItemProps} borderLeft={0} xs={4}>
            <DistanceControl />
          </Grid>

          <Grid {...GridItemProps} xs={3}>
            <SortByControl />
          </Grid>
          <Grid {...GridItemProps} xs={3}>
            <LimitControl />
          </Grid>
          <Grid flex={1} {...GridItemProps} xs={2}>
            {/* [TODO] Abstract this to it's own control component */}
              <Grid container flex={1}>
                <Grid xs={11} flex={1} border={0}>
                  <FormLabel htmlFor="searchAgency">Show Snippets:</FormLabel>
                </Grid>
                <Grid
                xs={1}
                  flex={1}
                  margin={0}
                  padding={0}
                  justifyContent={"flex-end"}
                >
                  <Checkbox
                    style={{
                      backgroundColor: "#FAFAFA",
                      borderRadius: 0,
                      border: 0,
                      padding: 0,
                      margin: 0,
                    }}
                    size="large"
                    name="showSnippets"
                    onClick={(evt) => setShowSnippets(!showSnippets)}
                    checked={showSnippets} 
                  />
              </Grid>
              </Grid>
          </Grid>
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
