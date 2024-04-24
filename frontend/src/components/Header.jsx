import { Typography, Box } from "@mui/material";

const Header = ({ title, subtitle }) => {
  return (
    <Box mb="30px">
        <Typography
            variant="h2"
            fontWeight="bold"
        >
            {title}
        </Typography>
        <Typography variant="h5">
            {subtitle}
        </Typography>
    </Box>
  );
};

export default Header;