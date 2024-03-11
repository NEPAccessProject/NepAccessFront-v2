import {
  Alert,
  Box,
  Button,
  Container,
  Paper,
  Snackbar,
  Typography,
  TablePagination,
  Divider,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Unstable_Grid2";
import axios, { AxiosResponse } from "axios";
import React, { useContext, useEffect, useState } from "react";
import SearchFilters from "../Search/SearchFilters";
import { getUnhighlightedFromResult } from "./searchUtils";
import {
  UnhighlightedType,
  FilterOptionType,
  SearchResultType,
  SearchAppPropType,
  HighlightType,
  FilterType,
  HighlightsPostDataType,
  PaginiationType,
  SearchProcessType,
} from "../interfaces/types";
import {
  get,
  post,
  sortSearchResults,
  getActiveFilters,
  filterResults,
  groupResultsByProcessId,
  getUnhighlightedFromResults,
} from "./searchUtils";
import SearchContext from "./SearchContext";
import SearchHeader from "./SearchHeader";
import SearchResults from "./SearchResults";
import SearchResult from "./SearchResult";
import { number } from "prop-types";
import { title } from "process";
import data from "@/tests/data/search_no_context";
import SearchTips from "./SearchTips";
import { BorderColor } from "@mui/icons-material";
const SearchApp = (props: SearchAppPropType) => {
  const context = useContext(SearchContext);

  const [results, setResults] = useState<SearchResultType[]>([]);
  const [resultsToDisplay, setResultsToDisplay] = useState<SearchResultType[]>(
    context.results
  );
  const [filters, setFilterValues] = useState<FilterType>(context.filters);
  const [pagination, setPaginationValues] = useState<PaginiationType>(
    context.pagination
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [searched, setSearched] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  const [showSnippets, setShowSnippets] = useState<boolean>(false);
  const [processes, setProcesses] = useState<SearchProcessType>({});
  const { page, limit, sortby, sortdir } = pagination;
  const { title } = filters;
  const host = import.meta.env.VITE_API_HOST;

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
    if (_mounted.current !== true) {
      return;
    }
    if (!results || results.length === 0) {
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
    //[TODO] Revisit - Do we want the existing records to disapper even if there is
    if (sorted.length > 0 && hasSearched) {
      setResultsToDisplay(sorted);
    }
  }, [pagination]);

  //# of results to display effect
  useEffect(() => {
    //handle changes to the # of results displayed per page
    if (_mounted.current === false || results.length === 0) {
      return;
    }
    console.log(`useEffect ~ # of results for the limit of ${limit}:`, results);
    setPaginationValues({
      ...pagination,
      limit: limit,
    });
    const limitedResults = results.slice(
      0,
      limit > results.length ? limit : results.length
    );
    setResultsToDisplay(limitedResults);
  }, [limit]);

  //#endregion effects

  const updateFilterStateValues = (key: string, value: any) => {
    if (!key) {
      console.warn(
        "Filter Update Called with a missing KEY: ",
        key,
        " OR VALUE: ",
        value
      );
      return;
    }
    console.log(`UPDATING ${key} with the ` + `following value:`, value);
    setFilterValues({ ...filters, [key]: value });
  };
  const onTypeChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("🚀 ~ onTypeChecked ~ event target:", event.target);
    updateFilterStateValues(event.target.name, event.target.checked);
  };
  const searchNoContext = async () => {
    console.log("START SEARCH NO CONTEXT");
    //try {
    setLoading(true);
    setHasSearched(true);

    if (!title) {
      setError("Please enter a search term");
      return;
    }

    const activeFilters = getActiveFilters(filters);
    console.log("🚀 ~ Searchibng with Active Filters: ", activeFilters);
    const res = await post(`${host}text/search_no_context`, activeFilters);
    const results = (await res) as SearchResultType[];
    console.log(`SEARCH NO CONTEXT GOT ${results.length} Results`);
    setResultsToDisplay(
      results.slice(
        pagination.page * pagination.rowsPerPage,
        pagination.page * pagination.rowsPerPage + pagination.rowsPerPage
      )
    );
    setResults(results);
    setLoading(false);
  };

  const searchTop = async () => {
    try {
      if (!filters.title) {
        setError("Please enter term(s) to search for.");
        return;
      }
      console.log("GETTING ACTIVE FILTERS FROM:", filters);
      const activeFilters = getActiveFilters(filters);
      console.log(`searchTop ~ activeFilters:`, activeFilters);
      const agencies: FilterOptionType[] = [];
      console.log(`searchTop ~ agencies:`, agencies);
      axios
        .post(`${host}text/search_top`, activeFilters)
        .then((res) => res.data)
        .then((results: SearchResultType[]) => {
          setResults(results);

          console.log("# of results", results.length);
          //        const resultsToDisplay = res.data.splice((page*rowsPerPage), (page*rowsPerPage)+rowsPerPage);
          const resultsToDisplay = results.splice(0, 4);
          
          const groupedResults: SearchProcessType =
            groupResultsByProcessId(resultsToDisplay);
          setProcesses(groupedResults);
          console.log(`.then ~ groupedResults:`, groupedResults);
          const unhiglighted = getUnhighlightedFromResults(resultsToDisplay,"Cooper Mine");
          console.log(`.then ~ unhiglighted:`, unhiglighted);
          // axios.post(`${host}text/get_highlightsFVH`, 
          //   unhiglighted,{
          //     headers: {
          //       "Content-Type": "application/json",
          //       Accept: "application/json",
      
          //     },
          //   })
          //   .then((response: AxiosResponse) => {
          //     console.log(`.then ~ response:`, response);
          //     return response.data as string[]
          //   })
          //   .then((highlights) => {
          //     debugger;
          //     console.log('RESPONSE HIGHLIGHTS',highlights);
          //     highlights.map((highlight,index) => {
          //         console.log('HIGHLIGHT',highlight,index);
          //     })
          //   })
          //   .catch((error) => {
          //     console.error("SEARCH RESULT ERROR", error);
          //   })
          // resultsToDisplay.map(async(result) => {
          //     console.log(`resultsToDisplay.map ~ result:`, result);
          //     const highlights = await getHighlights(result);
          //     console.log(`resultsToDisplay.map ~ highlights:`, highlights);
          //     result.highlights = [...highlights];
          // });
          console.log(`.then ~ resultsToDisplay:`, resultsToDisplay);
          setResultsToDisplay(resultsToDisplay);
        });
    } catch (error) {
      console.error(error);
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
    onTypeChecked,
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
        <Paper
          id="search-filters-container"
          elevation={1}
          sx={{ borderRadius: 0 }}
        >
          <Grid container borderTop={0} borderColor={"#ccc"} spacing={2}>
            <Grid xs={3}>
              <Paper
                elevation={1}
                //style={{ padding: 2, flexGrow: 1, borderRadius: 0 }}
              >
                <SearchFilters />
              </Paper>
            </Grid>
            <Grid xs={9} id="search-results-container-item">
              <>
                <Paper
                  id="search-header-container-grid"
                  elevation={1}
                  sx={{ borderRadius: 0 }}
                >
                  <Grid xs={12} flex={1}>
                    <SearchHeader />
                  </Grid>
                </Paper>
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
                <div
                  id="search-results-container"
                  style={{ padding: 1, marginTop: 2, borderRadius: 0,border:1 }}
                >
                    {processes && Object.keys(processes).length 
                    ? (
                      <>
                        <DisplayProcesses processes={processes} />
                          <Divider />
                      </>
                    )
                    : (
                      <SearchTips />
                    )
                    }
                </div>
              </>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </SearchContext.Provider>
  );
};

export default SearchApp;

export const DisplayProcesses = (props) => {
  const { processes } = props;
  const context = React.useContext(SearchContext);
  const { filters, pagination, updatePaginationStateValues, results } = context;
  console.log(`Context DisplayProcesses ~ results:`, results.length);
  const { page, sortby, limit, sortdir, rowsPerPage } = pagination;
  const handleChangeRowsPerPage = (evt) => {
    const rowsPerPage: Number = parseInt(
      (evt.target as HTMLInputElement).value,
      10
    );
    updatePaginationStateValues("limit", rowsPerPage);
  };

  const onPaginationChange = (evt) => {
    console.log(`onPaginationChange ~ PAGE:`, evt.target.value);
    const newPage = evt.target.value;
    //Use effect should detect the pagination change, so ... a direct call should not be needed?
    updatePaginationStateValues("page", newPage);
  };

  const handleChangePage = (evt, newPage: number) => {
    //setPage(newPage);
    updatePaginationStateValues("page", newPage);
    //    paginateResults(results,newPage,limit)
  };

  const processIds = Object.keys(processes);
  console.log(`DisplayProcesses ~ processes:`, processes);
  return (
    <Box sx={{ border: "1px solid #F0F0F0"}} >
      <TablePagination
        rowsPerPageOptions={[1, 5, 10, 20, 25, 100]}
        onChange={(evt) => onPaginationChange(evt)}
        //count={results.length} [TODO] Need to get count from the server
        count={results.length}
        rowsPerPage={rowsPerPage} //{limit}
        page={page}
        onPageChange={(evt, page) => handleChangePage(evt, page)}
        onRowsPerPageChange={(evt) => handleChangeRowsPerPage(evt)}
        showFirstButton={true}
        showLastButton={true}
        color="primary"
        component={`div`}
      />
        <Box
          id="search-process-root"
        >
          {processIds.map((processId, key) => (
            <Grid container key={key}>
                 <Box margin={2} id="search-process-title" justifyContent={"center"} alignContent={"center"}>
                   <Typography
                    textAlign={"center"}
                    variant="h3"
                  >
                    {processes[processId][0].doc.title}
                  </Typography>
                 </Box>
                  {processes[processId].map((result) => (
                    <Box id={`search-result-${result.doc.id}-container`} key={processId}>
                        <SearchResult result={result} />{" "}
                    </Box>
                ))}
              </Grid>
          ))}
        </Box>
    </Box>
  );
};
