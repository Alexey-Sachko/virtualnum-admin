import { gql } from "@apollo/client";
import { IconButton, TableCell, TableRow, TextField } from "@material-ui/core";
import {
  Add as AddIcon,
  Cancel as CancelIcon,
  Done as DoneIcon,
  Edit as EditIcon,
} from "@material-ui/icons";
import React from "react";
import {
  ApiServicesQuery,
  ServicesQuery,
  useSaveServicesWithPricesMutation,
} from "../generated/graphql";

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

const Service = ({
  addedService,
  service,
  countryCode,
  refetchAdded,
}: {
  service: ApiServicesQuery["apiServices"][number];
  addedService: ServicesQuery["services"][number] | undefined;
  countryCode: string;
  refetchAdded: () => void;
}) => {
  const [saveServices, { loading }] = useSaveServicesWithPricesMutation();

  const [isEditing, setIsEditing] = React.useState(false);
  const [priceAmount, setPriceAmount] = React.useState(0);

  const { code, name, prices } = service;
  const minPrice = prices[0];
  const maxPrice = prices[prices.length - 1];

  const handleClickEdit = () => {
    setIsEditing(true);
    if (addedService) {
      setPriceAmount(addedService.priceAmount || 0);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleDoneEdit = async () => {
    const res = await saveServices({
      variables: {
        countryCode,
        servicesWithPrices: [{ code: service.code, price: priceAmount }],
      },
    });
    refetchAdded();
    setIsEditing(false);
  };

  const handlePriceAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const num = parseFloat(value);
    setPriceAmount(isNaN(num) ? 0 : num);
  };

  React.useEffect(() => {
    if (addedService) {
      setPriceAmount(addedService.priceAmount || 0);
    }
  }, [addedService]);

  return (
    <TableRow
      style={{
        backgroundColor: addedService ? "#008e0094" : "#ff5100a6",
      }}
    >
      <TableCell>
        <img src={`/icons/${code}.png`} width={30} height={30} />
      </TableCell>
      <TableCell>{name}</TableCell>
      <TableCell>{code}</TableCell>
      <TableCell>
        {isEditing ? (
          <TextField value={priceAmount} onChange={handlePriceAmountChange} />
        ) : (
          addedService?.priceAmount
        )}
      </TableCell>
      <TableCell>{addedService?.count}</TableCell>
      <TableCell>
        {minPrice.price}—{maxPrice.price}
      </TableCell>
      <TableCell>
        {isEditing ? (
          <>
            <IconButton size="small" onClick={handleDoneEdit}>
              <DoneIcon fontSize="small" />
            </IconButton>
            <IconButton size="small" onClick={handleCancelEdit}>
              <CancelIcon fontSize="small" />
            </IconButton>
          </>
        ) : (
          <IconButton size="small" onClick={handleClickEdit}>
            {addedService ? (
              <EditIcon fontSize="small" />
            ) : (
              <AddIcon fontSize="small" />
            )}
          </IconButton>
        )}
      </TableCell>
    </TableRow>
  );
};

export default Service;
