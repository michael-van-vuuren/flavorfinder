import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import ChatInput from "../recommender/ChatInput"

describe("ChatInput Component", () => {
  test("Input box renders with correct placeholder", () => {
    render(<ChatInput onSubmit={() => {}}/>)
    const placeholderText = screen.getByPlaceholderText("Chat with RecipeBot...")
    expect(placeholderText).toBeInTheDocument()
  })

  test("Verify userInput state updates correctly", () => {
    render(<ChatInput onSubmit={() => {}}/>)
    const inputText = screen.getByPlaceholderText("Chat with RecipeBot...")
    fireEvent.change(inputText, {target: {value: "Hello World!"}})
    expect(inputText.value).toBe("Hello World!")
  })

  test("Test submit after Enter key press", () => {
    const mockSubmit = jest.fn()
    render(<ChatInput onSubmit={mockSubmit}/>)
    const inputText = screen.getByPlaceholderText("Chat with RecipeBot...")
    fireEvent.change(inputText, {target: {value: "Hello World!"}})
    fireEvent.keyPress(inputText, {key: "Enter", code: "Enter", charCode: 13})
    expect(mockSubmit).toHaveBeenCalledWith("Hello World!")
  })

  test("Verify no submit after Enter key press with empty input", () => {
    const mockSubmit = jest.fn()
    render(<ChatInput onSubmit={mockSubmit}/>)
    const inputText = screen.getByPlaceholderText("Chat with RecipeBot...")
    fireEvent.keyPress(inputText, {key: "Enter", code: "Enter", charCode: 13})
    expect(mockSubmit).not.toHaveBeenCalled()
  })

  test("Test submit after button pressed", () => {
    const mockSubmit = jest.fn()
    render(<ChatInput onSubmit={mockSubmit}/>)
    const inputText = screen.getByPlaceholderText("Chat with RecipeBot...")
    const sendButton = screen.getByText("Send")
    fireEvent.change(inputText, {target: {value: "Hello World!"}})
    fireEvent.click(sendButton)
    expect(mockSubmit).toHaveBeenCalledWith("Hello World!")
  })

  test("Verify no submit click with empty input", () => {
    const mockSubmit = jest.fn()
    render(<ChatInput onSubmit={mockSubmit}/>)
    const sendButton = screen.getByText("Send")
    fireEvent.click(sendButton)
    expect(mockSubmit).not.toHaveBeenCalled()
  })

  test("Verify input cleared after Send pressed", () => {
    const mockSubmit = jest.fn()
    render(<ChatInput onSubmit={mockSubmit}/>)
    const inputText = screen.getByPlaceholderText("Chat with RecipeBot...")
    const sendButton = screen.getByText("Send")
    fireEvent.change(inputText, {target: {value: "Hello World!"}})
    fireEvent.click(sendButton)
    expect(inputText.value).toBe("")
  })
}) 
