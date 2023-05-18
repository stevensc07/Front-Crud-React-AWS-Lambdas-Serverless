import React from 'react';
import { render, screen, fireEvent, getByTestId } from '@testing-library/react';
import Inventory from '../../components/Inventory';
import companyService from '../../services/company';
import inventoryService from '../../services/inventory';
import { BrowserRouter as Router } from "react-router-dom";
import AppContext from '../../context/AppContext';



describe('Inventory component', () => {
    test('renders Inventory component', async () => {
        const value = { setRole: () => { }, role: 'admin' }
        render(
            <AppContext.Provider value={value} >
                <Router>
                    <Inventory />
                </Router>
            </AppContext.Provider>
        );
        expect(screen.getByText('Inventario')).toBeInTheDocument();
    });
});
