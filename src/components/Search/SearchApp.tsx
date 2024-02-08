import {
  Button,
  Container,
  Divider,
  Paper,
  Typography
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import React, { useContext, useEffect, useState } from "react";
import SearchFilters from "../Search/SearchFilters";
import SearchContext from "./SearchContext";
import SearchHeader from "./SearchHeader";
import SearchResults from "./SearchResults";

import { useParams } from "react-router-dom";
import {
  PaginiationType,
  SearchResultType
} from "../interfaces/interfaces";
import SearchTips from "./SearchTips";

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
  const [pagination, setPaginationValues] = useState(context.pagination)
  const [isLoading,setIsLoading] = useState(false);
  const host = 'http://localhost:8080/'; //TODO need to move this to a

  //
  const [options, setOptions] = useState(context);

  const _mounted = React.useRef(false);
  let params = useParams();
  const   updateFilterStateValues = (key: string, value: any) => {
    setFilterValues({...filters, [key]: value});
  };
  useEffect(() => {
    _mounted.current = true;
    return () => {
      _mounted.current = false;
    };
  });

  const updatePaginationStateValues = (key: string, value: any) => {

    console.log(`updatePaginationStateValues ~ key:string,value:any:`, key, value);
    setPaginationValues({
      ...pagination,
      [key]: value,
    });
    console.log('FINSHED FILTERS UPDATE - Filters are now',filters)
  };
 
  const get = async (url: string) => {
    console.log(`get ~ url:`, url);
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json", 
        //"Access-Control-Allow-Origin": "*", // Required for CORS support to work
      },
    });
    const results = await res.json();
    console.log(`get ~ temp:`, results);
    return results;
  }
  const getResultsCount = async (url: string) => {
    const res = await fetch(`${url}get_count`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json", 
        //"Access-Control-Allow-Origin": "*", // Required for CORS support to work
      },
    });
    const results = await res.json();
    console.log(`get ~ temp:`, results);
    return results;
  

  }
  useEffect(() => {
    console.log('USE EFFECTFILTERS ARE NOW',filters)
    const url:string = urlFromContextPagination(pagination);
    setIsLoading(true);
    if(!_mounted.current) {
      return;
    }
    const title:string = titleRaw || ""
    if(title && title.length > 3){
      setTitleRaw(titleRaw);
    }
    async function fetchData() {
      console.log(`fetchData ~ url:`, url);
      const filtered:any = [];
        Object.keys(filters).forEach((key) => {
            const filterValue = filters[key]
//            console.log(`key: ${key}`, 'has value: ', filters[key]);
            if(filterValue){
              filtered.push(filterValue)
            }

        })
      console.log('FILTERED VALUES',filtered)
      // [TODO] ONLY FOR MOCKING  Probalby need to have different function for search_no_context and search_top etc which in turn call a wrapper function for GET and POST
        console.log('CALLING WITH URL',url)
        const response = await fetch(url, {
          method: "GET",
          headers: {
            //"Content-Type": "application/json",
            //"Accept": "application/json", 
            //"Access-Control-Allow-Origin": "*", // Required for CORS support to work
          },
        });
        const results =  await response.json();
        setResults(results)
        setIsLoading(false);
    }
    fetchData();
    }, [pagination,filters]);

  const urlFromContextPagination = (pagination: PaginiationType) => {
    console.log("🚀 ~ urlFromContextPagination ~ pagination:", pagination)
    const { page, limit, sortby, sortdir } = pagination;
    const searchTerm  =  titleRaw.length ? `&doc.title=${titleRaw}`: "";
    const url:string = `${host}search_top/?_start=${page*limit}&_end=${limit*page+limit}${searchTerm}`;
    console.log("🚀 ~ urlFromContextPagination ~ url:", url)
    return url;
  }

  useEffect(() => {
 
    //get a count of document types and add up the total
    (async function fetchData() {
      const url:string = urlFromContextPagination(pagination);
      const count = await getResultsCount(url);
      console.log(`fetchData ~ count:`, count);
      const total = count.reduce((acc,cur) => acc + cur.count,0);
      console.log(`fetchData ~ total:`, total);
      setPaginationValues({...pagination, total: total});
    })
  })

  useEffect(() => {
    async function fetchCounts() {
      //[TODO] Need to revise so we don't have to do the temp thing.
      let temp = await fetch(`${host}/earliest_year`)
      //[TODO] update urls so its /stats/earliest_year when hooked up to the server
      let firstYear = await temp.json();
      temp = await fetch(`${host}latest_year`)
      let lastYear = await temp.json();
      temp = await fetch(`${host}eis_count`);
      let EISCount = await temp.json();
      // let eaCount = (await fetch(`${host}stats/ea_count`)).json();
      // let finalCount = await fetch(`${host}stats/final_count`);
      // let noiCount = await fetch(`${host}stats/noi_count`);
      // let rodCount = await fetch(`${host}stats/rod_count`);
      // let scopingCount = await fetch(`${host}stats/scoping_count`);
      
      const totalCount = parseInt(firstYear) + parseInt(lastYear)+ parseInt(EISCount);
      console.log("🚀 ~ fetchCounts ~ totalCount:", totalCount)
      updatePaginationStateValues("limit", totalCount);
      console.log(`fetchCounts ~ totalCount:`, totalCount);
    }
    fetchCounts();
  }),[filters]

  // useEffect(() => {
  //   if (!_mounted.current) {
  //     return;
  //   }
  //   //const url = urlFromContextPagination(pagination);
  //   const url:string = urlFromContextPagination(pagination);
  //     (async function fetchData(url) {
  //       console.log('fetching data effect')
  //       const response = await fetch(url, {
  //           method: "POST",
  //           headers: {
  //             "Content-Type": "application/json",
  //             "Accept": "application/json",
              
  //           },
  //           body: JSON.stringify({
  //             "title": titleRaw
  //           })
  //         })
  //         console.log(`fetchData ~ response:`, response);
  //         const results = await response.json();
  //         console.log(`fetchData ~ data:`, results);
  //         setResults(results);  
  //     })
          
  //   } 
  //   ,[]
  //   );
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
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json", 
        //"Access-Control-Allow-Origin": "*", // Required for CORS support to work
      },
    });
    const results = await response.json();
    console.log("🚀 ~ getData ~ results:", results)
    console.log(`GET DATA RETURNING RESPONS:`, results);
    const {page, limit, sortby, sortdir } = pagination;
    let start = page * limit;
    console.log(`getData ~ start:`, start);
    let end = page  * limit + limit;
    console.log(`getData ~ end:`, end);
    
    setResults(results.splice(start,end));
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



  //const activeFilters:FilterOptionType[] = [];

  //const extractActiveFilters = (filters) => 
//   useEffect(()=>{
//     (async function fetchData(){
//       console.log('FETCHING DATA');
//       (
//         async () => {
//           const url:string = urlFromContextPagination(pagination);
//           console.log(`updateResults ~ url:`, url);
//           const {agencies,county,actions,states,isFast41,titleRaw,agenciesRaw,cooperatingAgency,cooperatingAgencyRaw} = filters;
//         const filterKeys = Object.keys(filters);
    
//         filterKeys.map((key:string) => {
//           if(filters[key]!== "" && filters[key] !== 0){
//               activeFilters.push({
//                 label:key, 
//                 value:filters[key],
//               })
//             }
//           }
//         )
//           }
//         )
//       }
//     )
// },[filters,_mounted.current])

  const getActiveFilters = (filters) =>{
    const filterKeys = Object.keys(filters);
    filterKeys.map((key:string) => {
      console.log('CHECKING FOR ACTIVE FILTERS',key, filters[key]);
          if(filters[key]!== "" && filters[key].length !== 0 ||  filters[key] !== 0){
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
      return activeFilters
  }
  const updateResults = async () => {
    const url:string = urlFromContextPagination(pagination);
    console.log(`updateResults ~ url:`, url);
    const activeFilters = getActiveFilters(filters);
    
    console.log(`updateResults ~ results:`, results);
    setResults(results);
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
              <Button variant="contained" onClick={() => getData('/api/search_top')}>
                    Get Data
                  </Button>
                  <Typography><b>Title Raw</b> {filters.titleRaw} </Typography>
                  <Typography><b> Is Loading?</b> {isLoading ? true : false} </Typography>
                <h2>{results?.length ? results.length : 0} Search Results Found</h2>
                
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
                  </>

                  )
                }
                
                <Paper style={{padding: 10, flexGrow: 1}}>
                  <Button variant="contained" onClick={() => getData('/api/search_top')}>
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
}

export default SearchApp;
