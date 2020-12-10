import React from "react";
import { gql } from "@apollo/client/core";
import { useServicesQuery, useAllServicesQuery } from "./generated/graphql";
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

export const ALL_SERVICES_QUERY = gql`
  query AllServices {
    allServices {
      code
      name
    }
  }
`;

const Services = () => {
  const { data } = useServicesQuery({ variables: { countryCode: "0" } });
  const { data: allServicesData } = useAllServicesQuery();

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
        {allServicesData?.allServices.map(({ code, name }) => {
          const addedService = data?.services.find(
            (service) => service.code === code
          );

          return (
            <TableRow
              key={code}
              style={{
                backgroundColor: addedService ? "#008e0094" : "#ff5100a6",
              }}
            >
              <TableCell>
                <img src={`/icons/${code}.png`} width={30} height={30} />
              </TableCell>
              <TableCell>{name}</TableCell>
              <TableCell>{code}</TableCell>
              <TableCell>{addedService?.priceAmount}</TableCell>
              <TableCell>{addedService?.count}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default Services;
