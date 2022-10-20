const request = require('supertest')
const app = require('../src/app')

describe('Users endpoints', () => {
  it('create a user', async () => {
    const userToCreate = {
      firstName: 'ege',
      lastName: 'duman',
      email: `ege${Date.now()}@duman.com`,
      age: 1,
    }

    const userResponse = await request(app).post('/api/users').send(userToCreate).expect(200)
    const createdUser = userResponse.body

    expect(createdUser).toMatchObject(userToCreate)
  })
})
