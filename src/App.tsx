import { ApolloProvider } from "@apollo/client";
import { Grid } from "@material-ui/core";
import React from "react";
import { client } from "./client";

import Services from "./Services";

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Grid container justify="center">
          <Grid item sm={8}>
            <Services />
          </Grid>
        </Grid>
      </div>
    </ApolloProvider>
  );
}

export default App;
