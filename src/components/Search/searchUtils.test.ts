import { get,getUnhighlightedFromResult,groupResultsByProcessId } from "./searchUtils";
import axios, { AxiosResponse } from "axios";
import {describe,it,test,beforeEach,afterEach,expect} from 'vitest'
import {HighlightsPostDataType,SearchResultType,} from '../interfaces/types';
import MockAdapter from "axios-mock-adapter";

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
    filenames:["Copper Flat Copper Mine Draft EIS Volume 1.pdf", "Copper Flat Copper Mine Draft EIS Volume 2.pdf"],
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
  test('Groups results by process id', async () => {
    const resultsByProcessId:ProcessType = await groupResultsByProcessId(results);
    const keys = Object.keys(resultsByProcessId);
    keys.map(key => {
      console.log('resultsByProcessId[key]',resultsByProcessId[key]);
      expect(resultsByProcessId[key].length).toBeGreaterThan(0);
    })
    // expect(resultsByProcessId.length).toBe(results.length);
    // expect(resultsByProcessId[0].length).toBe(1);
    // expect(resultsByProcessId[1].length).toBe(1);
    //expect(resultsByProcessId[0][0].id).toBe(8870);
    //expect(resultsByProcessId[1][0].id).toBe(13174);
  })

  test('Gets Highlights for multiple results', async () => {
    const unhighlighted = getUnhighlightedFromResult(results[0],"Copper Mine") as HighlightsPostDataType;
    console.log('HIGLIGHTS POST DATA',unhighlighted);
    expect(unhighlighted).toBeDefined();
    expect(Object.keys(unhighlighted).length).toBeGreaterThan(0);
  })

  test("Creates a Highlight Ids from results for the API call for highlights",()=>{
    const result:SearchResultType = results[0] as SearchResultType;
    const res = getUnhighlightedFromResult(result,"cooper") as HighlightsPostDataType;
    console.log('HIGLIGHTS POST DATA',res);
    expect(res).toBeDefined();
    expect(Object.keys(res).length).toBe(4);
  });

  // test("makes a GET request to the given URL", async () => {
  //   const data = [{ id: 1 }, { id: 2 }];

  //   mock.onGet("http://example.com").reply(200, data);

  //   const result = await get("http://example.com");

  //   expect(result).toEqual(data);
  //   expect(mock.history.get.length).toBe(1);
  //   expect(mock.history.get[0].url).toBe("http://example.com");
  // });

  test("Gets higlights for a single result", async()=>{
    const result:SearchResultType = results[0] as SearchResultType;
    const unhighlighted = getUnhighlightedFromResult(result,'Copper Mine');
    const response = axios.post(
      'https://bighorn.sbs.arizon.edu:8443/nepaBackend/text/get_highlightsFVH',
      unhighlighted)
      .then(response => response.data)
      .then(data => {
        console.log(data)
      const highlights:string[] = data;
      result[0].highlights = highlights;
    })
      .catch(error => {
        console.error(error);
        expect(false).toBe(true);
      })
      
  })
});

async function getResultHighlights(result:SearchResultType,title:string): Promise<SearchResultType> 
{
  const postData = getUnhighlightedFromResult(result,title);
  const resp:AxiosResponse = await axios.post('https://bighorn.sbs.arizon.edu:8443/nepaBackend/text/get_highlightsFVH', postData);
  console.log(`getResultHighlights ~ resp:`, resp);
  const highlights:any[] = resp.data;
  console.log(`getHighlightsFromResults ~ resp.data:`, highlights);
  result.highlights = highlights;
  console.log(`getResultHighlights ~ result:`, result);
  return result
  
}

  // test("rejects on network error", async () => {
  //   mock.onGet("http://example.com").networkError();

  //   await expect(get("http://example.com")).rejects.toThrow();
  // });

