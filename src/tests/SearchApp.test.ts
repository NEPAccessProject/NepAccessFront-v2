
import { FilterType,DocumentType, SearchResultType } from "../components/interfaces/types";
import {it,describe,expect,test} from 'vitest'
import { resourceLimits } from "worker_threads";
import {post,get} from '../components/Search/searchUtils';
import axios from "axios";
	const filters = {
		title: 'Copper Mine',
		agency: 
		'Advisory Council on Historic Preserve (ACHP)',
	}
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
		
		describe('Results Filtering Test',async()=>{
			
			test.only('Should get text highlights', async()=>{
				const postData = {"unhighlighted":[{"luceneIds":[8870],"filename":"Copper Flat Copper Mine Draft EIS Volume 1.pdf"},{"luceneIds":[13174],"filename":"Copper Flat Copper Mine Final EIS Volume 2 Appendices_Part 2.pdf"},{"luceneIds":[22352],"filename":"rosemont-feis-vol-4.pdf"},{"luceneIds":[22837],"filename":"deis-complete-appendix.pdf"},{"luceneIds":[17585],"filename":"Volume_1-DraftEIS_Resolution.pdf"}],"terms":"copper","markup":true,"fragmentSizeValue":2}

				const res = await post('https://bighorn.sbs.arizon.edu:8443/nepaBackend/text/get_highlightsFVH', postData);
			  console.log('GETTING HIGHLIGHTS???',res);
//			  console.log('HIGHLIGHTS???',res);
			  expect(res).toBeDefined();

			})
			test('Should Not Return filtered out results',async()=>{
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
				const res = await post('http://localhost:8080/text/search_no_context',postData);
				const results = await res as SearchResultType[]; //??
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
			test('Should Only Retrive Filtered Results matching a filter',async()=>{
			console.log('Starting Test')
			const postData = {
				title: 'Copper Mine',
				agency: ['Forest Service'],
				state: ['AZ'],
				documentType: ['final'],
			}; //??
			const res = await post('http://localhost:8080/text/search_no_context',postData);
			const results = await res as SearchResultType[]; //??
			console.log('Valid Filters -  # of results: ', results.length);
			
			//[TODO] Need to inspect the filtering logic in the backend - seems to be acting like as an OR vs AND
			expect(results.length).toBeGreaterThan(0);
		})

		test('Should Return exact matches - on a single filter',async()=>{
			const postData = {
				documentType: ['final'],
			};
			const res = await post('http://localhost:8080/text/search_no_context',postData);
			const results = await res as SearchResultType[]; //??
			results.forEach(result => {
				expect(result.doc.documentType?.toLowerCase()).toBe('final');
			});
			console.log('Should have no results - actual count: ', results.length);
			expect(results.length).toBe(0);
		},{timeout: 100000,retry: 2})

		test('Should Return No Results for Unmatched Filter',async()=>{
			//Since a filter only has one value, it should only return results that are matches
			const postData = {
				title: 'XXXXXXXXXXXXXXXXYyYYYYYYY',
			};
			const res = await post('http://localhost:8080/text/search_no_context',postData);
			const results = await res as SearchResultType[]; //??
			console.log('Should have no results - actual count: ', results.length);
			expect(results.length).toBe(0);
		},{timeout: 100000,retry: 2})

		test('Should Return Exact Matches for a Single Filter',async()=>{
			const postData = {
				title: 'copper',
			};
			const res = await post('http://localhost:8080/text/search_no_context',postData);
			const results = await res as SearchResultType[]; //??
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


