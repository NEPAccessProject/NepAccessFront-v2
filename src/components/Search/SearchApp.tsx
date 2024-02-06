import React, { useContext, useEffect, useState } from "react";
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
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import SearchResults from "./SearchResults";
import SearchHeader from "./SearchHeader";
import SearchFilters from "../Search/SearchFilters";
import DecisionFilter from "./filters/DecisionFilter";
import SearchContext from "./SearchContext";
import {
  SearchResultType,
  PaginiationType,
  FilterType,
  FilterOptionType,
  InputEvent,
} from "../interfaces/interfaces";
import { useParams } from "react-router-dom";
import SearchTips from "./SearchTips";
import { title } from "process";
import { agencies } from "./data/dropdownValues";
import { json } from "stream/consumers";

type SearchAppPropType = {
  results: SearchResultType[];
  setResults: () => void;
};

const SearchApp = (props: SearchAppPropType) => {
//  console.log('APP ENV:',import.meta.env)
  //const {results} = props;
  //[TODO] ONLY FOR MOCKING INITIALY
  const context = useContext(SearchContext);
  const [results, setResults] = useState(context.results);
  const [filters, setFilterValues] = useState(context.filters);
  const [titleRaw, setTitleRaw] = useState(context.filters.titleRaw);
  const [pagination, setPaginationValues] = useState(context.pagination);

  //
  const [options, setOptions] = useState(context);

  const _mounted = React.useRef(false);
  let params = useParams();
  const updateFilterStateValues = (key: string, value: any) => {
    console.log(`Update Filter Values - key ${key} -- value:`,value)
    if(!value){
      console.error('Attempted to update state variable with no value, this might be a bug or legitimate in some value','KEY',key,'VALUE',value);
      return
  }
    setFilterValues({...filters, [key]: value});
    console.log(`\r\n !!!!! AFTER FILTER UPDATE Filter Values - key ${key}`,`value:`,value)
  };
  useEffect(() => {
    _mounted.current = true;
    return () => {
      _mounted.current = false;
    };
  });

  const updatePaginationStateValues = (key: string, value: any) => {
    console.log('FILTERING KEY',key);
    console.log('FILTERING VALUE',value)
    if(!value){
      console.error('Attempted to update state variable with no value, this might be a bug or legitimate in some value','KEY',key,'VALUE',value);  
    return;
  }
    console.log(
      `updatePaginationStateValues ~ key:string,value:any:`,
      key,
      value
    );
    setPaginationValues({
      ...pagination,
      [key]: value,
    });
    console.log('FINSHED FILTERS UPDATE - Filters are now',filters)
  };

  useEffect(() => {
    if(!_mounted.current) {
      return;
    }
    (async function fetchData() {
      const filtered:any = [];
      Object.keys(filters).forEach((key) => {
          const filterValue = filters[key]
          console.log(`key: ${key}`, 'has value: ', filters[key]);
          if(filterValue){
            filtered.push(filterValue)
          }

      })
      console.log('FILTERED VALUES',filtered)

      const response = await post(`http://localhost:8080/search_no_context/`, {
        ...filtered
      })

      console.log(response)
      //const results = await post(`${process.env.REACT_APP_API_URL}/search/results`, {
      setResults(results.splice(0,100));
    })
    return () => {
      _mounted.current = false;
    };
  }, [filters]);

  useEffect(() => {
    if (!_mounted.current) {
      return;
    }
    const { pagination } = context;
    const url = urlFromContextPagination(pagination);
    (async function fetchData() {
      const response = await getData(url);
      console.log(`fetchData ~ response:`, response);
      const results = await response.json();
      console.log(`fetchData ~ data:`, results);
      setResults(results);
    });
    return () => {
      _mounted.current = false;
    };
  }, [pagination, filters]);
  const filterProps = {
    //fullWidth: true,
    multiple: true,
    autoComplete: true,
    autoFocus: false,
    //autoHighlight: true,
    limitTags: 3,
    disablePortal: true,
    variant: "standard",
    closeText: "...Close",
    forcePopupIcon: true,
    selectOnFocus: true,
  };

  const getData = async (url: string) => {
    console.log(`getData ~ url:`, url);
    const res = await fetch('http://localhost:8080/search_top', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        //"Access-Control-Allow-Origin": "*", // Required for CORS support to work
      },
    });
    console.log(`getData ~ res:`, res);
    const data = await res.json();
    console.log(`getData ~ data:`, data);
    setResults(data.splice(0,10));
//    return data;
  };

  const post = async(url: string, data: any) => {
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
  }

  

  const doFilteredSearch = async() => {
    const url = urlFromContextPagination(pagination);
    const data = {}
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data

    })});
    const results = await response.json();
    setResults(results);
  }

  const activeFilters:FilterOptionType[] = [];

  useEffect(()=>{
    async function fetchData(){
      console.log('FETCHING DATA');
      (async () => {
        const url = urlFromContextPagination(pagination);
        console.log(`updateResults ~ url:`, url);
        const {agencies,county,actions,states,isFast41,titleRaw,agenciesRaw,cooperatingAgency,cooperatingAgencyRaw} = filters;
        const filterKeys = Object.keys(filters);
    
        filterKeys.map((key:string) => {
          console.log('CHECKING FOR ACTIVE FILTERS',key, filters[key]);
          if(filters[key]!== "" && filters[key] !== 0){
            console.log(`UPDATE RESULTS WITH FILTERS key: ${key}`, 'has value: ', filters[key]);
            activeFilters.push({
              label:key, 
              value:filters[key],
            })
          }
        })
      })();
    }
  },[filters])

  const updateResults = async () => {
    const url = urlFromContextPagination(pagination);
    console.log(`updateResults ~ url:`, url);
    const {agencies,county,actions,states,isFast41,titleRaw,agenciesRaw,cooperatingAgency,cooperatingAgencyRaw} = filters;
    const filterKeys = Object.keys(filters);

    filterKeys.map((key:string) => {
      console.log('CHECKING FOR ACTIVE FILTERS',key, filters[key]);
      if(filters[key]!== "" && filters[key].length !== 0 ||  filters[key] !== 0 || filters[key] !== false){
        console.log(`UPDATE RESULTS WITH FILTERS key: ${key}`, 'has value: ', filters[key]);
        activeFilters.push({
          label:key, 
          value:filters[key],
        })
      }
      else {
        console.log(`UPDATE RESULTS WITHOUT FILTERS key: ${key}`, 'has value:, ', filters[key]);
      }
        
      })
      const response = await fetch('http://localhost:8080/search_top', {
        method: "GET"

    })

    console.log('UPDATE RESULTS',activeFilters)
    const results = await response.json();
    console.log(`updateResults ~ results:`, results);
    setResults(results);
    
    // const res = await fetch('http://localhost:8080/text/search_top/',{
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     // agencies,
    //     // county,
    //     // actions,
    //     // states,
    //     // isFast41,
    //     "title":titleRaw,
    //     //cooperatingAgency,
    //     //activeFilters
    //   })
    // })
    
    // const results = await post(url,{
    //     (titleRaw) ? titleRaw : '',
    //      (isFast41) && isFast41 : '',
    //      (agencies) && filters.agency: '',
    //     (county) && filters.county: '',
    //     (action) && filters.action: '',
    //     (state) && filters.state: '', 
    // });
  };

  const urlFromContextPagination = (pagination: PaginiationType): string => {
    const { limit, page, sortby, sortdir } = pagination;
    const { titleRaw } = filters;
    const searchTerms = `titleRaw=${titleRaw}`;

    //[TODO] Add loginc for each filtervalue such as agency={agency1,agency2} as well as sort order and direction

    const url = `http://localhost:8080/search_top/?${searchTerms}&_page=${page}&_limit=${limit}`;
    return url;
  };

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
  const { page, limit, sortby, sortdir } = pagination;
  const { isFast41,decisions,decisionsRaw, states,agencies,agenciesRaw,cooperatingAgency,cooperatingAgencyRaw,stateRaw,countyRaw,county,actions,actionsRaw } = filters;
  return (
    <SearchContext.Provider value={value}>
      <Container id="search-app-container" maxWidth="xl" disableGutters>
        {/* <SearchContext.Consumer children={ */}
          <Paper elevation={1}>
            <Grid container>
              <Grid xs={12} flex={1}>
                <SearchHeader />
              </Grid>
            </Grid>
            <Grid container borderTop={1} borderColor={'#ccc'} marginTop={0} spacing={2}>
              <Grid xs={3}>
                <Paper style={{padding: 5, flexGrow: 1}}><SearchFilters /></Paper>
              </Grid>
              <Grid xs={9}>
                <h2>{results.length} Search Results Found</h2>
                
                {/* <h4>FILTERS</h4>
                <ul>
                  <li><b>Agency</b>{JSON.stringify(agencies)}</li>
                  <li><b>ActionRwa</b> {JSON.stringify(actionsRaw)}</li>
                  <li><b>Coop Agency</b>{JSON.stringify(cooperatingAgency)}</li>
                  <li><b>Decision</b> {JSON.stringify(decisions)}</li>
                  {/* <li><b>DecisionRaw</b>{JSON.stringify(decisionsRaw)}</li>
                  <li><b>States</b> {JSON.stringify(states)}</li>
                  <li><b>StatesRaw</b>{JSON.stringify(stateRaw)}</li>
                  <li><b>County</b> {JSON.stringify(county)}</li>
                  <li><b>CountyRaw</b>{JSON.stringify(countyRaw)}</li> 
                  </ul>
                  */
                  
                  }

                {results.length > 0 
                  ? (
                    <>
                    <SearchResults results={results} />
                    
                    </>
                  )
                  : (
                    <>
                    <SearchTips/>
                    <Button variant="contained" onClick={() => getData('http://localhost:8080/search_top')}>
                    Get Data
                  </Button>
                  </>

                  )
                }
                
                <Paper style={{padding: 10, flexGrow: 1}}>
                  <SearchResults results={results} />
                  <Button variant="contained" onClick={() => getData('http://localhost:8080/search_top')}>
                    Get Data
                  </Button>
                  {/* Fast 41 ? {isFast41 ? "Yes" : "No"} */}
                  {/* {Object.keys(pagination).map((key) => {
                    return (
                      <li key={key}>
                        <>{key}: </>
                        <b>{pagination[key]}</b>
                      </li>
                    );
                  })} */}
                  <Divider /> 
                </Paper>
              </Grid>
            </Grid>
          </Paper>
        {/* </SearchContext.Consumer> */}
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
