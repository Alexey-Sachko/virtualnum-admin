import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
};

export type Query = {
  __typename?: 'Query';
  me: MeResponse;
  roles: Array<RoleType>;
  users: Array<UserType>;
  usersStat: UsersStat;
  allPermissions: Array<Permissions>;
  myCurrentActivations: Array<ActivationType>;
  countries: Array<CountryType>;
  services: Array<ServiceType>;
  prices: Array<PriceType>;
  allServices: Array<ServiceDictionaryItemType>;
  apiServices: Array<ServiceFromApi>;
  transactions: Array<TransactionGqlType>;
  freeCountries: Array<FreeCountryType>;
  freeNumbers: Array<FreeNumType>;
  freeNumber: FreeNumType;
  freeMessages: FreeMessagesType;
  articles: Array<ArticleType>;
  articlesCount: Scalars['Float'];
  article?: Maybe<ArticleType>;
  myOrders: Array<OrderType>;
};


export type QueryCountriesArgs = {
  countriesQueryInput?: Maybe<CountriesQueryInput>;
};


export type QueryServicesArgs = {
  countryCode: Scalars['String'];
};


export type QueryApiServicesArgs = {
  servicesApiQueryInput: ServicesApiQueryInput;
};


export type QueryFreeNumberArgs = {
  num: Scalars['String'];
};


export type QueryFreeMessagesArgs = {
  page?: Maybe<Scalars['Int']>;
  number: Scalars['String'];
};


export type QueryArticleArgs = {
  id: Scalars['Float'];
};

export type MeResponse = {
  __typename?: 'MeResponse';
  id: Scalars['ID'];
  email?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  permissions?: Maybe<Array<Permissions>>;
  balanceAmount: Scalars['Float'];
};

/** Разрешения */
export enum Permissions {
  ReadUsers = 'ReadUsers',
  WriteUsers = 'WriteUsers',
  RolesRead = 'RolesRead',
  RolesWrite = 'RolesWrite',
  ReadEmail = 'ReadEmail',
  WriteEmail = 'WriteEmail',
  ReadAdminPage = 'ReadAdminPage',
  WriteArticles = 'WriteArticles',
  WriteServices = 'WriteServices',
  WriteStubs = 'WriteStubs',
  MakeBonusMoney = 'MakeBonusMoney'
}

export type RoleType = {
  __typename?: 'RoleType';
  id: Scalars['Float'];
  name: Scalars['String'];
  permissions: Array<Permissions>;
};

export type UserType = {
  __typename?: 'UserType';
  id: Scalars['String'];
  email?: Maybe<Scalars['String']>;
  role?: Maybe<RoleType>;
  balance: Scalars['Float'];
};

export type UsersStat = {
  __typename?: 'UsersStat';
  totalBalance: Scalars['Float'];
  usersCount: Scalars['Float'];
};

export type ActivationType = {
  __typename?: 'ActivationType';
  id: Scalars['Float'];
  status: ActivationStatus;
  phoneNum: Scalars['String'];
  cost: Scalars['Float'];
  serviceCode: Scalars['String'];
  countryCode: Scalars['String'];
  expiresAt: Scalars['DateTime'];
  sourceActivationId: Scalars['String'];
  activationCodes?: Maybe<Array<ActivationCodeType>>;
};

export enum ActivationStatus {
  WaitCode = 'WAIT_CODE',
  WaitAgain = 'WAIT_AGAIN',
  SendingConfirmed = 'SENDING_CONFIRMED',
  SmsRecieved = 'SMS_RECIEVED',
  Cancelled = 'CANCELLED',
  Finished = 'FINISHED',
  Error = 'ERROR'
}


export type ActivationCodeType = {
  __typename?: 'ActivationCodeType';
  id: Scalars['Float'];
  code: Scalars['String'];
  activationId: Scalars['Float'];
};

export type CountriesQueryInput = {
  notEmpty?: Maybe<Scalars['Boolean']>;
};

export type CountryType = {
  __typename?: 'CountryType';
  code: Scalars['String'];
  name?: Maybe<Scalars['String']>;
};

export type ServiceType = {
  __typename?: 'ServiceType';
  id: Scalars['Float'];
  code: Scalars['String'];
  name: Scalars['String'];
  priceAmount?: Maybe<Scalars['Float']>;
  count: Scalars['Float'];
};

export type PriceType = {
  __typename?: 'PriceType';
  id: Scalars['Float'];
  amount: Scalars['Float'];
  countryCode: Scalars['String'];
  serviceId: Scalars['Float'];
};

export type ServiceDictionaryItemType = {
  __typename?: 'ServiceDictionaryItemType';
  code: Scalars['String'];
  name: Scalars['String'];
};

export type ServicesApiQueryInput = {
  country: Scalars['String'];
};

export type ServiceFromApi = {
  __typename?: 'ServiceFromApi';
  code: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  prices: Array<PriceCountFromApi>;
};

export type PriceCountFromApi = {
  __typename?: 'PriceCountFromApi';
  price: Scalars['Float'];
  count: Scalars['Float'];
};

export type TransactionGqlType = {
  __typename?: 'TransactionGqlType';
  type: TransactionType;
  id: Scalars['String'];
  amount: Scalars['Float'];
  balanceBefore: Scalars['Float'];
  createdAt: Scalars['String'];
  userId: Scalars['String'];
};

export enum TransactionType {
  Payment = 'Payment',
  Bonus = 'Bonus',
  Buy = 'Buy'
}

export type FreeCountryType = {
  __typename?: 'FreeCountryType';
  country: Scalars['Int'];
  country_text?: Maybe<Scalars['String']>;
  numbers: Array<FreeNumType>;
};

export type FreeNumType = {
  __typename?: 'FreeNumType';
  maxdate?: Maybe<Scalars['String']>;
  number: Scalars['String'];
  country: Scalars['Int'];
  updated_at: Scalars['String'];
  data_humans: Scalars['String'];
  full_number: Scalars['String'];
  country_text: Scalars['String'];
  messages: FreeMessagesType;
};


export type FreeNumTypeMessagesArgs = {
  page?: Maybe<Scalars['Int']>;
};

export type FreeMessagesType = {
  __typename?: 'FreeMessagesType';
  current_page: Scalars['Int'];
  from?: Maybe<Scalars['Int']>;
  to?: Maybe<Scalars['Int']>;
  per_page: Scalars['Int'];
  total: Scalars['Int'];
  data: Array<FreeMessageType>;
};

export type FreeMessageType = {
  __typename?: 'FreeMessageType';
  text: Scalars['String'];
};

export type ArticleType = {
  __typename?: 'ArticleType';
  id: Scalars['ID'];
  alias: Scalars['String'];
  title: Scalars['String'];
  text: Scalars['String'];
};

export type OrderType = {
  __typename?: 'OrderType';
  id: Scalars['Float'];
  paymentId?: Maybe<Scalars['String']>;
  amount: Scalars['Float'];
  status: OrderStatus;
  createdAt: Scalars['DateTime'];
  formVariant: PaymentVariant;
};

export enum OrderStatus {
  WaitPay = 'WAIT_PAY',
  Error = 'ERROR',
  Paid = 'PAID'
}

export enum PaymentVariant {
  Freekassa = 'FREEKASSA',
  BankCard = 'BANK_CARD'
}

export type Mutation = {
  __typename?: 'Mutation';
  login?: Maybe<Array<ErrorType>>;
  logout: Scalars['Boolean'];
  register: RegisterPayloadType;
  resetPassword: ResetPassResponse;
  resetPasswordConfirm?: Maybe<ErrorType>;
  verifyUser?: Maybe<ErrorType>;
  deleteUser?: Maybe<ErrorType>;
  setRole?: Maybe<Array<ErrorType>>;
  create100StubActivations?: Maybe<Array<ErrorType>>;
  createStubActivation?: Maybe<Array<ErrorType>>;
  createActivation?: Maybe<Array<ErrorType>>;
  cancelActivation?: Maybe<Array<ErrorType>>;
  finishActivation?: Maybe<Array<ErrorType>>;
  saveService?: Maybe<Array<ErrorType>>;
  deleteService?: Maybe<Array<ErrorType>>;
  restoreService?: Maybe<Array<ErrorType>>;
  saveServicesWithPrices?: Maybe<Array<ErrorType>>;
  savePrice?: Maybe<Array<ErrorType>>;
  makeBonus?: Maybe<Array<ErrorType>>;
  createArticle?: Maybe<Array<ErrorType>>;
  updateArticle?: Maybe<Array<ErrorType>>;
  deleteArticle?: Maybe<ErrorType>;
  makePayment: MakePaymentResType;
  forceConfirmOrder?: Maybe<ErrorType>;
};


export type MutationLoginArgs = {
  authCredentialsDto: AuthCredentialsDto;
};


export type MutationRegisterArgs = {
  userSignupDto: UserSignupDto;
};


export type MutationResetPasswordArgs = {
  resetPassInput: ResetPassInput;
};


export type MutationResetPasswordConfirmArgs = {
  resetPassConfirmInput: ResetPassConfirmInput;
};


export type MutationVerifyUserArgs = {
  verifyToken: Scalars['String'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['String'];
};


export type MutationSetRoleArgs = {
  userId: Scalars['String'];
  roleName: Scalars['String'];
};


export type MutationCreate100StubActivationsArgs = {
  createActivationInput: CreateActivationInput;
};


export type MutationCreateStubActivationArgs = {
  createActivationInput: CreateActivationInput;
};


export type MutationCreateActivationArgs = {
  createActivationInput: CreateActivationInput;
};


export type MutationCancelActivationArgs = {
  activationId: Scalars['Int'];
};


export type MutationFinishActivationArgs = {
  activationId: Scalars['Int'];
};


export type MutationSaveServiceArgs = {
  price: Scalars['Float'];
  countryCode: Scalars['String'];
  createServiceDto: CreateServiceDto;
};


export type MutationDeleteServiceArgs = {
  code: Scalars['String'];
};


export type MutationRestoreServiceArgs = {
  code: Scalars['String'];
};


export type MutationSaveServicesWithPricesArgs = {
  countryCode: Scalars['String'];
  servicesWithPrices: Array<CreateServiceWithPricesDto>;
};


export type MutationSavePriceArgs = {
  createPriceDto: CreatePriceDto;
};


export type MutationMakeBonusArgs = {
  makeBonusInput: MakeBonusInput;
};


export type MutationCreateArticleArgs = {
  createArticleDto: CreateArticleDto;
};


export type MutationUpdateArticleArgs = {
  updateArticleDto: UpdateArticleDto;
};


export type MutationDeleteArticleArgs = {
  id: Scalars['Float'];
};


export type MutationMakePaymentArgs = {
  makePaymenInput: MakePaymentInput;
};


export type MutationForceConfirmOrderArgs = {
  paymentId: Scalars['String'];
  orderId: Scalars['Float'];
};

export type AuthCredentialsDto = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type ErrorType = {
  __typename?: 'ErrorType';
  path: Scalars['String'];
  message: Scalars['String'];
};

export type UserSignupDto = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type RegisterPayloadType = {
  __typename?: 'RegisterPayloadType';
  result?: Maybe<Scalars['Boolean']>;
  errors?: Maybe<Array<ErrorType>>;
};

export type ResetPassInput = {
  email: Scalars['String'];
};

export type ResetPassResponse = {
  __typename?: 'ResetPassResponse';
  accessAgain?: Maybe<Scalars['DateTime']>;
  error?: Maybe<ErrorType>;
};

export type ResetPassConfirmInput = {
  newPassword: Scalars['String'];
  tokenId: Scalars['String'];
};

export type CreateActivationInput = {
  serviceCode: Scalars['String'];
  countryCode: Scalars['String'];
};

export type CreateServiceDto = {
  code: Scalars['String'];
};

export type CreateServiceWithPricesDto = {
  code: Scalars['String'];
  price: Scalars['Float'];
};

export type CreatePriceDto = {
  serviceCode: Scalars['String'];
  countryCode: Scalars['String'];
  amount: Scalars['Float'];
};

export type MakeBonusInput = {
  amount: Scalars['Float'];
  targetUserId: Scalars['String'];
};

export type CreateArticleDto = {
  alias: Scalars['String'];
  title: Scalars['String'];
  text: Scalars['String'];
};

export type UpdateArticleDto = {
  alias: Scalars['String'];
  title: Scalars['String'];
  text: Scalars['String'];
  id: Scalars['Int'];
};

export type MakePaymentInput = {
  amount: Scalars['Float'];
  variant: PaymentVariant;
};

export type MakePaymentResType = {
  __typename?: 'MakePaymentResType';
  orderId: Scalars['Float'];
  formUrl: Scalars['String'];
  method: FormMethod;
  fields: Array<PayFormField>;
};

export enum FormMethod {
  Post = 'POST',
  Get = 'GET'
}

export type PayFormField = {
  __typename?: 'PayFormField';
  name: Scalars['String'];
  value: Scalars['String'];
};

export type ServicesQueryVariables = Exact<{
  countryCode: Scalars['String'];
}>;


export type ServicesQuery = (
  { __typename?: 'Query' }
  & { services: Array<(
    { __typename?: 'ServiceType' }
    & Pick<ServiceType, 'id' | 'code' | 'name' | 'priceAmount' | 'count'>
  )> }
);

export type ApiServicesQueryVariables = Exact<{
  servicesApiQueryInput: ServicesApiQueryInput;
}>;


export type ApiServicesQuery = (
  { __typename?: 'Query' }
  & { apiServices: Array<(
    { __typename?: 'ServiceFromApi' }
    & Pick<ServiceFromApi, 'code' | 'name'>
    & { prices: Array<(
      { __typename?: 'PriceCountFromApi' }
      & Pick<PriceCountFromApi, 'price' | 'count'>
    )> }
  )> }
);

export type CountriesQueryVariables = Exact<{
  countriesQueryInput?: Maybe<CountriesQueryInput>;
}>;


export type CountriesQuery = (
  { __typename?: 'Query' }
  & { countries: Array<(
    { __typename?: 'CountryType' }
    & Pick<CountryType, 'code' | 'name'>
  )> }
);

export type SaveServicesWithPricesMutationVariables = Exact<{
  countryCode: Scalars['String'];
  servicesWithPrices: Array<CreateServiceWithPricesDto>;
}>;


export type SaveServicesWithPricesMutation = (
  { __typename?: 'Mutation' }
  & { saveServicesWithPrices?: Maybe<Array<(
    { __typename?: 'ErrorType' }
    & Pick<ErrorType, 'path' | 'message'>
  )>> }
);

export type UsersQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersQuery = (
  { __typename?: 'Query' }
  & { users: Array<(
    { __typename?: 'UserType' }
    & Pick<UserType, 'id' | 'email' | 'balance'>
    & { role?: Maybe<(
      { __typename?: 'RoleType' }
      & Pick<RoleType, 'id' | 'name' | 'permissions'>
    )> }
  )> }
);


export const ServicesDocument = gql`
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

/**
 * __useServicesQuery__
 *
 * To run a query within a React component, call `useServicesQuery` and pass it any options that fit your needs.
 * When your component renders, `useServicesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useServicesQuery({
 *   variables: {
 *      countryCode: // value for 'countryCode'
 *   },
 * });
 */
export function useServicesQuery(baseOptions: Apollo.QueryHookOptions<ServicesQuery, ServicesQueryVariables>) {
        return Apollo.useQuery<ServicesQuery, ServicesQueryVariables>(ServicesDocument, baseOptions);
      }
export function useServicesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ServicesQuery, ServicesQueryVariables>) {
          return Apollo.useLazyQuery<ServicesQuery, ServicesQueryVariables>(ServicesDocument, baseOptions);
        }
export type ServicesQueryHookResult = ReturnType<typeof useServicesQuery>;
export type ServicesLazyQueryHookResult = ReturnType<typeof useServicesLazyQuery>;
export type ServicesQueryResult = Apollo.QueryResult<ServicesQuery, ServicesQueryVariables>;
export const ApiServicesDocument = gql`
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

/**
 * __useApiServicesQuery__
 *
 * To run a query within a React component, call `useApiServicesQuery` and pass it any options that fit your needs.
 * When your component renders, `useApiServicesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useApiServicesQuery({
 *   variables: {
 *      servicesApiQueryInput: // value for 'servicesApiQueryInput'
 *   },
 * });
 */
export function useApiServicesQuery(baseOptions: Apollo.QueryHookOptions<ApiServicesQuery, ApiServicesQueryVariables>) {
        return Apollo.useQuery<ApiServicesQuery, ApiServicesQueryVariables>(ApiServicesDocument, baseOptions);
      }
export function useApiServicesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ApiServicesQuery, ApiServicesQueryVariables>) {
          return Apollo.useLazyQuery<ApiServicesQuery, ApiServicesQueryVariables>(ApiServicesDocument, baseOptions);
        }
export type ApiServicesQueryHookResult = ReturnType<typeof useApiServicesQuery>;
export type ApiServicesLazyQueryHookResult = ReturnType<typeof useApiServicesLazyQuery>;
export type ApiServicesQueryResult = Apollo.QueryResult<ApiServicesQuery, ApiServicesQueryVariables>;
export const CountriesDocument = gql`
    query Countries($countriesQueryInput: CountriesQueryInput) {
  countries(countriesQueryInput: $countriesQueryInput) {
    code
    name
  }
}
    `;

/**
 * __useCountriesQuery__
 *
 * To run a query within a React component, call `useCountriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useCountriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCountriesQuery({
 *   variables: {
 *      countriesQueryInput: // value for 'countriesQueryInput'
 *   },
 * });
 */
export function useCountriesQuery(baseOptions?: Apollo.QueryHookOptions<CountriesQuery, CountriesQueryVariables>) {
        return Apollo.useQuery<CountriesQuery, CountriesQueryVariables>(CountriesDocument, baseOptions);
      }
export function useCountriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CountriesQuery, CountriesQueryVariables>) {
          return Apollo.useLazyQuery<CountriesQuery, CountriesQueryVariables>(CountriesDocument, baseOptions);
        }
export type CountriesQueryHookResult = ReturnType<typeof useCountriesQuery>;
export type CountriesLazyQueryHookResult = ReturnType<typeof useCountriesLazyQuery>;
export type CountriesQueryResult = Apollo.QueryResult<CountriesQuery, CountriesQueryVariables>;
export const SaveServicesWithPricesDocument = gql`
    mutation SaveServicesWithPrices($countryCode: String!, $servicesWithPrices: [CreateServiceWithPricesDto!]!) {
  saveServicesWithPrices(
    countryCode: $countryCode
    servicesWithPrices: $servicesWithPrices
  ) {
    path
    message
  }
}
    `;
export type SaveServicesWithPricesMutationFn = Apollo.MutationFunction<SaveServicesWithPricesMutation, SaveServicesWithPricesMutationVariables>;

/**
 * __useSaveServicesWithPricesMutation__
 *
 * To run a mutation, you first call `useSaveServicesWithPricesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSaveServicesWithPricesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [saveServicesWithPricesMutation, { data, loading, error }] = useSaveServicesWithPricesMutation({
 *   variables: {
 *      countryCode: // value for 'countryCode'
 *      servicesWithPrices: // value for 'servicesWithPrices'
 *   },
 * });
 */
export function useSaveServicesWithPricesMutation(baseOptions?: Apollo.MutationHookOptions<SaveServicesWithPricesMutation, SaveServicesWithPricesMutationVariables>) {
        return Apollo.useMutation<SaveServicesWithPricesMutation, SaveServicesWithPricesMutationVariables>(SaveServicesWithPricesDocument, baseOptions);
      }
export type SaveServicesWithPricesMutationHookResult = ReturnType<typeof useSaveServicesWithPricesMutation>;
export type SaveServicesWithPricesMutationResult = Apollo.MutationResult<SaveServicesWithPricesMutation>;
export type SaveServicesWithPricesMutationOptions = Apollo.BaseMutationOptions<SaveServicesWithPricesMutation, SaveServicesWithPricesMutationVariables>;
export const UsersDocument = gql`
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

/**
 * __useUsersQuery__
 *
 * To run a query within a React component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useUsersQuery(baseOptions?: Apollo.QueryHookOptions<UsersQuery, UsersQueryVariables>) {
        return Apollo.useQuery<UsersQuery, UsersQueryVariables>(UsersDocument, baseOptions);
      }
export function useUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>) {
          return Apollo.useLazyQuery<UsersQuery, UsersQueryVariables>(UsersDocument, baseOptions);
        }
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersQueryResult = Apollo.QueryResult<UsersQuery, UsersQueryVariables>;