process.env.NODE_ENV = 'test'
process.env.PGHOST='localhost'
process.env.PGUSER='postgres'
process.env.PGDATABASE='convFourier'
process.env.PGPASSWORD='nodejs'
process.env.PGPORT='5432'

import chaiHttp from 'chai-http'
import chai from 'chai'
import TestModel from '../src/models/test'


let expect = chai.expect
chai.use(chaiHttp)

let testModel = new TestModel()

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

describe('order items in shopping cart /orders', () => {
    it('log into fake user account', (done) => {
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
    it('add random product to fake user\'s cart', (done) => {
        let p = testModel.get_random_product_id()
        p.then((res) => {
            let rand_product_id = res
            chai.request(url)
                .post('/cart')
                .set('cookie', login_cookie)
                .send({ 'product_id': rand_product_id })
                .end((err, res) => {
                    try {
                        if (err) done(err)
                        expect(res).not.have.status(500)
                        expect(res.body).to.have.property('product_id', rand_product_id)
                        done()
                    } catch (error) {
                        done(error)
                    }
                })
        }).catch(err => done(err))
    })

    let cart_items = []
    let inventory_before = []
    it('get shopping cart items', (done) => {
        chai.request(url)
            .get('/cart')
            .set('cookie', login_cookie)
            .end((err, res) => {
                try {
                    expect(res).have.status(200)
                    expect(res.body).to.be.an('array')
                    cart_items = res.body
                    cart_items.sort((a, b) => a.product_id - b.product_id)
                    testModel.get_quantity_in_inventory_of_cart_items(fake_user.user_id)
                        .then((data) => {
                            inventory_before = data
                            inventory_before.sort((a, b) => a.product_id - b.product_id)
                            done()
                        })
                        .catch((err) => done(err))
                } catch (error) {
                    done(error)
                }
            })
    })
    let order_id = -1
    it('order transaction compeleted', (done) => {
        chai.request(url)
            .post('/orders')
            .set('cookie', login_cookie)
            .send()
            .end((err, res) => {
                if (err) done(err)
                try {
                    expect(res).have.status(201)
                    expect(res.body).to.have.property('order_id')
                    order_id = res.body.order_id
                    done()
                } catch (err) {
                    done(err)
                }
            })
    })
    let order_details: any = []
    it('assert cart items were inserted into order items', (done) => {
        chai.request(url)
            .get('/orders/' + order_id)
            .set('cookie', login_cookie)
            .send()
            .end((err, res) => {
                if (err) done(err)
                try {
                    expect(res).have.status(200)
                    expect(res.body).to.have.property('items')
                    expect(res.body).to.have.property('status')
                    expect(res.body).to.have.property('total_price')
                    expect(res.body.items).to.be.an('array')
                    order_details = res.body
                    order_details.items.sort((a, b) => a.product_id - b.product_id)
                    for (let i = 0; i < cart_items.length; i++) {
                        expect(cart_items[i].product_id).to.equal(order_details.items[i].product_id)
                    }
                    done()
                } catch (err) {
                    done(err)
                }
            })
    })

    it('assert order items were removed from shopping cart', (done) => {
        chai.request(url)
            .get('/cart')
            .set('cookie', login_cookie)
            .end((err, res) => {
                try {
                    expect(res).have.status(200)
                    expect(res.body).to.be.an('array')
                    expect(res.body).to.have.property('length', 0)
                    done()
                } catch (error) {
                    done(error)
                }
            })
    })
    it('assert deducting order items quantity from inventory quantity', async () => {
        let inventory_after = await testModel.get_quantity_in_inventory_of_order_items(order_id)
        inventory_after.sort((a, b) => a.product_id - b.product_id)

        for (let i = 0; i < order_details.items.length; i++) {
            expect(inventory_before[i].product_id).to.equal(inventory_after[i].product_id)
            expect(inventory_before[i].product_id).to.equal(order_details.items[i].product_id)
            expect(inventory_before[i].quantity - inventory_after[i].quantity)
                .to.equal(order_details.items[i].quantity)
        }
    })
    it('assert quantity of order items were adjusted to maximum available in inventory', async () => {
        for (let i = 0; i < order_details.items.length; i++) {
            expect(order_details.items[i].quantity).to.lessThanOrEqual(inventory_before[i].quantity)
        }
    })
    it('assert order total price calculated', async () => {
        let total_price = await testModel.calculate_order_total_price(order_id)
        expect(total_price).to.equal(order_details.total_price)
    })
})
