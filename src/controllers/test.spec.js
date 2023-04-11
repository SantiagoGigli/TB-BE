import chai, { expect } from 'chai'
import chaiHttp from 'chai-http'
import { app } from '../..'

chai.use(chaiHttp)

describe('Test Lists', () => {
  it('Get parsed list', (done) => {
    chai.request(app)
      .get('/api/files/data')
      .end((_, res) => {
        expect(res).to.have.status(200)
        expect(res.body.data['test2.csv']).to.have.property('file').to.be.an('string')
        expect(res.body.data['test2.csv'].lines[0]).to.have.property('text').to.be.an('string')
        expect(res.body.data['test2.csv'].lines[0]).to.have.property('number').to.be.an('number')
        expect(res.body.data['test2.csv'].lines[0]).to.have.property('hex').to.be.an('string')
        done()
      })
  })

  it('Get list', (done) => {
    chai.request(app)
      .get('/api/files/list')
      .end((_, res) => {
        expect(res).to.have.status(200)
        expect(res.body.data.files).to.be.an('array')
        expect(res.body.data.files[0]).to.be.an('string')
        done()
      })
  })
})
