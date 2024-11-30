import { Box, CircularProgress } from "@mui/material";

export default function Loader() {
  return (
    <Box align="center" sx={{ marginTop: 20 }}>
      <CircularProgress />
    </Box>
  );
}
