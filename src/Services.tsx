import React from "react";
import { gql } from "@apollo/client/core";
import {
  useServicesQuery,
  useApiServicesQuery,
  useCountriesQuery,
} from "./generated/graphql";
import {
  Box,
  MenuItem,
  Select,
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

export const API_SERVICES_QUERY = gql`
  query ApiServices($servicesApiQueryInput: ServicesApiQueryInput!) {
    apiServices(servicesApiQueryInput: $servicesApiQueryInput) {
      code
      name
      prices {
        price
        count
      }
    }
  }
`;

export const COUNTRIES_QUERY = gql`
  query Countries($countriesQueryInput: CountriesQueryInput) {
    countries(countriesQueryInput: $countriesQueryInput) {
      code
      name
    }
  }
`;

const Services = () => {
  const [countryCode, setCountryCode] = React.useState("0");

  const { data: countriesData } = useCountriesQuery();
  const { data } = useServicesQuery({ variables: { countryCode } });
  const { data: apiServicesData } = useApiServicesQuery({
    variables: { servicesApiQueryInput: { country: countryCode } },
  });

  const handleCountryChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setCountryCode(event.target.value as string);
  };

  return (
    <>
      <Box py={3}>
        <Select value={countryCode} onChange={handleCountryChange}>
          {countriesData?.countries.map(({ code, name }) => (
            <MenuItem value={code} key={code}>
              {name} ({code})
            </MenuItem>
          ))}
        </Select>
      </Box>
      <Table size="small">
        <TableHead>
          <TableCell>#</TableCell>
          <TableCell>name</TableCell>
          <TableCell>code</TableCell>
          <TableCell>priceAmount</TableCell>
          <TableCell>count</TableCell>
        </TableHead>
        <TableBody>
          {apiServicesData?.apiServices.map(({ code, name }) => {
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
    </>
  );
};

export default Services;
