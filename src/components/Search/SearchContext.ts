
import React from "react";
import { FilterType, SearchContextType,SearchFilterResultsType, SearchResultType } from '../interfaces/interfaces';
import SearchResults from "./SearchResults";
import SearchResult from "./SearchResult";

//[TODO][REFACTOR] does the fooRaw values still needed after the refactor
const filters: FilterType = {
  actions:[],
  agencies: [],
  agenciesRaw: "",
  cooperatingAgency: [],
  county: [],
  countyRaw:"",
  distance: 0,
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
    page: 1,
    limit: 10,
    sortby: "Relavancy", //temporay for json-server
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
	setTitleRaw: (titleRaw:string) => {},
	searchTop: () => {},
	searchNoContext: () => {},
  sortSearchResults: (results: any, sortby: string) => results,
});

export default SearchContext;