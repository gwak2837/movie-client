import React from "react";
import Router from "Router";
import { ApolloProvider } from "@apollo/client";
import { client } from "apollo/client";

function App() {
  return (
    <ApolloProvider client={client}>
      <Router />
    </ApolloProvider>
  );
}

export default App;
