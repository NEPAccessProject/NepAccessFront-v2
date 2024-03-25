import React, { useContext, useEffect, useState } from "react";
import {
  DocumentType,
  SearchResultPropsType,
  SearchResultType,
} from "@/components/interfaces/types";
import { Box, Button, Divider, Paper, Typography, Chip } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { styled } from "@mui/styles";
import SearchContext from "./SearchContext";
import { getHighlights, getDatesByDocumentType,getFinalDocumentsFromResult,getFinalDocumentsFromResults } from "./searchUtils";
import { string } from "prop-types";
import { container } from "webpack";
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
  //border: "1px solid #eee",
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
  const [showMoreSnippets, setShowMoreSnippets] = useState<boolean>(false);
  const [currentResult, setCurrentResult] = useState(result);
  const { score, ids } = currentResult;

  // useEffect(() => {
  //  useEffect(() => {
  //    (async () => {
  //      const resultHighlights = await getHighlights(result, title);
  //      console.log(`async ~ HIGHLIGHTS:`, resultHighlights);
  //      //      setHiglights(resultHighlights);
  //      setHiglights(resultHighlights);
  //      console.log(`async ~ result:`, result);
  //    })();
  //    console.log("IN EFFECT WITH RESULT", result);
  //  }, [result]);
  useEffect(() => {
    highlights.push(
      "Service Northern Region’s Westside zone. A number of key updates of the logic files and assumptions were conducted to more closely reflect the ecosystems and processes on the Nez Perce-Clearwater National Forests (NPCLW). These include modification of certain successional pathways, regeneration logic, insect/disease probabilities, and fire logic (e.g., fire severity, fire size/spread, fire event probabilities, and weather-ending events). Updates to the model between the publishing of the <b>Proposed</b> Action and the draft EIS also occurred to more accurately reflect successional growth times, age of the stands, as well as corroboration of species presence between the R1 VMap data layer and the Forest Inventory and Analysis data set. Details on the development of the SIMPPLLE model and the model updates that were completed throughout the forest plan revision analysis process can be found in the project record. As discussed earlier, even though best available information was used to develop"
    );
    highlights.push(
      "inflows may be stored. If Permittee has stored water in accordance with the terms and conditions of this permit, including any applicable environmental flow requirements in effect at the time the water was stored, Permittee may divert and use that stored water, even if the applicable environmental flow requirement is not met at the time of the subsequent diversion and use of that stored water. In lieu of Special Condition 6.Q. Consistent with Special Conditions 6.A and 6.0. through 6.P., <b>storage</b> and diversion of water under this permit shall be authorized when streamflows exceed the following values, at measurement points described in Special Conditions 6.E. and 6.M. above: Season Subsistence Base Pulse 2 per season Fall-Winter 1 cfs 3 cfs Trigger: 150 cfs Volume: 1,000 af Duration: 7 davs Spring 1 cfs 10 cfs 2 per season Summer cfs = cubic feet per second af = acre-feet 1 cfs 3 cfs Trigger: 500 cfs Volume: 3,540 af Duration: 10 days 1 per season Trigger:"
    );
    highlights.push(
      "inflows may be stored. If Permittee has stored water in accordance with the terms and conditions of this permit, including any applicable environmental flow requirements in effect at the time the water was stored, Permittee may divert and use that stored water, even if the applicable environmental flow requirement is not met at the time of the subsequent diversion and use of that stored water. In lieu of Special Condition 6.Q. Consistent with Special Conditions 6.A and 6.0. through 6.P., <b>storage</b> and diversion of water under this permit shall be authorized when streamflows exceed the following values, at measurement points described in Special Conditions 6.E. and 6.M. above: Season Subsistence Base Pulse 2 per season Fall-Winter 1 cfs 3 cfs Trigger: 150 cfs Volume: 1,000 af Duration: 7 davs Spring 1 cfs 10 cfs 2 per season Summer cfs = cubic feet per second af = acre-feet 1 cfs 3 cfs Trigger: 500 cfs Volume: 3,540 af Duration: 10 days 1 per season Trigger:"
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
  const {
    decision,
    commentDate,
    title,
    agency,
    status,
    registerDate,
    action,
    finalNoa,
    finalNoaDate,
  } = doc;
  const onShowPreviewClicked = (evt: React.MouseEvent<HTMLButtonElement>) => {};
  const onDownloadClicked = (evt: React.MouseEvent<HTMLButtonElement>) => {};
  const gridContainerProps = {
    display: "flex",
    container: true,
    //åborder: "1px solid #ccc",
  };
  const gridItemProps = {
    display: "flex",
    justifyContent: "center",
    justifyItems: "center",
    alignItems: "center",
    alignContent: "space-around",
    alignSelf: "center",
    //border: "1px solid #ddd",
  };
  const dateToUse = getDatesByDocumentType(doc.decision[0],doc);
  console.log(`//useEffect ~ dateToUse:`, dateToUse);
  return (
    <Grid margin={1} padding={1} {...gridContainerProps}>
      {doc && (
        <>
          <Grid xs={2} {...gridItemProps}>
            <Box
              padding={0.5}
              borderRadius={1}
              border="1px solid #D8D9D9"
            >
              <Box

              //borderRadius={1}
              >
                <Typography padding={0.5} fontSize={12} textAlign={"center"}>
                  <>
                    {dateToUse}                  
                   
                  </>
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid xs={8} {...gridItemProps} className="document-title-column">
            <Button variant="text">
              <Typography textAlign={"center"} fontSize={"1.0rem"}>
                <b>{doc.documentType}</b> - {doc.title}
              </Typography>
            </Button>
          </Grid>
          <Grid xs={2} padding={1} flexDirection={'column'} display={'flex'} alignItems={'center'} alignContent={'center'} justifyContent={'center'}>
             <Grid xs={12} margin={0.25} >
                <Button
                fullWidth
                  variant="outlined"
                  size="small"
                  onClick={(evt) => onShowPreviewClicked(evt)}
                >
                  Preview
                </Button>
             </Grid>
              <Grid xs={12} margin={0.25} >
              <Button
              fullWidth
              size="small"
                variant="outlined"
                onClick={(evt) => onShowPreviewClicked(evt)}
              >
                Details
              </Button>
            </Grid>
            <Grid xs={12}  margin={0.25}>
              <Button
                size="small"
                fullWidth
                variant="outlined"
                style={{
                  border: "1px solid #3373F7",
                }}
                onClick={(evt) => onDownloadClicked(evt)}
              >
                Download
              </Button>
            </Grid>
          </Grid>
        </>
      )}
      <Grid xs={12}>
        <ShowHighlights highlights={highlights} result={result} />
      </Grid>
    </Grid>
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
            {i < 1 || showMoreSnippets && (
              <>
                <Box
                  key={`${result.doc.id}-box`}
                  padding={0}
                  fontSize="0.75rem"
                  className="document-highlight"
                >
                  <Box key={result.doc.id}>
                    {highlight.substring(
                      0,
                      highlight.length < 255 ? highlight.length : 255
                    )}
                    ...
                  </Box>
                </Box>
                <Box
                  key={result.doc.id}
                  padding={0}
                  fontSize="0.75rem"
                  className="document-highlight"
                >
                  {highlights.length > 1 && (
                    <Button
                      onClick={(evt) => setShowMoreSnippets(!showMoreSnippets)}
                      variant="text"
                    >
                      <Typography fontSize={12} color={"#3373F7"}>
                        {" "}
                        Show More Snippets
                      </Typography>
                    </Button>
                  )}
                </Box>
              </>
            )}
          </>
        ))}
      </Box>
    </Box>
  );
}

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
