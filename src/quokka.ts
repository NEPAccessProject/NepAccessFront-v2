import searchResults from './tests/data/results';
import { groupResultsByProcessId, sortResultsByDecision, sortResultsByDocumentType, sortResultsByRegisterDate } from './components/Search/searchUtils';
import {DocumentType,ResponseSearchResultsType,ProcessesType} from './components/interfaces/types';
const results = searchResults.slice(0, 5);
const finalResults = results.filter((result) => result.doc.documentType.includes('Final'));

finalResults.map((result) => {
    let doc = result.doc;
    doc = handleDocumentTypeConversion(doc);
    result.doc = doc;
    console.log(`doc:`, doc);
})
console.log(`finalResults:`, finalResults);
// const processes = groupResultsByProcessId(finalResults);

// const numProcesses = Object.keys(processes).length;
// let tmp = processes.results;

// const resultsToUse = [];
// results.map((result) => {
//     let doc = result.doc;
//     doc = handleDocumentTypeConversion(doc);
//     if(doc.documentType.includes('Final')){
//         resultsToUse.push(result);
//     }
// })
// console.log('\r\n  ==================== \r\n resultsToUse: ', resultsToUse.slice(0,2));
// console.log(`# of Mock Results: ${results.length} - # of Processes: ${numProcesses}`);
 

export function handleDocumentTypeConversion(document)
{
  const newDoc = {
   ...document,
    decision: document.decision? document.decision.split(',') : [],
    documentType: document.documentType? document.documentType.split(';') : [],
    action: document.action? document.action.split(';') : [],
    agency: document.agency? document.agency.split(',') : [],
    commentDate: document.commentDate,
    commentsFilename: document.commentsFilename,
    cooperatingAgency: document.cooperatingAgency,
    county: document.county,
  }
  return newDoc;
}