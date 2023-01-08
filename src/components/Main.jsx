import "./css/Main.css";
import { useState } from "react";
import axios from "axios";

function Main() {
  const [loading, setLoading] = useState(false);
  const [advice, setAdvice] = useState("");
  const getApi = () => {
    setAdvice("");
    setLoading(true);
    document.querySelector(".of").classList.add("none");
    axios
      .get("https://api.adviceslip.com/advice")
      .then((response) => {
        setAdvice(response.data.slip.advice);
        setLoading(false);
      })
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
  };

  return (
    <>
      <main>
        <div className="container">
          <div className="content">
            <div className="header">
              <h3>Advices</h3>
            </div>
            <div className="of">Press a next advice to get a new advice...</div>
            {loading && <p className="loading">something is loading...</p>}
            <p className="advice">{advice}</p>
          </div>
          <div className="buttons-group">
            <button className="button-next" onClick={getApi}>
              Next Advice
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
export default Main;
