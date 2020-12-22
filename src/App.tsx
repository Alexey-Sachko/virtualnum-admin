import { ApolloProvider } from "@apollo/client";
import { AppBar, Button, Grid, Toolbar, Typography } from "@material-ui/core";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { client } from "./client";
import { Navbar } from "./Navbar";
import { ServicesPage } from "./pages/ServicesPage";
import { UsersPage } from "./pages/UsersPage";

function App() {
  return (
    <Router>
      <ApolloProvider client={client}>
        <div className="App">
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6">Admin</Typography>
            </Toolbar>
          </AppBar>
          <Grid container justify="center" spacing={2}>
            <Grid item xs={2}>
              <Navbar />
            </Grid>
            <Grid item sm={9}>
              <Switch>
                <Route path="/users">
                  <UsersPage />
                </Route>
                <Route path="/" exact>
                  <ServicesPage />
                </Route>
              </Switch>
            </Grid>
          </Grid>
        </div>
      </ApolloProvider>
    </Router>
  );
}

export default App;
