import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputAdornment from "@mui/material/InputAdornment";
import { TextField } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";

import {
  useGetSymbolsQuery,
  useGetConvertQuery,
} from "../services/currencyApi";
import Error from "./Error";
import "../App.css";

function Converter() {
  const [alert, setAlert] = useState<boolean>(false);
  const [fromCurrency, setFromCurrency] = useState<string>("");
  const [toCurrency, setToCurrency] = useState<string>("");
  const [amountCurrency, setAmountCurrency] = useState<any>("");
  const [convertResult, setConvertResult] = useState<number>();
  const {
    data: symbols,
    isFetching,
    error,
  } = useGetSymbolsQuery({ rendered: false });
  const { data: convert } = useGetConvertQuery({
    fromCurrency,
    toCurrency,
    amountCurrency,
  });
  const navigate = useNavigate();

  const handleToggle = () => {
    setToCurrency(fromCurrency);
    setFromCurrency(toCurrency);
  };

  const handleClick = () => {
    setConvertResult(convert?.result);

    const currencyList = [];

    currencyList.push(convert);

    const finalArr = localStorage.getItem("currencyList")
      ? [
          ...currencyList,
          ...JSON.parse(localStorage.getItem("currencyList") || "{}"),
        ]
      : currencyList;
    localStorage.setItem("currencyList", JSON.stringify(finalArr));
  };

  if (isFetching) return <CircularProgress size="8rem" />;
  if (error) return <Error />;

  return (
    <form onSubmit={handleClick} className="app__container-form">
      <div className="app__container-form-field">
        <label htmlFor="from" className="label">
          Przelicz z
        </label>

        <Select
          name="From"
          id="from"
          sx={{
            boxShadow: "3px 3px 7px #c2cbd9",
            width: {
              xs: "15rem",
              md: "10rem",
            },
          }}
          value={fromCurrency}
          displayEmpty
          renderValue={fromCurrency !== "" ? undefined : () => "Przelicz z"}
          onChange={(e) => setFromCurrency(e.target.value)}
        >
          {Object.entries(symbols?.result).map((key, value) => (
            <MenuItem value={key[0]} key={value}>
              {key[0]}
            </MenuItem>
          ))}
        </Select>
      </div>

      <SwapHorizIcon sx={{ cursor: "pointer" }} onClick={handleToggle} />

      <div className="app__container-form-field">
        <label htmlFor="to" className="label">
          Przelicz na
        </label>
        <Select
          name="To"
          id="to"
          sx={{
            boxShadow: "3px 3px 7px #c2cbd9",
            minWidth: "10rem",
            width: {
              xs: "15rem",
              md: "10rem",
            },
          }}
          value={toCurrency}
          displayEmpty
          renderValue={toCurrency !== "" ? undefined : () => "Przelicz na"}
          onChange={(e) => setToCurrency(e.target.value)}
        >
          {Object.entries(symbols?.result).map((key, value) => (
            <MenuItem value={key[0]} key={value}>
              {key[0]}
            </MenuItem>
          ))}
        </Select>
      </div>

      <div className="app__container-form-field">
        <label htmlFor="amount" className="label">
          Kwota
        </label>
        <TextField
          name="Amount"
          id="amount"
          placeholder="Wpisz Kwotę"
          onChange={(e) => {
            setAmountCurrency(e.target.value);
          }}
          error={alert}
          sx={{
            width: {
              xs: "15rem",
              md: "15rem",
            },
          }}
          onKeyPress={(event) => {
            if (!/[0-9]/.test(event.key)) {
              event.preventDefault();
              setAlert(true);
            } else {
              setAlert(false);
            }
          }}
          helperText={!alert ? " " : "Nieprawidłowa wartość"}
          InputProps={{
            inputMode: "numeric",
            endAdornment: (
              <InputAdornment position="end">{fromCurrency}</InputAdornment>
            ),
          }}
        />
      </div>
      <div className="app__container-form-field">
        <label htmlFor="result" className="label">
          Wynik
        </label>
        <TextField
          id="result"
          name="Result"
          disabled
          sx={{
            width: {
              xs: "15rem",
              md: "15rem",
            },
          }}
          value={!convertResult ? "Wynik" : convertResult.toFixed(2)}
          InputProps={{
            style: { fontWeight: 600 },
            endAdornment: (
              <InputAdornment position="end">{toCurrency}</InputAdornment>
            ),
          }}
        />
      </div>
      <div className="app__container-actions">
        <Button
          onClick={() => navigate("/history")}
          sx={{
            width: "150px",
            height: "60px",
            background: "#ffffff 0% 0% no-repeat padding-box",
            boxShadow: "3px 3px 7px #c2cbd9",
            borderRadius: "100px",
            color: "#335566",
            font: "normal 600 16px",
            letterSpacing: "0.8px",
            textTransform: "capitalize",
            ":hover": {
              background: "#ffffff",
              boxShadow: "5px 5px 12px #98adcd",
              cursor: "pointer",
            },
          }}
        >
          Historia
        </Button>
        <Button
          type="submit"
          disabled={
            toCurrency.length > 0 &&
            amountCurrency.length > 0 &&
            fromCurrency.length > 0
              ? false
              : true
          }
          sx={{
            width: "150px",
            height: "60px",
            background: "#a3b1c6 0% 0% no-repeat padding-box",
            boxShadow: "3px 3px 7px #c2cbd9",
            borderRadius: "100px",
            color: "#ffffff",
            font: "normal 600 16px",
            letterSpacing: "0.8px",
            textTransform: "capitalize",
            ":hover": {
              background: "#214456 0% 0% no-repeat padding-box",
              boxShadow: "5px 5px 12px #98adcd",
              cursor: "pointer",
            },
          }}
        >
          Konwertuj
        </Button>
      </div>
    </form>
  );
}

export default Converter;
