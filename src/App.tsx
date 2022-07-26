import { ErrorBoundary } from "react-error-boundary";
import History from "./components/History";
import Converter from "./components/Converter";
import Error from "./components/Error";
import "./App.css";

function App() {
  return (
    <>
      <h1 className="app__container-header">Konwerter walut</h1>
      <ErrorBoundary fallback={<Error />}>
        <Converter />
      </ErrorBoundary>
      <div className="app__container-historyComponent">
        <ErrorBoundary fallback={<Error />}>
          <History />
        </ErrorBoundary>
      </div>
    </>
  );
}

export default App;
