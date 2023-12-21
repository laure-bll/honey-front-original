import React from "react";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";

interface SearchBarProps {
  setSearchQuery: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ setSearchQuery }) => (
  <form>
    <TextField
      id="search-bar"
      className="text"
      onChange={(e) => {
        setSearchQuery(e.target.value);
      }}
      sx={{
        backgroundColor: "white",
        borderRadius: "20px",
        width: "260px" 
      }}
      label="Search user"
      variant="outlined"
      placeholder="Search..."
      size="small"
    />
    <IconButton type="submit" aria-label="search">
      <SearchIcon style={{ fill: "white" }} />
    </IconButton>
  </form>
);

export default SearchBar;
