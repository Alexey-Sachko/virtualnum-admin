import React from "react";
import { gql } from "@apollo/client/core";
import { useServicesQuery } from "./generated/graphql";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";

export const SERVICES_QUERY = gql`
  query Services($countryCode: String!) {
    services(countryCode: $countryCode) {
      id
      code
      name
      priceAmount
      count
    }
  }
`;

const Services = () => {
  const { data } = useServicesQuery({ variables: { countryCode: "0" } });

  return (
    <Table size="small">
      <TableHead>
        <TableCell>#</TableCell>
        <TableCell>name</TableCell>
        <TableCell>code</TableCell>
        <TableCell>priceAmount</TableCell>
        <TableCell>count</TableCell>
      </TableHead>
      <TableBody>
        {data?.services.map(({ code, count, id, name, priceAmount }) => (
          <TableRow key={id}>
            <TableCell>
              <img src={`/icons/${code}.png`} width={30} height={30} />
            </TableCell>
            <TableCell>{name}</TableCell>
            <TableCell>{code}</TableCell>
            <TableCell>{priceAmount}</TableCell>
            <TableCell>{count}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default Services;
