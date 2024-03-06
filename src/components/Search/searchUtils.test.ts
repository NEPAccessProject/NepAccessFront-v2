import { get,getUnhighlightedFromResult } from "./searchUtils";
import axios, { AxiosResponse } from "axios";
import {describe,it,test,beforeEach,afterEach,expect} from 'vitest'
import {HighlightsPostDataType,SearchResultType} from '../interfaces/types';
import MockAdapter from "axios-mock-adapter";
const results = [
  {
    id:1,
    ids:[8870,13174],
    doc: {
      id:8870,
      agency: 'Advisory Council on Historic Preserve (ACHP)',
      title: 'Copper Flat Copper Mine',
      cooperatingAgency: 'Agency 1',
      processId:1,
    },
    
    filenames: ["Copper Flat Copper Mine Draft EIS Volume 1.pdf"],
    highlights: [],
  },
  {
    id:2,
    ids: [13174],
    doc: {
      id:13174,
      agency: 'Advisory Council on Historic Preserve (ACHP)',
      title: 'Copper Mine',
      cooperatingAgency: 'Agency 2',
      processId: 2,
    },
    filenames: ["Copper Flat Copper Mine Final EIS Volume 2 Appendices_Part 2.pdf"],
    highlights: [],
  },

];

describe("get", () => {
  let mock;

  beforeEach(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
  });

  test("Creates a Highlight Ids from results for the API call for highlights",()=>{
    const result:SearchResultType = results[0] as SearchResultType;
    const res = getUnhighlightedFromResult(result,"cooper") as HighlightsPostDataType;
    console.log('HIGLIGHTS POST DATA',res);
    expect(res).toBeDefined();
    expect(Object.keys(res).length).toBe(4);
  });

  test("Highlights don't error when an empty results array is recived",async()=>{
    const result:SearchResultType = results[0] as SearchResultType;
    const unhighlighted = getUnhighlightedFromResult(result,"cooper") as HighlightsPostDataType;
    console.log('UNHIGHLIGHT POST DATA',unhighlighted);
    expect(unhighlighted).toBeDefined();
    expect(unhighlighted.unhighlighted.length).toBeGreaterThan(0);
    const response:AxiosResponse = await axios.post("http://localhost:8080/api/search/highlights",unhighlighted);
    const highlights:HighlightsPostDataType = response.data as HighlightsPostDataType;
    result.highlights = highlights.unhighlighted;
    console.log(`test ~ result:`, result);
    expect(result.highlights).toBeDefined();
    expect(result.highlights.length).toBeGreaterThan(0);
  });

  test("makes a GET request to the given URL", async () => {
    const data = [{ id: 1 }, { id: 2 }];

    mock.onGet("http://example.com").reply(200, data);

    const result = await get("http://example.com");

    expect(result).toEqual(data);
    expect(mock.history.get.length).toBe(1);
    expect(mock.history.get[0].url).toBe("http://example.com");
  });

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

