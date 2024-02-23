import {
  Alert,
  Box,
  Button,
  Container,
  Paper,
  Snackbar,
  Typography,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Unstable_Grid2";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import SearchFilters from "../Search/SearchFilters";
import {
  FilterType,
  SearchContextType,
  SearchResultType,
  PaginiationType,
  FilterOptionType,
} from "../interfaces/types";
import SearchContext from "./SearchContext";
import SearchHeader from "./SearchHeader";
import SearchResults from "./SearchResults";
import SearchTips from "./SearchTips";
import { agencyOptions } from "./data/dropdownValues";
//import data from "../../tests/data/api.json";
//console.log(`data:`, data);
const host = "http://localhost:8080/"; //[TODO] need to move this ENV so dev and prod can have different hosts

type SearchAppPropType = {
  results: SearchResultType[];
  setResults: () => void;
};

//[TODO][Critical] values for looks such as agencies, stqtes etc should be stored in lookup tables
// For now that is out of scopes, should refator after MVP thoughx
export function sortSearchResults(
  results,
  sortby: string,
  sortdir: string = "asc"
) : SearchResultType[] {
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
  });
  return results;
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
export const  urlFromContextPaginationAndFilters = (
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
  const searchTerm = filters.title.length
    ? `&title=${filters.title}`
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
  const [activeFilters,setActiveFilters] = useState([]);
  const [pagination, setPaginationValues] = useState(context.pagination);
const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState(context);
  const [count, setCount] = useState({});
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [showSnippets, setShowSnippets] = useState(false);

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
  //const host = 'https://bighorn.sbs.arizona.edu:8443/nepaBackend/'
  //const host = import.meta.env.VITE_API_HOST

  //#region Effects
  const _mounted = React.useRef(false);
  useEffect(() => {
    _mounted.current = true;
    return () => {
      _mounted.current = false;
    };
  }, []);

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
    const sorted = sortSearchResults(filteredResults, sortby, sortdir).splice(0,rowsPerPage)

    // Reduce the number of results based on rowPerPage

    //const resultsToDisplay: SearchResultType[] = filterResults(sorted).splice(0, rowsPerPage);
    console.log(`paginateResults ~ start:${start}, end:${end}`);
    //[TODO] Revisit - Do we want the existing records to disapper even if there is 
    if(sorted.length >0 && hasSearched) {
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
  const getActiveFilters = (filters) : FilterOptionType[]  => {
    const activeFilter = {};
      Object.keys(filters).forEach((key) => {
        const val = filters[key];
        if (typeof(val) !== "object" && val) {
            console.log(`PRIMITIVE MATCH ON key: ${key}, val: ${val}`);
            activeFilter[key] = val;
        }
        else if(typeof(val) === "object" && val.length > 0) {
            console.log(`OBJECT MATCH ON key: ${key}, val: ${val}`);
            activeFilter[key] = val;
        }
      });
      
      return activeFilters
  }

  const getFilteredValues = (options,value,meta) => {
    if(!value) return [];
    let filtered: FilterOptionType[] = [];
    if(meta.action === "select-option"){
      console.log('PUSHING VALUE LABEL - VALUE',value);
      filtered = {
        ...value[0],
      },
      console.log('Update Filter State',filtered);
    }
    else if(meta.action === "remove-value"){
        filtered = options.filter((v) => v !== value.label) as FilterOptionType[];
    }
    else if (meta.action === "clear"){
      filtered = [];
    }      
    return filtered;
  }

const getFilterValue = (options,value) : FilterOptionType[] => {
  console.log(`getFilterValue ~ value:`, value);
  //  console.log(`getValue ~ options,value:`, options,value);
    const filtered = options.filter((v:FilterOptionType) => options.includes(v.value));
    console.log(`getFilterValue ~ filtered:`, filtered);
  
    return filtered;
  }
  const getFilterValues = (options:FilterOptionType[],value:FilterOptionType) => {
    console.log('FILTER VALUE KEYS',Object.keys(value));
    console.log(`getFilterValues ~ value:`, value);
    if(!value || !value.label) {
      console.warn(`The value specified is empty this is most likely an upstream issue - VALUE`,value)
      return [];
    }
    console.log(`getFilterValues ~ value:`, value);
    const vals: FilterOptionType[] = getFilterValue(options,value);
    const items = options.filter((v:FilterOptionType) => options.includes(v)) || []

    const filtered = {
      ...value,
      ...items
    }
    console.log('getFilterValues',filtered);
    return filtered;
  }

  const updateFilterStateValues = (key: string, value: any) => {
    console.log(`UPDATING ${key} with the ` + `following value:`,value);
    setFilterValues({ ...filters, [key]: value });
  };

  const hasActiveFilters = (): boolean => {
    return Object.keys(filters).length > 0;
  };
  const fieldToArray = (field) => {
    if (field) {
      if (Array.isArray(field)) {
        return field;
      }
      return [field];
    }
    return [];
  };
  
  const transformFieldToArray = (field) => {
      if(typeof field === "string" && field.includes(";")){
          return field.split(';')
      }
      else if(typeof field === "string"){
          return [field]
      }
      else if(Array.isArray(field)){
          return field
      }
      else{
          return []
      }
  };

  //#region Search Functions

  const searchTop = async () => {
    try {
      console.log('CONTEXT FILTERS', filters)
      if (!filters.title) {
        setError("Please enter term(s) to search for.");
        return;
      }
      const activeFilters = getActiveFilters(context.filters);
      const agencies:FilterOptionType[] = [];
      filters && filters?.agency.map((agency) => {
          agencies.push(agency);
      })
      const filter = {
        ...activeFilters,
        title: title,
        agency: [filters.agency],
      }
      setHasSearched(true);
        const res = await post('http://localhost:8080/text/search_top',filter);
        console.log(`searchTop ~ res:`, res);
        const results = await res as SearchResultType[];
        console.log(`searchTop ~ results:`, results);

      setResults(results);
      setResultsToDisplay(results);
      console.log(`FILTER EFFECT GOT ${results.length}:`);
    } catch (error) {
      const msg = `Error Searching for Results! ${error}`;
       console.error(msg);
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

	async function searchNoTop() { //??
    const activeFilters = getActiveFilters(context.filters);
    if(!title){
      setError("Please enter term(s) to search for.");
      return;
    }
    const filter = {
      ...activeFilters,
      title: title
    }
    console.log('SEARCH NO TOP - ACTIVE FILTERS', filter)
    setHasSearched(true);
    setLoading(true);
    try {
      const res = await post('http://localhost:8080/text/search_no_top',filter);
      const results = await res as SearchResultType[]; //??
      console.log('Search No Top - # of results: ', results.length);
      setResultsToDisplay(results);
      setResults(results);
      setLoading(false);
      return results;
    } 
    catch (error) {
        console.error(`Error in searchNoTop: `,error);
        setError(`Unable to complete search! An unexpected error occurred: ${error}`);
    }
    finally {
      setLoading(false);
    }
	}

  const search= async()=>{
    setLoading(true);
    setHasSearched(true);
    if(!title){
      setError("Please enter term(s) to search for.");
      return;
    }
    const filter = {
      title: title
    }
    try {
      const res = await post('http://localhost:8080/text/search',filter);
      const results = await res as SearchResultType[];
      setResultsToDisplay(results);
      setResults(results);
      setLoading(false);
    } catch (error) {
      console.error(`search ~ error:`, error);
      setError(`Error Searching for Results! ${error}`);
    }
    finally {
      setLoading(false);
    }
  }
  const searchNoContext = async () => {
    try {
      setLoading(true);
      setHasSearched(true);

      if (!title) {
        setError("Please enter a search term");
        return;
      }

      const af = getActiveFilters(context.filters) || {};
      console.log('AF',af);
        const activeFilters: FilterOptionType[] = {
          ...af
        }
        const filterKeys = Object.keys(filters);
        filterKeys.forEach((key:string) => {
          const val:FilterOptionType = filters[key];
          if (val &&typeof(val) === "string") {
            console.log(`filterKeys.forEach ~ val:`, val);
            activeFilters.push(val);
          }
        })
        console.log('AF',af);
        console.log(`searchNoContext ~ activeFilters:`, activeFilters);
        const filter = {
          title: title,
          ...activeFilters,
          DocumentType: ['Draft']
          
        }
        const res = await post('http://localhost:8080/text/search_no_context',filter);
        const results = await res as SearchResultType[];
        console.log(`SEARCH NO CONTEXT GOT ${results.length} Results`);
        setResultsToDisplay(results);
        setResults(results);
        setLoading(false);
      }
    catch (error) {
      console.error(`searchNoContext ~ error:`, error);
      setError(`Error Searching for Results! ${error}`);
    }
    finally {
      setLoading(false);
    }
  };
  //#endregion

  // #region HTTP Methods 
  async function get(url) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios(url,{
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*", // Required for CORS support to work
          },
        });
        const data = response.data || [];
        resolve(data);
      } catch (error) {
        console.error(`Error in get: `,error);
        reject(error);
      }
      finally {
        setLoading(false);
      }
      
    });
    
  }
  //#Regions
	 async function post(url,postData) { //??
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.post(
          //"/api/text/search_no_context",
          url,
          postData,
          {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*", // Required for CORS support to work
          },
        }
        );
      }
      catch (error) {
        console.error(`Error in post: `,error);
        reject(error);
      }
    });
  }
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
    hasActiveFilters: hasActiveFilters(),
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
          <Grid container>
            <Grid xs={12} flex={1}>
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
            <Grid xs={3}>
              <Paper style={{ padding: 5, flexGrow: 1 }}>
                <SearchFilters />
              </Paper>
            </Grid>
            <Grid xs={9}>
             
              <>
                <Grid container>
                  <Grid xs={4}>
                    <Button variant="contained" onClick={async()=> await searchTop()}>
                      Search Top
                    </Button>
                  </Grid>
                  <Grid xs={4}>
                    <Button variant="contained" onClick={async ()=> await searchNoContext()}>
                      Search No Context
                    </Button>
                  </Grid>
                </Grid>
                {JSON.stringify(filters)}
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
                <>
                  {resultsToDisplay.length > 0 && (
                    <>
                     <Typography variant="h2">
                     {results.length ? results.length : 0} Search Results Found
                   </Typography>
                    <SearchResults results={resultsToDisplay} />
                  
                  </>)
}
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
