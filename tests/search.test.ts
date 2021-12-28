process.env.NODE_ENV = 'test'

import chaiHttp from 'chai-http'
import chai from 'chai'
import { getSyncDBPool } from '../src/util/DBconnetor'

let expect = chai.expect
chai.use(chaiHttp)

let url = 'http://127.0.0.1:3000'
let test_conn = getSyncDBPool()

let user_id = -1
let epoc = () => Math.ceil(new Date().getTime() / 1000)
let login_cookie = null
describe('/Search ', () => {
    it('search products that contains `a` in their name', (done) => {
        chai.request(url)
            .get('/search')
            .send({ 'product_name': 'a' })
            .end((err, res) => {
                try {
                    expect(res).have.status(200)

                    for (let i = 0; i < res.body.lenght; i++) {
                        expect(res.body[i]).to.have.property('product_name')
                        expect(res.body[i].product_name).to.have.string('a');
                    }
                    done()
                } catch (error) {
                    done(error)
                }
            })
    })
    it('search products that contains `a` in their name and price >10', (done) => {
        chai.request(url)
            .get('/search')
            .send({ 'product_name': 'a', 'from_price': '10' })
            .end((err, res) => {
                try {
                    expect(res).have.status(200)

                    for (let i = 0; i < res.body.lenght; i++) {
                        expect(res.body[i]).to.have.property('product_name')
                        expect(res.body[i].product_name).to.have.string('a')
                        expect(res.body[i].price).to.be.greaterThanOrEqual(10)
                    }
                    done()
                } catch (error) {
                    done(error)
                }
            })
    })
    it('search products of price >=10 and <=50', (done) => {
        chai.request(url)
            .get('/search')
            .send({ 'to_price': '50', 'from_price': '10' })
            .end((err, res) => {
                try {
                    expect(res).have.status(200)

                    for (let i = 0; i < res.body.lenght; i++) {
                        expect(res.body[i]).to.have.property('product_name')
                        expect(res.body[i].price).to.be.greaterThanOrEqual(10)
                        expect(res.body[i].price).to.be.lessThanOrEqual(50)
                    }
                    done()
                } catch (error) {
                    done(error)
                }
            })
    })
    it('search products that contains `a` in their desc', (done) => {
        chai.request(url)
            .get('/search')
            .send({ 'product_desc': 'a' })
            .end((err, res) => {
                try {
                    expect(res).have.status(200)

                    for (let i = 0; i < res.body.lenght; i++) {
                        expect(res.body[i]).to.have.property('product_name')
                        expect(res.body[i].product_desc).to.have.string('a')
                    }
                    done()
                } catch (error) {
                    done(error)
                }
            })
    })
    it('search products whose price >10 and desc contain "a" and name contains "a"', (done) => {
        chai.request(url)
            .get('/search')
            .send({ 'from_price': '10', 'product_name': 'a', 'product_desc': 'a' })
            .end((err, res) => {
                try {
                    expect(res).have.status(200)

                    for (let i = 0; i < res.body.lenght; i++) {
                        expect(res.body[i]).to.have.property('product_name')
                        expect(res.body[i].price).to.be.greaterThanOrEqual(10)
                        expect(res.body[i].product_desc).to.have.string('a')
                        expect(res.body[i].product_name).to.have.string('a')
                    }
                    done()
                } catch (error) {
                    done(error)
                }
            })
    })
    it('search products that contains `a` in their name and price >10', (done) => {
        chai.request(url)
            .get('/search')
            .send({ 'product_name': 'a', 'from_price': '10' })
            .end((err, res) => {
                try {
                    expect(res).have.status(200)
                    for (let i = 0; i < res.body.lenght; i++) {
                        expect(res.body[i]).to.have.property('product_name')
                        expect(res.body[i].product_name).to.have.string('b')
                        expect(res.body[i].price).to.be.greaterThanOrEqual(10)
                    }
                    done()
                } catch (error) {
                    done(error)
                }
            })
    })
})