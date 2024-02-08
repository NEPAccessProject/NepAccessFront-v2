//[TODO] As these get fleshed out break this down to different files; with the index serving them as exports

//[TOO] maybe 
export type DocumentType = {
	action: string;
	agency: string;
	commentDate: Date | string;
	commentsFilename: string;
	cooperatingAgency: string;
	county: string ;
	decisionRaw: string ;
	decisions: string ;
	department: string;
	documentType: string;
	draftNoa: Date ;
	filename: string; 
	finalNoa: Date | string ;
	firstRodDate: Date | string  ;
	folder: string;
	id: number;
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
}

  
  export type PaginiationType = {
	page: number;
	limit: number;
	sortby: string;
	sortdir: string;
	totalCount: number;
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

export type SearchFilterResultsType = {
		key: string;
		value: any;
}



export type InputEvent = React.ChangeEvent<HTMLInputElement>;
export type ButtonEvent = React.MouseEvent<HTMLButtonElement>;

export type FilterType = {
	
	actions: string[];
	actionsRaw: string;
	agencies: FilterOptionType[];
	agenciesRaw: "";
	cooperatingAgency: [];
	cooperatingAgencyRaw: string;
	county: [];
	countyRaw: "";
	distance: number;
	decisions:string[];
	decisionsRaw: "";
	endComment: Date | string;
	endPublish: string | Date;
	filtersHidden: boolean;
	isFast41: boolean;
	needsComments: boolean;
	needsDocument: boolean;
	proximityDisabled: boolean;
	proximityOption: string;	
	startComment: "";
	startPublish: string | Date;
	stateRaw: "";
	states: FilterOptionType[];
	titleRaw: "";
	typeAll: boolean;
	typeDraft: boolean;
	typeEA: boolean;
	typeFinal: boolean;
	typeNOI: boolean;
	typeOther: boolean;
	typeROD: boolean;
	typeScoping: boolean;
  
  };
  
  const filters: FilterType = {
	actionsRaw: "",
	actions: [],
	agencies: [],
	agenciesRaw: "",
	cooperatingAgency: [],
	cooperatingAgencyRaw: "",
	county: [],
	distance: [],
	decisions: [],
	decisionsRaw: "",
	endComment: "",
	endPublish: "",
	filtersHidden: false,
	isFast41: false,
	needsComments: false,
	needsDocument: true,
	proximityDisabled: false,
	proximityOption: "",
	startPublish: "",
	stateRaw: "",
	states: [],
	titleRaw: [],
	typeAll: false,
	typeDraft: false,
	typeEA: false,
	typeFinal: false,
	typeNOI: false,
	typeOther: false,
	typeROD: false,
	typeScoping: false,
    countyRaw: "",
    startComment: "",
  };  
  export type SearchContextType = {
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
	optionsChecked: boolean;
	pagination: PaginiationType;
	proximityDisabled: boolean;
	proximityOption: string;
	results: SearchResultType[];
	searchOption: string;
	showContext: boolean;
	showPDFDialog: boolean;
	showQuickTipsDialog: boolean;
	showSearchTipsDialog: boolean;
	tooltipOpen: boolean;
  
  };

  export type FilterOptionType = {
	label: string;
	value: any;
  }