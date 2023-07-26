import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Beer } from "../components/BeerInterface";

export const AllBeersPage: React.FC = () => {
  const [beers, setBeers] = useState<Beer[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchBeers = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/beers/"
        );
        const data = await response.json()as Beer;
        setBeers(data);
      } catch (error) {
        console.log("Error al obtener las cervezas:", error);
      }
    };

    fetchBeers().catch(console.error);
  }, []);

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredBeers = beers.filter((beer) =>
    beer.name.toLowerCase().includes(searchQuery.toLowerCase())
    
  );

  return (
    <div>
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchInputChange}
        className="bg-gray"
        placeholder="Buscar cervezas..."
      />
      <ul>
        {filteredBeers.map((beer) => (
          <li key={beer._id} className="">
            <div className="d-flex justify-content-center p-3">
              <Link to={`/beers/${beer._id}`}>
                <img src={beer.image_url} style={{ width: "100px" }} />
              </Link>
            </div>
            <div className="">
              <p>{beer.tagline}</p>
              <p>Created By: {beer.name}</p>
              <p>Contribute By: {beer.contributed_by}</p>
            </div>
            <Link to={`/beers/${beer._id}`}>Details</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
