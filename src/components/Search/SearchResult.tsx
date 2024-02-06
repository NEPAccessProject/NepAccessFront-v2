import React,{useContext, useState} from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import {Typography} from '@mui/material';
import { DocumentType, SearchResultType, SearchResultPropsType } from '@/components/interfaces/interfaces';
import SearchContext from './SearchContext';
import SearchResultItem from './SearchResultItem'

const SearchResult = (props:SearchResultPropsType) => {
    const result:SearchResultType = props.result;
    console.log('RECEIVED RESULT',result)
    const document = result.doc;
    console.log('SEARCH RESULT DOCUMENT',document)
    const [PDFModal,setPDFModalOpen] = useState(false);

    return (
    <>
    <h2> DOCUMENT</h2>
        {/* <Typography variant='h2'> {document.title}</Typography> */}
        <Grid container>
                  <Grid xs={12} style={{border:'1px solid #ddd'}}>
                      <h5>Title goes here </h5>
                    </Grid>
                    <Grid container>
                      <Grid xs={2}>
                      {document.documentType}
                      </Grid>
                      <Grid xs={2}>
                      {document.commentDate}
                          Document Date
                      </Grid>
                      <Grid xs={5}>
                      {document.title}
                        </Grid>
                        <Grid>
                            Buttons
                          </Grid>
                    </Grid>

                </Grid>
        <Grid container flex={1}>
            <Grid  xs={12} flex={1} justifyContent={'flex-start'}>
                    <Grid  xs={12}>
                        <Typography variant='h6'>{document.title}</Typography>
                    </Grid>
                    <Grid container xs={12} >
                        <Grid  xs={2}>Document Type: {document.documentType}</Grid>
                        <Grid  xs={2}>Agency: {document.agency}</Grid>
                        <Grid xs={2}>Document Status: {document.status}</Grid>
                        <SearchResultItem />
                    </Grid>
            </Grid>
        </Grid>
    </>
  )
}
export default SearchResult;