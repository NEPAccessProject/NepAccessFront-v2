import { Box, Paper, TablePagination } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useRef } from 'react';

import Grid from '@mui/material/Unstable_Grid2';
import { styled } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import theme from '../../themes/theme';
import { SearchResultType, SearchResultsType } from '../interfaces/interfaces';
import SearchContext from './SearchContext';
import SearchResult from './SearchResult';
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  // textAlign: 'center',
  color: theme.palette.text.secondary,
  elevation: 1,
  border: 0,
  borderRadius: 1,
}));
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
     {/* <Box border={1} borderColor={'#eee'} display={'flex'} alignContent={'flex-start'}> */}
     {/* <Pagination 
      count={limit} 
      page={page} 
      onChange={(evt,page)=> onPaginationChange(evt,page)} /> */}
      <React.Fragment><TablePagination
        rowsPerPageOptions={[1,5,10,20, 25, 100]}
        //count={results.length} [TODO] Need to get count from the server
        count={100}
        rowsPerPage={limit}//{limit}
        page={page}
        onPageChange={(evt,page)=>handleChangePage(evt,page)}
        onRowsPerPageChange={(evt)=>handleChangeRowsPerPage(evt)}
        showFirstButton={true}
        showLastButton={true}

      /></React.Fragment>

      {/* </Box> */}
        {results.map((result,idx)=> {
            return (
              <Box key={result.id}>
               <SearchResult result={result} />
             </Box>
            )
          })}
    </Paper>
  );
}
SearchResults.propTypes = {
  results: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string,
      processId: PropTypes.number.isRequired,
      decisionType: PropTypes.string.isRequired,
      filename: PropTypes.string.isRequired,
      folder: PropTypes.string.isRequired,
      records: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          title: PropTypes.string,
          processId: PropTypes.number.isRequired,
          decisionType: PropTypes.string.isRequired,
          filename: PropTypes.string.isRequired,
          folder: PropTypes.string.isRequired,
        })),
    })),
};
export default SearchResults;


export interface ISearchResultCardsProps {
  result: SearchResultType;
}
const SearchResultCards = (props:ISearchResultCardsProps) => {
  const {result} = props;
  const {doc,highlights,score }= result;

  
  console.log('Search Result Card Props', result);
  return (
    <Paper elevation={1}>
     
     <Grid padding={2} container xs={12} flexDirection={'row'} flex={1}>
       <Item
//        className={classes.itemHeader}
        sx={{
          margin: 0.5,
          padding: 1,
          elevation: 1,
        }}
      >
        Status:
      </Item>
      <Item
 //       className={classes.itemHeader}
        sx={{
          margin: 0.5,
          padding: 1,
          elevation: 1,
        }}
      >
        Date:
      </Item>
      <Item
 //       className={classes.itemHeader}
        sx={{
          margin: 0.5,
          padding: 1,
          elevation: 1,
        }}
      >
        State: <b>{states ? states : 'N/A'}</b>
      </Item>
      <Item
//        className={classes.itemHeader}
        sx={{
          margin: 0.5,
          padding: 1,
          elevation: 1,
        }}
      >
        County: <b>{county ? county : 'N/A'}</b>
      </Item>
      <Item
       // className={classes.itemHeader}
        sx={{
          margin: 0.5,
          padding: 1,
          elevation: 1,
        }}
      >
        Action: <b>{action ? action : 'N/A'}</b>
      </Item>
      <Item
        //className={classes.itemHeader}
        sx={{
          margin: 0.5,
          padding: 1,
          elevation: 1,
        }}
      >
        Decision <b>{decision ? decision : 'N/A'}</b>
      </Item>
      {/* {(commentDate)
            ? ( */}
      <Item
        //className={classes.itemHeader}
        sx={{
          margin: 0.5,
          padding: 1,
          elevation: 1,
        }}
      >
        Project Start Date:
      </Item>
      <Item
        //className={classes.itemHeader}
        sx={{
          margin: 0.5,
          padding: 1,
          elevation: 1,
        }}
      >
        Project Endate Date:
      </Item>
      <Item
        //className={classes.itemHeader}
        sx={{
          margin: 0.5,
          padding: 1,
          elevation: 1,
        }}
      >
        Final NOA:
      </Item>
      <Item
        //className={classes.itemHeader}
        sx={{
          margin: 0.5,
          padding: 1,
          elevation: 1,
        }}
      >
        Draft NOA:
      </Item>
      <Item
        //className={classes.itemHeader}
        sx={{
          margin: 0.5,
          padding: 1,
          elevation: 1,
        }}
      >
        Process ID: <b>{processId ? processId : 'N/A'}</b>
      </Item>
    </Grid>
    </Paper>
  );
}
