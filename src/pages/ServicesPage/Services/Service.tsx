import {
  IconButton,
  makeStyles,
  TableCell,
  TableRow,
  TextField,
} from "@material-ui/core";
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
} from "../../../generated/graphql";

export type OnSaveParams = { code: string; price: number };

const Service = ({
  addedService,
  service,
  countryCode,
  onSave,
}: {
  service: ApiServicesQuery["apiServices"][number];
  addedService: ServicesQuery["services"][number] | undefined;
  countryCode: string;
  onSave: (props: OnSaveParams) => void | Promise<void>;
}) => {
  const classes = useStyles();
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
    await onSave({ code: service.code, price: priceAmount });
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

  const className = React.useMemo(() => {
    if (!addedService) {
      return classes.bgError;
    } else if (addedService.count <= 0) {
      return classes.bgWarn;
    }

    return classes.bgSuccess;
  }, [addedService, classes.bgError, classes.bgSuccess, classes.bgWarn]);

  return (
    <TableRow className={className}>
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
        {minPrice.price}—{maxPrice.price} ({maxPrice.count})
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

const useStyles = makeStyles((theme) => ({
  bgError: {
    backgroundColor: theme.palette.error.light,
  },
  bgSuccess: {
    backgroundColor: theme.palette.success.light,
  },
  bgWarn: {
    backgroundColor: theme.palette.warning.light,
  },
}));
