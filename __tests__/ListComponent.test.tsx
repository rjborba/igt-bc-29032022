import ListComponent, { ExchangesItem } from "@/components/ListComponent";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { MockData } from "../MockData";

describe("List", () => {
  it("should render the list correctly", () => {
    render(<ListComponent data={MockData as ExchangesItem[]} />);

    const listItems = screen.getAllByRole("listitem");
    expect(listItems.length).toBe(100);

    (MockData as ExchangesItem[]).forEach(
      (mockItem: ExchangesItem, index: number) => {
        const item = within(listItems[index]);

        item.getByRole("heading", { name: mockItem.name });
        mockItem.year_established &&
          item.getByText(String(mockItem.year_established));
        mockItem.country && item.getByText(mockItem.country);
        mockItem.trust_score && item.getByText(String(mockItem.trust_score));
        mockItem.trade_volume_24h_btc &&
          item.getByText(String(mockItem.trade_volume_24h_btc));
      }
    );
  });

  it("should filter correctly", () => {
    render(<ListComponent data={MockData as ExchangesItem[]} />);

    const inputElement = screen.getByPlaceholderText(/filtre por nome/i);

    fireEvent.change(inputElement, { target: { value: "okx" } });

    const listItems = screen.getAllByRole("listitem");
    expect(listItems.length).toBe(1);

    const nodeItem = within(listItems[0]);
    nodeItem.getByRole("heading", { name: /okx/i });
  });

  it("should display Not Result for empty data", () => {
    render(<ListComponent data={[]} />);

    screen.getByText(/sem resultados/i);
  });

  it("should render buttons correctly", () => {
    render(<ListComponent data={MockData as ExchangesItem[]} />);

    screen.getByRole("button", { name: /proxima pagina/i });
    screen.getByRole("button", { name: /pagina anterior/i });
  });
});
