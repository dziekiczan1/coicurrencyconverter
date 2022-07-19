import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import { TextField } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";

import { useGetSymbolsQuery, useGetConvertQuery } from "./services/currencyApi";
import History from "./components/History";
import Error from "./components/Error";
import "./App.css";
import exchangeIcon from "./assets/Path 1864.png";

function App() {
  const [alert, setAlert] = useState(false);
  const [fromCurrency, setFromCurrency] = useState<any>("PLN");
  const [toCurrency, setToCurrency] = useState("PLN");
  const [amountCurrency, setAmountCurrency] = useState("1");
  const [convertResult, setConvertResult] = useState<any>();
  const [historyComponent, setHistoryComponent] = useState(false);
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
  let navigate = useNavigate();

  const toggle = () => setHistoryComponent(!historyComponent);

  const handleClick = () => {
    setConvertResult(convert?.result);

    var currencyList = [];

    currencyList.push(convert);

    var finalArr =
      localStorage.getItem("currencyList") !== undefined
        ? [
            ...currencyList,
            ...JSON.parse(localStorage.getItem("currencyList") || "{}"),
          ]
        : currencyList;
    localStorage.setItem("currencyList", JSON.stringify(finalArr));

    navigate("/history");
  };

  if (isFetching) return <CircularProgress size="8rem" />;
  if (error) return <Error />;

  return (
    <>
      <h1 className="app__container-header">Konwerter walut</h1>
      <div className="app__container-form">
        <div className="app__container-form-field">
          <label htmlFor="From" className="label">
            Przelicz z
          </label>
          <select
            name="From"
            className="select"
            onChange={(e) => setFromCurrency(e.target.value)}
          >
            <option>{fromCurrency}</option>
            {Object.entries(symbols?.result).map((key, value) => (
              <option value={key[0]} key={value}>
                {key[0]}
              </option>
            ))}
          </select>
        </div>
        <div className="app__container-form-field">
          <img src={exchangeIcon} style={{ marginTop: "2rem" }} alt="" />
        </div>
        <div className="app__container-form-field">
          <label htmlFor="To" className="label">
            Przelicz na
          </label>
          <select
            name="To"
            className="select"
            onChange={(e) => setToCurrency(e.target.value)}
          >
            <option>{toCurrency}</option>
            {Object.entries(symbols?.result).map((key, value) => (
              <option value={key[0]} key={value}>
                {key[0]}
              </option>
            ))}
          </select>
        </div>

        <div className="app__container-form-field">
          <label htmlFor="Kwota" className="label">
            Kwota
          </label>
          <FormControl sx={{ width: "35ch" }} variant="outlined">
            <TextField
              name="Kwota"
              placeholder="Wpisz Kwotę"
              style={{
                fontSize: "22px",
                borderRadius: "5px",
              }}
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              fullWidth
              onChange={(e) => setAmountCurrency(e.target.value)}
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault();
                  setAlert(true);
                } else {
                  setAlert(false);
                }
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">{fromCurrency}</InputAdornment>
                ),
              }}
            />
            {alert ? (
              <Alert
                variant="outlined"
                severity="error"
                style={{ position: "absolute", marginTop: "5px" }}
              >
                Nieprawidłowa wartość
              </Alert>
            ) : null}
          </FormControl>
        </div>
        <div className="app__container-form-field">
          <label htmlFor="Wynik" className="label">
            Wynik
          </label>
          <FormControl sx={{ width: "35ch" }} variant="outlined">
            <Input
              color="primary"
              name="Wynik"
              disabled
              style={{
                backgroundColor: "#fff",
                padding: "0.7rem",
                fontWeight: "bold",
                borderRadius: "5px",
              }}
              value={!convertResult ? "Wynik" : convertResult.toFixed(2)}
              endAdornment={
                <InputAdornment position="end">{toCurrency}</InputAdornment>
              }
            />
          </FormControl>
        </div>
      </div>
      <div className="app__container-actions">
        <button onClick={toggle} className="app__container-buttonHistory">
          {historyComponent ? "Ukryj Historię" : "Historia"}
        </button>
        <button onClick={handleClick} className="app__container-buttonConvert">
          Konwertuj
        </button>
      </div>
      {historyComponent && (
        <div className="app__container-historyComponent">
          <History />
        </div>
      )}
    </>
  );
}

export default App;
