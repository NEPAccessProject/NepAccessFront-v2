import { get,getUnhighlightedFromResult,groupResultsByProcessId,getUnhighlightedFromResults,getHighlights} from "./searchUtils";
import axios, { AxiosResponse } from "axios";
import {describe,it,test,beforeEach,afterEach,expect} from 'vitest'
import {HighlightsPostDataType,SearchResultType,} from '../interfaces/types';
import MockAdapter from "axios-mock-adapter"; 
import exp from "constants";
const host = "https://bighorn.sbs.arizona.edu:8443/nepaBackend/"
const results = [
  {
    ids:[8870],
    score:2000251,
    highlights:[],
    filenames:"Copper Flat Copper Mine Draft EIS Volume 1.pdf",
    doc: {
      id:8870,
      processId:1,
      agency: 'Advisory Council on Historic Preserve (ACHP)',
      title: 'Copper Mine',
    }
  },{
    ids:[13172, 13174, 13159, 13165],
    score:14842,
    highlights:[],
    filenames:"Copper Flat Final EIS.pdf>Copper Flat Copper Mine Final EIS Volume 2 Appendices_Part 2.pdf>Copper Flat Copper Mine Final EIS Volume 2 Appendices_Part 3.pdf>Copper Flat Copper Mine Final EIS Volume 2 Appendices_Part 1.pdf",
    doc: {
      id:8870,
      processId:1003904,
      agency: 'Advisory Council on Historic Preserve (ACHP)',
      title: 'Copper Mine',
    }
  },
  {
    ids:[22371, 22307, 22250, 22334, 22352, 22272],
    score:1,
    highlights:[],
    filenames:"Copper Flat Copper Mine Draft EIS Volume 1.pdf>Copper Flat Copper Mine Draft EIS Volume 2.pdf",
    doc: {
      id:10692,
      processId:1003904,
      agency: 'Advisory Council on Historic Preserve (ACHP)',
      title: 'Copper Mine',
    }
  },
] as SearchResultType[]

describe("get", () => {
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
  // test('Groups results by process id', async () => {
  //   const temp = [];
  //   const resultsByProcessId:ProcessType = await groupResultsByProcessId(results);
  //   const keys = Object.keys(resultsByProcessId);
  //   keys.map(key => {
  //     console.log('resultsByProcessId[key]',resultsByProcessId[key]);
  //     expect(resultsByProcessId[key].length).toBeGreaterThan(0);
  //   })
  //   // expect(resultsByProcessId.length).toBe(results.length);
  //   // expect(resultsByProcessId[0].length).toBe(1);
  //   // expect(resultsByProcessId[1].length).toBe(1);
  //   //expect(resultsByProcessId[0][0].id).toBe(8870);
  //   //expect(resultsByProcessId[1][0].id).toBe(13174);  
  // })

//   test('Gets Highlights for multiple results', async () => {
//     results.map((result) => {
//       const unhighlighted = getUnhighlightedFromResults(results,'Copper Mine') as HighlightsPostDataType;
//       console.log('HIGLIGHTS POST DATA',unhighlighted);
//       expect(unhighlighted).toBeDefined();
//       expect(Object.keys(unhighlighted).length).toBeGreaterThan(0);
//       expect(Object.keys(unhighlighted).length).toBeGreaterThan(0);
//       const url = "https://bighorn.sbs.arizona.edu:8443/nepaBackend/text/get_highlightsFVH"
//       console.log(`results.map ~ url:`, url);
//       axios.post(url, 
//       unhighlighted,{
//         headers: {
//           "Content-Type": "application/json",
//           Accept: "application/json",

//         },
//       })
//       .then((response: AxiosResponse) => {
//         console.log('response',response);
//         expect(response.data).toBeDefined();
//         expect(response.data.length).toBeGreaterThan(0);
//         expect(response.data[0].highlightId).toBeDefined();
//         expect(response.data[0].highlightId.length).toBeGreaterThan(0);
//     })
//   })
// })

//   test("Gets higlights for a single result", async()=>{
//     const highlights = await getHighlights(results[0],"Copper Mine");
//      console.log(`test ~ highlights:`, highlights);
// //      expect(unhighlighted).toBeDefined();
//       expect(highlights).toBeDefined();
//       expect(highlights.length).toBeGreaterThan(0);
//   })

// })

  // test('Groups results by process id', async () => {
  //   const resultsByProcessId = await groupResultsByProcessId(results);
  //   console.log(`test ~ resultsByProcessId:`, resultsByProcessId);
  //   const keys = Object.keys(resultsByProcessId);
  //   keys.map(key => {
  //     console.log('resultsByProcessId[key]',resultsByProcessId[key]);
  //     expect(resultsByProcessId[key].length).toBeGreaterThan(0);
  //   })  
  // })

  // test("Highlights for a single result", async()=>{
  //   const result = results[0];
  //   const unhighlighted = getUnhighlightedFromResult(result,"Copper Mine");
  //   console.log(`test ~ unhighlighted:`, unhighlighted);
  //   expect(unhighlighted).toBeDefined();
  //   expect(unhighlighted.unhighlighted.length).toBeGreaterThan(0);
  //   axios.post("http://localhost:8080/text/get_highlightsFVH",JSON.stringify(JSON.stringify(unhighlighted)),{
  //     headers: {
  //       "Content-Type": "application/json",
  //       Accept: "application/json",
  //     },
  //   })
  //   .then((response: AxiosResponse) => {
  //     expect(response.data).toBeDefined();
  //     expect(response.status).toBe(200);
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
  //   console.log('HIGLIGHTS POST DATA',unhighlighted);
  //   expect(unhighlighted).toBeDefined();
  //   expect(Object.keys(unhighlighted).length).toBeGreaterThan(0);
  // })
  // })
  test('Gets Highlights for multiple results', async () => {
    const unhighlighted = getUnhighlightedFromResults(results,"Copper Mine") as HighlightsPostDataType;
    //console.log(`test ~ unhighlighted:`, unhighlighted);
    expect(unhighlighted).toBeDefined();
    expect(Object.keys(unhighlighted).length).toBeGreaterThan(0);
    const url = `${host}text/get_highlightsFVH`;
    console.log('Using URL: ', url);
    axios.post(`${host}text/get_highlightsFVH`,JSON.stringify(unhighlighted),{
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
    .then((response: AxiosResponse) => {
      console.log(`.then ~ response:`, response);
      return response.data;
    })
    .then((highlights)=> {
      console.log(`.then ~ highlights:`, highlights);
      expect(highlights).toBeDefined();
      expect(highlights.length).toBeGreaterThan(0);

    })
    .catch((error) => {
      console.error(`ERROR GETTING HIGHLIGHT:`, error);
      expect(error).toBeUndefined();
    })
    expect(unhighlighted).toBeDefined();
    expect(Object.keys(unhighlighted).length).toBeGreaterThan(0);
  })
});
  // test("Creates a Highlight Ids from results for the API call for highlights",()=>{
  //   const result:SearchResultType = results[0] as SearchResultType;
  //   const res = getUnhighlightedFromResult(result,"cooper") as HighlightsPostDataType;
  //   console.log('HIGLIGHTS POST DATA',res);
  //   expect(res).toBeDefined();
  //   expect(Object.keys(res).length).toBe(4);
  // });

//   test("Gets higlights for a single result", async()=>{
//     const result:SearchResultType = results[0] as SearchResultType;
//     const unhighlighted = getUnhighlightedFromResult(result,'Copper Mine');
//     const highlights = await getHighlights(result,"Copper Mine");
// //      expect(unhighlighted).toBeDefined();
//       expect(highlights).toBeDefined();
//       expect(highlights.length).toBeGreaterThan(0);
//   })

  // test("rejects on network error", async () => {
  //   mock.onGet("http://example.com").networkError();

  //   await expect(get("http://example.com")).rejects.toThrow();
  // });


