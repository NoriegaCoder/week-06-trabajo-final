const request = require("supertest")
const app = require("../app")

const BASE_URL = '/api/v1/users'
let TOKEN
let userId
let newUserId
const updatedUser = {
    firstName: 'Cesar'
}

beforeAll(async () => {
  const user = {
    email: "yoneison@gmail.com",
    password: "yoneison1234"
  }
  const res = await request(app)
    .post(`${BASE_URL}/login`)
    .send(user)

    //console.log(res.body)
  TOKEN = res.body.token
  userId = res.body.user.id
})

test('GET -> BASE_URL, should return statusCode 200, and res.body.length === 1',async() => {
const res = await request(app)
    .get(BASE_URL)
    .set('Authorization', `Bearer ${TOKEN}`)
    
  expect(res.statusCode).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body).toHaveLength(1)
})

test('POST -> BASE_URL, should return statusCode 201, and res.body.firstName === user.firstName',async() => {
    const user = {
        firstName:"Alexis",
        lastName:"Noriega",
        email:"alexis@gmail.com",
        password: "alexis1234",
        phone:"123123"
    }

const res = await request(app)
    .post(BASE_URL)
    .send(user)
    
  newUserId = res.body.id
  expect(res.statusCode).toBe(201)
  expect(res.body).toBeDefined()
  expect(res.body.firstName).toBe(user.firstName)
})

test('PUT -> BASE_URL, should return statusCode 200, and res.body.firstName === updatedUser.firstName',async() => {
const res = await request(app)
    .put(`${BASE_URL}/${userId}`)
    .send(updatedUser)
    .set('Authorization', `Bearer ${TOKEN}`)
    
  expect(res.statusCode).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body.name).toBe(updatedUser.name)
})

test('POST -> BASE_URL/login, should return status code 200, and res.body.user.email === user.email and res.body.token to be defined', async() => {
  const user ={
    email:"alexis@gmail.com",
    password: "alexis1234"
  }

  const res = await request(app)
    .post(`${BASE_URL}/login`)
    .send(user)

  expect(res.statusCode).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body.user.email).toBe(user.email)
  expect(res.body.token).toBeDefined
})

test('POST -> BASE_URL/login, should return status code 401', async() => {
  const invalidUser ={
    email:"alexis@gmail.com",
    password: "Invalid password"
  }

  const res = await request(app)
    .post(`${BASE_URL}/login`)
    .send(invalidUser)

  expect(res.statusCode).toBe(401)
})

test('DELETE -> BASE_URL/:id, should return statusCode 204',async() => {
const res = await request(app)
    .delete(`${BASE_URL}/${newUserId}`)
    .set('Authorization', `Bearer ${TOKEN}`)

  expect(res.statusCode).toBe(204)
})

