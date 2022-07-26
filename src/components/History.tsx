import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";

import Error from "./Error";
import "../App.css";

function History() {
  const currencyLocalStorage = JSON.parse(
    localStorage.getItem("currencyList") || "[]"
  );
  const [currencyState, setCurrencyState] = useState(currencyLocalStorage);
  const location = useLocation();

  useEffect(() => {
    localStorage.setItem("currencyList", JSON.stringify(currencyState));
  }, [currencyState]);

  const deleteFunc = (index: number) => {
    const filteredCurrency = currencyLocalStorage.filter(
      (item: string, i: number) => i !== index
    );
    localStorage.setItem("currencyList", JSON.stringify(filteredCurrency));
    setCurrencyState(filteredCurrency);
  };

  return (
    <ErrorBoundary fallback={<Error />}>
      {currencyLocalStorage?.length === 0 ? (
        <h1 className="app__container-header">Historia jest pusta</h1>
      ) : (
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>Data</strong>
                </TableCell>
                <TableCell align="right">
                  <strong>Przed konwersją</strong>
                </TableCell>
                <TableCell></TableCell>
                <TableCell align="right">
                  <strong>Po konwersji</strong>
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currencyLocalStorage?.map((currencyItem: any, index: number) => {
                return (
                  <TableRow key={`cell-${index}`}>
                    <TableCell component="th" scope="row" sx={{ width: "63%" }}>
                      {new Date(
                        currencyItem?.meta?.timestamp
                      ).toLocaleDateString("pl-PL")}
                    </TableCell>
                    <TableCell align="right" sx={{ width: "15%" }}>
                      {currencyItem?.request?.amount}&nbsp;
                      {currencyItem?.request?.from}
                    </TableCell>
                    <TableCell align="right" sx={{ width: "5%" }}>
                      <ArrowRightAltIcon />
                    </TableCell>
                    <TableCell align="right" sx={{ width: "12%" }}>
                      <strong>
                        {currencyItem?.result.toFixed(2)}&nbsp;
                        {currencyItem?.request?.to}
                      </strong>
                    </TableCell>
                    <TableCell align="center" sx={{ width: "5%" }}>
                      <CloseIcon
                        sx={{ cursor: "pointer" }}
                        onClick={() => deleteFunc(index)}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {location.pathname === "/history" ? (
        <Link to="/" style={{ textDecoration: "none" }}>
          <Button
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
              marginTop: "2rem",
              ":hover": {
                background: "#214456 0% 0% no-repeat padding-box",
                boxShadow: "5px 5px 12px #98adcd",
                cursor: "pointer",
              },
            }}
          >
            Strona Główna
          </Button>
        </Link>
      ) : null}
    </ErrorBoundary>
  );
}

export default History;
