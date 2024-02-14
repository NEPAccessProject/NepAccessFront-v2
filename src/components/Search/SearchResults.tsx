import { Paper, TablePagination,Pagination, Box } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { makeStyles } from "@mui/styles";
import React, { useRef } from "react";
import theme from "../../themes/theme";
import { SearchResultsType,SearchResultType } from "../interfaces/interfaces";
import SearchContext from "./SearchContext";
import SearchResult from "./SearchResult";
const GridItemProps = {
  padding: 0.5,
  item: true,
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
    // "&:hover": {
    //   //textDecoration: 'underline'
    //   boxShadow: "0px 4px 8px rgba(0.5, 0.5, 0.5, 0.15)",
    // },
    // infoCard: {
    //   padding: 1,
    //   margin: 1,
    // },
  },
}));

const sortByRelevance = (a, b) => {
  return a.score > b.score;
};


// function paginateResults(results: SearchResultsType[], pageNumber: number, pageSize: number): SearchResultsType[] {
//   // Calculate start and end indices for the slice
//   const start = (pageNumber - 1) * pageSize;
//   const end = pageNumber * pageSize;

//   // Return a slice of the results array
//   return results.slice(start, end);
// }

//not having a dependency should... only run once per result set
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
          rowsPerPage={10}//{limit}
          page={page}
          onPageChange={(evt, page) => handleChangePage(evt, page)}
          onRowsPerPageChange={(evt) => handleChangeRowsPerPage(evt)}
          showFirstButton={true}
          showLastButton={true}
          color="primary"
          component={`div`}
        />
      </> 
      {resultsToDisplay &&  resultsToDisplay.map((result, idx) => {
         
          return (
            <Grid {...GridItemProps} key={`${result.id+'_'+idx}`}>
              <Box>{result.doc &&<SearchResult result={result} />}</Box> 
            </Grid>
          )
      })}
    </Paper>
  );
};
export default SearchResults;
