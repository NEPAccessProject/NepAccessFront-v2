//[TODO] As these get fleshed out break this down to different files; with the index serving them as exports

//[TOO] maybe 
export type DocumentType = {
	action?: string;
	agency?: string;
	commentDate?: Date | string;
	commentsFilename?: string;
	cooperatingAgency?: string;
	county?: string ;
	decision?: string ;
	department?: string | null;
	documentType?: string;
	draftNoa?: string | null;
	filename?: string; 
	finalNoa?: string; //Date | string ;
	finalNoaDate?: string;
	firstRodDate?:  string | null;
	folder?: string | null;
	id: number | null;
	link?: string | null;
	noiDate?: Date | string | null;
	notes?: string | null;
	processId: number;
	registerDate?: Date| string | null;
	size?: number | null;
	state?: string | null;
	status?: string | null;
	subtype?: string | null;
	summaryText?: string | null;
	title: string;
	isFast41?: boolean;
}

export type HighlightType = {
    [key: string]: string[];
  };

  
  export type PaginiationType = {
	page: number;
	limit: number;
	sortby: string;
	sortdir: string;
	totalCount: number;
	rowsPerPage: number;
  }

export type SearchResultType = {
  ids: number[];
  doc: DocumentType;
  highlights: string[];
  filenames: string[];//string[];
  score: number;
}

export type HighlightIdsType = {
	luceneId:number;
	filename:string[];
  }

  export type HighlightsPostDataType = {
	unhighlighted: HighlightIdsType[];
	terms: string[];
	markup: boolean;
	fragmentSizeValue: number;

  }

export type FilterType = {
	action?: FilterOptionType[];
	agency: FilterOptionType[];
	cooperatingAgency?: FilterOptionType[];
	county?: FilterOptionType[];
	distance?: string;
	decision?:FilterOptionType[];
	endComment?: Date | string;
	endPublish?: Date | string;
	filtersHidden?: boolean;
	isFast41?: boolean;
	proximityDisabled?: boolean;
	proximityOption?: string
	commentDate?: Date | string;
	startPublish?: Date | string;
	states?: FilterOptionType[];
	status?: string[];
	title: string;
	documentType?: FilterOptionType[];
	typeAll?: boolean;
	typeDraft?: boolean;
	typeEA?: boolean;
	typeFinal?: boolean;
	typeNOI?: boolean;
	typeOther?: boolean;
	typeROD?: boolean;
	typeScoping?: boolean;
  
};
export type SearchContextType = {
	error: string;
	filters: FilterType;
	fragmentSizeValue?: number;
	hideOrganization?: boolean;
	isAvailableFilesDialogOpen: boolean;
	loading: boolean;
	pagination: PaginiationType;
	results: SearchResultType[];
	resultsToDisplay: SearchResultType[];
	setResultsToDisplay: (results:SearchResultType[]) => void;
	searchNoContext: () => void;
	searched: boolean;
	searchTop: () => void;
	showSnippets: boolean;
	setHasActiveFilters: () => boolean;
	hasActiveFilters: boolean;
	setShowSnippets: (showSnippets:boolean) => void;
	showPDFDialog: boolean;
	updateFilterStateValues : (key:string, value:any) => void;
	updatePaginationStateValues : (key:string, value:any) => void;
	setError: (error:string) => void;
	// sortSearchResults: (results:SearchResultType[], sortBy:string) => SearchResultType[]
	setLoading: (loading:boolean) => void;
	setSearched: (searched:boolean) => void;
	setResults: (results:SearchResultType[]) => void;
	paginateResults: (results:SearchResultType[], pageNumber: number, pageSize: number) => void;
	setSearchTitlesOnly: (searchTitlesOnly:boolean) => void;
	searchTitlesOnly: boolean;
	getActiveFilters: (filters:FilterType) => FilterOptionType[],
	getFilterValues: (options:FilterOptionType[], key:string) => FilterOptionType[],
	getFilteredValues: (options:FilterOptionType[], value:FilterOptionType, meta:any) => FilterOptionType[]
  };
  export type FilterOptionType = {
	label: string;
	value: any;
  }
  enum LOG_LEVEL {
	DEBUG = "debug",
	INFO = "info",
	WARN = "warn",
	ERROR = "error"
  }
  export type NotifcationMessageType = {
	message: string;
	type: LOG_LEVEL;
  }
  
  export type SearchAppPropType = {
	results: SearchResultType[];
	setResults: () => void;
  };

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