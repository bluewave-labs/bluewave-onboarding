import { ThemeProvider, createTheme } from "@mui/material";
import { PropTypes } from "@mui/material";
import { colors } from "../../Styles";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

export default function CheckIcon({ size, type, color }) {
    const theme = createTheme({
        palette: {
            purple: colors.purple,
            black: colors.black,
            green: colors.green
        }
    });

    const iconSize = size === "small" ? 20 : size === "medium" ? 24 : 28;

    const checkIconStyle = {
        width: iconSize,
        height: iconSize,
        color: color === "purple" || color === "black" ? color : "green",
        ...style
    };

    return (
        <ThemeProvider theme={theme}>
            {(type == 'outline') ?
                <CheckCircleOutlineIcon sx={checkIconStyle} /> :
                <CheckCircleIcon sx={checkIconStyle} />
            }
        </ThemeProvider>
    )
}