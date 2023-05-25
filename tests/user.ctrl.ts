const request = require('supertest');

const { User } = require('../src/db/sequilize');
let server: any;
describe('user', () => {
    beforeEach(() => {
        server =  require('../src/app');
    });
    afterEach(() => {
        server.close();
    })
})