import React from "react";
import { gql } from "@apollo/client/core";
import {
  useServicesQuery,
  useApiServicesQuery,
  useCountriesQuery,
} from "../generated/graphql";
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
import Service from "./Service";

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
  const { data, refetch } = useServicesQuery({ variables: { countryCode } });
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
          <TableCell width={"7%"}>priceAmount</TableCell>
          <TableCell>count</TableCell>
          <TableCell>apiPrices</TableCell>
          <TableCell>Actions</TableCell>
        </TableHead>
        <TableBody>
          {apiServicesData?.apiServices.map((service) => {
            const addedService = data?.services.find(
              (serv) => service.code === serv.code
            );

            return (
              <Service
                addedService={addedService}
                service={service}
                key={service.code}
                countryCode={countryCode}
                refetchAdded={refetch}
              />
            );
          })}
        </TableBody>
      </Table>
    </>
  );
};

export default Services;
