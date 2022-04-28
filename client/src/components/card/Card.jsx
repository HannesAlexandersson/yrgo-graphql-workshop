import CardContent from "@mui/material/CardContent";
import MuiCard from "@mui/material/Card";
import Typography from "@mui/material/Typography";

export const Card = ({ description, title }) => {
  return (
    <MuiCard sx={{ bgcolor: "background.paper" }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2">{description}</Typography>
      </CardContent>
    </MuiCard>
  );
};
