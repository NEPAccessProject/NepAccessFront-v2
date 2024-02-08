
import React from "react";
import { FilterType, PaginiationType, SearchResultType } from '../interfaces/interfaces';


//[] Maybe break the structure down to smaller pieces



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


export type SearchContextType = {
  filters: FilterType;
  results: SearchResultType[];
  pagination: PaginiationType;
  loading: boolean;
  fragmentSizeValue: number;
  hideOrganization: boolean;
  iconClassName: string;
  isAvailableFilesDialogOpen: boolean;
  isDirty: false;
  isQuickStartDialogOpen: false;
  isSearchTipsDialogOpen: false;
  totalCount: number;
  markup: boolean;
  message: string;
  optionsChecked: boolean;
  searchOption: string;
  showContext: boolean;
  showPDFDialog: boolean;
  showQuickTipsDialog: boolean;
  showSearchTipsDialog: boolean;
  tooltipOpen: boolean;
  debouncedUpdateFilterStateValues : (key:string, value:any) => void;
  updatePaginationStateValues : (key:string, value:any) => void;

};

const SearchContext = React.createContext<SearchContextType>({
  filters,
  results: [],
  loading: false,
  pagination: {
    page: 1,
    limit: 10,
    sortby: "doc.title", //temporay for json-server
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
  updatePaginationStateValues : ()=> {},
  debouncedUpdateFilterStateValues: () => {},
});

export default SearchContext;