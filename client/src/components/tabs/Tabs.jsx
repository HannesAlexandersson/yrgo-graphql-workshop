import { useState } from "react";
import PropTypes from "prop-types";
import MuiTabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import AddCircle from "@mui/icons-material/AddCircle";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Typography from "@mui/material/Typography";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export const Tabs = ({
  books,
  authors,
  handleRemoveBook,
  handleRemoveAuthor,
  onRowClick,
  toggleModal,
  setCurrentTab,
  tabs,
}) => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    onRowClick(null);
    setCurrentTab(tabs[newValue]);
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <MuiTabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Authors" {...a11yProps(0)} />
          <Tab label="Books" {...a11yProps(1)} />
        </MuiTabs>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          padding: "2em 0",
        }}
      >
        <Button onClick={toggleModal} variant="contained">
          Add something <AddCircle sx={{ marginLeft: "0.5em" }} />
        </Button>
      </Box>
      <TabPanel value={value} index={0}>
        <List
          sx={{
            overflow: "auto",
            width: "100%",
            maxHeight: 300,
            marginBottom: "16px",
            bgcolor: "background.paper",
          }}
        >
          {authors ? (
            authors.map((author) => (
              <ListItem
                key={author._id}
                secondaryAction={
                  <IconButton onClick={() => handleRemoveAuthor(author._id)}>
                    <DeleteOutlineIcon />
                  </IconButton>
                }
              >
                <ListItemButton
                  onClick={() => {
                    onRowClick({
                      title: author.name,
                      // Good job making it this far
                      // can you figure how to add the description in your data?
                      description: "No description found",
                    });
                  }}
                >
                  <ListItemText primary={author.name} />
                </ListItemButton>
              </ListItem>
            ))
          ) : (
            <ListItem>
              <Typography>No authors found :(</Typography>
            </ListItem>
          )}
        </List>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <List
          sx={{
            overflow: "auto",
            width: "100%",
            maxHeight: 300,
            marginBottom: "16px",
            bgcolor: "background.paper",
          }}
        >
          {books ? (
            books.map((book) => (
              <ListItem
                key={book._id}
                secondaryAction={
                  <IconButton onClick={() => handleRemoveBook(book._id)}>
                    <DeleteOutlineIcon />
                  </IconButton>
                }
              >
                <ListItemButton
                  onClick={() => {
                    onRowClick({
                      title: book.title,
                      // Good job making it this far
                      // can you figure how to add the description in your data?
                      description: "No description found",
                    });
                  }}
                >
                  <ListItemText primary={book.title} />
                </ListItemButton>
              </ListItem>
            ))
          ) : (
            <ListItem>
              <Typography>No books found :(</Typography>
            </ListItem>
          )}
        </List>
      </TabPanel>
    </Box>
  );
};
