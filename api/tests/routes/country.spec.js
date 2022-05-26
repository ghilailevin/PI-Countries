/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require("chai")
const session = require("supertest-session")
const app = require("../../src/app.js")
const { Activity, conn } = require("../../src/db.js")

const agent = session(app)

describe("Country routes", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err)
    })
  )
  
  describe('GET /countries', () => {
    it('responds with 200', () => agent.get('/countries').expect(200));
    it('responds with an array of all countries', () =>
      agent.get('/countries').then((res) => {
        expect(res.body)
      }));
  });
  describe('GET /countries?name=`....`', () => {
    it('responds with 200', () => agent.get('/countries?name').expect(200));
  });
  describe('GET /countries/:idPais', () => {
    it('responds with 200', () => agent.get('/countries/:idPais').expect(200));
  });
})


describe("Activity routes", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err)
    })
  )
  beforeEach(() =>
    Activity.sync({ force: true }).then(() => Activity.create({
      name: "sky",    
      duration: "5",
      dificult: "Alta",
      season: "summer"
    }))
  )

  describe("POST /activity", () => {
    it("should get 200", (done) => {agent.post("/activity").send({
      name: "sky",
      dificult: "Alta",
      duration: "5",
      country:"Argentina",
      season: "summer"
    }).expect(200), done()})
        it('responds with 404 if it`s doesn`t object', (done) =>
          {agent.post('/activity')
            .send([{
              name: 2,
              dificult: 'Alta',
              duration: "10",
              season: "summer"
            }])
          .expect(404), done()}
        );
  })
})