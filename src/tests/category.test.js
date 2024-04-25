const request = require("supertest")
const app = require("../app")

let TOKEN
let categoryId
const BASE_URL = '/api/v1/categories'

beforeAll(async() => {
  const user = {
      email: 'yoneison@gmail.com',
      password: 'yoneison1234'
  }

  const res = await request(app)
    .post('/api/v1/users/login')
    .send(user)

  TOKEN = res.body.token
})

test('POST -> BASE_URL, should return statusCode 201, and res.body.name === user.name',async() => {
    const category = {
        name: 'tecno'
    }

    const res = await request(app)
        .post(BASE_URL)
        .send(category)
        .set('Authorization', `Bearer ${TOKEN}`)
    
    categoryId = res.body.id
    expect(res.statusCode).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(category.name)
})

test('GET -> BASE_URL, should return statusCode 200, and res.body.length === 1',async() => {
    const res = await request(app)
        .get(BASE_URL)
        .set('Authorization', `Bearer ${TOKEN}`)
        
      expect(res.statusCode).toBe(200)
      expect(res.body).toBeDefined()
      expect(res.body).toHaveLength(1)
    })
    
test('DELETE -> BASE_URL/:id, should return statusCode 204',async() => {
    const res = await request(app)
        .delete(`${BASE_URL}/${categoryId}`)
        .set('authorization', `Bearer ${TOKEN}`)

    expect(res.statusCode).toBe(204)
})