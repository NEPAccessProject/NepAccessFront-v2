
// onFragmentSizeChange = (evt) => {

//     this.setState({
//       fragmentSizeValue: evt.value,
//       fragmentSize: evt,
//     });
//   };
  
//   onAgencyChange = (evt, selected, reason) => {
  
  
//     let agencies = [];
//     if (reason === "selectOption") {
//       agencies = this.state.agency || [];
//       selected.map(s => {
  
//         return agencies.push(s.value);
//       });
//     }
//     else if (reason === "removeOption") {
//       agencies = this.state.agency.filter((v) => selected.value !== v.value);
//     }
  
//     this.setState(
//       {
//         agency: agencies,//selected,
//         agencyRaw: evt,
//       },
//       () => {
//         this.filterResultsBy(this.state);
//       }
//     );
//   };
  
//   onActionChange = (evt, selected, reason) => {
  
  
  
//     let actions = [];
//     if (reason === "selectOption") {
//       actions = this.state.action || [];
//       selected.map(s => {
//         return actions.push(s.value);
//       });
//     }
//     else if (reason === "removeOption") {
  
//       actions = this.state.action.filter((v) => selected.value !== v.value);
//     }
  
//     //[TODO] remove these from event handlers once the value arg is passed consistently
//     this.setState(
//       {
//         action: actions,//selected.replace(/ \([A-Z]*\)/gi, ""),
//         actionRaw: evt,
//       },
//       () => {
//         this.filterResultsBy(this.state);
//       }
//     );
//   };
  
//   onLocationChange = (evt, selected, reason) => {
//     console.log(`file: Search.js:499 ~ Search ~ selected, reason:`, selected, reason);
//     let states = [];
//     let countyOptions = [];
  
//     if (reason === 'selectOption') {
//       states = state.state || [];
//       selected.map(s => {
//         states.push(s.value)
//       })
//     }
//     else if (reason === "removeOption") {
//       states = this.state.state.filter((v) => selected.value !== v.value);
//     }
//     countyOptions = this.narrowCountyOptions(selected);
  
//     this.setState(
//       {
//         state: states,
//         stateRaw: selected,
//         countyOptions: countyOptions,
//       },
//       () => {
//         console.log(`file: Search.js:502 ~ Search ~ UPDATED STATE - Before Sorting:`, this.state);
//         this.filterResultsBy(this.state);
//         this.onCountyChange(
//           this.state.countyOptions.filter((countyObj) => {
  
//             const matches = this.state.county.includes(countyObj.value)
//             console.log(`file: Search.js:507 ~ Search ~ this.state.countyOptions.filter ~ matches:`, matches);
//             return matches;
//           })
//         );
//       }
//     );
//   };
  
//   //Wraps the map's onClick event to match the signature of the onLocation change
//   onMapLocationChange(_stateRaw, evt) {
//     this.onLocationChange(evt, _stateRaw, "selectOption")
//   }
//   /** Helper method for onLocationChange limits county options to selected states in filter,
//    * or resets to all counties if no states selected */
//   narrowCountyOptions = (stateValues) => {
//     /** Filter logic for county array of specific label/value format given array of state abbreviations  */
//     function countyFilter(stateValues) {
//       return function (a) {
//         const matches = stateValues.some(item => a.label.split(":")[0] === item.value);
//         return matches;
//       };
//     }
  
//     let filteredCounties = Globals.counties;
//     if (stateValues && stateValues.length > 0) {
//       filteredCounties = filteredCounties.filter(countyFilter(stateValues));
//     }
//     return filteredCounties;
//   };
//   //wraps the map's on county change event to the signature of the county filter
//   onMapCountyChange = (selected) => {
//     this.onCountyChange("", selected, "selectOption");
//   };
//   onCountyChange = (evt, selected, reason) => {
//     let counties = [];
//     if (reason && reason === 'selectOption') {
//       //[TODO] Debuging only reseting state
//       //counties = this.state.county || [];
//       if (_.isArray(selected)) {
//         selected.map(s => {
//           counties.push(s.value)
//         })
//       }
//       else if (!reason && evt.length) {
//         evt.map(s => {
//           counties.push(s.value)
//         })
  
//       }
//       else if (reason && reason === "removeOption") {
//         counties = this.state.county || [];
//         if (this.state.county && this.state.county.length > 0) {
//           selected.map(s => {
//             counties = counties.filter(county => county === s.value)
//           })
//         }
//       }
//       else {
//         counties.push(selected.value)
  
//       }
  
  
//       this.setState(
//         {
//           county: counties,
//           countyRaw: evt,
//         },
//         () => {
//           this.filterResultsBy(this.state);
//         }
//       );
//     }
//   }
//   filterCounties = (states) => {
//     //filter out counties not in the selected state(s)
//     const countyOptions = this.narrowCountyOptions(states);
  
//     //match the signature of onCountyChange, so it can be called from here
//     const reason = "selectOption";
  
//     this.setState(
//       {
//         state: states,
//         countyOptions: countyOptions,
//       },
//       () => {
//         this.filterResultsBy(this.state);
//         // Purge invalid counties, which will then run filterBy
  
//         this.onCountyChange(
//           this.state.countyOptions.filter(countyObj => this.state.county.includes(countyObj.value)));
  
//         //[TODO] FIX THIS
//         this.onCountyChange(
//           this.state.countyOptions.filter((countyObj) => {
  
//             const matches = this.state.county.includes(countyObj.value)
//             return matches;
//           }),
//           states,
//           reason,
//         );
//       }
//     );
//   }