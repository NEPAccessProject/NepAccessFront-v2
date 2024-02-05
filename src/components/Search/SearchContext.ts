import { Pagination } from '@mui/material';

import {SearchResultPropsType,SearchResultType,SearchResultsType,FilterType,PaginiationType} from '../interfaces/interfaces';
import React from "react";


//[] Maybe break the structure down to smaller pieces



const filters: FilterType = {
  actions:[],
  agencies: [],
  agenciesRaw: "",
  cooperatingAgency: [],  
  county: [],
  countyRaw:"",
  decisions: [],
  decisionsRaw: "",
  isFast41: false,
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
  titleRaw: [],
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
  markup: boolean;
  message: string;
  optionsChecked: boolean;
  proximityDisabled: boolean;
  proximityOption: string;
  searchOption: string;
  showContext: boolean;
  showPDFDialog: boolean;
  showQuickTipsDialog: boolean;
  showSearchTipsDialog: boolean;
  tooltipOpen: boolean;
  updateFilterStateValues : (key:string, value:any) => void;
  updatePaginationStateValues : (key:string, value:any) => void;

};

const SearchContext = React.createContext<SearchContextType>({
  filters,
  results: [],
  loading: false,
  pagination: {
    page: 1,
    limit: 25,
    sortby: "doc.title",
    sortdir: "DESC",
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
  proximityDisabled: false,
  proximityOption: "",
  searchOption: "",
  showContext: false,
  showPDFDialog: false,
  showQuickTipsDialog: false,
  showSearchTipsDialog: false,
  tooltipOpen: false,
  updatePaginationStateValues : ()=> {},
  updateFilterStateValues: () => {},
});

export default SearchContext;