import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./App.css";

/* Pizza Data  */
const pizzaData = [
  { name: "Focaccia", description: "A thick, chewy Italian bread with rosemary and olive oil.", price: 6, image: "/pizzas/focaccia.jpg" },
  { name: "Pizza Margherita", description: "Classic delight with tomatoes, mozzarella, and basil.", price: 10, image: "/pizzas/margherita.jpg" },
  { name: "Funghi", description: "Fresh mushrooms, creamy cheese and herbs.", price: 11, image: "/pizzas/funghi.jpg" },
  { name: "Prosciutto", description: "Smoked ham, mozzarella, and fresh greens.", price: 12, image: "/pizzas/prosciutto.jpg" },
  { name: "Salami", description: "Italian salami, rich tomato base, melted cheese.", price: 12, image: "/pizzas/salamino.jpg" },
  { name: "Spinach", description: "Spinach, feta cheese, and garlic olive oil.", price: 10, image: "/pizzas/spinaci.jpg" },
];

/* Evil Search Bar  */
function EvilSearchBar({ query, setQuery }) {
  return (
    <div className="evil-search">
      <input
        type="text"
        placeholder="Search for a pizza..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
}


/*  Header*/
function Header() {
  return (
    <header>
      <h1>Jaizz Sauce Pizza</h1>
      <p className="tagline">Don't feast your eyes. Feast on Jaizz pies! 🍕</p>
    </header>
  );
}

/* ---------------- Pizza Card ---------------- */
function Pizza({ name, description, image, price, isFavourite, toggleFavourite }) {
  return (
    <div className="pizza">
      <img src={image} alt={name} />
      <div className="pizza-info">
        <h3>{name}</h3>
        <p>{description}</p>
        <span>${price}</span>
        <button className="fav-btn" onClick={() => toggleFavourite(name)}>
          {isFavourite ? "⭐" : "★"}
        </button>
      </div>
    </div>
  );
}

/* ---------------- Footer ---------------- */
function Footer() {
  const hour = new Date().getHours();
  const openHour = 10;
  const closeHour = 22;
  const isOpen = hour >= openHour && hour < closeHour;

  function handleEvilClick() {
    alert("😈 Mwahaha! Everything is OUT OF STOCK. No pizza for you!");
  }

  return (
    <footer>
      {isOpen ? (
        <div className="order-section">
          <p>We're currently open! Come visit or order online.</p>
          <button className="evil-btn" onClick={handleEvilClick}>
            Order Now... if you dare 🍕
          </button>
        </div>
      ) : (
        <p>Sorry, we're closed. See you tomorrow!</p>
      )}
    </footer>
  );
}

/* ---------------- App ---------------- */
function App() {
  const [favourites, setFavourites] = useState([]);
  const [query, setQuery] = useState("");

  function toggleFavourite(pizzaName) {
    setFavourites(prev =>
      prev.includes(pizzaName)
        ? prev.filter(name => name !== pizzaName)
        : [...prev, pizzaName]
    );
  }

  // Filter pizzas by search query
  const filteredPizzas = pizzaData.filter(pizza =>
    pizza.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="app">
      <Header />
      <EvilSearchBar query={query} setQuery={setQuery} />

      <main>
        <div className="pizza-list">
          {filteredPizzas.length > 0 ? (
            filteredPizzas.map(pizza => (
              <Pizza
                key={pizza.name}
                name={pizza.name}
                description={pizza.description}
                image={pizza.image}
                price={pizza.price}
                isFavourite={favourites.includes(pizza.name)}
                toggleFavourite={toggleFavourite}
              />
            ))
          ) : (
            <p style={{ color: "darkred", fontWeight: "bold", textAlign: "center" }}>
              😈 No pizza found! Everything is OUT OF STOCK!
            </p>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

/* ---------------- Render ---------------- */
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
