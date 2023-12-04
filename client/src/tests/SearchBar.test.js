import React from 'react'
import { render, fireEvent, screen, waitFor } from '@testing-library/react'
import SearchBar from "../pantry/SearchBar"

describe("SearchBar Component", () => {
    const ingredients = [
        {_id: "1", name: "apple"},
        {_id: "2", name: "onion"},
        {_id: "3", name: "salt"}
    ]

    let mockToSelectIngredient
    beforeEach(() => {
        mockToSelectIngredient = jest.fn()
    })

    test("Check SearchBar renders properly", () => {
        const search = render(<SearchBar placeholder="Search Ingredients" ingredients={ingredients} toSelectIngredient={mockToSelectIngredient}/>)
        expect(search).toBeDefined()
        const inputBox = screen.getByPlaceholderText("Search Ingredients")
        expect(inputBox).toBeInTheDocument()
    })

    test("Verify suggestions are shown when typing", () => {
        render(<SearchBar placeholder="Search Ingredients" ingredients={ingredients} toSelectIngredient={mockToSelectIngredient}/>)
        const inputBox = screen.getByPlaceholderText("Search Ingredients")
        fireEvent.change(inputBox, {target: {value: "ap"}})
        expect(screen.getByText("apple")).toBeInTheDocument()
    })

    test("Verify suggestions are still shown with caps", () => {
        render(<SearchBar placeholder="Search Ingredients" ingredients={ingredients} toSelectIngredient={mockToSelectIngredient}/>)
        const inputBox = screen.getByPlaceholderText("Search Ingredients")
        fireEvent.change(inputBox, {target: {value: "AP"}})
        expect(screen.getByText("apple")).toBeInTheDocument()
    })

    test("Verify toSelectIngredient is called when selected", async () => {
        const search = render(<SearchBar placeholder="Search Ingredients" ingredients={ingredients} toSelectIngredient={mockToSelectIngredient}/>)
        expect(search).toBeDefined()
        const inputBox = screen.getByPlaceholderText("Search Ingredients")
        fireEvent.change(inputBox, {target: {value: "on"}})
        await waitFor(() => {
            fireEvent.click(screen.getByText("onion"))
        })
        expect(mockToSelectIngredient).toHaveBeenCalledTimes(1)
    })

    test("Verify suggestions are gone when input cleared", () => {
        render(<SearchBar placeholder="Search Ingredients" ingredients={ingredients} toSelectIngredient={mockToSelectIngredient}/>)
        const inputBox = screen.getByPlaceholderText("Search Ingredients")
        fireEvent.change(inputBox, {target: {value: "ap"}})
        expect(screen.getByText("apple")).toBeInTheDocument()
        fireEvent.change(inputBox, {target: {value: ""}})
        expect(screen.queryByText("apple")).toBeNull()
    })

    test("Verify no suggestions with invalid search", () => {
        render(<SearchBar placeholder="Search Ingredients" ingredients={ingredients} toSelectIngredient={mockToSelectIngredient}/>)
        const inputBox = screen.getByPlaceholderText("Search Ingredients")
        fireEvent.change(inputBox, {target: {value: "1ap"}})
        expect(screen.queryByText("apple")).toBeNull()
        expect(screen.queryByText("onion")).toBeNull()
        expect(screen.queryByText("salt")).toBeNull()
    })
})
