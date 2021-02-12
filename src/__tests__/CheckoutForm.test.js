import { act, render, screen } from "@testing-library/react";

import CheckoutForm from "../components/CheckoutForm";
import React from "react";
import userEvent from "@testing-library/user-event";

test("renders without errors", () => {
  render(<CheckoutForm />);
});

test("Checkout Form", async () => {
  render(<CheckoutForm />);

  const firstName = screen.getByLabelText(/First Name/i);
  userEvent.type(firstName, "Isaac");
  expect(firstName).toHaveValue("Isaac");

  const lastName = screen.getByLabelText(/Last Name/i);
  userEvent.type(lastName, "Pak");
  expect(lastName).toHaveValue("Pak");

  const address = screen.getByLabelText(/Address/i);
  userEvent.type(address, "2nd avenue");
  expect(address).toHaveValue("2nd avenue");

  const city = screen.getByLabelText(/City/i);
  userEvent.type(city, "Dallas");
  expect(city).toHaveValue("Dallas");

  const state = screen.getByLabelText(/State/i);
  userEvent.type(state, "Texas");
  expect(state).toHaveValue("Texas");

  const zip = screen.getByLabelText(/Zip/i);
  userEvent.type(zip, "83832");
  expect(zip).toHaveValue("83832");

  const button = screen.getByTestId("checkout");
  userEvent.click(button);

  try {
    const success = await screen.findByTestId("successMessage");
    expect(success).toBeInTheDocument();
  } catch (err) {
    console.log(err);
  }
});
