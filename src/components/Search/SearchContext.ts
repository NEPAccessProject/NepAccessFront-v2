
import React from "react";
import { FilterType, SearchContextType, SearchResultType } from '../interfaces/interfaces';

//[TODO][REFACTOR] does the fooRaw values still needed after the refactor
const filters: FilterType = {
  actions:[],
  agencies: [],
  agenciesRaw: "",
  cooperatingAgency: [],
  county: [],
  countyRaw:"",
  distance: "",
  decisions: [],
  decisionsRaw: "",
  isFast41: false,
  proximityDisabled: true,
  proximityOption: "",
  states: [],
  stateRaw: "",
  needsComments: false,
  needsDocument: true,
  typeAll: false,
  typeDraft: false,
  typeEA: false,
  typeFinal: false,
  typeNOI: false,
  typeOther: false,
  typeROD: false,
  typeScoping: false,
  startPublish: "",
  endPublish: "",
  titleRaw: "",
  actionsRaw: "",
  endComment: "",
  startComment: "",
  cooperatingAgencyRaw: "",
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
  iconClassName: "",
  isAvailableFilesDialogOpen: false,
  isDirty: false,
  isQuickStartDialogOpen: false,
  isSearchTipsDialogOpen: false,
  markup: false,
  message: "",
  optionsChecked: false,
  searchOption: "",
  showContext: false,
  showPDFDialog: false,
  showQuickTipsDialog: false,
  showSearchTipsDialog: false,
  tooltipOpen: false,
  setLoading: () => {},
	setError: (message: string) => {},
  setSearched: (boolean) => {},
  searched: false,
	error: "",
	updatePaginationStateValues : (key:string, value:any) => {},
	updateFilterStateValues : (key:string, value:any) => {},
	searchTop: () => {},
	searchNoContext: () => {},
  setResultsToDisplay: (results:SearchResultType[]) => {},
  setResults: (results:SearchResultType[]) => {},
  resultsToDisplay: [],
  paginateResults: (results:SearchResultType[], pageNumber: number, pageSize: number) => {},
});

export default SearchContext;