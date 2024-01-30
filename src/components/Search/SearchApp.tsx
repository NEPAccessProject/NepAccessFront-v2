import React, { useContext, useEffect,useState } from 'react';
import {
  AppBar,
  Autocomplete,
  Paper,
  Divider,
  Box,
  Container,
  Typography,
  Button,
  FormLabel,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import SearchResults from '@/components/Search/SearchResults';
import SearchFilters from './SearchFilters';
import SearchContext from './SearchContext';
import SearchHeader from './SearchHeader';
import {SearchResultType, SearchFiltersPropType, PaginiationType,} from '@/components/interfaces/interfaces';
import {useParams} from 'react-router-dom';


type SearchAppPropType = {
  results: SearchResultType[];
  setResults: () => void;
}

const SearchApp = (SearchAppPropType) => {
  //const {results} = props;
  //[TODO] ONLY FOR MOCKING INITIALY
  const [context,setContext] = useState(useContext(SearchContext));
  console.log(`SearchApp ~ context:`, context);
  const [results,setResults] = useState(context.results);
  console.log(`SearchApp ~ results:`, results);
  const [filters,setFilterValues] = useState(context.filters);
  console.log(`SearchApp ~ filters:`, filters);
  const [titleRaw,setTitleRaw] = useState(context.filters.titleRaw);
  const [pagination,setPaginationValues] = useState(context.pagination);

  //
  const [options,setOptions] = useState(context)

  const _mounted = React.useRef(false);
 let params = useParams();
 console.log(`Query Param params`,params);
 console.log(`Q???`,params.q)
  const updateFilterStateValues = (key:string,value:any) => {
    console.log(`updateFilterStateValues ~ key:string,value:any:`, key,value);
    setFilterValues({
      ...filters,
      [key]: value
    });
  }
  useEffect(() => { 
    _mounted.current = true;
    return () => {
      _mounted.current = false;
    };
  })

  const updatePaginationStateValues = (key:string,value:any) => {
    console.log(`updatePaginationStateValues ~ key:string,value:any:`, key,value);
    setPaginationValues({
      ...pagination,
      [key]: value
    });
    console.log(`updatePaginationStateValues ~ pagination:`, pagination);
  }

  useEffect(() => {
    console.log('SEARCH APP GET DATA EFFECT',context);
    if (!_mounted.current) {return}
    const {pagination} = context;
    const url = urlFromContextPagination(pagination);
  (async function fetchData() {
      const response = await getData(url);
  
      const results  =  await response.json();
      console.log(`fetchData ~ data:`, results);
      setResults(results);
    })
    return () => {
      _mounted.current = false;
    };
  },[pagination,filters]);
  const filterProps = {
    //fullWidth: true,
    multiple: true,
    autoComplete: true,
    autoFocus: false,
    //autoHighlight: true,
    limitTags: 3,
    disablePortal: true,
    variant: 'standard',
    closeText: '...Close',
    forcePopupIcon: true,
    selectOnFocus: true,
  };

  const getData = async(url:string) => {
    console.log(`getData ~ url:`, url);
    const res = await fetch(url,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(`getData ~ res:`, res);
    const data = await res.json();
    console.log(`getData ~ data:`, data);
    return data;
  }

  const updateResults = async() => {
    const url = urlFromContextPagination(pagination);
    const results = await getData(url);
    console.log('UPDATED RESULTS', results);
    setResults(results);
  }

  const urlFromContextPagination = (pagination:PaginiationType) : string => {
    const {limit,page,sortby,sortdir} = pagination;
    const {titleRaw} = filters
    const searchTerms = `titleRaw=${titleRaw}`
   
    //[TODO] Add loginc for each filtervalue such as agency={agency1,agency2} as well as sort order and direction

    const url = `http://localhost:8080/search?${searchTerms}&_page=${page}&_limit=${limit}`;
    console.log('RETURNING URL FROM CONTEXT',url);
    return url
  }

  const value = {
    ...context,
     results,
     pagination,
     filters,
     setTitleRaw,
     updateFilterStateValues,
     updatePaginationStateValues,
     updateResults,
  };
  const {page,limit,sortby,sortdir} = pagination;
  return (
 <SearchContext.Provider value={value}>
         <Container>
            <>
              <Paper elevation={1}>
                <Grid container>
                  <Grid xs={12} flex={1}>
                    <SearchHeader />
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid xs={3}>
                    <SearchFilters />
                  </Grid>
                  <Grid xs={9}>
                  <SearchResults results={results}/>
                    <Button variant='contained' onClick={() => updateResults()}>Get Data</Button>

                    <Typography variant='h4'>Filter Props</Typography>
                      <Typography variant="h5">Pagination</Typography>
                      {Object.keys(pagination).map((key) => {
                        return (
                          <li key={key}>
                            <>{key}: </>
                            <b>{pagination[key]}</b>
                          </li>
                        );
                      })}
                      <Divider />
                      <Typography variant='h5'>
                        Filters
                      </Typography>
                      {Object.keys(filters).map((key,index) => {
                        return (
                          <li key={index}>
                            <b>{key}: </b>
                            <b>{filters[key]}</b>
                          </li>
                        );
                      })}                 
                </Grid>
                </Grid>
              </Paper>
            </>            
        </Container>
 </SearchContext.Provider>
  );
  // return (
  //     <Paper id="search-app-root" elevation={1}>
  //     <Grid container border={1} id="search-app-root-grid">
  //         <Grid xs={12}>
  //             <AppBar/>
  //         </Grid>
  //         <Grid xs={3} style={{border:'border 1px dotted red'}}>
  //             <b>Sidebar filters</b>
  //             <SearchFilters/>
  //         </Grid>
  //         <Grid xs={9} style={{border:'1px dotted red'}}>
  //         <Typography variant='h4'>Search Results here</Typography>
  //             {results.length > 0
  //             ?
  //                 <SearchResults results={results} />
  //             :
  //                 <Typography>No results found</Typography>
  //             }
  //         </Grid>
  //     </Grid>
  //     </Paper>
  // )
};
export default SearchApp;
