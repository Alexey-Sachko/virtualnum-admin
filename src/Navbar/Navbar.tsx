import { List, ListItem } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";

export const Navbar = React.memo(() => {
  const history = useHistory();
  return (
    <List>
      <ListItem button onClick={() => history.push("/")}>
        Services
      </ListItem>
      <ListItem button onClick={() => history.push("/users")}>
        Users
      </ListItem>
    </List>
  );
});

Navbar.displayName = "Navbar";
