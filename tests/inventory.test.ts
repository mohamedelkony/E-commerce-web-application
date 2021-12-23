process.env.NODE_ENV = 'test'

import chaiHttp from 'chai-http'
import chai from 'chai'
import server, { DBconnection } from '../src/app'
import InventoryModel from '../src/models/inventory'

let should = chai.should()
chai.use(chaiHttp)


describe('inventory', () => {

    describe('GET/ product', () => {
        it('should return success code', (done) => {
            chai.request(server)
                .get('/inventory')
                .end((err, res) => {
                    res.should.have.status(200)
                    done()
                })
        })
        let id = -1
        it('should add product', (done) => {
            chai.request(server)
                .post('/inventory')
                .field('product_name', 'testing_product2')
                .field('price', '7')
                .field('product_desc', 'a7aaaaaaaaaaaaaaaaaaaaaa5')
                .attach('image', './public/er.jpeg')
                .end((err, res) => {
                    res.should.have.status(200)
                    id = res.body.id
                    console.log('done' + id)
                    done()
                })
        })
        it('verfies added produect does exist', (done) => {
            var model = new InventoryModel(DBconnection)
            Promise.resolve(model.exists(id)).then(cb)
            function cb(x) {
                x.should.eql(true)
                done()
            }
        })
    })
})
