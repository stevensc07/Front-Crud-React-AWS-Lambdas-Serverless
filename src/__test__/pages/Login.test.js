import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Login from '../../pages/Login';
import loginService from '../../services/user';
import jwt_decode from "jwt-decode";
import AppProvider from '../../context/AppProvider';
import { BrowserRouter as Router } from "react-router-dom";
import AppContext from '../../context/AppContext';

jest.mock('../../services/user');
jest.mock('jwt-decode');

describe('Login Component', () => {
    it('should render login form correctly', () => {
        const value = { setRole: () => { }, setIsLogged: () => { } }

        const { getByLabelText, getByText } = render(
            <AppContext.Provider value={value} >
                <Router>
                    <Login />
                </Router>
            </AppContext.Provider>);

        expect(getByLabelText(/email/i)).toBeInTheDocument();
        expect(getByLabelText(/contraseña/i)).toBeInTheDocument();
        expect(getByText(/entrar/i)).toBeInTheDocument();
    });

    it('should call loginService when clicking login button', async () => {
        const value = { setRole: () => { }, setIsLogged: () => { } }

        const { getByLabelText, getByText } = render(
            <AppContext.Provider value={value} >
                <Router>
                    <Login />
                </Router>
            </AppContext.Provider>

        );
        const emailInput = getByLabelText(/email/i);
        const passwordInput = getByLabelText(/contraseña/i);
        const loginButton = getByText(/entrar/i);

        fireEvent.change(emailInput, { target: { value: 'example@mail.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password' } });

        loginService.mockResolvedValueOnce({ message: 'Success', token: 'example_token' });
        jwt_decode.mockReturnValueOnce({ profile: 'user' });

        fireEvent.click(loginButton);

        await waitFor(() => {
            expect(loginService).toHaveBeenCalledWith({ email: 'example@mail.com', password: 'password' });
            expect(localStorage.getItem('token')).toEqual('example_token');
            expect(localStorage.getItem('profile')).toEqual('user');
            expect(window.location.pathname).toEqual('/home');
        });
    });

    it('should show error message when login fails', async () => {
        const value = { setRole: () => { }, setIsLogged: () => { } }

        const { getByLabelText, getByText } = render(

            <AppContext.Provider value={value} >
                <Router>
                    <Login />
                </Router>
            </AppContext.Provider>
        );
        const emailInput = getByLabelText(/email/i);
        const passwordInput = getByLabelText(/contraseña/i);
        const loginButton = getByText(/entrar/i);

        fireEvent.change(emailInput, { target: { value: 'example@mail.com' } });
        fireEvent.change(passwordInput, { target: { value: 'wrong_password' } });

        loginService.mockResolvedValueOnce({ message: 'Error' });

        fireEvent.click(loginButton);

        await waitFor(() => {
            expect(loginService).toHaveBeenCalledWith({ email: 'example@mail.com', password: 'wrong_password' });
            expect(window.location.pathname).toEqual('/home');
            expect(getByText(/algo salió mal/i)).toBeInTheDocument();
        });
    });
});


describe('<Login />', () => {
    test('renders context', () => {
        const value = { setRole: () => { }, setIsLogged: () => { } }
        const props = { info: { prev: "email", next: "address" }, changeInfo: () => { } }
        render(
            <AppContext.Provider value={value} >
                <Router>
                    <Login />
                </Router>
            </AppContext.Provider>
        )
    })
})