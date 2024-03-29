import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { afterEach, assert, beforeEach, describe, expect, test } from 'vitest';
import { groupResultsByProcessId, sortResultsByDecision, sortResultsByDocumentType, sortResultsByRegisterDate } from "../components/Search/searchUtils";
import { ProcessObjectType, SearchResultType } from '../components/interfaces/types';
import results from "./data/results";
console.log(`# of Mock Results: ${results.length}`)
const host = "https://localhost:8080/"


describe("Sorting of Results and Processes", () => {
  let mock;

  beforeEach(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
  });
  type ProcessType = {
    [key: number]: SearchResultType[]
  }
  
  test("sortResultsByRegisterDate", () => {

    enum decisionEnum {
      PROJECT = 'PROJECT',
      PLAN = 'PLAY',
      PROJECT_PLAN = 'PROJECT_PLAN',
      LEGISLATIVE_PROJECT = 'LEGISLATIVE_PROJECT',
      LEGISLATIVE_PLAN = 'LEGISLATIVE_PLAN'
  }
  
  const decisionOrder = {
      [decisionEnum.PROJECT] : 1,
      [decisionEnum.PLAN] : 2,
      [decisionEnum.PROJECT_PLAN] : 3,
      [decisionEnum.LEGISLATIVE_PROJECT] : 4,
      [decisionEnum.LEGISLATIVE_PLAN] : 5,  
  } as const;
  
    const sorted = results.sort((a ,b) => {
      if(a.doc?.decision && b.doc?.decision){
        return decisionOrder[a.doc.decision] - decisionOrder[b.doc.decision];
      }
      else {
        return 0;
      }
    });

    sorted.map((result,idx)=>{
      console.log(`RESULT ${idx} Decision`,result.doc?.decision);
    })
  })

  test("Determines the correct end date for a process",()=>{
    const processes = groupResultsByProcessId(results);
    console.log(`test ~ processes:`, processes);
    const process:ProcessObjectType = processes[1001687];
    
    expect(process.results).toBeGreaterThan(0);
    const processResults:SearchResultType[] = process.results; 
    expect(process.startDate).toBeDefined();
    processResults.map((result,idx)=>{
      console.log(`Result ${idx} - Register Date: ${result.doc.registerDate} - Final Noa Date: ${result.doc.finalNoaDate} - First Rod Date: ${result.doc.firstRodDate} - Noi Date: ${result.doc.noiDate}`);
    })



  })

  test("Should sort results based on the Decision Type Enum", () => {
    
//    console.log(`test ~ resultsToUse:`, resultsToUse);
    //mix up some results with various document types inside a process

    const sortedResults = sortResultsByDecision(results);
    console.log('First Result Document Type: ', sortedResults[0].doc.decision)
    console.log('Last Result Document Type: ', sortedResults[sortedResults.length - 1].doc.decision)
    expect(sortedResults).toBeDefined();
    expect(sortedResults.length).toBeGreaterThan(0);
    sortedResults.map((result,idx)=>{
      console.log(`\r\n RESULT with ${result.doc.id}:`,result.doc.decision);
    })
    console.log(`First Results Decision Type: `, sortedResults[0].doc.decision);
    console.log(`Last Results Decision Type: `, sortedResults[sortedResults.length-1].doc)
    expect(sortedResults[0].doc.documentType?.toLowerCase()).toBe("project");
    expect(sortedResults[sortedResults.length - 1].doc.documentType?.toLowerCase()).toBe("Legislative;Plan");

  });
  test("Should sort a processes' results by Register Date ",()=>{
      const processes = groupResultsByProcessId(results);
      Object.keys(processes).forEach(key => {
        const process = processes[key];
        const sorted = sortResultsByRegisterDate(results,'startDate');
        expect(sorted).toBeDefined();
        expect(sorted.length).toBeGreaterThan(0);
        const numberOfSortedResults = sorted.length;
        sorted.map((result,idx)=>{
          if(sorted[idx+1]){
            const next = sorted[idx+1];
            if( result.doc.registerDate && next.doc.registerDate){
              const currentRegisterDate = new Date(result?.doc?.registerDate) as Date;
              const nextRegisterDate = new Date(next?.doc?.registerDate) as Date;
              assert(currentRegisterDate.getTime() <= nextRegisterDate.getTime(),"Current Register Date is less than Next Register Date");
            }
            else{
              fail('Register Date is not defined for this result');
            }
          }
        })
      })
    });

  test('Correctly sort results for a process',()=>{
    const processes = groupResultsByProcessId(results) || {};
    const arrProcesses = Object.entries(processes) || [];
    expect(arrProcesses).toBeDefined();
    arrProcesses.map((process,idx)=>{
      console.log(`process[${idx}]:`,process[idx]);
    })  
  });

  test('Sorts Processes using an enum',()=>{
    const processes = groupResultsByProcessId(results);
    Object.keys(processes).map((key)=>{
      const process = processes[key]
      const results = process.results;
      results.map((result,idx)=>{
        console.log('\r\n --- Document Type',result.doc.documentType);
        if(results[idx+1]){
          console.log('\r\n ---- Next Document Type',results[idx+1].doc.documentType);
        }
      })
      console.log(`Process key ${key} - decision ${process.decision}`);      
      expect(process.decision).toEqual('Project');
      // const sorted = sortProcessObjects([process],'decision','desc');
      // console.log(`Object.keys ~ sorted:`, sorted.decision?.toLowerCase());
      // expect(sorted.decision?.toLowerCase()).toBeGreaterThan(0);
      
      // expect(sorted).toBeDefined();
    }) 

  })
});
// export function groupResultsByProcessId(results: SearchResultType[]): ProcessesType{
//   const processes:ProcessesType = {};
//     const groupedResults = groupByResults(results);
//     results.forEach((result) => {
//     if(result.doc && result.doc.processId){

//       const processId = result.doc.processId as number;

//       if(!processes[result.doc.processId]) 
//       {
//         const processes[processId] = {
//           processId: result.doc.processId,
//           results: groupedResults[result.doc.processId],
//           title: result.doc.title,
//           status: result.doc.status,
//           startDate: result.doc.commentDate,
//           endDate: result.doc.finalNoaDate || result.doc.firstRodDate || result.doc.noiDate || result.doc.registerDate || result.doc.commentDate,
//           //decision: result.doc.decision,
//           score: result.score,
//         }
//       }
//       else {
//         console.log(`processId: ${processId} already exists`);
//       }
//     }});
//   return processes;
// }


  // test("Moves the correct values to the process level",()=>{
    
  //   const processes = groupResultsByProcessId(results);
  //   expect(processes).toBeDefined();
  // })

  // test('Gets Highlights for multiple results', async () => {
  //   const unhighlighted = getUnhighlightedFromResults(results,"Copper Mine") as HighlightsPostDataType;
  //   //console.log(`test ~ unhighlighted:`, unhighlighted);
  //   expect(unhighlighted).toBeDefined();
  //   expect(Object.keys(unhighlighted).length).toBeGreaterThan(0);
  //   const url = `${host}text/get_highlightsFVH`;
  //   console.log('Using URL: ', url);
  //   axios.post(`${host}text/get_highlightsFVH`,JSON.stringify(unhighlighted),{
  //     headers: {
  //       "Content-Type": "application/json",
  //       Accept: "application/json",
  //     },
  //   })
  //   .then((response: AxiosResponse) => {
  //     console.log(`.then ~ response:`, response);
  //     return response.data;
  //   })
  //   .then((highlights)=> {
  //     console.log(`.then ~ highlights:`, highlights);
  //     expect(highlights).toBeDefined();
  //     expect(highlights.length).toBeGreaterThan(0);

  //   })
  //   .catch((error) => {
  //     console.error(`ERROR GETTING HIGHLIGHT:`, error);
  //     expect(error).toBeUndefined();
  //   })
  //   expect(unhighlighted).toBeDefined();
  //   expect(Object.keys(unhighlighted).length).toBeGreaterThan(0);
  // })
