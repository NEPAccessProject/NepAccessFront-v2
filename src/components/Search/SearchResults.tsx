import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useRef } from "react";
import theme from "../../themes/theme";
import { SearchResultsType } from "../interfaces/types";
import SearchContext from "./SearchContext";
import SearchResult from "./SearchResult";
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
  console.log(`SearchResults ~ results:`, resultsToDisplay);

  return (
    <Box id="search-results-root">
      {resultsToDisplay && resultsToDisplay.length > 0 && resultsToDisplay.map((result,index) => {
      return (
          <Box key={`result-${result.doc.id}-${result.doc.processId}`} id={"search-result-"+result.doc.id+""} style={{padding: 0, marginBottom: 20,marginTop:20}}>
          <SearchResult result={result} />
          </Box>
        )
      })}

    </Box>
  );
};
export default SearchResults;
