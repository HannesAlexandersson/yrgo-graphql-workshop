import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

export const Main = ({ children }) => {
  return (
    <Container maxWidth="md">
      <Box sx={{ margin: "48px 0" }}>
        <Typography variant="h1">Bibl.io</Typography>
      </Box>
      <Box>{children}</Box>
    </Container>
  );
};
