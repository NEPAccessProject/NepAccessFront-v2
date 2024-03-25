//[TODO] As these get fleshed out break this down to different files; with the index serving them as exports

//[TOO] maybe 
export type ResultDocumentType = {
	action: string;
	agency?: string;
	commentDate?: Date;
	commentsFilename?: string;
	cooperatingAgency?: string;
	county?: string ;
	decision?: string;
	department?: string;
	documentType?: string;
	draftNoa?: string;
	filename?: string; 
	finalNoa?: string; //Date | string ;
	finalNoaDate?: string;
	firstRodDate?: string;
	folder?: string;
	id: number;
	link?: string;
	noiDate?: string;
	notes?: string;
	processId: number;
	registerDate?: string;
	size?: number;
	state?: string;
	status?: string;
	subtype?: string;
	summaryText?: string;
	title: string;
	isFast41?: boolean;
}

export type DocumentType = {
	action: string[];
	agency?: string[];
	commentDate?: Date;
	commentsFilename?: string;
	cooperatingAgency?: string;
	county?: string ;
	decision?:  string[];
	department?: string;
	documentType?: string[];
	draftNoa?: Date;
	filename?: string;
	finalNoa?: Date; //Date | string ;
	finalNoaDate?: Date;
	firstRodDate?: Date;
	folder?: string;
	id: number;
	link?: string;
	noiDate?: Date;
	notes?: string;
	processId: number;
	registerDate?: Date;
	size?: number;
	state?: string;
	status?: string;
	subtype?: string;
	summaryText?: string;
	title: string;
	isFast41?: boolean;
}
	

  export type PaginiationType = {
	page: number;
	limit: number;
	sortby: string;
	sortdir: string;
	totalCount: number;
	rowsPerPage: number;
  }

  export type ResponseSearchResultsType = {
	ids: number[];
	doc: ResultDocumentType;
	highlights: string[];
	filenames: string;
	score?: number;
  }

export type SearchResultType = {
  ids: number[];
  doc: DocumentType;
  highlights: string[];
  filenames: string[];
  score?: number;
}

export type HighlightIdsType = {
	luceneIds:number;
	filename:string[];
  }

  export type HighlightsPostDataType = {
	unhighlighted: UnhighlightedType[];
	terms: string;
	markup: boolean;
	fragmentSizeValue: number;
  }
  export type UnhighlightedType = {
    luceneIds:number[],
    filename:string
  }


export type HighlightType = {
    highlights: string[];
  };

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
export type FilterOptionType = {
	label: string;
	value: any;
  }

export type SearchContextType = {
	error: string;
	filters: FilterType;
	fragmentSizeValue?: number;
//	getHiglightsFromResult: (result:SearchResultType,searchTerm:string) => HighlightIdsType[];
//	getHiglightsFromResults: (results:SearchResultType[], searchTerm:string) => void;
	getResultHighlights: (result:SearchResultType,title:string) => SearchResultType;
	hasActiveFilters: boolean;
	hideOrganization?: boolean;
	isAvailableFilesDialogOpen: boolean;
	loading: boolean;
	paginateResults: (results:SearchResultType[], pageNumber: number, pageSize: number) => void;
	pagination: PaginiationType;
	results: SearchResultType[];
	resultsToDisplay: SearchResultType[];
	searched: boolean;
	searchNoContext: () => void;
	searchTitlesOnly: boolean;
	searchTop: () => void;
	setError: (error:string) => void;
	setHasActiveFilters: () => boolean;
	setLoading: (loading:boolean) => void;
	setResults: (results:SearchResultType[]) => void;
	setResultsToDisplay: (results:SearchResultType[]) => void;
	setSearched: (searched:boolean) => void;
	setSearchTitlesOnly: (searchTitlesOnly:boolean) => void;
	setShowSnippets: (showSnippets:boolean) => void;
	showPDFDialog: boolean;
	showSnippets: boolean;
	updateFilterStateValues : (key:string, value:any) => void;
	updatePaginationStateValues : (key:string, value:any) => void;
  };
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

  enum LOG_LEVEL {
	DEBUG = "debug",
	INFO = "info",
	WARN = "warn",
	ERROR = "error"
  }

// PROPS INTERFACES
export type SearchResultPropsType = {
  result: SearchResultType;
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

export type ProcessObjectType = {
	results: SearchResultType[];
	processId: number;
	title: string;
	//decision?: string[] | string;
	//action?: string[] | string;
	//documentType?: string[] | string;
	//status?: string;
	//location?: string;
	//county?: string[];
	//state?: string[];
	// region?: string[];
	//startDate: Date | string;
	//endDate: Date | string;
	agency?: string[];
	score?: number;
  }
  export type ProcessesType = {
	[key: string]: ProcessObjectType
}
export type InputEvent = React.ChangeEvent<HTMLInputElement>;
export type ButtonEvent = React.MouseEvent<HTMLButtonElement>;
//registerDate //endPublish noiDate finalNoaDate firstRodDate,
export enum DocumentTypeEnum {
	'FINAL' = 'finalNOA',
	'FINAL Supplement' = 'commentDate',
	'Draft Supplement' = 3,
	'PLAN' = 4,
	'DRAFT' = 5,
	'ROD' = 6,
}

export enum DecisionTypeEnum{
	"PROJECT" = 1,
	"PLAN" = 2,
	"Plan;Project" = 3,
	"Legislative;Project" =  4,
	"Legislative;Plan" = 5,
}

