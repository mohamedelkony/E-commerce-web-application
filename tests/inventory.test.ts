process.env.NODE_ENV = 'test'

import chaiHttp from 'chai-http'
import chai from 'chai'
import { DBconnection } from '../src/app'
import InventoryModel from '../src/models/inventory'

let expect = chai.expect
chai.use(chaiHttp)

let url = 'http://127.0.0.1:3000'


describe('/inventory API', () => {
    it('gets products(25max)', (done) => {
        chai.request(url)
            .get('/inventory')
            .end((err, res) => {
                expect(res).have.status(200)
                done()
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
                expect(res).have.status(200)
                id = res.body.id
                done()
            })
    })
    it('verfies just added produect', async () => {
        var model = new InventoryModel(DBconnection)
        let res = await model.getProduct(id)
        expect(res).to.not.be.null
        expect(res).have.property('id', id)
    })
    it('edits product price',(done)=>{
        chai.request(url)
            .put('/inventory/price')
            .send({
                'product_id':id,
                'price':425
            })
            .then((res)=>{
                expect(res).have.status(200)
                expect(res.body).to.have.property('product_id',id)
                done()
            })
            .catch((err)=>{
                done(err)
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
