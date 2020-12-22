import React from "react";
import { gql } from "@apollo/client/core";
import {
  useServicesQuery,
  useApiServicesQuery,
  useCountriesQuery,
  useSaveServicesWithPricesMutation,
} from "../../../generated/graphql";
import {
  Box,
  Button,
  Grid,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
} from "@material-ui/core";
import Service, { OnSaveParams } from "./Service";

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

export const SAVE_SERVICES_QUERY = gql`
  mutation SaveServicesWithPrices(
    $countryCode: String!
    $servicesWithPrices: [CreateServiceWithPricesDto!]!
  ) {
    saveServicesWithPrices(
      countryCode: $countryCode
      servicesWithPrices: $servicesWithPrices
    ) {
      path
      message
    }
  }
`;

const topCodes = ["vk", "ym", "ma", "dt"];

const PROFIT_FACTOR = 1.1;

const Services = () => {
  const [countryCode, setCountryCode] = React.useState("0");

  const { data: countriesData } = useCountriesQuery();
  const { data, refetch } = useServicesQuery({ variables: { countryCode } });
  const { data: apiServicesData } = useApiServicesQuery({
    variables: { servicesApiQueryInput: { country: countryCode } },
  });
  const [saveServices, { loading }] = useSaveServicesWithPricesMutation();

  const mutableServices = [...(apiServicesData?.apiServices || [])];

  const apiServices = mutableServices.sort((a, b) => {
    const indexA = topCodes.indexOf(a.code);
    const indexB = topCodes.indexOf(b.code);

    if (indexA !== -1 && indexB !== -1) {
      return indexA - indexB;
    }

    return indexB - indexA;
  });

  const handleCountryChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setCountryCode(event.target.value as string);
  };

  const saveServicesCb = React.useCallback(
    async (items: { code: string; price: number }[]) => {
      const res = await saveServices({
        variables: {
          countryCode,
          servicesWithPrices: items.map(({ price, code }) => ({ price, code })),
        },
      });
      refetch();
    },
    [countryCode, refetch, saveServices]
  );

  const onSaveService = React.useCallback(
    (service: OnSaveParams) => {
      return saveServicesCb([service]);
    },
    [saveServicesCb]
  );

  const services = React.useMemo(
    () =>
      apiServices?.map((service) => {
        const addedService = data?.services.find(
          (serv) => service.code === serv.code
        );

        return {
          apiService: service,
          addedService,
        };
      }),
    [apiServices, data?.services]
  );

  const onCreateAll = () => {
    const servicesToSave = services
      ?.filter(({ addedService }) => !addedService)
      .map(({ apiService: { code, prices } }) => ({
        code,
        price: prices[prices.length - 1].price,
      }));

    if (servicesToSave && servicesToSave.length) {
      saveServicesCb(servicesToSave);
    }
  };

  const onPriceUp = () => {
    const servicesToSave = services
      ?.filter(({ addedService }) => addedService && addedService.count <= 0)
      .map(({ apiService: { code, prices } }) => ({
        code,
        price: Math.round(prices[prices.length - 1].price * PROFIT_FACTOR) + 1,
      }));

    console.log(
      servicesToSave,
      services?.filter(
        ({ addedService }) => addedService && addedService.count <= 0
      )
    );

    if (servicesToSave && servicesToSave.length) {
      saveServicesCb(servicesToSave);
    }
  };

  return (
    <>
      <Box py={3}>
        <Grid container spacing={5}>
          <Grid item>
            <Select value={countryCode} onChange={handleCountryChange}>
              {countriesData?.countries.map(({ code, name }) => (
                <MenuItem value={code} key={code}>
                  {name} ({code})
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item>
            <Button color="secondary" variant="outlined" onClick={onCreateAll}>
              Create All
            </Button>
          </Grid>
          <Grid item>
            <Button color="primary" variant="outlined" onClick={onPriceUp}>
              Up price
            </Button>
          </Grid>
        </Grid>
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
          {services?.map(({ addedService, apiService }) => (
            <Service
              addedService={addedService}
              service={apiService}
              key={apiService.code}
              countryCode={countryCode}
              onSave={onSaveService}
            />
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default Services;
