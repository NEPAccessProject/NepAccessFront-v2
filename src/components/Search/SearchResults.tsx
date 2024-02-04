import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import { Box, Paper, Typography, Pagination, TablePagination, Link } from '@mui/material';
import { styled } from '@mui/material/styles';
import theme from '../../themes/theme';
import { makeStyles } from '@mui/styles';
import SearchContext from './SearchContext';
import SearchResult from './SearchResult';
import SearchTips from './SearchTips';
import Grid from '@mui/material/Unstable_Grid2';
import {DocumentType, SearchResultType,SearchResultsType ,SearchResultPropsType } from '../interfaces/interfaces';
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
//  console.log("🚀 ~ file: SearchResults.jsx:71 ~ SearchResults ~ props:", props)
  const classes = useStyles(theme);
  const _mounted = useRef(false);
  const context = React.useContext(SearchContext);
  const results = context.results;

  const onPaginationChange = (evt) => {
    evt.preventDefault();
    console.log('onPaginationChange', evt)
  }

  const {filters} = context;
  return (
    <Paper elevation={0} id="search-results-root" 
      sx={{
    }}>
      <Pagination
        shape='rounded'
        boundaryCount={2}
        count={results.length}
        hideNextButton={false}
        hidePrevButton={false}
        onChange={onPaginationChange}
        showFirstButton={true}
        showLastButton={true}
        size='large'
        style={{border:'1px solid #ddd', marginBottom: 8, marginTop: 1,}}
      />
      {
        results.map((result) => {
          const {doc} = result;
          return (
            <Box border={1} key={doc.id} borderBottom={1} borderColor={'#ddd'}>
              <Link variant='filterLabel' href={`./record-details?id=${doc.processId}`}>{doc.title}</Link>
              <Box sx={{ margin: 5 }}>
                {JSON.stringify(filters)}
              {!context.results.length && <SearchTips />}
                {/* <SearchResultCards result={result} /> */}
                <SearchResult result={result} />
              </Box>
            </Box>
          );
        })
    }
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
      {JSON.stringify(doc, null, 2)}
    </Paper>
  )
  // return (
  //   <Grid padding={2} container xs={12} flexDirection={'row'} flex={1}>
  //     <Item
  //       className={classes.itemHeader}
  //       sx={{
  //         margin: 0.5,
  //         padding: 1,
  //         elevation: 1,
  //       }}
  //     >
  //       Status:
  //     </Item>
  //     <Item
  //       className={classes.itemHeader}
  //       sx={{
  //         margin: 0.5,
  //         padding: 1,
  //         elevation: 1,
  //       }}
  //     >
  //       Date:
  //     </Item>
  //     <Item
  //       className={classes.itemHeader}
  //       sx={{
  //         margin: 0.5,
  //         padding: 1,
  //         elevation: 1,
  //       }}
  //     >
  //       State: <b>{state ? state : 'N/A'}</b>
  //     </Item>
  //     <Item
  //       className={classes.itemHeader}
  //       sx={{
  //         margin: 0.5,
  //         padding: 1,
  //         elevation: 1,
  //       }}
  //     >
  //       County: <b>{county ? county : 'N/A'}</b>
  //     </Item>
  //     <Item
  //       className={classes.itemHeader}
  //       sx={{
  //         margin: 0.5,
  //         padding: 1,
  //         elevation: 1,
  //       }}
  //     >
  //       Action: <b>{action ? action : 'N/A'}</b>
  //     </Item>
  //     <Item
  //       className={classes.itemHeader}
  //       sx={{
  //         margin: 0.5,
  //         padding: 1,
  //         elevation: 1,
  //       }}
  //     >
  //       Decision <b>{decision ? decision : 'N/A'}</b>
  //     </Item>
  //     {/* {(commentDate)
  //           ? ( */}
  //     <Item
  //       className={classes.itemHeader}
  //       sx={{
  //         margin: 0.5,
  //         padding: 1,
  //         elevation: 1,
  //       }}
  //     >
  //       Project Start Date:
  //     </Item>
  //     <Item
  //       className={classes.itemHeader}
  //       sx={{
  //         margin: 0.5,
  //         padding: 1,
  //         elevation: 1,
  //       }}
  //     >
  //       Project Endate Date:
  //     </Item>
  //     <Item
  //       className={classes.itemHeader}
  //       sx={{
  //         margin: 0.5,
  //         padding: 1,
  //         elevation: 1,
  //       }}
  //     >
  //       Final NOA:
  //     </Item>
  //     <Item
  //       className={classes.itemHeader}
  //       sx={{
  //         margin: 0.5,
  //         padding: 1,
  //         elevation: 1,
  //       }}
  //     >
  //       Draft NOA:
  //     </Item>
  //     <Item
  //       className={classes.itemHeader}
  //       sx={{
  //         margin: 0.5,
  //         padding: 1,
  //         elevation: 1,
  //       }}
  //     >
  //       Process ID: <b>{processId ? processId : 'N/A'}</b>
  //     </Item>
  //   </Grid>
  // );
}
//[TODO] abstract to reusable type since many components use similar shapes
SearchResultCards.propTypes = {
  result: PropTypes.shape({
    id: PropTypes.string.isRequired,
    ids: PropTypes.arrayOf(PropTypes.string),
    doc: PropTypes.object.isRequired  ,
    highlights: PropTypes.arrayOf(PropTypes.string),
    filenames: PropTypes.arrayOf(PropTypes.string),
    score: PropTypes.number,
  })
}



;