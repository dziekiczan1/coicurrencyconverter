import React from "react";

const Error = () => {
  return (
    <div className="errorBox">
      <div className="errorBox-indicator"></div>
      <div className="errorBox-message">
        <p>
          <strong>Komunikat Błędu</strong>
        </p>
        <p>
          Nie udało się wykonać żadanej operacji, ponieważ nie znaleziono zasobu
          powiązanego z żądaniem.
        </p>
      </div>
    </div>
  );
};

export default Error;
