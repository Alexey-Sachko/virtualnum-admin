import { ApolloProvider } from "@apollo/client";
import React from "react";
import { client } from "./client";

import Services from "./Services";

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <header className="App-header">header</header>
        <Services />
      </div>
    </ApolloProvider>
  );
}

export default App;
