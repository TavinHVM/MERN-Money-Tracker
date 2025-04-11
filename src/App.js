import "./App.css";

function App() {
  return (
    <main>
      <h1>
        $400<span>.00</span>
      </h1>

      <form>
        <div className="basic">
          <input type="text" placeholder="Enter the product name" />
          <input type="datetime-local" />
        </div>

        <div className="description">
          <input type="text" placeholder="Enter the description" />
        </div>

        <button typeof="submit">Add new transaction</button>

        <div className="transactions">
          <div className="transaction">
            <div className="left">
              <div className="name">New Samsung TV</div>
              <div className="description">needed a new one</div>
            </div>

            <div className="right">
              <div className="price red">-$400.00</div>
              <div className="datetime">10/10/2022 15:45</div>
            </div>
          </div>

          <div className="transaction">
            <div className="left">
              <div className="name">Salário</div>
              <div className="description">5° dia útil</div>
            </div>

            <div className="right">
              <div className="price green">+$1.200.00</div>
              <div className="datetime">10/10/2022 15:45</div>
            </div>
          </div>

          <div className="transaction">
            <div className="left">
              <div className="name">Skin Fortnite</div>
              <div className="description">fullbox 200</div>
            </div>

            <div className="right">
              <div className="price red">-$100.00</div>
              <div className="datetime">10/10/2022 15:45</div>
            </div>
          </div>
        </div>
      </form>
    </main>
  );
}

export default App;
