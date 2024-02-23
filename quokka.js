const filters = {
    title: 'Copper Mine',
    agency: 
       'Advisory Council on Historic Preserve (ACHP)',
}

const results = [
    {
        id:1,
        doc: {
            agency: 'Advisory Council on Historic Preserve (ACHP),Forest Service',
            title: 'Copper Flat Copper Mine',
            cooperatingAgency: 'Agency 1',
        }
    },
    {
        id:2,
        doc: {
            agency: 'Advisory Council on Historic Preserve (ACHP),Forest Service',
            title: 'Copper Mine',
            cooperatingAgency: 'Agency 2',
        }
    }
]


const matchesArray = (field, val) => {
    console.log(`matchesArray ~ field, val:`, field, val);
    return function (a) {
        let returnValue = false;
        val.forEach(item =>{
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
        if(legacyStyle) {
            filteredResults = filteredResults.filter(arrayMatchesArrayNotSpacedOld("cooperatingAgency", searcherState.cooperatingAgency));
        } else {
            filteredResults = filteredResults.filter(arrayMatchesArrayNotSpaced("cooperatingAgency", searcherState.cooperatingAgency));
        }
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
        let formattedDate = Globals.formatDate(searcherState.startPublish);
        if(legacyStyle) {
            filteredResults = filteredResults.filter(matchesStartDateOld(formattedDate));
        } else {
            filteredResults = filteredResults.filter(matchesStartDate(formattedDate));
        }
    }
    if(searcherState.endPublish){
        isFiltered = true;
        let formattedDate = Globals.formatDate(searcherState.endPublish);
        if(legacyStyle) {
            filteredResults = filteredResults.filter(matchesEndDateOld(formattedDate));
        } else {
            filteredResults = filteredResults.filter(matchesEndDate(formattedDate));
        }
    }
    if(searcherState.typeFinal || searcherState.typeDraft || searcherState.typeEA 
        || searcherState.typeNOI || searcherState.typeROD || searcherState.typeScoping){
        isFiltered = true;
        if(legacyStyle) {
            filteredResults = filteredResults.filter(matchesTypeOld(
                searcherState.typeFinal, 
                searcherState.typeDraft,
                searcherState.typeEA,
                searcherState.typeNOI,
                searcherState.typeROD,
                searcherState.typeScoping));
        } else {
            filteredResults = filteredResults.filter(matchesType(
                searcherState.typeFinal, 
                searcherState.typeDraft,
                searcherState.typeEA,
                searcherState.typeNOI,
                searcherState.typeROD,
                searcherState.typeScoping));
        }
    }
    if(searcherState.needsDocument) {
        isFiltered = true;
        if(legacyStyle) {
            filteredResults = filteredResults.filter(hasDocumentOld)
        } else {
            filteredResults = filteredResults.filter(hasDocument)
        }
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

const searcherState = {
    title: 'Copper Mine',
    agency: 
       'Advisory Council on Historic Preserve (ACHP)',
}

const filtered = doFilter(searcherState, results, results.length, false);
console.log('FILTERED Results', filtered.length,'Orginal Results', results.length);