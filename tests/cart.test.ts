process.env.NODE_ENV = 'test'

import chaiHttp from 'chai-http'
import chai from 'chai'
import { DBPool } from '../src/app'
import InventoryModel from '../src/models/inventory'
import CartModel from '../src/models/cart'

let expect = chai.expect
chai.use(chaiHttp)
let inventoryModel = new InventoryModel(DBPool)
let cartModel = new CartModel(DBPool)

let url = 'http://127.0.0.1:3000'

let user_id = -1
let epoc = () => Math.ceil(new Date().getTime() / 1000)
let fake_user = {
    'username': 'fake_test_user1',
    'email': `fake_test_user1@gmail.com`,
    'password': '123',
    'user_id': -1
}
let login_cookie = null


describe('/Cart', () => {
    it('login fake user', (done) => {
        chai.request(url)
            .post('/login')
            .send(fake_user)
            .end((err, res) => {
                if (err) done(err)
                try {
                    expect(res).to.have.status(200)
                    login_cookie = (res.header['set-cookie'][0].toString())
                    fake_user.user_id = res.body.user_id
                    done()
                } catch (error) {
                    done('can\'t login fake user! make sure fake user already registerd :' + error)
                }
            })
    })
    it('clear fake user\'s cart', (done) => {
        chai.request(url)
            .delete('/cart/all')
            .set('cookie', login_cookie)
            .end((err, res) => {
                try {
                    expect(res).have.status(200)
                    expect(res.body).to.have.property('user_id')
                    done()
                } catch (error) {
                    done(error)
                }
            })
    })

    let rand_product_id = -1
    it('add random product to fake user\'s cart', (done) => {
        let p = inventoryModel.get_random_product_id()
        p.then((res) => {
            rand_product_id = res
            chai.request(url)
                .post('/cart')
                .set('cookie', login_cookie)
                .send({ 'product_id': rand_product_id })
                .end((err, res) => {
                    try {
                        if (err) done(err)
                        expect(res).have.status(201)
                        expect(res.body).to.have.property('product_id', rand_product_id)
                        done()
                    } catch (error) {
                        done(error)
                    }
                })
        }).catch(err => done(err))
    })

    it('rejects adding already existing product to cart', (done) => {
        let p = inventoryModel.get_random_product_id()
        p.then((res) => {
            rand_product_id = res
            chai.request(url)
                .post('/cart')
                .set('cookie', login_cookie)
                .send({ 'product_id': rand_product_id })
                .end((err, res) => {
                    try {
                        if (err) done(err)
                        expect(res).have.status(400)
                        done()
                    } catch (error) {
                        done(error)
                    }
                })
        }).catch(err => done(err))
    })

    it('get cart items', (done) => {
        chai.request(url)
            .get('/cart')
            .set('cookie', login_cookie)
            .end((err, res) => {
                try {
                    expect(res).have.status(200)
                    expect(res.body).to.be.an('array')
                    let products_ids = []
                    for (let i = 0; i < res.body.length; i++) {
                        expect(res.body[i]).to.have.property('product_id')
                        products_ids.push(res.body[i].product_id)
                    }
                    expect(products_ids).to.include(rand_product_id)
                    done()
                } catch (error) {
                    done(error)
                }
            })
    })
    it('reject to decrease cart item qunatity lower than 1', (done) => {
        chai.request(url)
            .put('/cart')
            .set('cookie', login_cookie)
            .send({ 'product_id': rand_product_id, 'quantity': 'down' })
            .end((err, res) => {
                if (err) done(err)
                try {
                    expect(res).have.status(200)
                    cartModel.get_cart_item(fake_user.user_id, rand_product_id)
                        .then((data) => {
                            expect(data).to.have.property('quantity', 1)
                            done()
                        })
                        .catch((err) => done(err))
                } catch (err) {
                    done(err)
                }
            })
    })
    it('increase cart item qunatity', (done) => {
        chai.request(url)
            .put('/cart')
            .set('cookie', login_cookie)
            .send({ 'product_id': rand_product_id, 'quantity': 'up' })
            .end((err, res) => {
                if (err) done(err)
                try {
                    expect(res).have.status(200)
                    cartModel.get_cart_item(fake_user.user_id, rand_product_id)
                        .then((data) => {
                            expect(data).to.have.property('quantity', 2)
                            done()
                        })
                        .catch((err) => done(err))

                } catch (err) {
                    done(err)
                }
            })
    })

    it('increase again cart item qunatity', (done) => {
        chai.request(url)
            .put('/cart')
            .set('cookie', login_cookie)
            .send({ 'product_id': rand_product_id, 'quantity': 'up' })
            .end((err, res) => {
                if (err) done(err)
                try {
                    expect(res).have.status(200)
                    cartModel.get_cart_item(fake_user.user_id, rand_product_id)
                        .then((data) => {
                            expect(data).to.have.property('quantity', 3)
                            done()
                        })
                        .catch((err) => done(err))

                } catch (err) {
                    done(err)
                }
            })
    })

    it('decrease cart item qunatity', (done) => {
        chai.request(url)
            .put('/cart')
            .set('cookie', login_cookie)
            .send({ 'product_id': rand_product_id, 'quantity': 'down' })
            .end((err, res) => {
                if (err) done(err)
                try {
                    expect(res).have.status(200)
                    cartModel.get_cart_item(fake_user.user_id, rand_product_id)
                        .then((data) => {
                            expect(data).to.have.property('quantity', 2)
                            done()
                        })
                        .catch((err) => done(err))
                } catch (err) {
                    done(err)
                }
            })
    })
})
