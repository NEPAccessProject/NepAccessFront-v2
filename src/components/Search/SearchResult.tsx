import {
  DocumentType,
  SearchResultPropsType,
  SearchResultType,
} from "@/components/interfaces/interfaces";
import { Button, Typography, Divider, Box } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { useContext } from "react";
import SearchContext from "./SearchContext";
import SearchResultCards from "./SearchResultCards";
import { register } from "module";
import { BorderBottom, BorderColor, BorderTop } from "@mui/icons-material";

const SearchResult = (props: SearchResultPropsType) => {
  const result: SearchResultType = props.result;
  const doc: DocumentType = result.doc;
  const context = useContext(SearchContext);
  console.log("🚀 ~ SearchResult ~ context:", context);
  //const {action,commentDate,agency} = doc;
  const { filters } = context;
  const {
    actions,
    actionsRaw,
    agencies,
    agenciesRaw,
    cooperatingAgency,
    cooperatingAgencyRaw,
    county,
    countyRaw,
    decisions,
    decisionsRaw,
  } = filters;

  const GridContainerProps = {
    //  borderLeft: "1px solid #eee",
    display: "flex",
    //    justifyContent: "center",
    padding: 1,
    BorderBottom: 1,
    BorderTop: 1,
    BorderColor: "#eee",
    container: true,
    flex: 1,
  };

  const GridItemProps = {
    spacing: 1,
    flex: 1,
    // borderLeft: "none",
    // borderRight: "1px solid #eee",
    border: "1px solid #eee",
    display: "flex",
    justifyContent: "center",
    justifyItems: "center",
    alignContent: "center",
    alignItems: "center",
    "&:hover": {
      //           backgroundColor: //theme.palette.grey[200],
      boxShadow: "0px 4px 8px rgba(0.5, 0.5, 0.5, 0.15)",
      cursor: "pointer",
      "& .addIcon": {
        color: "purple",
      },
    },
  };
  const {
    commentDate,
    title,
    agency,
    status,
    documentType,
    decision,
    registerDate,
    action,
  } = doc;
  return (
    <>
      <Grid xs={12} {...GridContainerProps} flex={1}>
        <Grid xs={12} {...GridContainerProps}>
          <Grid {...GridItemProps} border={0} xs={12}>
            <Typography variant="h5">{title}</Typography>
          </Grid>
        </Grid>
        <Grid container xs={12}>
          <Grid xs={2} {...GridItemProps}>
            {documentType}
          </Grid>
          <Grid xs={2} {...GridItemProps}>
            {action}
          </Grid>
          <Grid xs={3} {...GridItemProps}>
            {`${registerDate ? registerDate : "N/A"}`}
          </Grid>
          <Grid xs={3} {...GridItemProps}>
            {`${status ? status : "N/A"}`}
          </Grid>
          <Grid xs={2} {...GridItemProps}>
            <Button variant="contained" color="primary">Download</Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid xs={12} {...GridContainerProps}>
        <Grid {...GridItemProps} xs={12} padding={1}>
          <Typography variant="body2">
            urna molestie at. Sollicitudin ac orci phasellus egestas tellus
            rutrum tellus. Quam quisque id diam vel quam elementum pulvinar.
            Elit pellentesque habitant morbi tristique senectus.
          </Typography>
        </Grid>
      </Grid>
    </>
  );
  //   return (
  //     <>
  //       <Grid
  //         className="search-result-container"
  //         {...GridContainerProps}
  //         borderBottom={1}
  //         borderColor={"#eee"}
  //         style={{ ...style }}
  //         { ...GridContainerProps }
  //       >
  // <b>      {doc.title}</b>
  //         <Grid {...GridItemProps} xs={12}>
  //           <Typography
  //             variant="h6"
  //             color="textSecondary"
  //             style={{ margin: 0, padding: 0 }}
  //           ></Typography>
  //           <SearchResultCards result={result} />
  //         </Grid>
  //         <Grid {...GridItemProps} xs={12}>
  //           <Typography variant="h3">{doc.title}</Typography>
  //         </Grid>
  //         <Grid
  //           {...GridContainerProps}
  //           display={"flex"}
  //           borderBottom={1}
  //           borderTop={1}
  //           borderColor={"#eee"}
  //           borderLeft={0}
  //           container
  //         >
  //           <Grid item {...GridItemProps} xs={1} borderLeft={0}>
  //             <Typography
  //               justifyContent={"center"}
  //               alignContent={"center"}
  //               variant="h6"
  //             >
  //               {doc.docuxmentType}
  //             </Typography>
  //           </Grid>x
  //           <Grid item {...GridItemProps} xs={1} flex={1}>
  //             <Typography>
  //               {doc.commentDate
  //                 ? new Date(doc.commentDate).toLocaleDateString()
  //                 : "N/A"}
  //             </Typography>
  //           </Grid>
  //           <Grid  item {...GridItemProps} xs={6}>
  //             {`${doc.title}`}
  //           </Grid>
  //           <Grid item {...GridItemProps} xs={2} flex={1} style={{ ...style }}>
  //             <Button variant="contained">Download</Button>
  //           </Grid>
  //         </Grid>
  //         <Grid item {...GridItemProps} xs={12}>
  //           <Typography variant="body2">
  //             urna molestie at. Sollicitudin ac orci phasellus egestas tellus
  //             rutrum tellus. Quam quisque id diam vel quam elementum pulvinar.
  //             Elit pellentesque habitant morbi tristique senectus.
  //           </Typography>
  //         </Grid>
  //       </Grid>
  //     </>
  //   );
};

export default SearchResult;
