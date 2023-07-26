import { useEffect, useState } from "react";
import { Beer } from "../components/BeerInterface";


export const RandomBeerPage = () => {

const [beer,setBeer] = useState <Beer>();

useEffect(()=>{
const fetchRandomize = async () => {

  try {
    const response = await fetch('http://localhost:3000/beers/random');
    const data = await response.json();
    setBeer(data)
  }catch(error){
    console.log(error)
  }
};
fetchRandomize()


},[])


  return (
  <div>
       {beer && (
        <>
          <img src={beer.image_url} width={100} alt={beer.name} />
          <h2>{beer.name}</h2>
          <p>{beer.tagline}</p>
          <p>First Brewed: {beer.first_brewed}</p>
          <p>Attenuation Level: {beer.attenuation_level}</p>
          <p>{beer.description}</p>
          <p>Contributed By: {beer.contributed_by}</p>
        </>
      )}
      {!beer && <p>Cargando Cervezas...</p>}
  </div>
  )
}
