import { createTheme, Theme } from '@mui/material';
import { common, grey, orange, red } from '@mui/material/colors';
import { ThemeOptions } from '@mui/material/styles';

declare module "@mui/material/styles" {
  interface TypographyVariants {
		filterLabel: React.CSSProperties;
	}

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    filterLabel?: React.CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
		filterLabel: true;
	}
}

 const theme: Theme = createTheme({
		palette: {
			mode: 'light',
			primary: {
				main: '#3D669C',
				contrastText: common.white,
			},
			secondary: {
				main: '#abbdc4',
				contrastText: common.white,
			},
			error: {
				main: red.A400,
				contrastText: common.white,
			},
			warning: {
				main: orange.A400,
				contrastText: common.white,
			},
      text: {
        primary:"#000",
        secondary: "#222",
      },
			// primary: {
			//   main: "#9eabae",
			// },
			// secondary: {
			//   main: "#80a9ff",
			// },
		},
		typography: {
			fontFamily: ['open-sans','sans-serif'].join(','),
			fontSize: 12,
			filterLabel: {
				fontSize: '0.9rem',
			},
			// resultsTitle: {
			//   fontSize: "1.6rem",
			//   fontColor: "#80a9ff",
			//   display: 'block',
			//   paddingLeft: 8,

			// },
			h1: {
				fontSize: '2.0rem',
				padding: 4,
				border: 1,
				display: 'block',
				lineHeight: '2.2rem',
				fontFamily: 'Roboto, sans-serif',
			},
			h2: {
				fontSize: '1.8rem',
				lineHeight: '2.0rem',
				fontFamily: 'Roboto, sans-serif',
			},
			h3: {
				fontSize: '1.6rem',
				lineHeight: '1.8rem',
				fontFamily: 'Roboto, sans-serif',
			},
			h4: {
				fontFamily: 'Roboto, sans-serif',
				lineHeight: '1.6rem',
				fontSize: '1.4rem',
			},
			h5: {
				fontFamily: 'Roboto, sans-serif',
				lineHeight: '1.4rem',
                fontSize: '1.2rem'
			},
			h6: {
				fontSize: '1rem',
				lineHeight: '1.2rem',
				fontFamily: 'Roboto, sans-serif',
			},
			caption: {
				fontSize: '0.9rem',
				fontFamily: 'Roboto, sans-serif',
            },
            subtitle1: {
                fontSize: '0.9rem',
				fontFamily: 'Roboto, sans-serif',
            },
			subtitle2: {
				fontSize: '0.7rem',
			},
		},

		shape: {
		},
		components: {
			// Name of the component
      MuiFormLabel: {
        styleOverrides: {
          root: {
            fontSize: 14,
            color: grey.A700
          }
        }
      },
      //example theme override
			MuiButton: {
				styleOverrides: {
					// Name of the slot
					root: {
						// Overwrite defaults
						
					},
				},
			},
      MuiFormControlLabel: {
        styleOverrides: {
          label: "This is a label?",
          root: {
            fontSize: 12,
            color: grey[700],


          }
        }
      }
			// MuiFormControlLabel: {
			// 	styleOverrides: {
			// 		// Name of the slot
			// 		root: {
			// 			// Some CSS
			// 			backgroundColor: grey.A400,
			// 			fontSize: 100,
			// 		},
			// 	},
			// },
		},
		// MuiPaper: {
		//   root: {
		//     "& .MuiPaper-root": {
		//       borderRadius: "100px",
		//       backgroundColor:"#222",
		//       boxShadow: "10px 10px 5px 0px rgba(0,0,0,0.75);"
		//     }
		//   }
		// }
		// overrides: {
		//       MuiFormLabel: {
		//         root: {
		//           fontSize: 30,
		//           fontColor: orange
		//         },

		//       },
		//       MuiPaper: {
		//         backgroundColor: 'blue',
		//         root: {
		//           backgroundColor: 'red',
		//           border: 6
		//         }
		//       },
		//       MuiAppBar: {
		//         root: {
		//           backgroundColor: "#1976d2",
		//           fontColor: "#fff",
		//         },
		//       },
		//       MuiButton: {
		//         margin: 10,
		//         root: {

		//           background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
		//           fontColor: "#fff",
		//           border: 0,
		//           padding: 30,
		//           margin: 5,
		//           boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
		//           color: "white",
		//           height: 48,
		//         },
		//       },
 });

  export default theme;
