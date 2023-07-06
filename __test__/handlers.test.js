'use strict';

process.env.SECRET = "TEST_SECRET";

const { db, users } = require('../src/auth/models');
const { handleSecret } = require('../src/auth/router/handlers.js');
const { handleGetUsers } = require('../src/auth/router/handlers.js');
const { handleSignin } = require('../src/auth/router/handlers.js');
const { handleSignup } = require('../src/auth/router/handlers.js');

beforeAll(async () => {
    await db.sync();
});
afterAll(async () => {
    await db.drop();
});

describe('testing the users route handler', () => {

    const res = {
        send: jest.fn(() => res),
        status: jest.fn(() => res),
        json: jest.fn(() => res),
    }
    const next = jest.fn();

    test('Should respond with a secret response', () => {
        let req = {};

        handleSecret(req, res, next);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith(expect.anything());
    });
});



describe('Router handler for getUsers', () => {

    const res = {
        send: jest.fn(() => res),
        status: jest.fn(() => res),
        json: jest.fn(() => res),
    }
    const next = jest.fn();

    test('Should fetch users and send user objects in the response', async () => {

        let req = {};

        await handleGetUsers(req, res, next);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(expect.anything());
    });

});


describe('Testing the signin handler', () => {

    const res = {
        send: jest.fn(() => res),
        status: jest.fn(() => res),
        json: jest.fn(() => res),
    };
    const next = jest.fn();



    test('Should trigger error handler when no user is present on the request', async () => {
        let req = {};
        jest.clearAllMocks();

        await handleSignin(req, res, next);
        expect(res.status).not.toHaveBeenCalled();
        expect(res.send).not.toHaveBeenCalled();
        expect(res.json).not.toHaveBeenCalled();
        expect(next).toHaveBeenCalled();
    });
});



describe('testing the Signup Handler', () => {

    const res = {
        send: jest.fn(() => res),
        status: jest.fn(() => res),
        json: jest.fn(() => res),
    };
    const next = jest.fn();


    test('Should call the error handler if no body attached to the request the on the request body', async () => {
        let req = {};
        jest.clearAllMocks();

        await handleSignup(req, res, next);
        expect(res.status).not.toHaveBeenCalled();
        expect(res.json).not.toHaveBeenCalled();
        expect(next).toHaveBeenCalledWith(expect.anything());
    });
});