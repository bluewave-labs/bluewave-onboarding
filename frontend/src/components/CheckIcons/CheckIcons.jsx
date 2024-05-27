import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import {ThemeProvider, createTheme} from '@mui/system';
import PropTypes from 'prop-types';

/**
 * Check icon components for both HRM and Onboarding applications. Can be configured to be an
 * outline or solid icon using prop values.
 * 
 * Props:
 * - type<String>: Determines the type of the check circle. 
 *      Valid values: ['outline', 'solid']
 * 
 * - size<String>: Determines the size of the check circle.
 *      Valid values: ['small', 'medium', 'large']
 * 
 * - color<String>: Determines the color of the check circle.
 *      Valid values: ['purple', 'black', 'green']
 * 
 * - style<Object>: Optional prop for adding further inline styling 
 *      Default: {}
 */
export default function CheckIcon({type, size, color, style}) {
    const theme = createTheme({
        palette: {
            purple: "#7F56D9",
            black: "#475467",
            green: "#079455"
        }
    });

    const checkStyle = {...{
        width: size == "small" ? 20 : size == "medium" ? 24 : 28,
        height: size == "small" ? 20 : size == "medium" ? 24 : 28,
        color: color == "purple" ? "purple" : color == "black" ? "black" : "green" 
    }, ...style};

    return (
        <ThemeProvider theme={theme}>
            {(type == "outline") ?
                <CheckCircleOutlineIcon sx={checkStyle} /> :
                <CheckCircleIcon sx={checkStyle} />
            }
        </ThemeProvider>
    );
};

//Control panel settings for storybook 
CheckIcon.propTypes = {
    //Check circle type
    type: PropTypes.oneOf(['outline', 'solid']),

    //Check circle size
    size: PropTypes.oneOf(['small', 'medium', 'large']),

    //Check circle color
    color: PropTypes.oneOf(['purple', 'black', 'green'])
};

//Default values for this component
CheckIcon.defaultProps = {
    style: {}
};