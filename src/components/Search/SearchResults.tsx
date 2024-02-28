import { Paper, TablePagination,Pagination, Box } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { makeStyles } from "@mui/styles";
import React, { useRef } from "react";
import theme from "../../themes/theme";
import { SearchResultsType,SearchResultType } from "../interfaces/types";
import SearchContext from "./SearchContext";
import SearchResult from "./SearchResult";
import SearchResultCards from "./SearchResultCards";
const GridItemProps = {
  padding: 0.5,
  elevation: 1,
  border: 0,
  borderRadius: 1,
};
const useStyles = makeStyles(() => ({
  resultsHeader: {
    fontFamily: "open sans",
    fontSize: 50,
    fontWeight: "bolder",
    padding: 4,
    margin: 2,
  },
  resultItemHeader: {
    fontSize: 25,
    fontWeight: "bold",
    margin: 0.5,
    padding: 1,
    elevation: 1,
  },
  itemHeader: {
    fontFamily: "open sans",
    fontSize: 40,
    fontWeight: "bold",
    margin: 0.5,
    padding: 1,
    elevation: 1,
    p: 1,
  },
}));

const SearchResults = (props: SearchResultsType) => {
  const classes = useStyles(theme);
  const _mounted = useRef(false);
  const context = React.useContext(SearchContext);
  const { filters, pagination, updatePaginationStateValues, results,setError,setResults,resultsToDisplay } = context;
  const { page, sortby, limit, sortdir,rowsPerPage } = pagination;

  //  const results = response.search_top; //context.results
  // console.log(`SearchResults ~ results:`, results);

  const handleChangePage = (evt, newPage: number) => {
    //setPage(newPage);
    updatePaginationStateValues("page", newPage);
//    paginateResults(results,newPage,limit)
  };
  const handleChangeRowsPerPage = (evt) => {
    const rowsPerPage: Number = parseInt(
      (evt.target as HTMLInputElement).value,
      10
    );
    updatePaginationStateValues("limit", rowsPerPage);
  };

  const onPaginationChange = (evt) => {
  console.log(`onPaginationChange ~ PAGE:`, evt.target.value);
//    updatePaginationStateValues("page", page);
      const newPage = evt.target.value;
      //Use effect should detect the pagination change, so ... a direct call should not be needed?
      updatePaginationStateValues("page", newPage);
//      setResults(paginatedResults);
  };

  
  return (
    <Paper elevation={0} id="search-results-root">
      <>
        
        <TablePagination
          rowsPerPageOptions={[1, 5, 10, 20, 25, 100]}
          onChange={(evt)=>onPaginationChange(evt)}
          //count={results.length} [TODO] Need to get count from the server
          count={results.length}
          rowsPerPage={rowsPerPage}//{limit}
          page={page}
          onPageChange={(evt, page) => handleChangePage(evt, page)}
          onRowsPerPageChange={(evt) => handleChangeRowsPerPage(evt)}
          showFirstButton={true}
          showLastButton={true}
          color="primary"
          component={`div`}
        />
      </> 
      {resultsToDisplay &&  resultsToDisplay.map((result:SearchResultType, idx:number) => {
         
          return (
            <Box key={result.doc.processId + "_" + result.doc.id}> 
              
              <Grid {...GridItemProps} key={`${result.doc.id+'_'+result.doc.processId+'_'+result.doc.documentType}`}>
                <>
                  <Box> <SearchResult result={result} /></Box> 
                </>
              </Grid>
            </Box>
          )
      })}
    </Paper>
  );
};
export default SearchResults;
