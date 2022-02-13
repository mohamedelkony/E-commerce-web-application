process.env.NODE_ENV = 'test'

import chaiHttp from 'chai-http'
import chai from 'chai'
import { DBPool } from '../src/app'
import InventoryModel from '../src/models/inventory'
import { getSyncDBPool } from '../src/util/DBconnetor'

let expect = chai.expect
chai.use(chaiHttp)

let url = 'http://127.0.0.1:3000'
let test_conn = getSyncDBPool()

describe('/inventory API', () => {
    it('gets products in page #1 ', (done) => {
        chai.request(url)
            .get('/inventory?pageSize=5&pageNumber=1')
            .send({
                'pageNumber': 1,
                'pageSize': '5'
            }).then((res) => {
                expect(res).have.status(200)
                expect(res.body).to.be.an('array')
                expect(res.body).have.property('length', 5)
                done()
            })
            .catch((err) => {
                done(err)
            })
    })

    it('gets products in page #2 ', (done) => {
        chai.request(url)
            .get('/inventory?pageNumber=2&pageSize=3')
           .then((res) => {
                expect(res).have.status(200)
                expect(res.body).to.be.an('array')
                expect(res.body).have.property('length', 3)
                done()
            })
            .catch((err) => {
                done(err)
            })
    })

    let id = -1
    it('should add product', (done) => {
        chai.request(url)
            .post('/inventory')
            .field('product_name', 'testing_product2')
            .field('price', '7')
            .field('product_desc', 'a7aaaaaaaaaaaaaaaaaaaaaa5')
            .attach('image', './public/er.jpeg')
            .end((err, res) => {
                if (err) done(err)
                expect(res).have.status(200)
                id = res.body.product_id
                done()
            })
    })
    it('verfies just added produect', async () => {
        var model = new InventoryModel(DBPool)
        let res = await model.getProduct(id)
        expect(res).to.not.be.null
        expect(res).have.property('id', id)
    })
    it('edits product price', (done) => {
        chai.request(url)
            .put('/inventory/price')
            .send({
                'product_id': id,
                'price': 425
            })
            .then((res) => {
                expect(res).have.status(200)
                expect(res.body).to.have.property('product_id', id)
                done()
            })
            .catch((err) => {
                done(err)
            })
    })
    it('edits product name', (done) => {
        chai.request(url)
            .put('/inventory/name')
            .send({
                'product_id': id,
                'product_name': 'new name'
            })
            .then((res) => {
                expect(res).have.status(200)
                expect(res.body).to.have.property('product_id', id)
                expect(res.body).to.have.property('product_name', 'new name')
                done()
            })
            .catch((err) => {
                done(err)
            })
    })

    it('verfies product name changed', (done) => {
        test_conn.execute('select product_name from inventory where id=?', [id],
            function (err, res, fields) {
                if (err) done(err)
                expect(res).to.not.be.null
                expect(res).to.have.property('length', 1)
                expect(res[0]).to.have.property('product_name', 'new name')
                done()
            })
    })

    it('deletes just added product', (done) => {
        chai.request(url)
            .delete('/inventory')
            .send({ 'product_id': id })
            .then((res) => {
                expect(res).have.status(200)
                done()
            })
            .catch((err) => {
                done(err)
            })
    })

})
