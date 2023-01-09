import "./css/Main.css";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

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
        setInput(response.data.slip.advice);
        setLoading(false);
      })
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
  };

  const [options, setOptions] = useState([]);
  const [to, setTo] = useState("en");
  const [from, setFrom] = useState("en");
  const [input, setInput] = useState("");
  useEffect(() => {
    axios
      .get("https://libretranslate.com/languages", {
        headers: { accept: "application/json" },
      })
      .then((res) => {
        console.log(res.data);
        setOptions(res.data);
      });
  }, []);

  const translate = () => {
    setAdvice("");
    setLoading(true);
    const params = new URLSearchParams();
    params.append("q", input);
    params.append("source", from);
    params.append("target", to);
    params.append("api_key", "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx");

    axios
      .post("https://libretranslate.de/translate", params, {
        headers: {
          accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((res) => {
        setLoading(false);
        console.log(res.data);
        setAdvice(res.data.translatedText);
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
        <div className="translate">
          <div className="translate-header">
            <div className="header">Translate</div>
          </div>
          <div className="translate-main">
            <div className="languages">
              <div>
                From:({from})
                <select onChange={(e) => setFrom(e.target.value)}>
                  {options.map((opt) => (
                    <option key={opt.code} value={opt.code}>
                      {" "}
                      {opt.name}
                    </option>
                  ))}
                </select>
              </div>
              To:({to})
              <div>
                <select onChange={(e) => setTo(e.target.value)}>
                  {options.map((opt) => (
                    <option key={opt.code} value={opt.code}>
                      {" "}
                      {opt.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="translate-footer">
            <div className="buttons-group">
              <button className="button-next" onClick={(e) => translate()}>
                Translate
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
export default Main;
