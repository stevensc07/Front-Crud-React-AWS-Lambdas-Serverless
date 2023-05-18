import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Home from '../../pages/Home'; 
import { BrowserRouter as Router } from "react-router-dom";
import AppContext from '../../context/AppContext';

describe('Home', () => {
    test('renders Home component', () => {
        const value = { setRole: () => { }, role: 'admin' }

        render(
            <AppContext.Provider value={value} >
                <Router>
                    <Home />
                </Router>
            </AppContext.Provider>

        );
        const drawerButton = screen.getByTestId('drawer_button_toggle');
        fireEvent.click(drawerButton);
        const homeElement = screen.getByTestId('Home');
        expect(homeElement).toBeInTheDocument();
    });
});