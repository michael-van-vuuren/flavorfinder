import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import AddToPantry from "../pantry/AddToPantry"

const mockIngredients = [
    { id: "1", name: "salt", description: "salty" },
    { id: "2", name: "pepper", description: "peppery" }
]

describe("AddToPantry component", () => {
    test("Render AddToPantry component properly", async () => {
        render(<AddToPantry pantryAddition={[]} setPantryAddition={() => { }} ingredients={mockIngredients} />);
        expect(screen.getByText("Add ingredients")).toBeInTheDocument()
        expect(screen.getByPlaceholderText("Enter an Ingredient...")).toBeInTheDocument()
        expect(screen.getByPlaceholderText("Enter a Quantity...")).toBeInTheDocument()
        expect(screen.getByText("Select Units")).toBeInTheDocument()
        expect(screen.getByText("Add")).toBeInTheDocument()
    })

    test("Verify inputs to AddToPantry component", () => {
        render(<AddToPantry pantryAddition={[]} setPantryAddition={jest.fn()} ingredients={mockIngredients} />);
        const ingredName = "salt"
        fireEvent.change(screen.getByPlaceholderText("Enter an Ingredient..."), {target: {value: "salt"}})
        fireEvent.click(screen.getByText(ingredName))
        fireEvent.change(screen.getByPlaceholderText("Enter a Quantity..."), {target: {value: 125}})
        const selectElement = screen.getByTestId("Select Units")
        fireEvent.change(selectElement, {target: {value: "lb"}})
        expect(screen.getByText("lb")).toBeInTheDocument()
        expect(screen.getByDisplayValue(125)).toBeInTheDocument()
    })
})