import {FilterType,DocumentType,SearchResultType} from './src/components/interfaces/types'
//import {describe,it,assert,expect} from 'vitest'
//import data from './src/tests/data/search_no_context.ts'

//Reduce results for now
//const results = data;
//const results = data.splice(10,25);

import * as _ from 'underscore'

const results = [
	{
		"ids": [18819],
		"doc": {
			"id": 6393,
			"title": "Kodiak Airport Runway Safety Area Improvements Kodiak AK",
			"documentType": "Draft",
			"commentDate": "2012-12-18",
			"registerDate": "2012-10-19",
			"agency": "Federal Aviation Administration",
			"department": null,
			"cooperatingAgency": null,
			"state": "AK",
			"county": null,
			"filename": "EisDocuments-77716.zip",
			"commentsFilename": "CommentLetters-77716.zip",
			"folder": "EisDocuments-77716",
			"size": 197866696,
			"link": null,
			"notes": null,
			"status": null,
			"subtype": null,
			"summaryText": null,
			"noiDate": null,
			"draftNoa": null,
			"finalNoa": null,
			"firstRodDate": null,
			"isFast41": false,
			"processId": 1002351,
			"action": "Transportation",
			"decision": "Project"
		},
		"highlights": [],
		"filenames": "Appendix 9 - Construction.pdf",
	},
	{
		"ids": [],
		"doc": {
			"id": 6751,
			"title": "Lisbon Valley Copper Project Plan of Operations Approval for an Open Pit Copper Mine and Heach Operation in Lower Lisbon Valley San Juan and Grand Counties UT",
			"documentType": "Draft",
			"commentDate": "1996-07-15",
			"registerDate": "1996-05-31",
			"agency": "Bureau of Land Management",
			"department": null,
			"cooperatingAgency": null,
			"state": "UT",
			"county": null,
			"filename": "",
			"commentsFilename": "CommentLetters-75390.zip",
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
		},
		"highlights": [],
		"filenames": "",
		"score": 5.2250404
	}, {
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
		},
		"highlights": [],
		"filenames": "",
		"score": 5.2250404
}];

const filters: FilterType = {
    agency: ["BS Filter"],
    action: [],
    cooperatingAgency: [],
    county: [],
    distance: '',
    decision: [],
    endComment: '',
    endPublish: '',
    filtersHidden: false,
    isFast41: false,
    needsComments: false,
    needsDocument: false,
    proximityDisabled: false,
    proximityOption: '',
    commentDate: '',
    startPublish: '',
    states: [ { value: 'AK', label: 'Alaska' },{ value: 'AL', label: 'Alabama' }],
    status: [],
    title: 'Title Here',
    documentType: [],
    typeAll: false,
    typeDraft: false,
    typeEA: false,
    typeFinal: false,
    typeNOI: false,
    typeOther: false,
    typeROD: false,
    typeScoping: false
}

const activeFilters = {
	agency: ['Federal Aviation Administration','Federal Forest Service']
 }
const filteredResults = [];

const hasFilterMatch = (doc:any,filter:FilterType):boolean => {
	let hasMatch = false;
//	console.log(`hasFilterMatch ~ doc:`, doc);
	const keys = Object.keys(filter)
	 
//	 console.log(`hasFilterMatch ~ keys:`, keys);
	 
		keys.map((key, idx) => {
			const val = doc[key];
			if(!key || !doc[key]){
//				console.log('NO DOC KEY',key);
				return false;
			} 
			if(typeof val === 'string' && val.includes(filter[key])){ 
				const strVal: string = doc[key];
//				console.log('STRING KEY',key,doc[key])
				if(strVal.includes(filter[key])){
//					console.log('MATCH ON KEY ', key ,' CONTAINS',strVal);
					hasMatch = true;
				}
			}
			// else if(results[key] && results[key].contains(filter[key])) {
			// 	console.log('MATCH ON CONTAINS',key)
			// 	hasMatch = true;
			// }
		})
	if(hasMatch){
		console.log('Found Match for Document: ',doc)
	}
	return hasMatch;
}

const docFieldsToArray = (field) => {
	return function (a) {
		console.log(`a:`, a);
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

const isFilteredMatch = (result,filter) => {
	console.log(`isFilteredMatch ~ filter:`, filter);
	console.log(`isFilteredMatch ~ result:`, result);
	Object.keys(result.doc).map((key, idx) => {
		const val = result.doc[key];
		if(typeof val ==='string') {
			console.log('VAL',val.includes(filter[key]));
			return val.includes(filter[key]);
		}

	})
}
const transformFieldToArray = (field) => {
	if(typeof field === "string" && field.includes(";")){
		return field.split(';')
	}
	else if(typeof field !== "string"){
		return [field]
	}
	else if(Array.isArray(field)){
		return field
	}

};

results.map(result => {
	
	Object.keys(result.doc).map(key => {		
		result[key]= transformFieldToArray(result.doc[key])
	})

})
console.log(`results:`, results);


let fieldArr = transformFieldToArray(filters.agency);
console.log(`fieldArr:`, fieldArr);

const filterResult = (result, activeFilters) => {
	//This function takes a single result of type SearchResult and exeminess all	  
  }
//   const filterResults = (results, activeFilters): SearchResultType[] => {
//     console.log(`filterResults ~ results:`, results);
//     const res= results.filter(result => {
//         for (let key in activeFilters) {
// 			console.log(`Active Filters: ${key} ${activeFilters[key]}`);
//             if (Array.isArray(activeFilters[key])) {
//                 if (!activeFilters[key].some(filter => filter.value === result.doc[key])) {
//                     return false;
//                 }
//             } else if (result.doc[key] !== activeFilters[key]) {
//                 return false;
//             }
//         }
//         return true;
//     });
// 	console.log(`filterResults ~ res:`, res);
// 	return res;
// }
// const activeFilters = getActiveFilters(filters);

// const filteredResults = filterResults(results, activeFilters);
// console.log('FILTERED RESULTS', filteredResults);
//
//