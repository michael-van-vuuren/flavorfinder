import React from 'react'
import { render, fireEvent, screen, waitFor } from '@testing-library/react'
import RecipeRecommender from "../recommender/Recommender"

describe("RecipeRecommender Page", () => {
    test("Check RecipeRecommender renders properly", () => {
        const recommender = render(<RecipeRecommender />)
        expect(recommender).toBeDefined()
        const clearButton = screen.getByText("Clear Messages")
        expect(clearButton).toBeInTheDocument()
        const inputBox = screen.getByPlaceholderText("Chat with RecipeBot...")
        expect(inputBox).toBeInTheDocument()
        const sendButton = screen.getByText("Send")
        expect(sendButton).toBeInTheDocument()
    })

    test("Verify Clear Messages button", async () => {
        render(<RecipeRecommender />)
        const clearButton = screen.getByText("Clear Messages")
        const inputText = screen.getByPlaceholderText("Chat with RecipeBot...")
        fireEvent.change(inputText, {target: {value: "Hello World!"}})
        fireEvent.click(screen.getByText("Send"))
        await waitFor(() => {
            const messages = screen.getByTestId("user-message")
            expect(messages).toBeInTheDocument()
        })
        fireEvent.click(clearButton)
        await waitFor(() => {
            const messages = screen.queryAllByTestId("user-message")
            expect(messages).toHaveLength(0)
        })
    })

    test("Verify RecipeRecommender renders 4 user messages", () => {
        render(<RecipeRecommender />)
        const sendButton = screen.getByText("Send")
        const inputText = screen.getByPlaceholderText("Chat with RecipeBot...")
        fireEvent.change(inputText, {target: {value: "Hello World 1!"}})
        fireEvent.click(sendButton)
        fireEvent.change(inputText, {target: {value: "Hello World 2!"}})
        fireEvent.click(sendButton)
        fireEvent.change(inputText, {target: {value: "Hello World 3!"}})
        fireEvent.click(sendButton)
        fireEvent.change(inputText, {target: {value: "Hello World 4!"}})
        fireEvent.click(sendButton)
        const messages = screen.getAllByTestId("user-message")
        expect(messages).toHaveLength(4)
    })
    
})