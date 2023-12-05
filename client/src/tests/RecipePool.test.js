import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MainContext } from "../MainContext"
import RecipePool from "../recipe-pool/RecipePool"

const mockRecipes = [
  { id: 1, name: "pho", description: "soup" },
  { id: 2, name: "cereal", description: "maybe soup" }
]

const mockContext = {
    sliderValue: 0,
    setSliderValue: jest.fn(),
}

describe("RecipePool component", () => {
  test("Render RecipePool component with default values", () => {
    render(
    <MainContext.Provider value={mockContext}>
        <RecipePool recipes={[]}/>
    </MainContext.Provider>
    )
    expect(screen.getByText("Potential Recipes")).toBeInTheDocument()
    expect(screen.getByText("With 0 extra ingredients, you can make")).toBeInTheDocument()
    expect(screen.getByText("Tolerance")).toBeInTheDocument()
    expect(screen.getByRole("slider")).toBeInTheDocument()
  })

  test("Render two RecipeCards", () => {
    render(
        <MainContext.Provider value={mockContext}>
            <RecipePool recipes={mockRecipes}/>
        </MainContext.Provider>
        )
    expect(screen.getByText("pho")).toBeInTheDocument()
    expect(screen.getByText("cereal")).toBeInTheDocument()
  })

  test("Verify description shown after clicking RecipeCard", async () => {
    render(
    <MainContext.Provider value={mockContext}>
        <RecipePool recipes={mockRecipes}/>
    </MainContext.Provider>
    )
    fireEvent.click(screen.getByText("pho"))
    await waitFor(() => {
      expect(screen.getByText("soup")).toBeInTheDocument()
    })
  })
})
