
const {
    beforeEach,
    afterAll
} = require('@jest/globals');
const request = require('supertest')
const app = require('../../index')
const mongoose = require("mongoose");

const dataUser={
    "_id":"60deb7ee11a66f66c8e832b8",
    "username":"alma",
    "password":"123123",
    "email":"almagusput@gmail.com",
    "name":"Alma Gustafianto Putra",
    "roleId":"2",
    "jobFamiy":"SE",
    "grade":"JP",
    "dateOfBirth":"1996-01-01"
}

const dataUpdate={
    "email":"alma@gmail.com",
    "name":"Almagusput",
    "roleId":"1",
    "jobFamiy":"SE",
    "grade":"AN",
    "dateOfBirth":"2021-06-28"
}

const _id = '60deb7ee11a66f66c8e832b8'


beforeAll(done => {
    done()
})

describe("Crud user using API", () => {
    test("Successfully create data user", async () => {
        const response = await request(app).post("/api/users/create").send(dataUser);
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('success');
    });

    test("Successfully get all user", async () => {
        const response = await request(app).get("/api/users/getAll");
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe("list all user");
    });

    test("Successfully get user by id", async () => {
        const response = await request(app).get("/api/users/getById/"+_id);
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe("get by id");
    });

    test("Successfully update user by id", async () => {
        const response = await request(app).patch("/api/users/updateUser/"+_id).send(dataUpdate);
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe("updated");
    });

    test("Successfully update user by id", async () => {
        const response = await request(app).delete("/api/users/deleteUser/"+_id);
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe("successfully deleted");
    });
});

afterAll(done => {
    // Closing the DB connection allows Jest to exit successfully.
    mongoose.connection.close()
    done()
})