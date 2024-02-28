import { get,getHighlightsFromResults } from "./searchUtils";
import axios from "axios";
import {describe,it,test,beforeEach,afterEach,expect} from 'vitest'
import {HighlightsPostDataType} from '../interfaces/types';
import MockAdapter from "axios-mock-adapter";
const results = [
  {
    id:1,
    ids:[8870,13174],
    doc: {
      agency: ['Advisory Council on Historic Preserve (ACHP)','Forest Service'],
      title: 'Copper Flat Copper Mine',
      cooperatingAgency: 'Agency 1',
    },
    filenames: "Copper Flat Copper Mine Draft EIS Volume 1.pdf"
  },
  {
    id:2,
    ids: [13174],
    doc: {
      agency: 'Advisory Council on Historic Preserve (ACHP)',
      title: 'Copper Mine',
      cooperatingAgency: 'Agency 2',
    },
    filenames: "Copper Flat Copper Mine Final EIS Volume 2 Appendices_Part 2.pdf"
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

  test("Creates a Highlight Ids from Results",()=>{
    const res = getHighlightsFromResults(results,"cooper") as HighlightsPostDataType;
    console.log('HIGLIGHTS POST DATA',res);
    expect(res).toBeDefined();
    expect(Object.keys(res).length).toBe(4);
  });

  test("Highlights don't error when an empty results array is recived",()=>{
    const res = getHighlightsFromResults([],"cooper") as HighlightsPostDataType;
    console.log('HIGLIGHTS POST DATA',res);
    expect(res).toBeDefined();
    expect(res.unhighlighted.length).toBe(0);
  });

  test("makes a GET request to the given URL", async () => {
    const data = [{ id: 1 }, { id: 2 }];

    mock.onGet("http://example.com").reply(200, data);

    const result = await get("http://example.com");

    expect(result).toEqual(data);
    expect(mock.history.get.length).toBe(1);
    expect(mock.history.get[0].url).toBe("http://example.com");
  });

  test("rejects on network error", async () => {
    mock.onGet("http://example.com").networkError();

    await expect(get("http://example.com")).rejects.toThrow();
  });
});
