import { describe } from "node:test";
import { render, waitFor } from "@testing-library/react";
import { InputField } from "./index";
import { FieldError } from "react-hook-form";

describe("InputField Component", async () => {
  it("should be render", async () => {
    const { getByPlaceholderText } = render(
      <InputField name="mock" placeholder="mock" />
    );

    const input = getByPlaceholderText("mock");

    await waitFor(() => {
      expect(input).toBeInTheDocument();
    });
  });

  it("should be render with error", async () => {
    const { getByPlaceholderText, getByText } = render(
      <InputField
        name="mock"
        placeholder="mock"
        error={{ message: "mock error" } as FieldError}
      />
    );

    const input = getByPlaceholderText("mock");
    const error = getByText("mock error");

    await waitFor(() => {
      expect(input).toBeInTheDocument();
      expect(error).toBeInTheDocument();
    });
  });
});
