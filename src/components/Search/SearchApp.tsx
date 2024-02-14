import { Alert, Box, Button, Container, Grid, Paper, Snackbar } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
//import Grid from "@mui/material/Unstable_Grid2";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SearchFilters from "../Search/SearchFilters";
import { SearchResultType } from "../interfaces/interfaces";
import SearchContext from "./SearchContext";
import SearchHeader from "./SearchHeader";
import SearchResults from "./SearchResults";
import SearchTips from "./SearchTips";
//import data from "../../tests/data/api.json";
import response from '../../tests/data/api'; 
//console.log(`data:`, data);
type SearchAppPropType = {
  results: SearchResultType[];
  setResults: () => void;
};

const SearchApp = (props: SearchAppPropType) => {
  const context = useContext(SearchContext);

  const [results, setResults] = useState(context.results);
  const [resultsToDisplay, setResultsToDisplay] = useState(context.results);
  const [filters, setFilterValues] = useState(context.filters);
  //const [titleRaw, setTitleRaw] = useState("");
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
  useEffect(() => {
    _mounted.current = true;
    return () => {
      _mounted.current = false;
    };
  }); 
  function sortSearchResults(results: SearchResultType[], sortBy:string | 'relavancy'){
    //console.log(`sortSearchResults ~ results:`, results);
    
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

  // #End useEffects
  const updateFilterStateValues = (key: string, value: any) => {
    console.log(
      `UPDATING ${key} with the ` + `following value: ${value}`
    );
    setFilterValues({ ...filters, [key]: value });
  };

  //[TODO] Temp hack untill connected to the backend
  const urlFromContextPaginationAndFilters = (
    pagination: any,
    filters: any,
    searchType : "search_top" | "search_no_context" | "text/search_no_context" | "text/search_top"
  ) => {
    const { page, limit, sortby, sortdir,rowsPerPage } = pagination;
    //Get currently set filters to use in search query
    //const activeFilters = getActiveFilters(filters);
    const queryString = `${host}`;
    // activeFilters.forEach((filter) => {
    //   queryString.concat(`&${filter[field]}=${filter.value}`s);
    // });
    console.log(`GENTERATED QUERY STRING:`, queryString);
    //TODO temporary hack this should be part of retriving active filters
    const searchTerm = context.filters.titleRaw.length ? `&title=${context.filters.titleRaw}` : "";

    //const url: string = `${host}${searchType}?_start=${page * limit}&_end=${limit * page + limit}${searchTerm}`;
    const url: string = `${host}${searchType}`;
    console.log("🚀 ~ urlFromContextPagination ~ url:", url);
    return url;
  };

  useEffect(()=>{
    console.log('FIRING PAGINATION EFFECT');
      if(_mounted.current !== true){
        return;
      }
      if(results.length === 0){
        console.info('No results to show - Stopping pagination effect');
        return;
      }
      const {limit,rowsPerPage,page} = pagination;
      console.log(`useEffect ~ pagination:`, pagination);
      const start = page * rowsPerPage || 0;
      const end =   page * rowsPerPage + rowsPerPage;
  
      console.log(`PAGINATE RESULTS # ${results.length} results... - Start: ${start} - end: ${end}`)
      const paginatedResults = results.slice(start, end) || results;
      console.log(`paginateResults ~ start:${start}, end:${end}`);
      // Return a slice of the results array
      setResultsToDisplay(paginatedResults);
  },[pagination])

  const SearchTopPost = async() => {
  let url = urlFromContextPaginationAndFilters(pagination, filters, "search_top");
  console.log('CALLING POST TO SEARCH_TOP', url);
  const response = await axios.post(url,{
   "title": titleRaw, 
  },{
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*", // Required for CORS support to work
    },
  });
  const results = response.data || [];
  console.log(`SearchTopPost ~ results:`, results);
  setResults(results);
  setResultsToDisplay(results);
  setLoading(false);
  setSearched(true);
}
  const searchTop = async () => {
    try{  
    const start = page * limit
    const end = (page + limit) + (limit)
    setLoading(true);
    const hostUrl = urlFromContextPaginationAndFilters(pagination, filters,`text/search_top`);
    //[TODO] prototyping - replace with call from above
//    let url = `http://localhost:8080/search_top?_start=${start}&_end=${end}&_limit=${limit}`;
    let url = `/api/search_top?_start=${start}&_end=${end}&_limit=${limit}`;
    console.log(`PAGINATION EFFECT ~ url:`, url);

    const response = await axios.post(url,{
      "title": "copper mine",
    },{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Access-Control-Allow-Origin": "*", // Required for CORS support to work
      },
    });

    const results = response.data;
      setResults(results);
      setResultsToDisplay(results);
      console.log(`FILTER EFFECT GOT ${results.length}:`,);
  }
  catch(error){
    const msg = `Error Searching for Results! ${error}`
    setError(msg);
  }
  finally{
    setLoading(false);
    setSearched(true);
  }
  };
  const searchNoContext = async () => {
    try{
    setLoading(true);
    console.log("IS LOADING", loading);
    const url = urlFromContextPaginationAndFilters(pagination, filters,"search_no_context");
    console.log("🚀 ~ searchNoContext ~ url:", url);
    const response = await axios.post('/api/text/search_no_context',{
      "title": "copper mine",
    },{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Access-Control-Allow-Origin": "*", // Required for CORS support to work
      },
    });
    const data = response.data || [];
    console.log(`GOT ${data.length} Results`);
    updatePaginationStateValues("total", data.length);
    //[TODO][CRITICAL][WTF]  Currently the result set returns
    //const data = response.data;
    //const results: SearchResultType[] = filterResults(data);
//    let results = data.splice(0,100);
    setSearched(true);
    //[TODO] Need to rething, we need to have all results, but also a selected subset of results without overwritting the orginal
    setResults(data);
    setResultsToDisplay(data);
  }
  catch(error){
    console.error(`searchNoContext ~ error:`, error);
    setError("Error Searching for Results!")
  }
  finally{
    setLoading(false);
  }
  };
//   function paginateResults(results: SearchResultType[], pageNumber: number, pageSize: number): SearchResultType[] {
//     // Calculate start and end indices for the slice
//     const start = pageNumber * limit;limit;
//     const end =  ((pageNumber * pageSize) + limit < results.length) ? (pageNumber * pageSize)+limit : results.length;

//     console.log(`Paginating ${results.length} results... - Start: ${start} - end: ${end}`)
//     const paginatedResults = results.slice(start, end);
//     console.log(`First Result ID ${results[0].id} vs Paginated Result ID ${paginatedResults[0].id}`)
//     console.log(`paginateResults ~ start:${start}, end:${end}`);
//     // Return a slice of the results array
//     setResultsToDisplay(paginatedResults);
// }

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
//    console.log("FINSHED FILTERS UPDATE - Filters are now", filters);
  };
  const titleRaw = context.filters.titleRaw;
  const onSearchClick = async() => {
    console.log("🚀 ~ ON SEARCH CLICK ~ titleRaw:", titleRaw)
    setSearched(true);
      await SearchTopPost();
  }
  console.log("🚀 ~ SearchApp ~ titleRaw:", titleRaw)
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
        <Box sx={{display:'flex', justifyContent:'center'}}>
          <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right' }} open={error.length > 0}>
            <Alert severity="error" onClose={() => {}}>
              {error}
            </Alert>
        </Snackbar></Box>
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
                // disabled={
                //   error.length > 0 || filters.titleRaw.length === 0
                // }
                onClick={async () => await SearchTopPost()}
              >
                Search
              </Button>                
              <Button variant="contained" onClick={async () => await searchNoContext()}>
                Search Not Context 
              </Button>
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
                    {resultsToDisplay.length > 0 &&
                      (<SearchResults results={resultsToDisplay} />)
                    }
                  </>
                {resultsToDisplay.length === 0  &&
                (
                  <>
                    <SearchTips />
                  </>
                )}
              </>
            </Grid>
          </Grid>
          <Grid container style={{
            border: '1px solid #ccc',
            backgroundColor: '#f5f5f5',
          }}>

                <h6>Has Searched ? {searched ? "Yes" : "No"}</h6>
                <h6>Has Error ? {error.length > 0 ? "Yes" : "No"}</h6>
                <h6>Has Title ? {titleRaw.length > 0 ? "Yes" : "No"}</h6>
                <h6>Has # of Results {results.length > 0 ? "Yes" : "No"} </h6>
                <h6>loading ? {loading ? "Yes" : "No"} </h6>
              <h5> Title from context.filter  {context.filters.titleRaw}</h5>
              <h5> Deconstruced title:   {titleRaw}</h5>
          </Grid>
        </Paper>
      </Container>
    </SearchContext.Provider>
  );
};

export default SearchApp;
