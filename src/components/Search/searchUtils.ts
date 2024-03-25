

//[TODO][REFACTOR]  values for look ups such as agencies, stqtes etc should be stored in lookup tables.
import axios, { AxiosResponse } from "axios";
import {
  DecisionTypeEnum,
  DocumentType,
  DocumentTypeEnum,
  FilterType,
  HighlightsPostDataType,
  PaginiationType,
  ProcessObjectType,
  ProcessesType,
  ResultDocumentType,
  SearchContextType,
  SearchResultType,
  UnhighlightedType,
  ResponseSearchResultsType,
} from "../interfaces/types";
  //[TODO][CRITICAL] move this to a ENV value
  //const host = import.meta.env.VITE_API_HOST;
//  console.log(import.meta.env.VITE_API_HOST)
  const host = import.meta?.env?.VITE_API_HOST || "http://localhost:8080/"; //look into passing this via an ENV variable
  

  export enum SortBy {
    StartDate = 'startDate',
    EndDate = 'endDate',
    DocumentType = 'documentType',
    Score = 'score',
    Status = 'status',
    Decision = 'decision',
    Title = 'title'
  }

  export function sortProcessObjectByDocumentType(processObject: ProcessObjectType, sortby: string, sortdir: string = "asc"): ProcessObjectType {
    const sortedProcessObject = { ...processObject };
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
  const avg:number = (scores[scores.length - 1] + scores[0]) / 2;
  const filteredResults = results.filter((result) => result && result.score && result.score > avg);

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

export function sortResultsByDecision(results: SearchResultType[], sortDir: string = "asc"): SearchResultType[] {
  const decisionTypeOrder = Object.values(DecisionTypeEnum);
  const sorted = results.sort((a, b) => {
    if (a.doc.decision && b.doc.decision) {
      const val =   decisionTypeOrder.indexOf(b.doc.decision) - decisionTypeOrder.indexOf(a.doc.decision as string);
      console.log(`a ${a.doc.decision} vs b ${b.doc.decision}`, val);
      return val;
    }
    return 0; // if the documentType is not defined, return 0
  });
  return sorted;
}
export function sortResultsByDocumentType(results: SearchResultType[], sortDir: string = "asc"): SearchResultType[] {
  const documenTypeOrder = Object.values(DocumentTypeEnum);
  const toBeSorted = [...results];
  const sorted = toBeSorted.sort((a, b) => {
    if (a.doc.documentType && b.doc.documentType) {
      const val =  documenTypeOrder.indexOf(a.doc.documentType as string) - documenTypeOrder.indexOf(b.doc.documentType as string)
      console.log(`a ${a.doc.documentType} vs b ${b.doc.documentType}`, val);
      return val;
    }
    return 0; // if the documentType is not defined, return 0
  });
  return sorted;
}
export   const getDatesByDocumentType = (documentType: string,doc): string => {
  console.log(`getDatesByDocumentType ~ documentType:`, documentType, ' FOR DOCUMENT: ', doc);
  if(!doc ||!doc.decision) return "";
//  console.log(`getDateBasedonDecision decision ${documentType}:`, doc);
  if(!doc ||!doc.decision) return "N/A";
  switch (documentType) {
    case "NOI":
      return doc.noiDate || "N/A";
    case "Draft":
      return doc.commentDate ? doc.commentDate : "N/A";
    case "Final":
      return doc.finalNoa ? doc.finalNOA : "N/A";
    case "ROD":
      return doc.firstRodDate ? doc.firstRodDate : "N/A";
    case "Project":
      return doc.registerDate ? doc.registerDate : "N/A";
    case "Final Supplement":
      return doc.finalNoaDate ? doc.finalNoaDate : "N/A";
    case "Draft Supported":
        return doc.noiDate? doc.noiDate : "N/A";
    default:
      return doc.registerDate ? doc.registerDate : "N/A";
  }
};
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
  results.map((result) => {
    console.log(`FILENAMES ~ type: ${typeof result.filenames} ~ result:`, result.filenames);
    const filenames = result.filenames && result.filenames.length  && result.filenames || [result.filenames];
    console.log(`results.map ~ filenames:`, filenames);
    console.log(`results.map ~ result:`, result);
    result.ids.forEach((id) => {
      filenames.map(filename => {
        console.log(`ID: ${id} | Filename: ${filename}`);
      const item:UnhighlightedType = {
        luceneIds: [id],
        filename: result.doc.filename,
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
        const filenames = result.filenames;
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
    //console.log("ID", id, " FROM Result ", result);

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
export function handleDocumentTypeConversion(document:ResultDocumentType)
{
  //console.log('TRYING TO HANDLE DOCUMENT TYPE CONVERSION',document);
  const newDoc = {
   ...document,
    documentType: document.documentType && typeof document.documentType === "string"  ? document.documentType.split(';') : [],
    decision: document.decision && typeof document.decision === "string" ? document.decision.split(';') : [],
    county: document.county,
    cooperatingAgency: document.cooperatingAgency,
    commentsFilename: document.commentsFilename,
    commentDate:  document.commentDate && typeof document.commentDate === "string"? new Date(document.commentDate) : null,
    agency: document.agency,
    action: document.action && typeof document.action === "string" ? document.action.split(';') : [],
  }
  return newDoc;
}

function groupResults(results: SearchResultType[]): Record<string, SearchResultType[]> {
  const groupedResults: Record<string, SearchResultType[]> = {};
  results.forEach((result) => {
    if(!result.doc) return;
    let doc = result.doc as DocumentType;
    let newDoc = {}
    const {decision,documentType,action} = doc;

    if(result?.doc && result.doc.processId){

    const processId = result.doc.processId;

    if (!groupedResults[processId]) {
      groupedResults[processId] = [];
    }

    groupedResults[processId].push(result);
  }
  });
  //console.log(`groupedResults:`, groupedResults);
  return groupedResults;
}

export function getFinalDocumentsFromResult(results: SearchResultType[]){
  const finalResults = results.length && results.filter((result) => result.doc.documentType.includes('Final'));
  return finalResults;
}
export function getFinalDocumentsFromResults(results){
  results.map((result) => {
    getFinalDocumentsFromResult(result);
  })
}
/*
  This function should group each result into a larger process object, where things like start date and status 
*/
export function groupResultsByProcessId(results): ProcessesType {
  const processes: ProcessesType = {};

  const groupedResults = groupResults(results);
  
  results.forEach((result) => {
    let doc = result?.doc;
    if(!doc) return;
    //const newDoc = {...result.doc};
    const newDoc = handleDocumentTypeConversion(doc as ResultDocumentType);
    result.doc = newDoc;
    let {decision,documentType,action} = doc;

    if (result.doc && result.doc.processId) {
      const processId = result.doc.processId as number;
      const process = processes[processId];

      if (!processes[result.doc.processId]) {
          processes[processId] = {
//            process : processes[processId] || 0,
            //county: (result.doc && result.doc.county?.length && typeof(doc.county?.length) === "string") ? result.doc.county.split(';') || [],
            //decision: result.doc && result.doc?.decision.length && result.doc.decision.split(';') || [],
            //action: result.doc.action && result.doc.action.split(';') || [],
            //documentType: documentType,
  //          endDate: result.doc.finalNoaDate || result.doc.draftNoa || result.doc.noiDate || result.doc.commentDate && result.doc.registerDate,
            //decision: result.doc.decision,
            processId: result.doc.processId,
//            region: result.doc.county,
            results: groupedResults[result.doc.processId],
            //startDate: result.doc?.registerDate && result.doc.registerDate | ""
//            state: result.doc.state,
            //status: result.doc.status,
            title: result.doc.title,
            //decision: result.doc.decision,
            score: result.score,
          };
        //{{  processes[processId] }}
      } else {
        {{  
          const thisProcess = process;
          let doc = result.doc;
          let filenames = result.filenames;
          const newDoc = {
            ...doc,
            decision: (decision && typeof(doc.decision) === "string") ? [decision] : decision || [],
            action: (action && typeof(action) === "string") ? [action] : action,
            documentType: ((documentType && typeof(documentType)) ? [documentType] : documentType || []),
          } as DocumentType;

          const newResult:SearchResultType = {
            ...result,
            doc: newDoc,
            filenames: result.filenames
            //(filenames && typeof(filenames) === "string")? filenames.split(';') : filenames
          };
          // if(doc.decision.includes(";")){
          //     doc.decision = doc.decision.split(';');
          // }
          thisProcess && thisProcess.results.push(newResult);
          //[TODO] once we have converted decision,documentType and action to arrays we should be able to merge them into the existing process's results dod

          // if(!result.doc.decision && thisProcess.decision !== result.doc.decision){
          //   thisProcess.decision?.concat(result.doc.decision,';');
          //   //[TODO] We need to Sort the decisions by a decision enumeration
          // }
          // if(!result.doc.county?.includes(result.doc.county)) {
          //   thisProcess.county. //[TODO] need to have a better type guards
          // }
          // if(!result.doc.county?.includes(result.doc.county)) {
          //   thisProcess.county?.push(result.doc.county || ''); //[TODO] need to have a better type guards
          // }

          //Compare the exisiting start date with the new start date and set the earliest date
          // if(result.doc.registerDate && thisProcess.startDate){
          //   if(result.doc.registerDate < thisProcess.startDate){
          //     thisProcess.startDate = result.doc.registerDate;
          //   }
          // }
          // //Compare the end date with the new end date and set the latest date
          // if(result.doc.finalNoaDate && thisProcess.endDate){
          //   if(result.doc.finalNoaDate > thisProcess.endDate){
          //     thisProcess.endDate = result.doc.finalNoaDate;
          //   }
          // }
          // if(result.doc.noiDate && thisProcess.endDate){
          //   if(result.doc.noiDate > thisProcess.endDate){
          //     thisProcess.endDate = result.doc.noiDate;
          //   }
          // }
          // if(result.doc.commentDate && thisProcess.endDate){
          //   if(result.doc.commentDate > thisProcess.endDate){
          //     thisProcess.endDate = result.doc.commentDate;
          //   }
          // }
          // if(result.doc.draftNoa && thisProcess.endDate){
          //   if(result.doc.draftNoa > thisProcess.endDate){
          //     thisProcess.endDate = result.doc.draftNoa;
          //   }
          // }
          // if(result.doc.registerDate){
          //   if(result.doc.registerDate > thisProcess.startDate){
          //     thisProcess.startDate = result.doc.registerDate;
          //   }
          // }

        }}
        processes[processId].results.push(result);        
        //Finally we need to take the processes and sort them by start date
        const sorted  = sortResultsByRegisterDate(processes[processId].results);
        processes[processId].results = sorted;
      }
    }
  });
  return processes;
}

export function sortResultsByRegisterDate(results: SearchResultType[], sortDir: string = "asc"): SearchResultType[] {  
  const sorted = results.sort(
    (a, b) => {
      if(!a.doc.registerDate ||!b.doc.registerDate) return 0;
      if (sortDir === "asc") {
        return a.doc.registerDate > b.doc.registerDate ? 1 : -1;
      } else {
        return a.doc.registerDate < b.doc.registerDate ? 1 : -1;
      }
    }
  )
//  console.log(`sortResultsByRegisterDate ~ sorted:`, sorted);
  return sorted;
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
