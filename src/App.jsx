import { useEffect, useState } from "react";

function App() {
  // 1. create a state variable named `countries` to store the countries as array.
  const [text, setText] = useState("");

  // 2. create a state variable named `loading` to store the loading state as boolean.
  const [loading, setLoading] = useState(false);

  // 3. create a useEffect to fetch the countries from the API.
  //    💡 TIP: open "https://restcountries.com/v3.1/all" to see the data in your browser
  //    💡 TIP: use `fetch` API to fetch the data.
  const [countries, setContries] = useState([]);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const res = await fetch("https://restcountries.com/v3.1/all");
        const data = await res.json();
        setContries(data);
      }
      finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [])


  return (
    <main
      style={{
        maxWidth: 400,
        margin: "auto",
      }}
    >
      <h1>Country Finder</h1>
      {/* 4. render "loading..." or an icon when the `loading` state is true otherwise, render the input and countries. */}
      {loading ? (
        "loading..."
      ) : (
        <>
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
            }}
          />
          <ul style={{ margin: 0, padding: 0, marginTop: "1rem" }}>
            {/* 5. replace the mockup data with the `countries` from the API
               and make sure to use the right properties.
        */}
            {countries
              .filter((country) => country.name.official.includes(text))
              .map((country) => (
                <li
                  key={country.name.official}
                  style={{
                    display: "flex",
                    borderBottom: "1px solid #e5e5e5",
                    padding: "0.5rem 0",
                  }}
                >
                  {country.flag} {country.name.official}
                </li>
              ))}
          </ul>
        </>
      )}
    </main>
  );
}

export default App;
