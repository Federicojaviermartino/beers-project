import { describe, test, expect, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event"
import { MemoryRouter } from "react-router-dom";
import nock, { RequestBodyMatcher } from "nock";
import axios from "axios";
import {AddBeerPage} from "../pages/AddBeerPage";

const API_URL = "https://f5-beers-065cad3017be.herokuapp.com";

axios.defaults.adapter = "http";

describe("Iteration 7", () => {
  describe("AddBeerPage component", () => {
    const newBeer = {
      name: "New Beer 1",
      tagline: "New Tagline 1",
      description: "New Description 1",
      first_brewed: "01/2023",
      brewers_tips: "Test Brewer Tips",
      attenuation_level: 1,
      contributed_by: "New Contributor 1",
    };


    beforeEach(() => {
      render(
        <MemoryRouter>
          <AddBeerPage />
        </MemoryRouter>
      );
    });

    test("renders the 'name' input field", async () => {
      const nameInput = screen.getByRole('input',{name:"name"});
      await waitFor(() => {
        expect(nameInput).not.toBeNull();
      });
    });

    test("renders the 'tagline' input field", async () => {
      const taglineInput = screen.getByRole('input',{name:"tagline"});
      await waitFor(() => {
        expect(taglineInput).not.toBeNull();
      });
    });

    test("renders the 'description' input field", async () => {
      const descriptionInput = screen.getByRole('textarea',{name:"description"});
      await waitFor(() => {
        expect(descriptionInput).not.toBeNull();
      });
    });

    test("renders the 'first_brewed' input field", async () => {
      const firstBrewedInput = screen.getByRole('input',{name:'first_brewed'});
      await waitFor(() => {
        expect(firstBrewedInput).not.toBeNull();
      });
    });

    test("renders the 'brewers_tips' input field", async () => {
      const brewersTipsInput = screen.getByRole('input',{name:"brewers_tips"});
      await waitFor(() => {
        expect(brewersTipsInput).not.toBeNull();
      });
    });

    test("renders the 'contributed_by' input field", async () => {
      const contributedByInput = screen.getByRole('input',{name:"contributed_by"});
      await waitFor(() => {
        expect(contributedByInput).not.toBeNull();
      });
    });

    test("renders the 'attenuation_level' input field", async () => {
      const attenuationInput = screen.getByRole('input',{name:"attenuation_level"});
      await waitFor(() => {
        expect(attenuationInput).not.toBeNull();
      });
    });

    test("renders the 'Add Beer' submit button", async () => {
      await waitFor(() => {
        expect(
          screen.getByRole("button", { name: /add beer/i })
        ).toBeInTheDocument();
      });
    });

    test("sends form values to the API via POST request when the form is submitted", async () => {
      let requestBody;
      const scope = nock(API_URL)
          .post("/beers", (body: RequestBodyMatcher) => {
              requestBody = body;
              return true;
          })
          .reply(200,{});

      const nameInput = screen.queryByRole('input',{name:"name"}) as HTMLElement;
      const taglineInput = screen.queryByRole('input',{name:"tagline"}) as HTMLElement;
      const descriptionInput = screen.queryByRole('textarea',{name:"description"}) as HTMLElement;
      const firstBrewedInput = screen.queryByRole('input',{name:"first_brewed"}) as HTMLElement;
      const brewersTipsInput = screen.queryByRole('input',{name:"rewers_tips"}) as HTMLElement;
      const contributedByInput = screen.queryByRole('input',{name:"ontributed_by"}) as HTMLElement;
      const attenuationInput = screen.queryByRole('input',{name:"ttenuation_level"}) as HTMLElement;

      await userEvent.type(nameInput, newBeer.name);
      await userEvent.type(taglineInput,newBeer.tagline);
      await userEvent.type(descriptionInput,newBeer.description);
      await userEvent.type(firstBrewedInput,newBeer.first_brewed);
      await userEvent.type(brewersTipsInput,newBeer.brewers_tips);
      await userEvent.type(contributedByInput,newBeer.contributed_by);
      await userEvent.type(attenuationInput,newBeer.attenuation_level.toString());

      await userEvent.click(screen.getByRole("button", { name: /add beer/i }));

      scope.done();

      expect(requestBody.name).toBe(newBeer.name);
      expect(requestBody.tagline).toBe(newBeer.tagline);
      expect(requestBody.description).toBe(newBeer.description);
      expect(requestBody.first_brewed).toBe(newBeer.first_brewed);
      expect(requestBody.brewers_tips).toBe(newBeer.brewers_tips);
      expect(requestBody.attenuation_level).toBe(
        String(newBeer.attenuation_level)
      );
      expect(requestBody.brewers_tips).toBe(newBeer.brewers_tips);
    });
  });
});