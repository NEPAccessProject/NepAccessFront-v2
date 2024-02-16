import {
  Alert,
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Snackbar,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
//import Grid from "@mui/material/Unstable_Grid2";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SearchFilters from "../Search/SearchFilters";
import {
  FilterType,
  SearchContextType,
  SearchResultType,
  PaginiationType,
} from "../interfaces/interfaces";
import SearchContext from "./SearchContext";
import SearchHeader from "./SearchHeader";
import SearchResults from "./SearchResults";
import SearchTips from "./SearchTips";
//import data from "../../tests/data/api.json";
import response from "../../tests/data/api";
import { title } from "process";
//console.log(`data:`, data);
const host = "http://localhost:8080/"; //[TODO] need to move this ENV so dev and prod can have different hosts

type SearchAppPropType = {
  results: SearchResultType[];
  setResults: () => void;
};
export function sortSearchResults(
  results,
  sortby: string,
  sortdir: string = "asc"
) {
  //console.log(`sortSearchResults ~ results:`, results);

  //[TODO] we need to introduce a sort by param that contols if A > B vs B > A IE ascending and descending so the
  results.sort((a: any, b: any) => {
    //lowercase both sides to avoid case sensitivity issues
    if (sortby.toLowerCase() === "title") {
      if (sortdir === "asc") {
        return a.doc.title.localeCompare(b.doc.title);
      } else {
        return a.doc.title.localeCompare(b.doc.title);
      }
    } else if (sortby.toLowerCase() === "commentDate") {
      let dateA = new Date(a.doc.commentDate);
      let dateB = new Date(b.doc.commentDate);
      // For 'score' and 'commentDate', sort in descending order
      if (sortdir === "asc") {
        return dateA.getDate() - dateB.getDate();
      } else {
        return dateB.getDate() - dateA.getDate();
      }
    } else if (sortby.toLowerCase() === "relavancy") {
      //we want those that are MORE relvant then others
      if (sortdir === "asc") {
        return a.score - b.score;
      } else {
        return b.score - a.score;
      }
    }
    if (sortby.toLowerCase() === "relavancy") {
      console.log(`SORTED BY SCORE results`, results);
    }
    if (sortby.toLowerCase() === "commentDate") {
      console.log(`SORTED BY DATE results`, results);
    }
    if (sortby.toLowerCase() === "title") {
      console.log(`SORTED BY TITLE results`, results);
    }
    return results;
  });
}

export function filterResults(results: SearchResultType[]): SearchResultType[] {
  if (!Array.isArray(results)) {
    return [];
  }
  const scores: number[] = [];
  results.map((result) => scores.push(result.score));
  scores.sort((a, b) => b - a);
  console.log("TOP SCORES", scores[0]);
  console.log("BOTTOM SCORES", scores[scores.length - 1]);
  console.log("Average Score", (scores[scores.length - 1] + scores[0]) / 2);
  const avg = (scores[scores.length - 1] + scores[0]) / 2;
  const filteredResults = results.filter((result) => result.score > avg);
  console.log(
    "🚀 ~ filterResults ~ # of filteredResults:",
    filteredResults.length
  );

  return filteredResults;
}

//[TODO] Temp hack untill connected to the backend
export const urlFromContextPaginationAndFilters = (
  context: SearchContextType,
  pagination: PaginiationType,
  filters: FilterType,
  searchType:
    | "search_top"
    | "search_no_context"
    | "text/search_no_context"
    | "text/search_top"
) => {
  const { page, limit, sortby, sortdir, rowsPerPage } = pagination;

  //[TODO]Get currently set filters to use in search query POST requests
  //const activeFilters = getActiveFilters(filters);
  const queryString = `${host}`;
  // activeFilters.forEach((filter) => {
  //   queryString.concat(`&${filter[field]}=${filter.value}`s);
  // });
  console.log(`GENTERATED QUERY STRING:`, queryString);
  //TODO temporary hack this should be part of retriving active filters
  const searchTerm = filters.titleRaw.length
    ? `&title=${filters.titleRaw}`
    : "";

  //const url: string = `${host}${searchType}?_start=${page * limit}&_end=${limit * page + limit}${searchTerm}`;
  const url: string = `${host}${searchType}`;
  console.log("🚀 ~ urlFromContextPagination ~ url:", url);
  return url;
};

const SearchApp = (props: SearchAppPropType) => {
  const context = useContext(SearchContext);

  const [results, setResults] = useState(context.results);
  const [resultsToDisplay, setResultsToDisplay] = useState(context.results);
  const [filters, setFilterValues] = useState(context.filters);
  const [pagination, setPaginationValues] = useState(context.pagination);
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState(context);
  const [count, setCount] = useState({});
  const [searched, setSearched] = useState(false);
  const { page, limit, sortby, sortdir } = pagination;
  const {
    isFast41,
    decisions,
    decisionsRaw,
    states,
    agencies,
    agenciesRaw,
    cooperatingAgency,
    cooperatingAgencyRaw,
    stateRaw,
    countyRaw,
    county,
    actions,
    actionsRaw,
  } = filters;
  const [error, setError] = useState("");
  //const host = 'https://bighorn.sbs.arizona.edu:8443/nepaBackend/'
  //const host = import.meta.env.VITE_API_HOST

  const _mounted = React.useRef(false);
  useEffect(() => {
    _mounted.current = true;
    return () => {
      _mounted.current = false;
    };
  }, []);

  // #Start useEffects

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

  useEffect(() => {
    if (!results || results.length === 0 || _mounted.current === false) {
      // If there is no results to sort or the component is not mounted then do nothing
      console.info(`Halting Sort Effect, no results yet to sort`);
      return;
    }
    //const currentResults = results
    console.log("TOP UNSORTED RESULT", results[0]);
    //const sorted:SearchResultType[] =
    //[TODO] This is a temporary hack to get the sort to work, we need to refactor the sortSearchResults to handle the sort by and sort dir
    console.log("After Sort Results");
    sortSearchResults(results, sortby);
    //setResults(sorted)
  }, [sortby, sortdir]);

  // Gets the total counts for each document type and the total POTENTIAL results to use in paginatio
  //useEffect(() => {
  //  async function fetchCounts() : Promise<any>
  //   {
  // [TODO] These are endpoints used by the old app, so we will need create some new endpoints
  //   this.get("stats/earliest_year", "firstYear");
  //   this.get("stats/latest_year", "lastYear");
  //   this.get("stats/eis_count", "EISCount");
  //const endpoints = ["earliest_year","latest_year","eis_count","ea_count","noi_count","rod_count","scoping_count"];
  //     const endpoints = ["earliest_year","latest_year","ea_count","noi_count","rod"];
  //     const counts = {
  //       "earliest_year": 0,
  //       "latest_year": 0,
  //       "eis_count": 0,
  //       "ea_count": 0,
  //       "noi_count": 0,
  //       "rod_count": 0,
  //       "scoping_count": 0,
  //     };
  //   try{
  //     for (const endpoint of endpoints) {
  //       const temp = await (await axios.get(`${host}stats/${endpoint}`)).data;
  //       counts[endpoint] = temp.count;
  //       console.log(`useEffect ~ counts:`, counts);
  //       setCount(counts);
  //     }

  //   }
  // catch(error){
  //   console.error(`Non-Fatal Error retrieving counts: ${error}`);
  // }}
  //   fetchCounts();
  // },[titleRaw])

  // #End useEffects
  const updateFilterStateValues = (key: string, value: any) => {
    console.log(`UPDATING ${key} with the ` + `following value: ${value}`);
    setFilterValues({ ...filters, [key]: value });
  };

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
    const paginatedResults = results.slice(start, end) || results;
    console.log(`paginateResults ~ start:${start}, end:${end}`);
    // Return a slice of the results array
    setResultsToDisplay(paginatedResults);
  }, [pagination]);

  const SearchTopPost = async () => {
    let url = urlFromContextPaginationAndFilters(
      context,
      pagination,
      filters,
      "search_top"
    );
    console.log("CALLING POST TO SEARCH_TOP", url);
    const response = await axios.post(
      url,
      {
        title: titleRaw,
      },
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*", // Required for CORS support to work
        },
      }
    );
    const results = response.data || [];
    console.log(`SearchTopPost ~ results:`, results);
    setResults(results);
    setResultsToDisplay(results);
    setLoading(false);
    setSearched(true);
  };
  const searchTop = async () => {
    try {
      if (!filters.titleRaw) {
        setError("Please enter term(s) to search for.");
        return;
      }
      const start = page * limit;
      const end = page + limit + limit;
      setLoading(true);
      const hostUrl = urlFromContextPaginationAndFilters(
        context,
        pagination,
        filters,
        `text/search_top`
      );
      //[TODO] prototyping - replace with call from above
      //    let url = `http://localhost:8080/search_top?_start=${start}&_end=${end}&_limit=${limit}`;
      let url = `/api/search_top?_start=${start}&_end=${end}&_limit=${limit}`;
      console.log(`PAGINATION EFFECT ~ url:`, url);

      const response = await axios.post(
        url,
        {
          title: titleRaw,
        },
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*", // Required for CORS support to work
          },
        }
      );

      const results = response.data;
      setResults(results);
      setResultsToDisplay(results);
      console.log(`FILTER EFFECT GOT ${results.length}:`);
    } catch (error) {
      const msg = `Error Searching for Results! ${error}`;
      setError(msg);
    } finally {
      setLoading(false);
      setSearched(true);
    }
  };
  const searchNoContext = async () => {
    try {
      setLoading(true);
      if (!filters.titleRaw) {
        setError("Please enter a search term");
        return;
      }
      console.log("SEARCH NO CONTEXT IS LOADING", loading);
      const url = urlFromContextPaginationAndFilters(
        context,
        pagination,
        filters,
        "search_no_context"
      );
      const response = await axios.post(
        "/api/text/search_no_context",
        {
          title: "copper mine",
        },
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*", // Required for CORS support to work
          },
        }
      );
      const data = response.data || [];
      console.log(`SEARCH NO CONTEXT GOT ${data.length} Results`);
      updatePaginationStateValues("total", data.length);
      setSearched(true);
      setResults(data);
      setResultsToDisplay(data);
    } catch (error) {
      console.error(`searchNoContext ~ error:`, error);
      setError("Error Searching for Results!");
    } finally {
      setLoading(false);
    }
  };
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
  const titleRaw = context.filters.titleRaw;
  const onSearchClick = async () => {
    console.log("🚀 ~ ON SEARCH CLICK ~ titleRaw:", titleRaw);
    setSearched(true);
    await SearchTopPost();
  };
  console.log("🚀 ~ SearchApp ~ titleRaw:", titleRaw);
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
    error,
    setError,
    searchNoContext,
    searched,
    setSearched,
    setResultsToDisplay,
    resultsToDisplay,
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
          <Grid container>
            <Grid item xs={12} flex={1}>
              <SearchHeader />
            </Grid>
          </Grid>
          <Grid
            container
            borderTop={1}
            borderColor={"#ccc"}
            marginTop={0}
            spacing={2}
          >
            <Grid xs={3} item>
              <Paper style={{ padding: 5, flexGrow: 1 }}>
                <SearchFilters />
              </Paper>
            </Grid>
            <Grid xs={9} item>
              <h2>
                {results.length ? results.length : 0} Search Results Found
              </h2>
              <>
                {loading && (
                  <>
                    <Grid container display={"flex"}>
                      <Grid
                        item
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
                <>
                  {resultsToDisplay.length > 0 && (
                    <SearchResults results={resultsToDisplay} />
                  )}
                </>
                {resultsToDisplay.length === 0 && (
                  <>
                    <SearchTips />
                  </>
                )}
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
            <h6>Has Title ? {titleRaw.length > 0 ? "Yes" : "No"}</h6>
            <h6>Has # of Results {results.length > 0 ? "Yes" : "No"} </h6>
            <h6>loading ? {loading ? "Yes" : "No"} </h6>
            <h5> Title from context.filter {context.filters.titleRaw}</h5>
            <h5> Deconstruced title: {titleRaw}</h5>
          </Grid>
        </Paper>
      </Container>
    </SearchContext.Provider>
  );
};

export default SearchApp;
