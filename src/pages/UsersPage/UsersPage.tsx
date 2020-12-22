import { gql } from "@apollo/client";
import React from "react";
import MaterialTable from "material-table";

import { useUsersQuery } from "../../generated/graphql";

export const GET_USERS_QUERY = gql`
  query Users {
    users {
      id
      email
      balance
      role {
        id
        name
        permissions
      }
    }
  }
`;

export const UsersPage = React.memo(() => {
  const { data } = useUsersQuery();

  const mutableRows = data?.users.map((item) => ({ ...item })) || [];

  return (
    <MaterialTable
      columns={[
        { title: "#id", field: "id" },
        { title: "email", field: "email" },
        { title: "balance", field: "balance", type: "numeric" },
      ]}
      data={mutableRows}
      title="Demo Title"
    />
  );
});

UsersPage.displayName = "UsersPage";
