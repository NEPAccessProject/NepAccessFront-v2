import React,{useContext, useState} from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import {Typography} from '@mui/material';
import { DocumentType, SearchResultType, SearchResultPropsType } from '@/components/interfaces/interfaces';
import SearchContext from './SearchContext';

const SearchResult = (props:SearchResultPropsType) => {
    const result:SearchResultType = props.result;
    const document = result.doc;
    const {status,title,id,registerDate,link,documentType,commentDate,agency,department,cooperatingAgency,state,county,filename} = document;
    const [PDFModal,setPDFModalOpen] = useState(false);

    return (
    <>
        <Typography variant='h2'> {title}</Typography>
        <Grid container flex={1}>
            <Grid  xs={12} flex={1} justifyContent={'flex-start'}>
            
                    <Grid  xs={12}>
                        <Typography variant='h6'>{title}</Typography>
                    </Grid>
                    <Grid container xs={12} >
                        {/* <Grid  xs={2}>{registerDate}</Grid> */}
                        <Grid  xs={2}>Document Type: {documentType}</Grid>
                        <Grid  xs={2}>Agency: {agency}</Grid>
                        <Grid xs={2}>Document Status: {status}</Grid>
                        <Grid xs={2}>CommentDate: 
                            {/* {commentDate ? commentDate : 'N/A'} */}
                    </Grid>
                    </Grid>
            </Grid>
        </Grid>
    </>
  )
}
export default SearchResult;