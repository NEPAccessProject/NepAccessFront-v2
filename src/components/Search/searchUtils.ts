

//[TODO][REFACTOR]  values for look ups such as agencies, stqtes etc should be stored in lookup tables.
import axios, { AxiosResponse } from "axios";
import {
  FilterType,
  HighlightsPostDataType,
  PaginiationType,
  ProcessesType,
  SearchContextType,
  SearchResultType,
  UnhighlightedType,
  ProcessObjectType,
  DocumentType
} from "../interfaces/types";
  //[TODO][CRITICAL] move this to a ENV value
  //const host = import.meta.env.VITE_API_HOST;
  console.log(import.meta.env.VITE_API_HOST)
  const host = import.meta.env.VITE_API_HOST || "http://localhost:8080/"; //look into passing this via an ENV variable
  

  export enum SortBy {
    StartDate = 'startDate',
    EndDate = 'endDate',
    DocumentType = 'documentType',
    Score = 'score',
    Status = 'status',
    Decision = 'decision',
    Title = 'title'
  }

  export function sortProcessObjects(
    processObjects: ProcessObjectType[],
    sortBy: SortBy,
    sortDir: string = "asc"
  ): ProcessObjectType[] {
    return processObjects.sort((a, b) => {
      if (a[sortBy] < b[sortBy]) {
        return sortDir === "asc" ? -1 : 1;
      }
      if (a[sortBy] > b[sortBy]) {
        return sortDir === "asc" ? 1 : -1;
      }
      return 0;
    });
  }
  export function sortProcessObjectByPropertyType(processObject: ProcessObjectType): ProcessObjectType {
    const sortedProcessObject = { ...processObject };
    const keys = Object.keys(sortedProcessObject);
    
    keys.sort((a, b) => {
      const aValue = sortedProcessObject[a];
      const bValue = sortedProcessObject[b];
      
      const aType = typeof aValue;
      const bType = typeof bValue;
      
      if (aType < bType) return -1;
      if (aType > bType) return 1;
      return 0;
    }).forEach(key => {
      const value = sortedProcessObject[key];
      delete sortedProcessObject[key];
      sortedProcessObject[key] = value;
    });
    
    console.log(`sortProcessObjectByPropertyType ~ sortedProcessObject:`, sortedProcessObject);
    return sortedProcessObject;
  }
 
  export function sortProcessObjectByStartDate(processObject: ProcessObjectType, sortdir: string = "asc"): ProcessObjectType {
    const sortedProcessObject = { ...processObject };
    console.log(`Trying to Sort Process`, processObject);

    // Sort the properties of the process object
    const sortedKeys = Object.keys(sortedProcessObject).sort((a, b) => {
      if (sortdir === "asc") {
        return new Date(sortedProcessObject[a].StartDate).getTime() - new Date(sortedProcessObject[b].StartDate).getTime();
      } else {
        return new Date(sortedProcessObject[b].StartDate).getTime() - new Date(sortedProcessObject[a].StartDate).getTime();
      }
    });

    const result: ProcessObjectType = {};
    for (let key of sortedKeys) {
      result[key] = sortedProcessObject[key];
    }

    console.log(`sortProcessObjectByStartDate ~ sortedProcessObject:`, result);
    return result;
  }
  export function sortProcessObjectByDocumentType(processObject: ProcessObjectType, sortby: string, sortdir: string = "asc"): ProcessObjectType {
    const sortedProcessObject = { ...processObject };
    console.log(`Trying to Sort Process`, processObject);
    // Sort the properties of the process object
    Object.keys(sortedProcessObject).sort().forEach(key => {
      if (Array.isArray(sortedProcessObject[key])) {
        sortedProcessObject[key].sort((a: any, b: any) => {
          if (sortdir === "asc") {
            return a[sortby] > b[sortby] ? 1 : -1;
          } else {
            return a[sortby] < b[sortby] ? 1 : -1;
          }
        });
      }
    });
    console.log(`sortProcessObject ~ sortedProcessObject:`, sortProcessObjectByDocumentType);
    return sortedProcessObject;
  }

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
      } else if (sortby.toLowerCase() === "startdate") {
        let dateA = new Date(a.doc.register_date);
        let dateB = new Date(b.doc.register_date);
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
//    results.map((result:SearchResultType) => scores.push(result.score));
  scores.sort((a, b) => b - a);
  console.log("TOP SCORES", scores[0]);
  console.log("BOTTOM SCORES", scores[scores.length - 1]);
  console.log("Average Score", (scores[scores.length - 1] + scores[0]) / 2);
  const avg:number = (scores[scores.length - 1] + scores[0]) / 2;
  const filteredResults = results.filter((result) => result && result.score && result.score > avg);
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

export async function post(url, postData): Promise<any> {
  return new Promise(async (resolve, reject) => {

    console.log(`Posting to URL ${url} with data:`, postData);
    axios.post(
      //"/api/text/search_no_context",
      url,
      postData,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          
          //"Access-Control-Allow-Origin": "*", // Required for CORS support to work
        },
      }
    )
    .then((response:AxiosResponse) => {
      const data = response.data || [];
      console.log('RESPONSE RETURNED DATA',data);
      resolve(data);
    })
    .catch((error) => {
      const msg = `Error in post: ${error}`;
      reject(msg);
    });
  });
}  
export function getActiveFilters(filters:FilterType): FilterType {
  const activeFilter = {
    title: '',
  } as FilterType;
  Object.keys(filters).forEach((key) => {
    const val = filters[key];
    if(!key || (!val || val === "" || val === undefined)){
      //console.warn(`��� ~ getActiveFilters ~ ${key} is empty - val?`,val);
      return;
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
//        console.log(`BOOLEAN MATCH ON - on key: ${key} - value:`,val)
        activeFilter[key] = true
      }
      //[TODO] We will probally need to handle when a boolean value is turned to false after being true in a previous action
    }
    else {
      //console.warn(`getActiveFilters ~ No match for key: ${key} and val: ${val} - type: ${typeof val}`);
      //activeFilter[key] = val;
    }
  });
  console.log(`RETURNING ACTIVE FILTERS`, activeFilter);
  return activeFilter;
};

export function getUnhighlightedFromResults(results:SearchResultType[],searchTerm:string): HighlightsPostDataType {
  const postData:HighlightsPostDataType = {
    unhighlighted: [],
    terms: searchTerm,
    markup: false,
    fragmentSizeValue: 2,
  };
  //[TODO][CRITICAL] Need to seperate each entry in filenames as array 
  results.map((result:SearchResultType) => {
    console.log(`FILENAMES ~ type: ${typeof result.filenames} ~ result:`, result.filenames);
    const filenames = result.filenames && result.filenames.length  && result.filenames.split('>') as string[] || [result.filenames];
    console.log(`results.map ~ filenames:`, filenames);
    console.log(`results.map ~ result:`, result);
    result.ids.forEach((id) => {
      filenames.map(filename => {
        console.log(`ID: ${id} | Filename: ${filename}`);
      const item:UnhighlightedType = {
        luceneIds: [id],
        filename: filename
      }
      postData.unhighlighted.push(item);
    });
    });
  });
  console.log(`getUnhighlightedFromResults ~ postData:`, postData);
   return postData;
}
// Creates the data strucutre to send as the body of the highlight POST request
export function getUnhighlightedFromResult(result:SearchResultType,searchTerm:string): HighlightsPostDataType {
  const postData:HighlightsPostDataType = {
    unhighlighted: [],
    terms: searchTerm, 
    markup: true,
    fragmentSizeValue: 2,
  };
  try{
  //const luceneIds:HighlightIdsType[] = [];
//     results.map((result:SearchResultType) => {
        const filenames = result.filenames && result.filenames.split('>') as string[];
        console.log(' filenames',filenames);
        console.log(`//results.map ~ filenames:`, filenames);
        result.ids.forEach((id) => {
          console.log('ID',id, ' FROM Result ', result);
            
          if(id){
            {
              filenames && filenames.forEach((filename) => {
                const item:UnhighlightedType = {
                luceneIds: [id],
                filename:filename     
            }
            postData.unhighlighted.push(item);
          })
        }
      }})}
  catch(err){
    console.error(`Error getting highlights POST data`,err)
  }

   return postData;
}
export const getHighlights = async(result:SearchResultType,title:string,fragmentSizeValue:number = 2):Promise<string[]> => {
  return new Promise(async (resolve, reject) => {
  //                const filenames = result.filenames as string[];
    const doc = result.doc;
    const { id } = doc;
    console.log("ID", id, " FROM Result ", result);

    if (id) {
      const postData = {
        unhighlighted: [
          {
            luceneIds: [id],
            filename: result.filenames,
          },
        ],
        terms: title,
        markup: true,
        fragmentSizeValue: fragmentSizeValue,
      };
      const url = `${host}text/get_highlightsFVH`;
      console.log('HIGHLIGHT URL:', url);
      axios
        .post(url, postData, {
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json;charset=utf-8;text/*",
          },
        })
        .then((resp) => resp.data)
        .then((highlights: string[]) => {
          console.log(`.then ~ highlights:`, highlights);
          resolve(highlights);
        })
        .catch((err) => {
          const msg = `Unexpected Error highlighting search results ${err.message}`;
          console.error(msg);
          reject(msg);
          //setError(msg);
        });
    } else {
      resolve([]);
    }
});
}

function groupResults(results: SearchResultType[]): Record<string, SearchResultType[]> {
  const groupedResults: Record<string, SearchResultType[]> = {};
  results.forEach((result) => {
    if(result.doc && result.doc.processId){

    const processId = result.doc.processId;

    if (!groupedResults[processId]) {
      groupedResults[processId] = [];
    }

    groupedResults[processId].push(result);
  }
  });
  console.log(`groupedResults:`, groupedResults);
  return groupedResults;
}
/*
  This function should group each result into a larger process object, where things like start date and status 
*/
export function groupResultsByProcessId(results: SearchResultType[]): ProcessesType {
  const processes: ProcessesType = {};

  const groupedResults = groupResults(results);
  console.log(`groupResultsByProcessId ~ groupedResults:`, groupedResults);

  results.forEach((result) => {
    if (result.doc && result.doc.processId) {
      const processId = result.doc.processId as number;

      if (!processes[result.doc.processId]) {
        processes[processId] = {
          agency: result.doc.agency,
          county: result.doc.county,
          decision: result.doc.decision,
          endDate: result.doc.finalNoaDate || result.doc.firstRodDate || result.doc.noiDate || result.doc.registerDate || result.doc.commentDate,
          processId: result.doc.processId,
          region: result.doc.county,
          results: groupedResults[result.doc.processId],
          startDate: result.doc.commentDate,
          state: result.doc.state,
          status: result.doc.status,
          title: result.doc.title,
          //decision: result.doc.decision,
          score: result.score,
        } as ProcessObjectType;
        //{{  processes[processId] }}
      } else {
        {{  
          const thisProcess = processes[processId];
          thisProcess.results.push(result);
          thisProcess.agency = result.doc.agency && thisProcess.agency?.concat(result.doc.agency,';');
          thisProcess.county = result.doc.county && thisProcess.county?.concat(result.doc.county,';');
          thisProcess.decision = result.doc.decision && thisProcess.decision?.concat(result.doc.decision,';');
          thisProcess.endDate = result.doc.finalNoaDate || result.doc.firstRodDate || result.doc.noiDate || result.doc.registerDate || result.doc.commentDate;

        }}
        processes[processId].results.push(result);        
        console.log(`processId: ${processId} already exists for new Process`, processes[processId]);
      }
    }
  });

  return processes;
}
export function groupProcessResults(results: SearchResultType[]): Record<string, SearchResultType[]> {
  const groupedResults: Record<string, SearchResultType[]> = {};

  results.forEach((result) => {
    const processId = result.doc.processId;
    console.log(`results.forEach ~ processId:`, processId);

    if (!groupedResults[processId]) {
      groupedResults[processId] = [];
    }

    groupedResults[processId].push(result);
  });
  //console.log(`groupedResults:`, groupedResults);
  return groupedResults;
}
export const updateActiveFilters = (filters:FilterType,key:string,value:any,action:string)=>{
  let activeFilters = {...filters};
  if(action === "add"){
    activeFilters = {
      ...activeFilters,
      [key]:value,
    };
  }
  else{
    let obj = new Object()
    const filters = {
      ...activeFilters,
      [key]:value,
    }
  }
  console.log("🚀 ~ updateActiveFilters ~ filters:", filters)
  return filters;
}
