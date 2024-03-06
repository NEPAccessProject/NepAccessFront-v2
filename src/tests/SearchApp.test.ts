
import { FilterType,DocumentType, SearchResultType } from "../components/interfaces/types";
import {it,describe,expect,test} from 'vitest'
import { resourceLimits } from "worker_threads";
import {post,get, getResultHighlights,getUnhighlightedFromResult,getUnhighlightedFromResults} from '../components/Search/searchUtils';
import axios, { AxiosResponse,AxiosError } from "axios";
	const filters = {
		title: 'Copper Mine',
		agency: 
		'Advisory Council on Historic Preserve (ACHP)',
	}
	
	const doc:DocumentType = {
		processId:2,
		id:30,
		agency: 'Advisory Council on Historic Preserve (ACHP)',
		title: 'Copper Mine',
		cooperatingAgency: 'Agency 2',
	}
	
	const results=[
		{
			ids: [8870],
				doc: {
					id:8870,
					processId:1,
					agency: 'Advisory Council on Historic Preserve (ACHP)',
					title: 'Copper Mine',
					cooperatingAgency: 'Agency 2',
				} as DocumentType,
				filenames: ["Copper Flat Copper Mine Draft EIS Volume 1.pdf"],
				highlights: [],
				score:1.0,
		} as SearchResultType,
		{
			ids: [13174],
			doc: {
				id:13174,
				processId:1,
				agency: 'Advisory Council on Historic Preserve (ACHP)',
				title: 'Copper Mine',
				cooperatingAgency: 'Agency 2',
			} as DocumentType,
			highlights: [],
			filenames: ["Copper Flat Copper Mine Final EIS Volume 2 Appendices_Part 2.pdf"],
			score:2.0
		} as SearchResultType,
		{
            ids: [8870],
            doc: {
				id:8870,
				processId:2,
                agency: 'Advisory Council on Historic Preserve (ACHP)',
                title: 'Copper Mine',
                cooperatingAgency: 'Agency 2',
            } as DocumentType,
            filenames: ["Copper Flat Copper Mine Draft EIS Volume 1.pdf"],
			highlights: [],
			score:1.0,
		} as SearchResultType,

	];

	const HighlightsPostDataType = {
		unhighlighted: [],
		terms: 'Copper Mine',
		markup: true,
		fragmentSizeValue: 1000000,
	}
	describe('Search results highlighting tests',()=>{

		test("Retrives unhighlighted for a single result", async()=>{
			const doc:DocumentType = {
				processId:2,
				id:30,
				agency: 'Advisory Council on Historic Preserve (ACHP)',
				title: 'Copper Mine',
				cooperatingAgency: 'Agency 2',
			}
			const result:SearchResultType = {
				ids: [8870],
				doc: doc,
				filenames: ["Copper Flat Copper Mine Draft EIS Volume 1.pdf"],
				highlights: [],
				score:1.0,
			}
			console.log(`test ~ result:`, result);
			const unhighlighted = getUnhighlightedFromResult(result,result.doc.title);
			console.log(`test.only ~ unhighlighted:`, unhighlighted);
			expect(unhighlighted).toBeDefined();
		})

		test("Retrives highlights for a single result", async()=>{
			try{	
			const result:SearchResultType = results[2] as SearchResultType;
			const unhighlighted = getUnhighlightedFromResult(result,result.doc.title);
			console.log(`test.only ~ unhighlighted:`, unhighlighted);
			const body = {"unhighlighted":[{"luceneIds":[8870],"filename":"Copper Flat Copper Mine Draft EIS Volume 1.pdf"},{"luceneIds":[13174],"filename":"Copper Flat Copper Mine Final EIS Volume 2 Appendices_Part 2.pdf"},{"luceneIds":[22352],"filename":"rosemont-feis-vol-4.pdf"},{"luceneIds":[22837],"filename":"deis-complete-appendix.pdf"},{"luceneIds":[17585],"filename":"Volume_1-DraftEIS_Resolution.pdf"}],"terms":"copper","markup":true,"fragmentSizeValue":2}

			const response:AxiosResponse = await axios.post('https://bighorn.sbs.arizona.edu:8443/nepaBackend/text/get_highlightsFVH',body,{
				headers: {
                    'Content-Type': 'application/json'
                }
			});
			
			expect(response.status).toBe(200);
			expect(response.data).toBeDefined();

			const highlights:string[] = response.data;
            console.log('test.only ~ highlights: ', highlights);

 			expect(highlights).toBeDefined();
			expect(highlights.length).toBeGreaterThan(0);

			highlights.map((highlight:string, index:number) => {
				result.highlights.push(...highlight);
			});
			console.log('RESULT HIGHLIGHTS: ', result.highlights);
			
			
			expect(result.highlights).toBeDefined();
			expect(result.highlights.length).toBeGreaterThan(0);
		}
		catch(error){
			const ex = error as AxiosError
			console.error(ex.message);
			expect(false).toBe(true);
		}
		})
		test("Gets highlights for multiple results", async()=>{
			//const data = results as SearchResultType[];
				const results: SearchResultType[] =[{
					ids: [8870],
					doc: {
						id:8870,
						processId:1,
						agency: 'Advisory Council on Historic Preserve (ACHP)',
						title: 'Copper Mine',
						cooperatingAgency: 'Agency 2',
					} as DocumentType,
					filenames: ["Copper Flat Copper Mine Draft EIS Volume 1.pdf"],
					highlights: [],
					score:1.0,
				},
				{
					ids: [8870],
					doc: {
						id:8870,
						processId:1,
						agency: 'Advisory Council on Historic Preserve (ACHP)',
						title: 'Copper Mine',
						cooperatingAgency: 'Agency 2',
					} as DocumentType,
					filenames: ["Copper Flat Copper Mine Draft EIS Volume 1.pdf"],
					highlights: [],
					score:1.0,
				}];
			try {
				//[TODO] Create functions getUnhighlightedFromResults(results,searchTerm)
				const unhighlighted = getUnhighlightedFromResults(results,'Copper Mine');
				expect(unhighlighted).toBeDefined();
				const response:AxiosResponse = await axios.post('https://bighorn.sbs.arizona.edu:8443/nepaBackend/text/get_highlightsFVH',unhighlighted);
				expect(response.data).toBeDefined();
				const highlights:string[] = response.data;
				expect(highlights).toBeDefined();
				expect(highlights.length).toBeGreaterThan(0);
				// result.highlights = highlights;
				// expect(result.highlights).toBeDefined();
				// expect(result.highlights.length).toBeGreaterThan(0);
			}
		catch(error){
			const ex = error as AxiosError
			console.error(ex.message);
			expect(false).toBe(true);
		}
	})
		
		describe.skip('Results Filtering Test',async()=>{
			
			test('Should get text highlights', async()=>{
				const postBody = {"unhighlighted":[{"luceneIds":[8870],"filename":"Copper Flat Copper Mine Draft EIS Volume 1.pdf"},{"luceneIds":[13174],"filename":"Copper Flat Copper Mine Final EIS Volume 2 Appendices_Part 2.pdf"},{"luceneIds":[22352],"filename":"rosemont-feis-vol-4.pdf"},{"luceneIds":[22837],"filename":"deis-complete-appendix.pdf"},{"luceneIds":[17585],"filename":"Volume_1-DraftEIS_Resolution.pdf"}],"terms":"copper","markup":true,"fragmentSizeValue":2}

				const res:AxiosResponse = await axios.post('https://bighorn.sbs.arizona.edu:8443/nepaBackend/text/get_highlightsFVH',postBody);
			  console.log('GETTING HIGHLIGHTS???',res);
//			  console.log('HIGHLIGHTS???',res);
			  expect(res).toBeDefined();

			})
			test.skip('Should Not Return filtered out results',async()=>{
				const agency = ["Bureau of Land Management"];
				const documentType = ["Final"];
				const isFast41 = 1;
				const startPublish= new Date("2023-01-01");


				const postData = {   
					agency,
					documentType,
					isFast41,
					startPublish
				}
				const res:AxiosResponse = await axios.post('http://localhost:8080/text/search_no_context',postData);
				expect(res.status).toBe(200);
				const results = res.data;
				
				expect(results.length).toBeGreaterThan(0);
				results.map(result => {	
					console.log('Result: ', result);
					const doc:DocumentType = result.doc;
					
					console.log('AGENCY: ', doc.agency);
					expect(doc.agency?.includes('Bureau of Land Management')).toBe(true);
					expect(doc.isFast41).toBe(true);
					const registerDate = doc.registerDate;
					const dt = new Date(registerDate as Date);
					expect(dt.getFullYear()).toBe(2023);
	
				})
			})
			test.skip('Should Only Retrive Filtered Results matching a filter',async()=>{
			console.log('Starting Test')
			const postData = {
				title: 'Copper Mine',
				agency: ['Forest Service'],
				state: ['AZ'],
				documentType: ['final'],
			}; //??
			const res:AxiosResponse = await axios.post('http://localhost:8080/text/search_no_context',postData);
			const results = res.data as SearchResultType[];
			console.log('Valid Filters -  # of results: ', results.length);
			
			//[TODO] Need to inspect the filtering logic in the backend - seems to be acting like as an OR vs AND
			expect(results.length).toBeGreaterThan(0);
		})

		test.skip('Should Return exact matches - on a single filter',async()=>{
			const postData = {
				documentType: ['final'],
			};
			const res:AxiosResponse = await axios.post('http://localhost:8080/text/search_no_context',postData);
			const results:SearchResultType[] = res.data
			results.forEach(result => {
				expect(result.doc.documentType?.toLowerCase()).toBe('final');
			});
			console.log('Should have no results - actual count: ', results.length);
			expect(results.length).toBe(0);
		},{timeout: 100000,retry: 2})

		test.skip('Should Return No Results for Unmatched Filter',async()=>{
			//Since a filter only has one value, it should only return results that are matches
			const postData = {
				title: 'XXXXXXXXXXXXXXXXYyYYYYYYY',
			};
			const res:AxiosResponse = await axios.post('http://localhost:8080/text/search_no_context',postData);
			const results = res.data as SearchResultType[]; //??
			console.log('Should have no results - actual count: ', results.length);
			expect(results.length).toBe(0);
		},{timeout: 100000,retry: 2})

		test.skip('Should Return Exact Matches for a Single Filter',async()=>{
			const postData = {
				title: 'copper',
			};
			const res = await axios.post('http://localhost:8080/text/search_no_context',postData);
			const results =  res.data as SearchResultType[]; //??
			console.log('Should have no results - actual count: ', results.length);
			expect(results.length).toBeGreaterThan(0);
			results.map(result => {
				expect(result.doc.title?.toLowerCase().includes(postData.title)).toBe(true);
			})
		})
	},{
		timeout: 100000,
		retry: 2
	})
	})