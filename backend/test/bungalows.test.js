/* eslint-disable no-underscore-dangle */
const request = require('supertest')
const app = require('../src/app')

const agent = request.agent(app)

describe('Bungalows endpoints', () => {
  let authenticatedSession

  beforeEach(async () => {
    const userToLogin = {
      email: 'test@test.com',
      password: 'Test',
    }

    authenticatedSession = await agent.post('/api/account/session').send(userToLogin)

    return authenticatedSession
  })

  it('get request to /bungalows should list bungalows', async () => {
    const bungalowList = (await agent.get('/api/bungalows')).body

    const bungalowsExist = bungalowList.length > 0

    expect(bungalowsExist).toBe(true)
  })

  it('get name query request to /bungalows should show bungalow', async () => {
    // create bungalow
    const bungalowToCreate = {
      name: 'namequery',
      location: 'query',
      capacity: 2,
      price: 2000,
    }

    const bungalowRequest = await agent.post('/api/bungalows').send(bungalowToCreate).expect(200)
    const createdBungalow = bungalowRequest.body

    const bungalow = (await agent.get(`/api/bungalows?name=${createdBungalow.name}`)).body

    expect(bungalow[0]).toMatchObject(bungalowToCreate)
  })

  it('get request to /bungalows/:bungalowId should return bungalow', async () => {
    // create bungalow
    const bungalowToCreate = {
      name: 'somebungalow',
      location: 'somewhere',
      capacity: 4,
      price: 1250,
    }

    const bungalowRequest = await agent.post('/api/bungalows').send(bungalowToCreate).expect(200)
    const createdBungalow = bungalowRequest.body

    const response = await agent.get(`/api/bungalows/${createdBungalow._id}`).expect(200)

    expect(response.body).toMatchObject(bungalowToCreate)
  })

  it('post request to /bungalows should create a bungalow', async () => {
    const bungalowToCreate = {
      name: 'somebungalow',
      location: 'edirne',
      capacity: 4,
      price: 1250,
    }

    const bungalowRequest = await agent.post('/api/bungalows').send(bungalowToCreate).expect(200)
    const createdBungalow = bungalowRequest.body

    expect(createdBungalow).toMatchObject(bungalowToCreate)
    expect(createdBungalow.name).toBe(bungalowToCreate.name)
    expect(createdBungalow.location).toBe(bungalowToCreate.location)
    expect(createdBungalow.capacity).toBe(bungalowToCreate.capacity)
    expect(createdBungalow.price).toBe(bungalowToCreate.price)
  })

  it('create a new review', async () => {
    const bungalowToCreate = {
      name: 'somebungalow',
      location: 'somewhere',
      capacity: 4,
      price: 1250,
    }

    const reviewToCreate = {
      text: 'perfect place',
      rate: 3,
    }

    const bungalowRequest = await agent.post('/api/bungalows').send(bungalowToCreate).expect(200)
    const createdBungalow = bungalowRequest.body

    const reviewRequest = await agent.post(`/api/bungalows/${createdBungalow._id}/reviews`).send(reviewToCreate)
    const createdReview = reviewRequest.body

    expect(createdReview).toMatchObject(reviewToCreate)
  })
})
