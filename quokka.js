


const results = [
    {
        id: 1,
        score: 1,
        doc: {
            title: 'Doc Title 1',
            commentDate: '2025-01-01',
        }

    },
    {
        id: 2,
        score: 2,
        doc: {
            title: 'AAA Title 2',
            commentDate: '2021-01-01',
        }

    },
    {
        id: 1,
        score: 1,
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



//TEST SORT BY SCORE
//    let sortBy = "title" | "score" | "commentDate"
let sortBy = "commentDate";

let x = results.sort((a, b) => {
    if (sortBy === 'title') {
        return a.doc.title.localeCompare(b.doc.title);
    } else if(sortBy === 'score') {
        return b.score - a.score;
        // For 'score' and 'commentDate', sort in descending order
        
    }
    else if(sortBy === 'commentDate') {
        return b.doc.commentDate.localeCompare(a.doc.commentDate);
    }
    console.log(`SORTED BY ${sortBy}`, x[0] )
});