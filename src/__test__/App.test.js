import React from "react";
import AppProvider from "../context/AppProvider";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";


import App from "../components/App";

describe('<App />', () => {


    test('renders context', () => {
        const value = { isOpen: false, handleModalActived: () =>{}}
        render(
            <AppProvider value={value}>
                    <App />
            </AppProvider>
        )
    })
})