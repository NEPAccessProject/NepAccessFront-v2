
const results = [
    {
        id: 1,
        score: 3,
        doc: {
            title: 'ZZZZZZ',
            commentDate: '2025-01-01',
        }

    },
    {
        id: 3,
        score: 1,
        doc: {
            title: 'BBBBB',
            commentDate: '2021-01-01',
        }

    },
    {
        id: 2,
        score: 2,
        doc: {
            title: 'ZZZZ 3',
            commentDate: '1999-01-01',
        }

    }
]
// Test SortBy Title
//    let sortBy = "title" | "score" | "commentDate"
//     let sortBy = "title"
//     let tmpSorted = results.sort((a, b) => {
//         if (sortBy === 'title') {
//             return a.doc.title.localeCompare(b.doc.title);
//         } else { 
//             For 'score' and 'commentDate', sort in descending order
//             return b[sortBy] - a[sortBy];
//         }
//         console.log(`SORTED BY ${sortBy}`, tmpSorted[0] )
//     });


// TEST SORT BY SCORE
//    let sortBy = "title" | "score" | "commentDate"
//  sortBy = "score"
// let tempScored = results.sort((a, b) => {
//     if (sortBy === 'title') {
//         return a.doc.title.localeCompare(b.doc.title);
//     } else { 
//         For 'score' and 'commentDate', sort in descending order
//         return b[sortBy] - a[sortBy];
//     }
//     console.log(`SORTED BY ${sortBy}`, tempScored[0] )
// });



function sortSearchResults(results,sortBy,sortDir="asc"){
    //console.log(`sortSearchResults ~ results:`, results);
    console.log('STARTING TO SORTBY',sortBy);
    //[TODO] we need to introduce a sort by param that contols if A > B vs B > A IE ascending and descending so the 
    results.sort((a, b) => {
        //lowercase both sides to avoid case sensitivity issues
        if (sortBy.toLowerCase() === 'title') {
            if(sortDir === 'asc'){
                return a.doc.title.localeCompare(b.doc.title);
            }
            else{
                return a.doc.title.localeCompare(b.doc.title);
            }
        } else if (sortBy.toLowerCase() === 'commentDate') {
            let dateA = new Date(a.doc.commentDate);  
            let dateB = new Date(b.doc.commentDate);
            // For 'score' and 'commentDate', sort in descending order
            if(sortDir === 'asc'){
                return dateB.getDate() - dateA.getDate();
            }
            else{
                return dateA.getDate() - dateB.getDate();
            }
         }
         else if (sortBy.toLowerCase() ==='relavancy') {
            //we want those that are MORE relvant then others
            if(sortDir === 'asc'){
                return a.score - b.score
            }
            else {
                return b.score - a.score
            }
         }
         if(sortBy.toLowerCase() === 'relavancy'){
             console.log(`SORTED BY SCORE results`, results);
         }
         if(sortBy.toLowerCase() === 'commentDate'){
             console.log(`SORTED BY DATE results`, results);
         }
         if(sortBy.toLowerCase() === 'title'){
             console.log(`SORTED BY TITLE results`, results);
         }
         return results;
    }
    );
}
{{
    results
}}
// const relevant = sortSearchResults(results,"relavancy")
// {{
//     relevant
// }}
// console.log('SORT BY RELAVANCY',relevant)
const byTitle = sortSearchResults(results,"title","desc")

// console.log('SORT BY TITLE',byTitle)
//const byDate = sortSearchResults(results,"commentDate","desc")
// {{
//       byDate
// }}
// console.log('SORT BY DATE',byDate)