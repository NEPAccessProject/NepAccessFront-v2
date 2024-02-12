import { Grid, Paper, TablePagination } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useRef } from 'react';
import theme from '../../themes/theme';
import { SearchResultsType } from '../interfaces/interfaces';
import SearchContext from './SearchContext';

const GridItemProps = {
  padding: 0.5,
  item: true,
  elevation: 1,
  border: 0,
  borderRadius: 1,
};
const useStyles = makeStyles(() => ({
  resultsHeader: {
    fontFamily: 'open sans',
    fontSize: 50,
    fontWeight: 'bolder',
    padding: 4,
    margin: 2,
  },
  resultItemHeader: {
    fontSize: 25,
    fontWeight: 'bold',
    margin: 0.5,
    padding: 1,
    elevation: 1,
  },
  itemHeader: {
    fontFamily: 'open sans',
    fontSize: 40,
    fontWeight: 'bold',
    margin: 0.5,
    padding: 1,
    elevation: 1,
    p: 1,
    '&:hover': {
      //textDecoration: 'underline'
      boxShadow: '0px 4px 8px rgba(0.5, 0.5, 0.5, 0.15)',
    },
    infoCard: {
      padding: 1,
      margin: 1,
    },
  },
}));

const sortByRelevance = (a, b) => {
  return a.score > b.score;
};


//not having a dependency should... only run once per result set
const SearchResults = (props:SearchResultsType) => {
  const classes = useStyles(theme);
  const _mounted = useRef(false);
  const context = React.useContext(SearchContext);
  const results = context.results;
  const {filters,pagination,updatePaginationStateValues} = context;
  const {page,sortby,limit,sortdir} = pagination;

  //[TODO] These are somewhat temporary to check if we can get rid results with a low relvancy score
//  const allScores: number[] = getScores(results);
 

  const handleChangePage = (evt,newPage:number) => {
    console.log("🚀 ~ handleChangePage ~ number:", newPage);
    //setPage(newPage);
    updatePaginationStateValues("page", newPage);
  };
  const handleChangeRowsPerPage = (evt) => {
    console.log(`handleChangeRowsPerPage ~ event:`, event);
    //setRowsPerPage(parseInt(event.target.value, 10));
    const rowsPerPage:Number = parseInt((evt.target as HTMLInputElement).value, 10);
    updatePaginationStateValues("limit", rowsPerPage);
    //setPage(0);
  };
  const onPaginationChange = (evt,page) =>{
    updatePaginationStateValues("page", parseInt(page));
    evt.preventDefault();
    console.log('onPaginationChange', evt)
  }

  return (
    <Paper elevation={0} id="search-results-root">
        <ul>
        <li><b>Page:</b>{page}</li>
        <li><b>Sort By:</b>{sortby}</li>
        <li><b>Sort Dir</b>{sortdir}</li>
        <li><b>Limit:</b>{limit}</li>
      </ul>
      <>
        <TablePagination
            rowsPerPageOptions={[1,5,10,20, 25, 100]}
          //count={results.length} [TODO] Need to get count from the server
            count={results.length}
            rowsPerPage={limit}//{limit}
            page={page}
            onPageChange={(evt,page)=>handleChangePage(evt,page)}
            onRowsPerPageChange={(evt)=>handleChangeRowsPerPage(evt)}
            showFirstButton={true}
            showLastButton={true}
            color='primary'
            component={`div`}

      /></>
        {results.map((result,idx)=> {
          {
          return (
            <Grid {...GridItemProps} key={`${result.doc.id}`}>
              <>{result.doc.title}</>
              {/* <SearchResult result={result} /> */}
            </Grid>
          )}}
      )}
    </Paper>
  );
}
export default SearchResults;

