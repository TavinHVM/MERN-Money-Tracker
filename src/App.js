import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [datetime, setDatetime] = useState("");
  const [description, setDescription] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [formattedTransactions, setFormattedTransactions] = useState([]);

  const playClickSound = () => {
    const audio = new Audio("confirm-button.wav");
    audio.volume = 0.5;
    audio.play();
  };

  const allFieldsFilled =
    name.trim() !== "" && datetime !== "" && description.trim() !== "";

  useEffect(() => {
    fetchAndFormatTransactions();
  }, []);

  async function fetchAndFormatTransactions() {
    const transactions = await getTransactions();
    setTransactions(transactions);
    const formatted = transactions.map((transaction) => ({
      ...transaction,
      datetime: formatDate(transaction.datetime),
    }));
    setFormattedTransactions(formatted);
  }

  async function getTransactions() {
    const url = process.env.REACT_APP_API_URL + "/transactions";
    const response = await fetch(url);
    return await response.json();
  }

  function formatDate(date) {
    return new Date(date).toLocaleString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  async function addNewTransaction(ev) {
    ev.preventDefault();

    const url = process.env.REACT_APP_API_URL + "/transaction";
    const price = name.split(" ")[0];

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          price,
          name: name.substring(price.length + 1),
          datetime,
          description,
        }),
      });

      if (response.ok) {
        const json = await response.json();
        setName("");
        setDatetime("");
        setDescription("");
        playClickSound();

        // Atualiza as transações na tela
        fetchAndFormatTransactions();
        console.log("result", json);
      } else {
        console.error("Erro ao enviar a transação");
      }
    } catch (err) {
      console.error("Erro na requisição:", err);
    }
  }

  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const handleMouseMove = (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setX(x);
    setY(y);
  };

  let balance = 0;
  for (const transaction of transactions) {
    balance = balance + transaction.price;
  }

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });

  const formattedBalance = formatter.format(balance);
  const symbol = formattedBalance.charAt(0);
  const numberPart = formattedBalance.slice(1);
  const [intPart, fraction] = numberPart.split(".");

  return (
    <main>
      <h1>
        <span className="currency">{symbol}</span>
        {intPart}
        <span>.{fraction}</span>
      </h1>

      <form onSubmit={addNewTransaction}>
        <div className="basic">
          <input
            type="text"
            value={name}
            onChange={(ev) => setName(ev.target.value)}
            placeholder="-400 New smartphone"
          />
          <input
            type="datetime-local"
            value={datetime}
            onChange={(ev) => setDatetime(ev.target.value)}
          />
        </div>

        <div className="description">
          <input
            type="text"
            placeholder="Enter the description"
            value={description}
            onChange={(ev) => setDescription(ev.target.value)}
          />
        </div>

        <button
          type="submit"
          disabled={!allFieldsFilled}
          className={!allFieldsFilled ? "disabled" : ""}
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            e.currentTarget.style.setProperty("--x", `${x}px`);
            e.currentTarget.style.setProperty("--y", `${y}px`);
          }}
          style={{
            "--x": "0px",
            "--y": "0px",
          }}
        >
          Add new transaction
        </button>

        <div className="transactions">
          {formattedTransactions.length > 0 &&
            formattedTransactions.map((transaction, index) => (
              <div className="transaction" key={index}>
                <div className="left">
                  <div className="name">{transaction.name}</div>
                  <div className="description">{transaction.description}</div>
                </div>
                <div className="right">
                  <div
                    className={
                      "price " + (transaction.price < 0 ? "red" : "green")
                    }
                  >
                    {transaction.price < 0
                      ? `-$${Math.abs(transaction.price)}`
                      : `+$${transaction.price}`}
                  </div>
                  <div className="datetime">{transaction.datetime}</div>
                </div>
              </div>
            ))}
        </div>
      </form>
        <div className="credits">
          <p>Created by <a href="https://github.com/TavinHVM">Gustavo Henrique</a></p>
        </div>
    </main>
  );
}

export default App;
