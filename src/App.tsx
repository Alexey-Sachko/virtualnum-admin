import { ApolloProvider } from "@apollo/client";
import { Grid } from "@material-ui/core";
import React from "react";
import { client } from "./client";

import Services from "./Services";

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Grid container>
          <Grid item sm={3}>
            left menu
          </Grid>
          <Grid item sm={9}>
            <Services />
          </Grid>
        </Grid>
      </div>
    </ApolloProvider>
  );
}

export default App;
