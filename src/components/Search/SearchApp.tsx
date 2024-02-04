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
import SearchFilters from "./SearchFilters";
import DecisionFilter from "./filters/DecisionFilter";

import SearchContext from "./SearchContext";
import {
  SearchResultType,
  PaginiationType,
} from "../interfaces/interfaces";
import { useParams } from "react-router-dom";
import SearchTips from "./SearchTips";
import { title } from "process";
import { agencies } from "./data/dropdownValues";

type SearchAppPropType = {
  results: SearchResultType[];
  setResults: () => void;
};

const SearchApp = (props: SearchAppPropType) => {
//  console.log('APP ENV:',import.meta.env)
  //const {results} = props;
  //[TODO] ONLY FOR MOCKING INITIALY
  const [context, setContext] = useState(useContext(SearchContext));
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
    setFilterValues({
      ...filters,
      [key]: value,
    });
  };
  useEffect(() => {
    _mounted.current = true;
    return () => {
      _mounted.current = false;
    };
  });

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
  };

  useEffect(() => {
    if(!_mounted.current) {
      return;
    }
    (async function fetchData() {
      const filtered = [];
      Object.keys(filters).forEach((key) => {
          const filterValue = filters[key]
          console.log(`key: ${key}`, 'has value: ', filters[key]);
          if(filterValue){
            filtered.push(filterValue)
          }

      })
      console.log('FILTERED VALUES',filtered)

      const response = await post(`http://localhost:8080/text/search_no_context/`, {
        ...filtered
      })

      console.log(response)
      //const results = await post(`${process.env.REACT_APP_API_URL}/search/results`, {
      setResults(results);
    })
    return () => {
      _mounted.current = false;
    };
  })

  useEffect(() => {
    if (!_mounted.current) {
      return;
    }
    const { pagination } = context;
    const url = urlFromContextPagination(pagination);
    (async function fetchData() {
      const response = await getData(url);

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
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(`getData ~ res:`, res);
    const data = await res.json();
    console.log(`getData ~ data:`, data);
    return data;
  };

  const post = async(url: string, data: any) => {
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
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

  type activeFilterType = {
    key?: string,
    value?: any,
  }
  const activeFilters:activeFilterType[] = [];

  const updateResults = async () => {
    const url = urlFromContextPagination(pagination);
    const {agency,county,action,states,isFast41,titleRaw,agencyRaw,cooperatingAgency,cooperatingAgencyRaw} = filters;
    const filterKeys = Object.keys(filters);
    console.log("FILTER KEYS", filterKeys);

    filterKeys.map((key:string) => {
      if(filters[key]!== ""){
        activeFilters.push({
          key:key, 
          value:filters[key],
        })
      }
    })
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
  const { isFast41 } = filters;
  console.log('FILTERS', filters);
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
                {results.length > 0 
                  ? (
                    <>
                    <SearchResults results={results} />
                    
                    </>
                  )
                  : (
                    <>
                    <SearchTips/>
                    <Button variant="contained" onClick={() => updateResults()}>
                    Get Data
                  </Button>
                  </>

                  )
                }
                
                <Paper style={{padding: 10, flexGrow: 1}}>
                  <SearchResults results={results} />
                  <Button variant="contained" onClick={() => updateResults()}>
                    Get Data
                  </Button>
                  {/* Fast 41 ? {isFast41 ? "Yes" : "No"} */}
                  <Typography variant="h5">Pagination</Typography>
                    {JSON.stringify(pagination, null, 2)}
                  <Typography variant="h5">Filters</Typography>
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
