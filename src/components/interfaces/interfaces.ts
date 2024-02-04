import { Pagination } from '@mui/material';
//[TODO] As these get fleshed out break this down to different files; with the index serving them as exports

//[TOO] maybe 
export type DocumentType = {
	action: string
	agency: string;
	commentDate: Date | string;
	commentsFilename: string;
	cooperatingAgency: string;
	county: string ;
	decision: string ;
	decisionRaw: string ;
	department: string;
	documentType: string;
	draftNoa: Date ;
	filename: string; 
	finalNoa: Date | string ;
	firstRodDate: Date | string  ;
	folder: string;
	link: string;
	noiDate: Date | string;
	notes: string ;
	processId: number ;
	registerDate: Date ;
	size: number;
	states: string;
	status: string;
	subtype: string;
	summaryText: string;
	title: string;
	id: number;
}

  
  export type PaginiationType = {
	page: number;
	limit: number;
	sortby: string;
	sortdir: string;
  }

export type SearchResultType = {
  id: number;
  ids: number[];
  doc: DocumentType;
  highlights?: string[];
  filenames?: string[];
  score?: number;
}

export type SearchResultsType = {
	results: SearchResultType[];
  }

// PROPS INTERFACES
export type SearchResultPropsType = {
  result: SearchResultType
}

export type SearchHeaderPropsType = {
  //[TODO] placeholder implement when needed
}

export type SearchAppPropsType ={
  //results: ISearchResult[];
}

export interface SearchFiltersPropType {
	filtersHidden: boolean;
}


export type SearchTipsPropType = {
	// Define the type for the props here
  }


export type FilterType = {
	startPublish: string | Date;
	endPublish: string | Date;
	action: [];
	actionRaw: string;
	agency: string;
	agencyRaw: "";
	cooperatingAgency: [];
	county: [];
	countyRaw: "";
	decision: [];
	decisionRaw: "";
	isFast41: boolean;
	states: [];
	stateRaw: "";
	startComment: "";
	needsComments: boolean;
	needsDocument: boolean;
	typeAll: boolean;
	typeDraft: boolean;
	typeEA: boolean;
	typeFinal: boolean;
	typeNOI: boolean;
	typeOther: boolean;
	typeROD: boolean;
	typeScoping: boolean;
	titleRaw: [];
	endComment: Date | string;
	cooperatingAgencyRaw: string;
	filtersHidden: boolean;
  
  };
  
  const filters: FilterType = {
	agency: "",
	action: [],
	agencyRaw: "",
	decision: [],
	decisionRaw: "",
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
	actionRaw: "",
	endComment: "",
	cooperatingAgencyRaw: "",
	cooperatingAgency: [],
	county: [],
    countyRaw: "",
    startComment: "",
	filtersHidden: false,
  };  
  export type SearchContextType = {
	action: string[];
	agency: string[];
	agencyRaw: string[];
	cooperatingAgency: string[];
	cooperatingAgencyRaw: string[];
	county: string[];
	countyOptions: string[]; //Globals.counties,
	countyRaw: string;
	decision: string[];
	decisionRaw: string[];
	filters: FilterType;
	filtersHidden: boolean;
	fragmentSizeValue: number;
	hideOrganization: boolean;
	iconClassName: string;
	isAvailableFilesDialogOpen: boolean;
	isDirty: false;
	isQuickStartDialogOpen: false;
	isSearchTipsDialogOpen: false;
	loading: boolean;
	markup: boolean;
	message: string;
	needsComments: boolean;
	needsDocument: boolean;
	optionsChecked: boolean;
	pagination: PaginiationType;
	proximityDisabled: boolean;
	proximityOption: string;
	results: SearchResultType[];
	searchOption: string;
	states: [],
	stateRaw: [],
	showContext: boolean;
	showPDFDialog: boolean;
	showQuickTipsDialog: boolean;
	showSearchTipsDialog: boolean;
	startComment: Date | string | null;
	startPublish: Date | string | null;
	state: string[];
	tooltipOpen: boolean;
  
  };

  export type FilterOptionType = {
	key: string;
	value: any;
  }