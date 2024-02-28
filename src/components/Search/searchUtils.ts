

//[TODO][REFACTOR]  values for look ups such as agencies, stqtes etc should be stored in lookup tables.
import {
    FilterOptionType,
    FilterType,
    PaginiationType,
    SearchContextType,
    SearchResultType,
    SearchAppPropType,
    HighlightType,
    HighlightIdsType,
    HighlightsPostDataType,
  } from "../interfaces/types";
  import axios,{AxiosResponse} from "axios";
  //[TODO][CRITICAL] move this to a ENV value
  const host = import.meta.env.VITE_API_HOST;
  console.log(`host:`, host);
export function sortSearchResults(
    results,
    sortby: string,
    sortdir: string = "asc"
  ): SearchResultType[] {
    //console.log(`sortSearchResults ~ results:`, results);
  
    //[TODO] we need to introduce a sort by param that contols if A > B vs B > A IE ascending and descending so the
    results.sort((a: any, b: any) => {
      //lowercase both sides to avoid case sensitivity issues
      if (sortby.toLowerCase() === "title") {
        if (sortdir === "asc") {
          return a.doc.title.localeCompare(b.doc.title);
        } else {
          return a.doc.title.localeCompare(b.doc.title);
        }
      } else if (sortby.toLowerCase() === "commentDate") {
        let dateA = new Date(a.doc.commentDate);
        let dateB = new Date(b.doc.commentDate);
        // For 'score' and 'commentDate', sort in descending order
        if (sortdir === "asc") {
          return dateA.getDate() - dateB.getDate();
        } else {
          return dateB.getDate() - dateA.getDate();
        }
      } else if (sortby.toLowerCase() === "relavancy") {
        //we want those that are MORE relvant then others
        if (sortdir === "asc") {
          return a.score - b.score;
        } else {
          return b.score - a.score;
        }
      }
      if (sortby.toLowerCase() === "relavancy") {
        console.log(`SORTED BY SCORE results`, results);
      }
      if (sortby.toLowerCase() === "commentDate") {
        console.log(`SORTED BY DATE results`, results);
      }
      if (sortby.toLowerCase() === "title") {
        console.log(`SORTED BY TITLE results`, results);
      }
    });
    return results;
  }
  
  export function filterResults(results: SearchResultType[]): SearchResultType[] {
    if (!Array.isArray(results)) {
      return [];
    }
    const scores: number[] = [];
    results.map((result) => scores.push(result.score));
    scores.sort((a, b) => b - a);
    console.log("TOP SCORES", scores[0]);
    console.log("BOTTOM SCORES", scores[scores.length - 1]);
    console.log("Average Score", (scores[scores.length - 1] + scores[0]) / 2);
    const avg = (scores[scores.length - 1] + scores[0]) / 2;
    const filteredResults = results.filter((result) => result.score > avg);
    console.log(
      "🚀 ~ filterResults ~ # of filteredResults:",
      filteredResults.length
    );
  
    return filteredResults;
  }
    // #region HTTP Methods
  export async function get(url) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*", // Required for CORS support to work
          },
        });
        const data = response.data || [];
        resolve(data);
      } catch (error) {
        console.error(`Error in get: `, error);
        reject(error);
      }
    });
  }
  //[TODO] Temp hack untill connected to the backend
  export const urlFromContextPaginationAndFilters = (
    context: SearchContextType,
    pagination: PaginiationType,
    filters: FilterType,
    searchType:
      | "search_top"
      | "search_no_context"
      | "text/search_no_context"
      | "text/search_top"
  ) => {
    const { page, limit, sortby, sortdir, rowsPerPage } = pagination;
  
    //[TODO]Get currently set filters to use in search query POST requests
    //const activeFilters = getActiveFilters(filters);
    const queryString = `${host}`;
    // activeFilters.forEach((filter) => {
    //   queryString.concat(`&${filter[field]}=${filter.value}`s);
    // });
    console.log(`GENTERATED QUERY STRING:`, queryString);
    //TODO temporary hack this should be part of retriving active filters
    const searchTerm = filters.title.length ? `&title=${filters.title}` : "";
  
    //const url: string = `${host}${searchType}?_start=${page * limit}&_end=${limit * page + limit}${searchTerm}`;
    const url: string = `${host}${searchType}`;
    console.log("🚀 ~ urlFromContextPagination ~ url:", url);
    return url;
  };
  export async function post(url, postData) {
    console.log(`Posting to URL ${url} with data:`, postData);
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.post(
          //"/api/text/search_no_context",
          url,
          postData,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              "Access-Control-Allow-Origin": "*", // Required for CORS support to work
            },
          }
        );
        resolve(response.data);
      } catch (error) {
        console.error(`Error in post: `, error);
        reject(error);
      }
    });
  }
  
  export function getActiveFilters(filters:FilterType): FilterType {
    const activeFilter = {
      title: '',
    } as FilterType;
    Object.keys(filters).forEach((key) => {
      const val = filters[key];
      if(!key || (!val || val === "" || val === undefined)){
        console.warn(`��� ~ getActiveFilters ~ ${key} is empty - val?`,val);
      }
  //      console.log(`Getting Filters for key : ${key} type ${typeof val} ~ val:`, val);
      if (typeof val === "object" && val.length > 0) {
        console.log(`OBJECT MATCH ON key: ${key}, val: ${val[0].label}`);
        activeFilter[key] = [val[0].label];
      } else if (typeof val === "string" && val !== "") {
        console.log(`PRIMITIVE MATCH ON key: ${key}, val: ${val}`);
        activeFilter[key] = val;
      }
      else if (typeof val === "string" && val === "") {
        console.warn(`EMPTY STRING MATCH ON key: ${key}, val: ${val}`);
      }else if (typeof val === "boolean") {
        if(val === true){
          console.log(`BOOLEAN MATCH ON - on key: ${key} - value:`,val)
          activeFilter[key] = true
        }
        //[TODO] We will probally need to handle when a boolean value is turned to false after being true in a previous action
      }
      else {
        console.warn(`getActiveFilters ~ No match for key: ${key} and val: ${val} - type: ${typeof val}`);
        //activeFilter[key] = val;
      }
    });
    console.log(`RETURNING ACTIVE FILTERS`, activeFilter);
    return activeFilter;
  };
  export const hasActiveFilters = (filters:FilterType) => {
    const activeFilters = getActiveFilters(filters);
    console.log(`hasActiveFilters ~ activeFilters:`, activeFilters);
    return Object.keys(activeFilters).length > 0;
  };
  export function getFilterValue(options, value): FilterOptionType[]{
    console.log(`getFilterValue ~ value:`, value);
    if(!options ||!value) {
      return [];
    }
    //  console.log(`getValue ~ options,value:`, options,value);
    const filtered = options.filter((v: FilterOptionType) =>
      options.includes(v.value)
    );
    console.log(`getFilterValue ~ filtered:`, filtered);
  
    return filtered;
  };

export const getFilterValues = (
    options: FilterOptionType[],
    value: FilterOptionType
  ) => {
    console.log('GET FILTER VALUE - value', value, ' options', options)
    if (!value || !value.label) {
      console.warn(
        `The value specified is empty this is most likely an upstream issue - VALUE`,
        value
      );
      return [];
    }
    console.log(`getFilterValues ~ value:`, value);
    const vals: FilterOptionType[] = getFilterValue(options, value);
    const items =
      options.filter((v: FilterOptionType) => options.includes(v)) || [];
  
    const filtered = {
      ...value,
      ...items,
    };
    console.log("getFilterValues", filtered);
    return filtered;
  };

  // Creates the data strucutre to send as the body of the highlight POST request
  export function getHighlightsFromResults(results,term): HighlightsPostDataType {
        console.log('GET HIGHLIGHTS FROM RESULTS', results.length,' TERM ',term);
      const highlightIds:HighlightIdsType[] = [];
      const luceneIds:HighlightIdsType[] = [];
        results.map(result => {
          result.ids && result.ids.length &&  result.ids.map((id:number)=> {
            highlightIds.push({
              luceneId:id,
              filename: result.filenames
            })
  
            luceneIds.push({
              luceneId: id,
              filename: result.filenames || "",
            });
          })
      })
      const rtn:HighlightsPostDataType = {
        'unhighlighted': highlightIds,
        'terms': [term],
        'markup': true, //[TODO] need to wire this into the values in context (passed in as args)
        'fragmentSizeValue': 2
    }
      console.log('LUCENE IDS DATA',rtn)
      return rtn;
  }