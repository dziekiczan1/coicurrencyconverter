import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import "../App.css";
import transferIcon from "../assets/Path 1866.png";
import deletePic from "../assets/Path 1865.png";

function History() {
  const temp = JSON.parse(localStorage.getItem("currencyList") || "[]");
  const [state, setState] = useState(temp);
  let location = useLocation();

  useEffect(() => {
    localStorage.setItem("currencyList", JSON.stringify(state));
  }, [state]);

  const deleteFunc = (indx: any) => {
    const filtered = temp.filter((item: any, i: any) => i !== indx);
    localStorage.setItem("currencyList", JSON.stringify(filtered));
    setState(filtered);
  };

  return (
    <>
      {temp?.length === 0 ? (
        <h1 style={{ textAlign: "center" }}>Historia jest pusta</h1>
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
              {temp?.map((obj: any, indx: React.Key | null | undefined) => {
                return (
                  <TableRow>
                    <TableCell
                      component="th"
                      scope="row"
                      style={{ width: "63%" }}
                      key={`cell-${obj}`}
                    >
                      {new Date(obj.meta.timestamp).toLocaleDateString("pl-PL")}
                    </TableCell>
                    <TableCell align="right" style={{ width: "15%" }}>
                      {obj.request.amount}&nbsp;
                      {obj.request.from}
                    </TableCell>
                    <TableCell align="right" style={{ width: "5%" }}>
                      <img src={transferIcon} alt="" />
                    </TableCell>
                    <TableCell align="right" style={{ width: "12%" }}>
                      <strong>
                        {obj.result.toFixed(2)}&nbsp;
                        {obj.request.to}
                      </strong>
                    </TableCell>
                    <TableCell align="center" style={{ width: "5%" }}>
                      <img
                        src={deletePic}
                        onClick={() => deleteFunc(indx)}
                        style={{ cursor: "pointer" }}
                        alt=""
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
        <Link to="/">
          <button
            className="app__container-buttonConvert"
            style={{ marginTop: "2rem" }}
          >
            Strona Główna
          </button>
        </Link>
      ) : null}
    </>
  );
}

export default History;
