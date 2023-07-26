import { useState } from "react";
import axios from "axios";

interface FormType {
  name: string;
  tagline: string;
  description: string;
  first_brewed: string;
  brewers_tips: string;
  attenuation_level: number;
  contributed_by: string;
  expireAt: string;
}

export const AddBeerPage = () => {
  const [newBeer, setNewBeer] = useState<FormType>({
    name: "",
    tagline: "",
    description: "",
    first_brewed: "",
    brewers_tips: "",
    attenuation_level: 0,
    contributed_by: "",
    expireAt: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewBeer((prevNewBeer) => ({
      ...prevNewBeer,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/beers/",
        newBeer
      );
      console.log("Response", response.data);
      setNewBeer({
        name: "",
        tagline: "",
        description: "",
        first_brewed: "",
        brewers_tips: "",
        attenuation_level: 0,
        contributed_by: "",
        expireAt: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={newBeer.name}
            onChange={handleChange}
          />
        </label>
        <label>
          Tagline:
          <input
            type="text"
            name="tagline"
            value={newBeer.tagline}
            onChange={handleChange}
          />
        </label>
        <label>
          Description:
          <textarea
            name="description"
            value={newBeer.description}
            onChange={handleChange}
          ></textarea>
        </label>
        <label>
          First Brewed:
          <input
            type="text"
            name="first_brewed"
            value={newBeer.first_brewed}
            onChange={handleChange}
          />
        </label>
        <label>
          Brewer's Tips:
          <input
            type="text"
            name="brewers_tips"
            value={newBeer.brewers_tips}
            onChange={handleChange}
          />
        </label>
        <label>
          Attenuation Level:
          <input
            type="number"
            name="attenuation_level"
            value={newBeer.attenuation_level}
            onChange={handleChange}
          />
        </label>
        <label>
          Contributed By:
          <input
            type="text"
            name="contributed_by"
            value={newBeer.contributed_by}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Add Beer</button>
      </form>
    </>
  );
};
