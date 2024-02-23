import { result } from "lodash";
import { FilterType, SearchResultType } from "../components/interfaces/types";
import {it,describe,expect,test} from 'vitest'
import { resourceLimits } from "worker_threads";
import axios from "axios";
	const filters = {
		title: 'Copper Mine',
		agency: 
		'Advisory Council on Historic Preserve (ACHP)',
	}
	const results = [
		{
			id:1,
			doc: {
				agency: ['Advisory Council on Historic Preserve (ACHP)','Forest Service'],
				title: 'Copper Flat Copper Mine',
				cooperatingAgency: 'Agency 1',
			}
		},
		{
			id:2,
			doc: {
				agency: 'Advisory Council on Historic Preserve (ACHP)',
				title: 'Copper Mine',
				cooperatingAgency: 'Agency 2',
			}
		}
	];
	

		it('Should pass',()=>{
			expect(true).toBe(true)
		})
		describe.sequential('Results Filtering Test',async()=>{

			test.sequential('Should Only Retrive Filtered Results matching a filter',async()=>{
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

		test.sequential('Should Return exact matches - on a single filter',async()=>{
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

		test.sequential('Should Return No Results for Unmatched Filter',async()=>{
			//Since a filter only has one value, it should only return results that are matches
			const postData = {
				title: 'XXXXXXXXXXXXXXXXYyYYYYYYY',
			};
			const res = await post('http://localhost:8080/text/search_no_context',postData);
			const results = await res as SearchResultType[]; //??
			console.log('Should have no results - actual count: ', results.length);
			expect(results.length).toBe(0);
		},{timeout: 100000,retry: 2})

		it('Should Return Exact Matches for a Single Filter',async()=>{
			const postData = {
				title: 'copper',
			};
			const res = await post('http://localhost:8080/text/search_no_context',postData);
			const results = await res as SearchResultType[]; //??
			console.log('Should have no results - actual count: ', results.length);
			expect(results.length).toBeGreaterThan(0);
			results.map(result => {
				expect(result.doc.title?.toLowerCase().includes('copper')).toBe(true);
			})
		})
	},{
		timeout: 100000,
		retry: 2
	})

	async function searchNoTop() { //??
		const postData = {
			title: 'Copper Mine',
			agency: ['Forest Service'],
			state: ['AZ'],
			documentType: ['final'],
		};
		const res = await post('http://localhost:8080/text/search_top',postData);
		const results = res as SearchResultType[]; //??
		console.log('Search No Top - # of results: ', results.length);
		return results;
	}
	 async function post(url,postData) { //??
		console.log(' POSTING to URL: ',url,' DATA: ', postData);
		return new Promise(async (resolve, reject) => {
			try {
			const response = await axios.post(
				//"/api/text/search_no_context",
				url,
				JSON.stringify(postData),
				{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
					"Access-Control-Allow-Origin": "*", // Required for CORS support to work
				},
				}
			);

			const data = response.data || [];
			console.log(`SEARCH NO CONTEXT GOT ${data.length} Results`,'Filter: ,', postData);

			resolve(data);
			} catch (error) {
			console.error(`Error in searchNoTop: `,error);
			reject(error);
			}
  });
}



const matchesArray = (field, val) => {
    console.log(`MATCHES ARRAY with FIELD: `,field, ' VALUE: ', val);
	if(!val) return null;
    return function (a) {
        let returnValue = false;
        val && val.length &&val.forEach(item =>{
            if (a[field] === item) {
                returnValue = true;
            }
        });
        return returnValue;
    };
}
const arrayMatchesArray = (field, val) => {
    return function (a) {
        // console.log(a);
        let returnValue = false;
        val.forEach(item =>{
            if(a[field]){
                let _vals = a[field].split(/[;,]+/); // e.g. AK;AL or AK,AL
                for(let i = 0; i < _vals.length; i++) {
                    if (_vals[i].trim() === item.trim()) {
                        returnValue = true; // if we hit ANY of them, then true
                        i = _vals.length; // done
                    }
                }
            }
        });
        return returnValue;
    };
}


const filterByAgency = (result, filter)=>{
	const agency = result.doc.agency;
	if(typeof agency ==='string' && agency.includes(';') ){
		const agencies = agency.split(";");
		const filterAgency = filter.agency;
		console.log(`filterByAgency ~ filterAgency:`, filterAgency);
		console.log(`filterByAgency ~ agencies:`, agencies);
		
		agencies.forEach(agency => {
			console.log('Agency: ', agency);
		})
		//Multiple values break apart array vals on 
	}
	else if(typeof agency ==='string'){
        //Multiple values break apart array vals on 
    }

}
const doFilter = (searcherState, searchResults, preFilterCount, legacyStyle) => {

    let filtered = {isFiltered: false, textToUse: "", filteredResults: []};
    
    let isFiltered = false;

    // Deep clone results
    let filteredResults = JSON.parse(JSON.stringify(searchResults));
    
    if(searcherState.agency && searcherState.agency.length > 0){
        isFiltered = true;
        filteredResults = filteredResults.filter(matchesArray("agency", searcherState.agency));
    }
    if(searcherState.cooperatingAgency && searcherState.cooperatingAgency.length > 0){
        isFiltered = true;
            filteredResults = filteredResults.filter(arrayMatchesArrayNotSpaced("cooperatingAgency", searcherState.cooperatingAgency));
    }
    if(searcherState.state && searcherState.state.length > 0){
        isFiltered = true;
        filteredResults = filteredResults.filter(arrayMatchesArray("state", searcherState.state));
    }
    if(searcherState.county && searcherState.county.length > 0){
        isFiltered = true;
        filteredResults = filteredResults.filter(arrayMatchesArray("county", searcherState.county));
    }
    if(searcherState.decision && searcherState.decision.length > 0){
        isFiltered = true;
        filteredResults = filteredResults.filter(arrayMatchesArray("decision", searcherState.decision));
    }
    if(searcherState.action && searcherState.action.length > 0){
        isFiltered = true;
        filteredResults = filteredResults.filter(arrayMatchesArray("action", searcherState.action));
    }
    if(searcherState.startPublish){
        isFiltered = true;
        let formattedDate = formatDate(searcherState.startPublish);
            filteredResults = filteredResults.filter(matchesStartDate(formattedDate));
    }
    if(searcherState.endPublish){
        isFiltered = true;
        let formattedDate = formatDate(searcherState.endPublish);
            filteredResults = filteredResults.filter(matchesEndDate(formattedDate));
    }
    if(searcherState.typeFinal || searcherState.typeDraft || searcherState.typeEA 
        || searcherState.typeNOI || searcherState.typeROD || searcherState.typeScoping){
        isFiltered = true;
            filteredResults = filteredResults.filter(matchesType(
                searcherState.typeFinal, 
                searcherState.typeDraft,
                searcherState.typeEA,
                searcherState.typeNOI,
                searcherState.typeROD,
                searcherState.typeScoping));
    }
    if(searcherState.needsDocument) {
        isFiltered = true;
            filteredResults = filteredResults.filter(hasDocument)
    }
    
    let textToUse = filteredResults.length + " Results"; // unfiltered: "Results"
    if(filteredResults.length === 1) {
        textToUse = filteredResults.length + " Result";
    }
    if(isFiltered) { // filtered: "Matches"
        textToUse = filteredResults.length + " Matches (narrowed down from " + preFilterCount + " Results)";
        if(filteredResults.length === 1) {
            textToUse = filteredResults.length + " Match (narrowed down from " + preFilterCount + " Results)";
            if(preFilterCount === 1) {
                textToUse = filteredResults.length + " Match (narrowed down from " + preFilterCount + " Result)";
            }
        }
    }

    filtered.textToUse = textToUse;
    filtered.filteredResults = filteredResults;
    filtered.isFiltered = isFiltered;

    return filtered;
}
const formatDate = (date) => {
	var d = new Date(date),
		month = '' + (d.getMonth() + 1),
		day = '' + d.getDate(),
		year = d.getFullYear();

	if (month.length < 2) 
		month = '0' + month;
	if (day.length < 2) 
		day = '0' + day;

	return [year, month, day].join('-');
}
const matchesType = (matchFinal, matchDraft, matchEA, matchNOI, matchROD, matchScoping) => {
	console.log(`matchesType ~ matchFinal, matchDraft, matchEA, matchNOI, matchROD, matchScoping:`, matchFinal, matchDraft, matchEA, matchNOI, matchROD, matchScoping);
	return function (a) {
		// Keep list of indeces to splice afterward, to exclude them from filtered results.
		let recordsToSplice = [];
		let filterResult = false;
		for(let i = 0; i < a.records.length; i++) {
			let standingResult = false;
			const type = a.records[i].documentType.toLowerCase();
			// if(matchFinal && isFinalType(type)) {
			// 	filterResult = true;
			// 	standingResult = true;
			// }
			// if(matchDraft && isDraftType(type)) {
			// 	filterResult = true;
			// 	standingResult = true;
			// }
			if( ( (type === "ea") && matchEA ) || 
				( (type === "noi") && matchNOI ) || 
				( (type === "rod" || type === "final and rod") && matchROD ) || 
				( (type === "scoping report") && matchScoping ))
			{
				filterResult = true;
				standingResult = true;
			}

			// No match for records[i]; mark it for deletion after loop is done
			// (splicing now would rearrange the array and break this loop logic)
			if(!standingResult) {
				recordsToSplice.push(i);
			}
		}

		// Remove marked records from filtered results
		for(let i = recordsToSplice.length - 1; i >= 0; i--) {
			if (recordsToSplice[i] > -1) {
				a.records.splice(recordsToSplice[i], 1);
			}
		}

		return filterResult;
	};
}
const matchesStartDate = (val) => {
	return function (a) {
		let returnValue = false;

		a.records.some(item => {
			// console.log(item.registerDate, val, item["registerDate"] >= val);
			if(item["registerDate"] >= val) {
				returnValue = true;
				return true;
			}
			return false;
		});
		
		return returnValue;
	};
}
const hasDocument = (item) => {
	let hasDocument = false;
	item.records.some(function(el) {
		if(el.size && el.size > 200) {
			hasDocument = true;
			return true;
		}
		return false;
	})
	return hasDocument;
}
const matchesEndDate = (val) => {
	return function (a) {
		let returnValue = false;

		a.records.some(item => {
			// console.log(item.registerDate, val, item["registerDate"] <= val);
			if(item["registerDate"] <= val) {
				returnValue = true;
				return true;
			}
			return false;
		});
		
		return returnValue;
	};
}
const arrayMatchesArrayNotSpaced = (field, val) => {
	if(!field || !val){
		console.warn('Array Match Called with a missing FIELD: ', field,' OR VALUE: ' ,val);
		return null;
	}
	return function (a) {
		console.log('A:', a,
		' VAL: ',val);
		let returnValue = false;

		if(typeof val === 'object'){
			val && val.length && val.forEach(item =>{
				for(let i = 0; i < a.records.length; i++) {
					if(a.records[i][field]){
						let _vals = a.records[i][field].split(/[;,]+/); // AK;AL or AK, AL
						for(let j = 0; j < _vals.length; j++) {
							if (_vals[j].trim() === item.trim()) {
								returnValue = true; // if we hit ANY of them, then true
							}
						}
					}
				}
			});
		}else{
			console.warn('Array CALLED ON STRING FIELD: ', field,' OR VALUE: ' ,val);
			return null;
		}
		return returnValue;
	};
}

/*Currently the DB is not normalized (WTF??) - So multiple values are seperated by ';', making the possible
 	values to be either null, blank string, string, or array of strings. This function will convert all of them to an array of strings 
 */
const docFieldsToArray = (field) => {
	return function (a) {

		console.log(`a:`, a, ' FIELD ', field);
		let returnValue = [];
		if(typeof a === "string"){
				return [a];
		}
		else if(a && a.records){
		a.records.forEach(item => {
				returnValue.push(a);
			});
	
		}
		return returnValue;
	};
}
