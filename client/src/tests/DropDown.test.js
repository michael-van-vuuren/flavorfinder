import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import DropDown from "../pantry/DropDown"

describe("RecipeRecommender Page", () => {
    test("Check DropDown renders properly", () => {
        render(<DropDown />)
        const selectElement = screen.getByText("Select Units")
        expect(selectElement).toBeInTheDocument()
    })
    
    test("Verify default Select Units label", () => {
        render(<DropDown />)
        const defaultOption = screen.getByText("Select Units")
        expect(defaultOption).toBeInTheDocument()
    })

    test("Test toSelectUnits when oz is selected", () => {
        const mockToSelectUnits = jest.fn()
        render(<DropDown toSelectUnits={mockToSelectUnits} />)
        const selectElement = screen.getByTestId("Select Units")
        fireEvent.change(selectElement, {target: {value: "oz"}})
        expect(mockToSelectUnits).toHaveBeenCalledWith("oz")
    })

    test("Test toSelectUnits when ml is selected", () => {
        const mockToSelectUnits = jest.fn()
        render(<DropDown toSelectUnits={mockToSelectUnits} />)
        const selectElement = screen.getByTestId("Select Units")
        fireEvent.change(selectElement, {target: {value: "ml"}})
        expect(mockToSelectUnits).toHaveBeenCalledWith("ml")
    })
})