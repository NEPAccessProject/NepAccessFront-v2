import {
  DocumentType,
  SearchResultPropsType,
  SearchResultType,
} from "@/components/interfaces/types";
import { Box, Button, Divider, Paper, Typography,Chip } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { styled } from "@mui/styles";
import react, { useContext, useEffect, useState } from "react";
import SearchContext from "./SearchContext";
import SearchResultCards from "./SearchResultCards";
//import SearchResultCards from "./SearchResultCards";
import { getHighlights,getDatesByDocumentType } from "./searchUtils";
import { string } from "prop-types";
const CardItem = styled(Paper)(() => ({
  elevation: 1,
  padding: 0,
  margin: 0.5,
}));

const GridContainerProps = {
  display: "flex",
  padding: 1,
  spacing: 1,
  container: true,
  flex: 1,
};

const GridItemProps = {
  flex: 1,
  border: "1px solid #eee",
  display: "flex",
  justifyContent: "center",
  justifyItems: "center",
  alignContent: "center",
  alignItems: "center",
  // "&:hover": {
  //   //           backgroundColor: //theme.palette.grey[200],
  //   boxShadow: "0px 4px 8px rgba(0.5, 0.5, 0.5, 0.15)",
  //   cursor: "pointer",
  //   "& .addIcon": {
  //     color: "purple",
  //   },
  // },
};

function convertToHTML(text: string) {
  //const content: string = text.replace(/<\/?[^>]+(>|$)/g, "");
  const end = text && text.length > 512 ? 512 : text.length;
  const html = text.substring(0, end as number) + "...";
  return { __html: html };
}

const SearchResult = (props: SearchResultPropsType) => {
  const result: SearchResultType = props.result;
  if (!result || !result.doc) return null;
  const context = useContext(SearchContext);
  const {
    getResultHighlights,
    error,
    loading,
    setError,
    showSnippets,
    filters,
  } = context;
  //applies only to the current result
  const [highlights, setHiglights] = useState<string[]>([]);
  //applies to all snippets
  const [showSnippet, setShowSnippet] = useState<boolean>(true);
  const [currentResult, setCurrentResult] = useState(result);
  const { score, ids } = currentResult;
  const _mounted = react.useRef(false);

  // useEffect(() => {
  //   (async () => {
  //     const resultHighlights = await getHighlights(result, title);
  //     console.log(`async ~ HIGHLIGHTS:`, resultHighlights);
  //     //      setHiglights(resultHighlights);
  //     setHiglights(resultHighlights);
  //     console.log(`async ~ result:`, result);
  //   })();
  //   console.log("IN EFFECT WITH RESULT", result);
  // }, [result]);
  useEffect(() => {
    highlights.push(
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tristique et egestas quis ipsum. Elit ut aliquam purus sit amet luctus venenatis lectus. Pellentesque eu tincidunt tortor aliquam nulla. Sit amet commodo nulla facilisi nullam vehicula ipsum"
    );
    highlights.push(
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tristique et egestas quis ipsum. Elit ut aliquam purus sit amet luctus venenatis lectus. Pellentesque eu tincidunt tortor aliquam nulla. Sit amet commodo nulla facilisi nullam vehicula ipsum"
    );
    highlights.push(
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tristique et egestas quis ipsum. Elit ut aliquam purus sit amet luctus venenatis lectus. Pellentesque eu tincidunt tortor aliquam nulla. Sit amet commodo nulla facilisi nullam vehicula ipsum"
    );
    setHiglights(highlights);
  }, []);
  // const onSnippetChange = (evt:React.ChangeEvent<HTMLButtonElement>) => {
  //   console.log(`onSnippetChange ~ evt:`, evt.target);
  //   console.log(`onSnippetChange ~ evt:`, evt.target);
  //   const isChecked = evt.target.value;
  //  // setShowSnippet(isChecked);
  //   console.log(`onSnippetChange ~ target:`, isChecked);

  // }
  const doc: DocumentType = result.doc;
  const {decision, commentDate, title, agency, status, registerDate, action,finalNoa,finalNoaDate } =
  doc;

  const documentType = doc.documentType;
  return (
    <Grid container padding={2}>
      {doc && (
        <>
          <Grid
            xs={1}
            justifyContent={'center'}
            justifyItems={'center'}
            alignItems={'center'}
            alignSelf={'center'}
          >
           <Box>
          <>
          {getDatesByDocumentType(decision[0],doc)}
          </>
        {decision}
        {getDatesByDocumentType(decision as string,doc)}  
            {/* {decision && typeof(decision)=="object" && decision.map((decision)=>(
              <>
              <br/>
              {getDateBasedonDecision(decision,doc).toString()}
              <br/>
              </>
            )
            )} */}
            {/* {doc.decision as string[] && doc.decision.map((decision, index) => (
              getDateBasedonDecision(decision).toString()
            ))} */}
           </Box>
          </Grid>
          <Grid
            xs={10}
            flex={1}
            padding={2}
            className="document-title-column"
          >
              <Button variant="text">
                <Typography textAlign={"center"} fontSize={"0.8rem"}>
                    {doc.documentType} - {doc.title}
                </Typography>
              </Button>
          </Grid>
          {/* <Grid container padding={1} border={1} borderColor={'red'}>
                <Grid xs={12}>Highlights ?</Grid>
         </Grid> */}
          <Grid container display={'flex'} padding={1} border={1} borderColor={'red'}>
            <Grid flex={1}><ShowHighlights highlights={highlights} result={result} /></Grid>
          </Grid>
        </>
      )}
    </Grid>

    // return (
    //   <>
    //     {doc && (
    //       <Box id="search-result-doc-container" marginTop={2} borderTop={0} borderBottom={0}>
    //         <Divider/>
    //         <Box marginTop={1} id={`search-result-container-box-${doc.id}`}>
    //           <Grid
    //             id={`search-result-container${doc.id}`}
    //             {...GridContainerProps}
    //             display={"flex"}
    //             flex={1}
    //           >
    //             <Grid xs={1} {...GridItemProps} display={"flex"}>
    //               {documentType}
    //             </Grid>
    //             <Grid xs={1} {...GridItemProps} display={"flex"}>
    //               {doc.processId}
    //             </Grid>
    //             <Grid xs={2} {...GridItemProps}>
    //               {action}
    //             </Grid>
    //             <Grid xs={2} {...GridItemProps}>
    //               {agency}
    //             </Grid>
    //             <Grid xs={2} {...GridItemProps}>
    //               {`${registerDate ? registerDate : "N/A"}`}
    //             </Grid>
    //             <Grid xs={2} {...GridItemProps}>
    //               {`${status ? status : "N/A"}`}
    //             </Grid>
    //             <Grid xs={2} {...GridItemProps}>
    //               <Button variant="contained" color="primary">
    //                 Download
    //               </Button>
    //             </Grid>
    //           </Grid>
    //           <Box
    //             id={`search-result-highlights-${doc.id}`}
    //             style={{
    //               background: "#3D669C",
    //               //border: "1px solid #ddd",
    //               marginBottom: 0,
    //             }}
    //           >
    //             { (showSnippet) ? (
    //               <Button
    //                 color="primary"
    //                 fullWidth
    //                 onClick={()=>setShowSnippet(false)}
    //               >
    //                 <Typography color={"white"}>See Less</Typography>
    //               </Button>
    //             ) : (
    //               <Button
    //                 color="primary"
    //                 fullWidth
    //                 onClick={(evt)=> setShowSnippet(true)}
    //               >
    //                 <Typography color={"white"}> See More</Typography>
    //               </Button>
    //             )}
    //             <Box id={`search-result-highlights-box-${doc.id}-${doc.processId}`}>
    //               {(showSnippet) && (
    //                 <Box style={{ backgroundColor: "#fff" }}>
    //                   <Typography
    //                     color="black"
    //                     bgcolor="white"
    //                     padding={1}
    //                     paddingBottom={0}
    //                     textAlign={"left"}
    //                     fontSize={"1rem"}
    //                     variant="body2"
    //                   >
    //                     <Box>
    //                       {highlights.map((highlight, index) => (
    //                         <Box
    //                           key={index}
    //                           padding={0.25}
    //                         >
    //                           <Box
    //                             id={`search-result-highlight-container-${doc.id}`}
    //                           >
    //                            {highlights.map((highlight, index) => {
    //                               return (
    //                                 <Box
    //                                   key={index}
    //                                   padding={0}
    //                                   fontSize="0.75rem"
    //                                 >

    //                                   <Box
    //                                     dangerouslySetInnerHTML={convertToHTML(
    //                                       highlight[0]
    //                                     )}
    //                                   >
    //                                   </Box>
    //                                 </Box>
    //                               );
    //                             })}
    //                           </Box>
    //                         </Box>
    //                       ))}
    //                     </Box>
    //                   </Typography>
    //                 </Box>
    //               )}
    //             </Box>
    //           </Box>
    //         </Box>
    //       </Box>
    //     )}
    //   </>
    // );
  );
};

export default SearchResult;

type highlightProps = {
  highlights: string[];
  result: SearchResultType;
};
export function ShowHighlights(props: highlightProps) {
  const [showMoreSnippets, setShowMoreSnippets] = useState<boolean>(false);
  const highlights: string[] = props.highlights;
  const result: SearchResultType = props.result;
  const doc: DocumentType = result.doc;
  return (
    <Box key={result.doc.id} padding={0.25} className="document-higlights">
      <Box id={`search-result-highlight-container-${doc.id}`}>
        {highlights.map((highlight, i) => (
          <>
            {i < 1 && (
              <>
                <Box
                  key={i}
                  padding={0}
                  fontSize="0.75rem"
                  className="document-highlight"
                >
                  <Box dangerouslySetInnerHTML={convertToHTML(highlight)}></Box>
                </Box>
                <Box
                  key={i}
                  padding={0}
                  fontSize="0.75rem"
                  className="document-highlight"
                >
                  <Button variant="text">Show More Snippets</Button>
                </Box>
              </>
            )}
          </>
        ))}
      </Box>
    </Box>
  );
}
