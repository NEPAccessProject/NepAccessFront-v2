import { Button, Container, Grid, Paper } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
//import Grid from "@mui/material/Unstable_Grid2";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SearchFilters from "../Search/SearchFilters";
import { FilterType, SearchResultType } from "../interfaces/interfaces";
import SearchContext from "./SearchContext";
import SearchHeader from "./SearchHeader";
import SearchResults from "./SearchResults";
import SearchTips from "./SearchTips";
type SearchAppPropType = {
  results: SearchResultType[];
  setResults: () => void;
};

const SearchApp = (props: SearchAppPropType) => {
  const context = useContext(SearchContext);


  const [results, setResults] = useState(context.results);
  const [filters, setFilterValues] = useState(context.filters);
  const [titleRaw, setTitleRaw] = useState(context.filters.titleRaw);
  const [pagination, setPaginationValues] = useState(context.pagination);
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState(context);
  const [count, setCount] = useState({});
  const [searched,setSearched] = useState(false);
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
  const host = "http://localhost:8080/"; //[TODO] need to move this ENV so dev and prod can have different hosts
  //const host = 'https://bighorn.sbs.arizona.edu:8443/nepaBackend/'
  //const host = import.meta.env.VITE_API_HOST
  const _mounted = React.useRef(false);
  let params = useParams();
  useEffect(() => {
    _mounted.current = true;
    return () => {
      _mounted.current = false;
    };
  });
  function sortSearchResults(results: SearchResultType[], sortBy:string | 'relavancy'){
    console.log(`sortSearchResults ~ results:`, results);
    
    const sortedResults = results.sort((a:any, b:any) => {
        if (sortBy === 'title') {
            return a.doc.title.localeCompare(b.doc.title);
        } else if (sortBy === 'commentDate') {
            let dateA = new Date(a.doc.commentDate);  
            let dateB = new Date(b.doc.commentDate);
            // For 'score' and 'commentDate', sort in descending order
            return dateA.getTime() - dateB.getTime();
         }
         console.log(`sortSearchResults ~ sortedResults:`, results[0]);
         console.log(`sortSearchResults ~ sortedResults:`, sortedResults[0]);
         setResults(sortedResults);
    }
    );
}
  // #Start useEffects

  //This effect looks at the sort by values and updates the result with the new sorted results

  useEffect(()=>{
    if(results && results.length === 0 && _mounted.current === false){
      // If there is no results to sort or the component is not mounted then do nothing
      return;
    }
    const currentResults = results
    console.log('TOP UNSORTED RESULT',results[0])
    const sorted:SearchResultType[] = sortSearchResults(currentResults,sortby)
    console.log('After Sort Results')
    setResults(sorted)
  },[sortby,sortdir])

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


   const onNotifyonError = (err) => {
    if (!titleRaw || titleRaw === "" || err) {
      console.error("Notifying on error-title raw");
      return;
    } else if (err) {
      console.error("Received Notifaction Error");
      setError(err);
    }
  };
  function getActiveFilters(input: FilterType[]): FilterType[] {
    return input.filter(
      (item) =>
        item !== null &&
        item !== undefined &&
        !(Array.isArray(item) && item.length === 0)
    );
  }
  //[TODO] experiment with score relavancy and dump the irrelevant results, ideally from the backend
  function filterResults(results: SearchResultType[]): SearchResultType[] {
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
  // Get the search results based on the filters
  // [TODO] Refactor urlFromContextPagination to handle active filtersx

  async function fetchData() {
    try {
      const keys = Object.keys(filters);
      console.log(`fetchData ~ keys:`, keys);
      const filtered: FilterType[] = getActiveFilters([filters]);
      console.log("FILTERED VALUES", filtered);
      const url = urlFromContextPaginationAndFilters(pagination, filtered);

      // [TODO] ONLY FOR MOCKING  Probalby need to have different function for search_no_context and search_top etc which in turn call a wrapper function for GET and POST
      console.log("CALLING WITH URL", url);
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*", // Required for CORS support to work
        },
      });
    } catch (error) {
      setError(`Error fetching data: ${error}`);
    } finally {
      setLoading(false);
    }
    //        setLoading(false);
  }

  // #End useEffects
  const updateFilterStateValues = (key: string, value: any) => {
    console.log(
      `Updating filter with the key of ${key} and value of ${JSON.stringify(value)}`
    );
    setFilterValues({ ...filters, [key]: value });
  };

  const get = async (url: string) => {
    console.log(`get ~ url:`, url);
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        //"Access-Control-Allow-Origin": "*", // Required for CORS support to work
      },
    });
    const results = await res.json();
    console.log(`get ~ temp:`, results);
    return results;
  };
  const getResultsCount = async (url: string) => {
    const res = await fetch(`${url}get_count`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        //"Access-Control-Allow-Origin": "*", // Required for CORS support to work
      },
    });
    const results = await res.json();
    console.log(`get ~ temp:`, results);
    return results;
  };

  const urlFromContextPaginationAndFilters = (
    pagination: any,
    filters: any,
    searchType : "search_top" | "search_no_context" = "search_top"
  ) => {
    console.log("🚀 ~ urlFromContextPagination ~ pagination:", pagination);
    const { page, limit, sortby, sortdir } = pagination;
    //Get currently set filters to use in search query
    const activeFilters = getActiveFilters(filters);
    const queryString = `${host}`;
    activeFilters.forEach((filter) => {
      queryString.concat(`&${filter[field]}=${filter.value}`);
    });
    console.log(`GENTERATED QUERY STRING:`, queryString);
    //TODO temporary hack this should be part of retriving active filters
    const searchTerm = titleRaw.length ? `&doc.title=${titleRaw}` : "";

    const url: string = `${host}${searchType}/?_start=${page * limit}&_end=${limit * page + limit}${searchTerm}`;
    console.log("🚀 ~ urlFromContextPagination ~ url:", url);
    return url;
  };

  const getData = async (url: string) => {
    console.log(`getData ~ url:`, url);
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        //"Access-Control-Allow-Origin": "*", // Required for CORS support to work
      },
    });
    const results = await response.json();
    console.log("🚀 ~ getData ~ results:", results);
    console.log(`GET DATA RETURNING RESPONS:`, results);
    const { page, limit, sortby, sortdir } = pagination;
    let start = page * limit;
    console.log(`getData ~ start:`, start);
    let end = page * limit + limit;
    console.log(`getData ~ end:`, end);

    setResults(results.splice(start, end));
    //    return data;
  };

  const searchTop = async () => {
    //const url = urlFromContextPaginationAndFilters(pagination,context.filters);
    //[TIDI] should refactor so all Gets and Post use the same functions
    setLoading(true);
    //const url = `${host}text/search_top`;
    //const url = `${host}search_top`;
    const url = urlFromContextPaginationAndFilters(pagination, filters,`search_top`);
    const results = await axios.post(url, {
      method: "POST",
      body: JSON.stringify({
        title: "xxxxxxx",
      }),
    });
    console.log(`searchTop ~ results:`, results);
    setResults(results.data.results);
    setLoading(false);
  };
  const searchNoContext = async () => {
    //const url = urlFromContextPaginationAndFilters(pagination,context.filters);
    //[TIDI] should refactor so all Gets and Post use the same functions
    setLoading(true);
    //   function calculateAverage(array) {
    //   const sum = array.reduce((a, b) => a + b, 0);
    //   const average = sum / array.length;
    //   console.log('The average scores per result is: ', average);
    //   return average;
    // }
    console.log("IS LOADING", loading);
    //const url = `${host}text/search_no_context`;
    //const url = `${host}search_no_context`;
    const url = urlFromContextPaginationAndFilters(pagination, filters,"search_no_context");
    console.log("🚀 ~ searchNoContext ~ url:", url);
    const response = await axios.post(url, {
      title: "copper mine",
    })
    updatePaginationStateValues("total", response.data.length);
    console.log("🚀 ~ searchNoContext ~ data:", response);

    //[TODO][CRITICAL][WTF]  Currently the result set returns
    const data = response.data.splice(0, limit * 3);

    const results: SearchResultType[] = filterResults(data);
    setSearched(true);
    setResults(results);
    setLoading(false);
  };
  const post = async (url: string, data: any) => {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    });
    const temp = await res.json();
    console.log(`post ~ temp:`, temp);

    setResults(temp);
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
    console.log("FINSHED FILTERS UPDATE - Filters are now", filters);
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
    error,
    setError,
    searchNoContext,
    sortSearchResults,
    searched,
    setSearched,
  };
  return (
    <SearchContext.Provider value={value}>
      <Container id="search-app-container" maxWidth="xl" disableGutters>
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
              <Button
                variant="contained"
                disabled={
                  loading || error || titleRaw.length === 0 ? true : false
                }
                onClick={async () => await searchNoContext()}
              >
                Search
              </Button>
              <h2>
                {results?.length ? results.length : 0} Search Results Found
              </h2>

              <>
                {loading && (
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
                )}
                {!loading && results && results.length > 0 ? (
                  <>
                    <SearchResults results={results} />
                  </>
                ) : (
                  <>
                    <SearchTips />
                  </>
                )}
              </>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </SearchContext.Provider>
  );
};

export default SearchApp;
