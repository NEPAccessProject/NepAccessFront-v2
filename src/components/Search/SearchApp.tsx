import {
  Alert,
  Box,
  Button,
  Container,
  Paper,
  Snackbar,
  Typography
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Unstable_Grid2";
import axios,{AxiosResponse} from "axios";
import React, { useContext, useEffect, useState } from "react";
import SearchFilters from "../Search/SearchFilters";
import {
  FilterOptionType,
  SearchResultType,
  SearchAppPropType,
  HighlightType,
  FilterType,
} from "../interfaces/types";
import {
    get,
    post,
    sortSearchResults,
    getActiveFilters,
    getFilterValue,
    getFilterValues,
    filterResults,
    hasActiveFilters,
    getHighlightsFromResults,
    urlFromContextPaginationAndFilters,
  } from './searchUtils';
import SearchContext from "./SearchContext";
import SearchHeader from "./SearchHeader";
import SearchResults from "./SearchResults";
import { number } from "prop-types";

const SearchApp = (props: SearchAppPropType) => {
  const context = useContext(SearchContext);

  const [results, setResults] = useState(context.results);
  const [resultsToDisplay, setResultsToDisplay] = useState(context.results);
  const [filters, setFilterValues] = useState(context.filters);
  const [activeFilters, setActiveFilters] = useState(context.filters);
  const [pagination, setPaginationValues] = useState(context.pagination);
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState(context);
  const [count, setCount] = useState({});
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [showSnippets, setShowSnippets] = useState(false);
  const [highlights,setHighlights] = useState<HighlightType[]>([]);

  const { page, limit, sortby, sortdir } = pagination;
  const {
    isFast41,
    decision,
    states,
    agency: agencies,
    cooperatingAgency,
    county,
    action: actions,
    title,
  } = filters;
  const host = import.meta.env.VITE_API_HOST;
  console.log(`SearchApp ~ host:`, host);

  //#region Effects
  const _mounted = React.useRef(false);
  useEffect(() => {
    _mounted.current = true;
    return () => {
      _mounted.current = false;
    };
  }, []);

  //effect when pagination changes
  useEffect(() => {
    console.log("FIRING PAGINATION EFFECT");
    if (_mounted.current !== true) {
      return;
    }
    if (!results || results.length === 0) {
      console.info("No results to show - Stopping pagination effect");
      return;
    }
    const { limit, rowsPerPage, page } = pagination;
    console.log(`useEffect ~ pagination:`, pagination);
    const start = page * rowsPerPage || 0;
    const end = page * rowsPerPage + rowsPerPage;

    console.log(
      `PAGINATE RESULTS # ${results.length} results... - Start: ${start} - end: ${end}`
    );
    const filteredResults = results.slice(start, end);
    //Sort all results
    const sorted = sortSearchResults(filteredResults, sortby, sortdir).splice(
      0,
      rowsPerPage
    );

    // Reduce the number of results based on rowPerPage

    //const resultsToDisplay: SearchResultType[] = filterResults(sorted).splice(0, rowsPerPage);
    console.log(`paginateResults ~ start:${start}, end:${end}`);
    //[TODO] Revisit - Do we want the existing records to disapper even if there is
    if (sorted.length > 0 && hasSearched) {
      setResultsToDisplay(sorted);
    }
  }, [pagination]);


  //# of results to display effect
  useEffect(() => {
    //handle changes to the # of results displayed per page
    if (_mounted.current === false || results.length === 0) {
      console.log(
        "��� ~Use Effect for Limit called before being mounted or having no results"
      );
      return;
    }
    console.log(`useEffect ~ # of results for the limit of ${limit}:`, results);
    setPaginationValues({
      ...pagination,
      limit: limit,
    });
    console.log("New Value for Limit", limit);
    const limitedResults = results.slice(
      0,
      limit > results.length ? limit : results.length
    );
    setResultsToDisplay(limitedResults);
    console.log(
      `useEffect ~ # of limitedResults for the limit of ${limit}:`,
      limitedResults
    );
  }, [limit]);

  //#endregion

  const updateActiveFilters = (key,value,action)=>{
    let activeFilters = {...filters};
    if(action === "add"){
      activeFilters = {
        ...activeFilters,
        [key]:value,
      };
    }
  else{
    let obj = new Object()
    const filters = {
      ...activeFilters,
      [key]:value,
    
    }
  }
  console.log("🚀 ~ updateActiveFilters ~ filters:", filters)
  return filters;
}

  const updateFilterStateValues = (key: string, value: any) => {
    console.log("🚀 ~ updateFilterStateValues ~ value:", value)
    console.log("🚀 ~ updateFilterStateValues ~ key:", key)
    if(!key){
      console.warn('Filter Update Called with a missing KEY: ', key,' OR VALUE: ' ,value);
      return;
    }
    console.log(`UPDATING ${key} with the ` + `following value:`, value);
    setFilterValues({ ...filters, [key]: value });
    setActiveFilters({...filters, [key]: value });
  };

  const searchTop = async () => {
//    try {

      console.log("CONTEXT FILTERS", filters);
      if (!filters.title) {
        setError("Please enter term(s) to search for.");
        return;
      }
      console.log('GETTING ACTIVE FILTERS FROM:', filters);
      const activeFilters = getActiveFilters(filters);
      console.log(`searchTop ~ activeFilters:`, activeFilters);
      const agencies: FilterOptionType[] = [];
      filters &&
        filters && filters.agency && filters.agency.map((agency) => {
          agencies.push(agency);
        });
        //[TODO] should not be need getActiveFilters needs to verify the filters are valid
      if(filters.agency){
        const filter = {
//          ...activeFilters,
          title: title,
        };
      }
      const filter = {
        ...activeFilters,
        title: title
      };

      setHasSearched(true);
      const res = await post(
        `${host}text/search_top`,
        filter
      );
      const results = (await res) as SearchResultType[];
      console.log(`searchTop ~ results:`, results);

      setResults(results);
      setResultsToDisplay(results);
      console.log(`FILTER EFFECT GOT ${results.length}:`);
    // } catch (error) {
    //   const msg = `Error Searching for Results! ${error}`;
    //   console.error(msg);
    //   setError(msg);
    //   setError(msg);
    // } finally {
    //   setLoading(false);
    // }
  };

  async function getHighlights() {
    //const currentResults = resultsToDisplay.splice(0, pagination.rowsPerPage);

    console.log('Getting highlights for: ', resultsToDisplay.length + " our of " + results.length);
    //We only want highlights for the currently displayed records set
      const postData = getHighlightsFromResults(resultsToDisplay,title)
      if(!postData || Object.keys(postData).length === 0){
        console.log("No post data to send",postData);
        return;
      }
      console.log(`getHighlights ~ postBody:`, postData);
//    currentResults.map(async(result: SearchResultType) => {

      const res = await post(`${host}text/get_highlightsFVH`, postData);
      let resp = res as AxiosResponse;
      console.log(`Highlights response data`, resp.data);
      const higlights = resp.data as HighlightType[]
      console.log(`SETTING HIGHLIGHTS ~ higlights:`, higlights);
      setHighlights(highlights);
       
  //  });

  }
  async function searchNoTop() {
    //??
//    const activeFilters = getActiveFilters(context.filters);
    if (!title) {
      setError("Please enter term(s) to search for.");
      return;
    }
    const filter = {
     // ...activeFilters,
      title: title,
    };
    console.log("SEARCH NO TOP - ACTIVE FILTERS", filter);
    setHasSearched(true);
    setLoading(true);
    try {
      const res = await post(
        `${host}text/search_no_top`,
        filter
      );

      const results = (await res) as SearchResultType[];

      console.log(`searchNoTop ~ res:`, res);

      console.log("Search No Top - # of results: ", results.length);
      setResultsToDisplay(results);
      setResults(results);
      setLoading(false);
      return results;
    } catch (error) {
      console.error(`Error in searchNoTop: `, error);
      setError(
        `Unable to complete search! An unexpected error occurred: ${error}`
      );
    } finally {
      setLoading(false);
    }
  }

  const search = async () => {
    setLoading(true);
    setHasSearched(true);
    if (!title) {
      setError("Please enter term(s) to search for.");
      return;
    }
    const filter = {
      title: title,
    };
    try {
      const res = await post(`${host}text/search`, filter);
      const results = (await res) as SearchResultType[];
      setResultsToDisplay(results);
      setResults(results);
      setLoading(false);
    } catch (error) {
      console.error(`search ~ error:`, error);
      setError(`Error Searching for Results! ${error}`);
    } finally {
      setLoading(false);
    }
  };
  const searchNoContext = async () => {
    console.log('START SEARCH NO CONTEXT')
    //try {
      setLoading(true);
      setHasSearched(true);

      if (!title) {
        setError("Please enter a search term");
        return;
      }

      const activeFilters = getActiveFilters(filters);
      console.log("🚀 ~ Searchibng with Active Filters: ", activeFilters);
      const res = await post(
        `${host}text/search_no_context`,
        activeFilters
      );
      const results = (await res) as SearchResultType[];
      console.log(`SEARCH NO CONTEXT GOT ${results.length} Results`);
      setResultsToDisplay(results.slice((pagination.page*pagination.rowsPerPage), (pagination.page*pagination.rowsPerPage)+pagination.rowsPerPage));
      setResults(results);
      setLoading(false);
    // } catch (error) {
    //   console.log('SEARCH NO CONTEXT ERROR',error);
    //   console.error(`searchNoContext ~ error:`, error);
    //   setError(`Error Searching for Results! ${error}`);
    // } finally {
    //   console.log('FINALLY SEARCH NO CONTEXT')
    //   setLoading(false);
    // }
  };
  //#endregion

  //#Regions
  // #endregion
  const updatePaginationStateValues = (key: string, value: any) => {
    console.log(
      `updatePaginationStateValues ~ key:string,value:any:`,
      key,
      value
    );
  setPaginationValues({
      ...pagination,
      [key]: value,
    });
    //    console.log("FINSHED FILTERS UPDATE - Filters are now", filters);
  };

  const value = {
    ...context,
    results,
    pagination,
    filters,
    loading,
    setLoading,
    updateFilterStateValues,
    updatePaginationStateValues,
    searchTop,
    title,
    error,
    setError,
    searchNoContext,
    searched,
    setSearched,
    setResultsToDisplay,
    resultsToDisplay,
    setShowSnippets,
    showSnippets,
    //hasActiveFilters: hasActiveFilters(),
    getFilterValues,
  };

  return (
    <SearchContext.Provider value={value}>
      <Container id="search-app-container" maxWidth="xl" disableGutters>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Snackbar
            style={{ backgroundColor: "red", color: "white" }}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            open={error.length > 0}
          >
            <Alert severity="error" onClose={() => {}}>
              {error}
            </Alert>
          </Snackbar>
        </Box>
        <Paper elevation={1}>
          <Grid
            container
            borderTop={1}
            borderColor={"#ccc"}
            marginTop={0}
            spacing={2}
          >
            <Grid xs={3}>
              <Paper style={{ padding: 5, flexGrow: 1 }}>
                <SearchFilters />
              </Paper>
            </Grid>
            <Grid xs={9}>
              <>
                <Grid container borderBottom={1} borderColor={'#ccc'} marginBottom={'10px'}>
                  <Grid xs={12} flex={1}>
                    <SearchHeader />
                  </Grid>
                </Grid>

                {/* <Grid container>
                  <Grid xs={4}>
                    <Button
                      variant="contained"
                      onClick={async () => await searchTop()}
                    >
                      Search Top
                    </Button>
                  </Grid>
                  <Grid xs={4}>
                    <Button
                      variant="contained"
                      onClick={async () => await searchNoContext()}
                    >
                      Search No Context
                    </Button>
                  </Grid>
                </Grid> */}

                {loading && (
                  <>
                    <Grid container display={"flex"}>
                      <Grid
                        xs={12}
                        display={"flex"}
                        alignItems={"center"}
                        justifyContent={"center"}
                        alignContent={"center"}
                      >
                        <CircularProgress size={100} />
                      </Grid>
                    </Grid>
                  </>

                )}
                <Box style={{ border: "1px solid #ccc", backgroundColor: "#f5f5f5", alignItems: "center" }}>
                {JSON.stringify(highlights, null, 2)}
                </Box>
                <Button variant="contained" color="primary" onClick={async () => await getHighlights()}>
                  Get Highlights
                </Button>
                <Box style={{ border: "1px solid #ccc", backgroundColor: "#f5f5f5", alignItems: "center" }}>
                  {JSON.stringify(filters, null, 2)}
                </Box>

                <Box style={{ border: "1px solid #ccc", backgroundColor: "#f5f5f5", alignItems: "center" }}>
                <Button onClick={() => getActiveFilters(filters)}>Get Active Filters</Button>
                    <h5>Active Filters</h5>
                    
                      {JSON.stringify((activeFilters), null, 2)}
                      
                      Agency: {JSON.stringify(filters.agency, null, 2)}
                </Box>
                <>{resultsToDisplay.length > 0 && (
                    <>
                      <Typography variant="h2">
                        {results.length ? results.length : 0} Search Results
                        Found
                      </Typography>
                      <SearchResults results={resultsToDisplay} />
                    </>
                  )}
                </>
                {/* {resultsToDisplay.length === 0 && (
                  <>
                    <SearchTips />
                  </>
                )} */}
              </>
            </Grid>
          </Grid>
          <Grid
            container
            style={{
              border: "1px solid #ccc",
              backgroundColor: "#f5f5f5",
            }}
          >
            <h6>Has Searched ? {searched ? "Yes" : "No"}</h6>
            <h6>Has Error ? {error.length > 0 ? "Yes" : "No"}</h6>
            <h6>Has Title ? {title.length > 0 ? "Yes" : "No"}</h6>
            <h6>Has # of Results {results.length > 0 ? "Yes" : "No"} </h6>
            <h6>loading ? {loading ? "Yes" : "No"} </h6>
            <h5> Title from context.filter {context.filters.title}</h5>
            <h5> Deconstruced title: {title}</h5>
          </Grid>
        </Paper>
      </Container>
    </SearchContext.Provider>
  );
};

export default SearchApp;
