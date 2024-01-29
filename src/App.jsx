import React, { useState, useEffect } from "react";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Typography } from "@mui/material";

function App() {
  const [countries, setCountries] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState("eng");
  const [offline, setOffline] = useState(false);
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const res = await fetch("https://restcountries.com/v3.1/all");
        const data = await res.json();
        setCountries(data);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);
  useEffect(() => {
    function handleOffline() {
      setOffline(true);
    }
    function handleOnline() {
      setOffline(false);
    }
    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);
    return () => {
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
    };
  }, []);
  return (
    <main
      style={{
        maxWidth: 400,
        margin: "auto",
      }}
    >
      <Typography
        variant="h1"
        sx={{
          fontSize: "3rem",
          fontWeight: 500,
          marginTop: "0.5rem",
          marginBottom: "1rem",
        }}
      >
        Country Finder
      </Typography>
      {offline && (
        <div
          style={{
            backgroundColor: "antiquewhite",
            padding: "0.5rem",
            fontSize: "0.875rem",
            marginBottom: "1rem",
          }}
        >
          ⚠️ You are offline. Please check your internet connection.
        </div>
      )}
      {loading ? (
        "loading..."
      ) : (
        <>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <input
              placeholder="Type to find..."
              value={text}
              onChange={(event) => {
                setText(event.target.value);
              }}
              style={{
                border: "none",
                background: "#f5f5f5",
                padding: "0.75rem 1rem",
                width: "100%",
                fontSize: "1rem",
                flex: "auto",
              }}
            />
            <select
              value={language}
              onChange={(event) => {
                setLanguage(event.target.value);
              }}
              style={{
                border: "1px solid",
                backgroundColor: "#fff",
                fontSize: "1rem",
                minWidth: "min-content",
              }}
            >
              <option value="eng">eng</option>
              <option value="ara">ara</option>
              <option value="fra">fra</option>
              <option value="ita">ita</option>
              <option value="jpn">jpn</option>
              <option value="zho">zho</option>
            </select>
          </div>
          <ul style={{ margin: 0, padding: 0, marginTop: "1rem" }}>
            {countries
              .filter((country) =>
                (
                  country.translations[language]?.official ||
                  country.name.official
                ).includes(text)
              )
              .map((country) => {
                const name =
                  country.translations[language]?.official ||
                  country.name.official;
                const elements = text ? name.split(text) : [name];
                return (
                  <li
                    key={country.name.official}
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      borderBottom: "1px solid #e5e5e5",
                      padding: "0.5rem 0",
                      whiteSpace: "pre",
                    }}
                  >
                    {country.flag}{" "}
                    {elements.map((elm, index) =>
                      index === 0 ? (
                        elm
                      ) : (
                        <React.Fragment key={index}>
                          <span
                            style={{
                              backgroundColor: "lightblue",
                              color: "darkblue",
                            }}
                          >
                            {text}
                          </span>
                          {elm}
                        </React.Fragment>
                      )
                    )}
                  </li>
                );
              })}
          </ul>
        </>
      )}
    </main>
  );
}

export default App;
