import axios, { AxiosResponse } from "axios";
import MockAdapter from "axios-mock-adapter";
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import { HighlightsPostDataType, SearchResultType,ProcessObjectType,SearchProcessType } from '../components/interfaces/types';
import { getUnhighlightedFromResults,post } from "../components/Search/searchUtils";
const host = "https://bighorn.sbs.arizona.edu:8443/nepaBackend/"
let doc1 = {
  "id": 2707,
  "title": "Copper Flat Copper Mine",
  "documentType": "Draft",
  "commentDate": "2016-03-04",
  "registerDate": "2015-12-04",
  "agency": "Bureau of Land Management",
  "department": "",
  "cooperatingAgency": "",
  "state": "NM",
  "county": "NM: Sierra",
  "filename": "EisDocuments-183750.zip",
  "commentsFilename": "CommentLetters-183750.zip",
  "folder": "EisDocuments-183750",
  "size": 108162924,
  "link": "",
  "notes": "",
  "status": "",
  "subtype": "",
  "summaryText": "",
  "noiDate": "",
  "draftNoa": "",
  "finalNoa": "",
  "firstRodDate": "",
  "processId": 2000251,
  "action": "Mineral Resource Extraction",
  "decision": "Project"
};
const results = [
  {
    "ids": [8870],
    "doc":  {
      "id": 2707,
      "title": "Copper Flat Copper Mine",
      "documentType": "Draft",
      "commentDate": "2016-03-04",
      "registerDate": "2015-12-04",
      "agency": "Bureau of Land Management",
      "department": "",
      "cooperatingAgency": "",
      "state": "NM",
      "county": "NM: Sierra",
      "filename": "EisDocuments-183750.zip",
      "commentsFilename": "CommentLetters-183750.zip",
      "folder": "EisDocuments-183750",
      "size": 108162924,
      "link": "",
      "notes": "",
      "status": "",
      "subtype": "",
      "summaryText": "",
      "noiDate": "",
      "draftNoa": "",
      "finalNoa": "",
      "firstRodDate": "",
      "processId": 2000251,
      "action": "Mineral Resource Extraction",
      "decision": "Project"
    } as unknown,
    "highlights": [],
    "filenames": "Copper Flat Copper Mine Draft EIS Volume 1.pdf",
    "score": 7.6437206
  },
    {
      "ids": [],
      "doc": {
        "id": 6752,
        "title": "Lisbon Valley Copper Project Plan of Operations Approval for an Open Pit Copper Mine and Heach Operation in Lower Lisbon Valley San Juan and Grand Counties UT",
        "documentType": "Final",
        "commentDate": "1997-03-17",
        "registerDate": "1997-02-14",
        "agency": "Bureau of Land Management",
        "department": null,
        "cooperatingAgency": null,
        "state": "UT",
        "county": null,
        "filename": "",
        "commentsFilename": "CommentLetters-75241.zip",
        "folder": null,
        "size": null,
        "link": null,
        "notes": null,
        "status": null,
        "subtype": null,
        "summaryText": null,
        "noiDate": null,
        "draftNoa": null,
        "finalNoa": null,
        "firstRodDate": null,
        "processId": 1002481,
        "action": null,
        "decision": "Plan;Project"
      } as unknown,
      "highlights": [],
      "filenames": "",
      "score": 5.2250404
  },
  {
	"ids": [],
	"doc": {
		"id": 11017,
		"title": "Sanchez Open Pit Heap Leach Copper Mine Project Construction and Operation Permits Approval Gila Mountain Graham County AZ",
		"documentType": "Final",
		"commentDate": "1993-01-19",
		"registerDate": "1992-12-18",
		"agency": "Bureau of Land Management",
		"department": null,
		"cooperatingAgency": null,
		"state": "AZ",
		"county": null,
		"filename": "",
		"commentsFilename": "CommentLetters-75577.zip",
		"folder": null,
		"size": null,
		"link": null,
		"notes": null,
		"status": null,
		"subtype": null,
		"summaryText": null,
		"noiDate": null,
		"draftNoa": null,
		"finalNoa": null,
		"firstRodDate": null,
		"processId": 1004016,
		"action": null,
		"decision": "Project"
	} as unknown,
	"highlights": [],
	"filenames": "",
	"score": 4.9172807,
},
  {
    "ids": [],
    "doc": {
      "id": 11016,
      "title": "Sanchez Open Pit Heap Leach Copper Mine Project Construction and Operation Permits Approval Gila Mountain Graham County AZ",
      "documentType": "Draft",
      "commentDate": "1992-05-18",
      "registerDate": "1992-03-13",
      "agency": "Bureau of Land Management",
      "department": null,
      "cooperatingAgency": null,
      "state": "AZ",
      "county": null,
      "filename": "",
      "commentsFilename": "",
      "folder": null,
      "size": null,
      "link": null,
      "notes": null,
      "status": null,
      "subtype": null,
      "summaryText": null,
      "noiDate": null,
      "draftNoa": null,
      "finalNoa": null,
      "firstRodDate": null,
      "processId": 1004016,
      "action": null,
      "decision": "Project"
    } as unknown,
    "highlights": [],
    "filenames": "",
    "score": 4.9172807
  },
  {
    "ids": [],
    "doc": {
      "id": 13902,
      "title": "WITHDRAWN - Rock Creek Underground Copper/Silver Mine Project Construction and Operation COE Section 404 Permit Kootenai National Forest Sander County MT",
      "documentType": "Draft",
      "commentDate": "1995-08-18",
      "registerDate": "1995-08-11",
      "agency": "Forest Service",
      "department": null,
      "cooperatingAgency": null,
      "state": "MT",
      "county": null,
      "filename": "",
      "commentsFilename": "",
      "folder": null,
      "size": null,
      "link": null,
      "notes": null,
      "status": null,
      "subtype": null,
      "summaryText": null,
      "noiDate": null,
      "draftNoa": null,
      "finalNoa": null,
      "firstRodDate": null,
      "processId": null,
      "action": null,
      "decision": "Project"
    },
    "highlights": [],
    "filenames": "",
    "score": 4.6371946
  },
  {
    "ids": [],
    "doc": {
      "id": 2937,
      "title": "Cyprus Bagdad Copper Mine Mill Tailings and Waste Rock Storage Expansion Plan of Operation Approval NPDES and COE Section 404 Permits Issuance Yavapai County AZ",
      "documentType": "Draft",
      "commentDate": "1995-10-13",
      "registerDate": "1995-08-18",
      "agency": "Bureau of Land Management",
      "department": null,
      "cooperatingAgency": null,
      "state": "AZ",
      "county": null,
      "filename": "",
      "commentsFilename": "",
      "folder": null,
      "size": null,
      "link": null,
      "notes": null,
      "status": null,
      "subtype": null,
      "summaryText": null,
      "noiDate": null,
      "draftNoa": null,
      "finalNoa": null,
      "firstRodDate": null,
      "processId": 1001059,
      "action": null,
      "decision": "Project"
    },
    "highlights": [],
    "filenames": "",
    "score": 4.3098764
  }, {
    "ids": [],
    "doc": {
      "id": 2938,
      "title": "Cyprus Bagdad Copper Mine Mill Tailings and Waste Rock Storage Expansion Plan of Operation Approval NPDES and COE Section 404 Permits Issuance Yavapai County AZ",
      "documentType": "Final",
      "commentDate": "1996-03-01",
      "registerDate": "1996-02-02",
      "agency": "Bureau of Land Management",
      "department": null,
      "cooperatingAgency": null,
      "state": "AZ",
      "county": null,
      "filename": "",
      "commentsFilename": "CommentLetters-75590.zip",
      "folder": null,
      "size": null,
      "link": null,
      "notes": null,
      "status": null,
      "subtype": null,
      "summaryText": null,
      "noiDate": null,
      "draftNoa": null,
      "finalNoa": null,
      "firstRodDate": null,
      "processId": 1001059,
      "action": null,
      "decision": "Project"
    },
    "highlights": [],
    "filenames": "",
    "score": 4.3098764
  }, {
    "ids": [],
    "doc": {
      "id": 1995,
      "title": "Carlota Open-Pit Copper Mine Project Construction and Operation Plan of Operations and COE Section 404 Permit Tonto National Forest Gila and Pinal Counties AZ",
      "documentType": "Final",
      "commentDate": "1997-09-15",
      "registerDate": "1997-08-01",
      "agency": "Forest Service",
      "department": null,
      "cooperatingAgency": null,
      "state": "AZ",
      "county": null,
      "filename": "",
      "commentsFilename": "",
      "folder": null,
      "size": null,
      "link": null,
      "notes": null,
      "status": null,
      "subtype": null,
      "summaryText": null,
      "noiDate": null,
      "draftNoa": null,
      "finalNoa": null,
      "firstRodDate": null,
      "processId": 1000695,
      "action": null,
      "decision": "Plan"
    },
    "highlights": [],
    "filenames": "",
    "score": 4.3098764
  }, {
    "ids": [],
    "doc": {
      "id": 1994,
      "title": "Carlota Open-Pit Copper Mine Project Construction and Operation Plan of Operations and COE Section 404 Permit Tonto National Forest Gila and Pinal Counties AZ",
      "documentType": "Draft",
      "commentDate": "1995-05-18",
      "registerDate": "1995-02-03",
      "agency": "Forest Service",
      "department": null,
      "cooperatingAgency": null,
      "state": "AZ",
      "county": null,
      "filename": "",
      "commentsFilename": "",
      "folder": null,
      "size": null,
      "link": null,
      "notes": null,
      "status": null,
      "subtype": null,
      "summaryText": null,
      "noiDate": null,
      "draftNoa": null,
      "finalNoa": null,
      "firstRodDate": null,
      "processId": 1000695,
      "action": null,
      "decision": "Plan"
    },
    "highlights": [],
    "filenames": "",
    "score": 4.3098764
  }
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

  test('Creates a correct process objects',()=>{
    console.log('First result',results[0])
      const processes = groupResultsByProcessId(results);
      expect(processes).toBeDefined();
      expect(Object.keys(processes).length).toBeGreaterThan(0);
  });
});
type ProcessType = {
  results: SearchResultType[];
  processId: number;
  title: string;
  status?: string;
  startDate?: Date | string;
  endDate?: Date | string;
  score?: number;
  decision?: string;
}
  export function groupResultsByProcessId(results: SearchResultType[]): Record<number, ProcessType> {
    
    const groupedResults: ProcessType[] = [];
    
    results.forEach((result) => {
      if(result.doc && result.doc.processId){
  
      const processId = result.doc.processId;
      if (!groupedResults[processId as number]) {
          groupedResults[processId as number] = {
            processId: processId,
            results:results,
            title: result.doc.title,
            status: result.doc.status,
            startDate: result.doc.commentDate,
            endDate: result.doc.finalNoaDate || result.doc.firstRodDate || result.doc.noiDate || result.doc.registerDate || result.doc.commentDate,
            decision: result.doc.decision,
            score: result.score,
          }
      }
      else {
        groupedResults[processId].results.push(result);
      }
    }
    });
    console.log(`groupedResults:`, groupedResults);
    return groupedResults;
  }