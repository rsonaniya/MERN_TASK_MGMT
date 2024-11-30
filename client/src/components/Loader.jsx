import { Box, CircularProgress, Typography } from "@mui/material";

export default function Loader() {
  return (
    <Box align="center" sx={{ marginTop: 10 }}>
      <CircularProgress />
      <Typography>
        Please Expect a delay in the response as the API has been hosted on free
        tier of render
      </Typography>
    </Box>
  );
}
