import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const currencyApiHeaders = {
  "X-RapidAPI-Key": "7b0c9cae31mshb601f16fabe16fap15578ejsn153bb01c85b6",
  "X-RapidAPI-Host": "currency-converter-pro1.p.rapidapi.com",
};

const baseUrl = "https://currency-converter-pro1.p.rapidapi.com";

const createRequest = (url: string) => ({ url, headers: currencyApiHeaders });

export const currencyApi = createApi({
  reducerPath: "currencyApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getSymbols: builder.query({
      query: () => createRequest(`/currencies`),
    }),
    getConvert: builder.query({
      query: ({ fromCurrency, toCurrency, amountCurrency }) =>
        createRequest(
          `/convert?from=${fromCurrency}&to=${toCurrency}&amount=${amountCurrency}`
        ),
    }),
  }),
});

export const { useGetSymbolsQuery, useGetConvertQuery } = currencyApi;
