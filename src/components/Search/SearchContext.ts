
import React from "react";
import { FilterType, SearchContextType, SearchResultType,FilterOptionType } from '../interfaces/types';


//[TODO][REFACTOR] does the fooRaw values still needed after the refactor
const filters: FilterType = {
  action:[],
  agency: [],
  cooperatingAgency: [],
  county: [],
  distance: "",
  decision: [],
  isFast41: false,
  proximityDisabled: true,
  proximityOption: "",
  states: [],
  status: [],
  title: "Copper Mine",
  documentType: [],
  typeAll: false,
  typeDraft: false,
  needsComments: false,
  needsDocument: true,
  typeEA: false,
  typeFinal: false,
  typeNOI: false,
  typeOther: false,
  typeROD: false,
  typeScoping: false,
  startPublish: "",
  endPublish: "",
  endComment: "",
  commentDate: "",
  filtersHidden: false,
};



const SearchContext = React.createContext<SearchContextType>({
  filters,
  results: [],
  loading: false,
  pagination: {
    page: 0,
    limit: 25,
    rowsPerPage: 10,
    sortby: "relevance",
    sortdir: "DESC",
    totalCount: 0,
  },
  fragmentSizeValue: 0,
  hideOrganization: false,
  isAvailableFilesDialogOpen: false,
  showPDFDialog: false,
  showSnippets: false,
  hasActiveFilters: false,
  setHasActiveFilters: () => false,
  setShowSnippets: (showSnippets:boolean) => {},
  updateFilterStateValues : (key:string, value:any) => {},
  updatePaginationStateValues : (key:string, value:any) => {},
  setError: (error:string) => {},
  setLoading: () => {},
  setSearched: (boolean) => {},
  searched: false,
	error: "",
	searchTop: () => {},
	searchNoContext: () => {},
  setResultsToDisplay: (results:SearchResultType[]) => {},
  setResults: (results:SearchResultType[]) => {},
  resultsToDisplay: [],
  paginateResults: (results:SearchResultType[], pageNumber: number, pageSize: number) => {},
  searchTitlesOnly: false,
  setSearchTitlesOnly: (searchTitlesOnly: boolean) => {},
  getFilterValues: (options:FilterOptionType[], key:string) => [],
  getFilteredValues: (options:FilterOptionType[], value:FilterOptionType, meta:any) => []
});

export default SearchContext;