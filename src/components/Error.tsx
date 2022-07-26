import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";

function Error() {
  const navigate = useNavigate();

  const handleClick = () => {
    localStorage.clear();
    navigate("/converter");
  };

  return (
    <div className="errorWrapper">
      <div className="errorBox">
        <div className="errorBox-indicator"></div>
        <div className="errorBox-message">
          <p>
            <strong>Komunikat Błędu</strong>
          </p>
          <p>
            Nie udało się wykonać żadanej operacji, ponieważ nie znaleziono
            zasobu powiązanego z żądaniem.
          </p>
        </div>
        <CloseIcon
          sx={{ padding: "1rem", cursor: "pointer" }}
          onClick={handleClick}
        />
      </div>
    </div>
  );
}

export default Error;
