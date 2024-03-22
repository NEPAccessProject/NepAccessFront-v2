import { createTheme, Theme,Typography,TypographyProps,styled} from '@mui/material';
import { common, grey, orange, red } from '@mui/material/colors';

declare module "@mui/material/styles" {
	interface TypographyVariants {
	  h1Bold: React.CSSProperties;
	  link: React.CSSProperties;
	  header: React.CSSProperties;
	  filterLabel: React.CSSProperties;

	}
  
	// allow configuration using `createTheme`
	interface TypographyVariantsOptions {
	  h1Bold?: React.CSSProperties;
	  filterLabel?: React.CSSProperties;
	error?: React.CSSProperties;
	link?: React.CSSProperties;
	title?: React.CSSProperties;
	header?: React.CSSProperties;
	}
  interface TypographyPropsVariantOverrides {
    h1Bold: true;
	link: true;
	resultsTitle: true;
	title: true;
  }
}



const CustomTypography = styled(Typography)<TypographyProps>(({ theme }) => ({
	fontSize: 18,
	fontWeight: 600,
	[theme.breakpoints.up("xs")]: {
	  textAlign: "center",
	},
	[theme.breakpoints.up("md")]: {
	  textAlign: "left",
	},
  }));

 const theme: Theme = createTheme({
		palette: {
			mode: 'light',
			primary: {
				main: '#3D669C',
				contrastText: common.white,
			},
			secondary: {
				main: '#abbdc4',
				contrastText: common.black,
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
				primary:"#010D35",
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
			// resultsTitle: {
			//   fontSize: "1.6rem",
			//   fontColor: "#80a9ff",
			//   display: 'block',
			//   paddingLeft: 8,

			// },
			header: {
				color: "#80a9ff",
				fontSize: "1.6rem",
                fontWeight: 600,
			},
			link: {
				fontSize: '1.4rem',
				color: "#3373F7",
				display: 'block',
				paddingTop: 3,
				paddingBottom: 3,
			},
			filterLabel: {
				fontSize: '0.8rem',
				color: grey.A700,
				fontWeight: 'bolder',
				display: 'block',
				paddingTop: 6,
				paddingBottom: 3,
			},
			h1: {
				fontSize: '1.5rem',
				padding: 2,
				border: 1,
				display: 'block',
				fontFamily: 'Roboto, sans-serif',
				
			},
			h2: {
				fontSize: '1.3rem',
				fontFamily: 'Roboto, sans-serif',
			},
			h3: {
				fontSize: '1.2rem',
				lineHeight: '2rem',
				fontFamily: 'Roboto, sans-serif',
				padding: 2,
			},
			h4: {
				fontFamily: 'Roboto, sans-serif',
				fontSize: '1.1rem',
			},
			h5: {
				fontFamily: 'Roboto, sans-serif',
				lineHeight: '2rem',
                fontSize: '1rem'
			},
			h6: {
				fontSize: '0.9rem',
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
		MuiChip: {
			styleOverrides: {
                // Name of the slot
                root: {
                    background:"#ECF5F6"                    
                },
            },
		},
			MuiTypography: {
				styleOverrides: {
					
				}
			}
		}
	}
); 
   export default theme;
