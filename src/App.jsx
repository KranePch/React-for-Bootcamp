import { useState, useEffect } from "react";

function randomSixDigits() {
  return [...Array(6)].map(() => Math.floor(Math.random() * 10));
}

function IntervalNumber() {
  const [number, setNumber] = useState(randomSixDigits());
  // 1. create a state named `turn` to store the current turn with initial value 0.

  useEffect(() => {
    const timeout = setTimeout(() => {
      setNumber(randomSixDigits());
    }, [30000]);
    return () => clearTimeout(timeout);
  }, [number]);

  // 2. create a useEffect to update the `turn` state every second.
  //    💡 HINT: turn value is between 0-1, meaning the initial value is 0 and after 30 seconds it will be 1.

  return (
    <div className="text-2xl text-violet-700 font-medium">
      {number.map((num, i) => (
        <span key={i} className={`${i === 3 ? "ml-4" : ""}`}>
          {num}
        </span>
      ))}
      {/* 3. create a <span> tag to represent the time-left indicator using CSS conic-gradient
             💡 HINT: try this in your browser console to see how it works: 
             <span
              className="ml-auto block w-9 h-9 rounded-full"
              style={{
                background: `conic-gradient(transparent 0deg, transparent 0.5turn, violet 0.5turn)`,
              }}
            />
      */}
    </div>
  );
}

function App() {
  const [accounts, setAccounts] = useState([{ name: "Google", code: "1" }]);
  const [creating, setCreating] = useState(false);
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [existed, setExisted] = useState(false);
  return (
    <div className="max-w-[400px] m-auto my-2">
      <div className="flex items-center">
        <h1 className="flex-auto text-3xl font-bold text-fuchsia-950">
          Authenticator
        </h1>
        {creating ? (
          <button className="btn" onClick={() => setCreating(false)}>
            Cancel
          </button>
        ) : (
          <button className="btn" onClick={() => setCreating(true)}>
            New
          </button>
        )}
      </div>
      {creating && (
        <div className="flex flex-col gap-4">
          {existed && (
            <div role="alert" className="alert alert-warning mt-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="stroke-current shrink-0 w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <span>Account existed! Please try another code.</span>
            </div>
          )}
          <label className="form-control w-full" htmlFor="account-name">
            <div className="label">Name</div>
            <input
              type="text"
              id="account-name"
              placeholder="Name"
              className="input input-bordered w-full"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </label>
          <label className="form-control w-full" htmlFor="account-code">
            <div className="label">Code</div>
            <input
              type="text"
              id="account-code"
              placeholder="Code"
              className="input input-bordered w-full"
              value={code}
              onChange={(event) => setCode(event.target.value)}
            />
          </label>

          <button
            className="btn btn-secondary mt-4"
            onClick={() => {
              if (accounts.find((item) => item.code === code)) {
                setExisted(true);
                return;
              }
              setAccounts((prev) => [
                ...prev,
                { name: name || "Unknown", code },
              ]);
              setCreating(false);
              setExisted(false);
              setName("");
              setCode("");
            }}
          >
            Submit
          </button>
        </div>
      )}
      {/* 2. render an alert with <div> to let users know that the code is already existed. */}
      {!creating && (
        <ul className="flex flex-col m-0 p-0 list-none">
          {accounts.map((item) => (
            <li key={item.code} className="border-b py-4">
              <div className="text-lg">{item.name}</div>
              <IntervalNumber />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
