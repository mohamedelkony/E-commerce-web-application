process.env.NODE_ENV = 'test'

import chaiHttp from 'chai-http'
import chai from 'chai'

let expect = chai.expect
chai.use(chaiHttp)
let url = 'http://127.0.0.1:3000'
let user_id = -1
let epoc = () => Math.ceil(new Date().getTime() / 1000)
let testing_user = {
    'username': 'test' + epoc(),
    'email': `test${epoc()}@gmail.com`,
    'gender': 'male',
    'birth': new Date().toISOString().slice(0, 19).replace('T', ' '),
    'password': '123',
    'repassword': '123'
}
let testing_user_invalid_password = {
    'username': 'test' + epoc(),
    'email': `test${epoc()}@gmail.com`,
    'gender': 'male',
    'birth': new Date().toISOString().slice(0, 19).replace('T', ' '),
    'password': '12',
    'repassword': '12'
}

let testing_user_invalid_username = {
    'username': 'test ' + epoc(),
    'email': `test${epoc()}@gmail.com`,
    'gender': 'male',
    'birth': new Date().toISOString().slice(0, 19).replace('T', ' '),
    'password': '123456789',
    'repassword': '123456789'
}
let login_cookie = null
describe('/users API', () => {
    it('adds new random user', (done) => {
        chai.request(url)
            .post('/users')
            .send(testing_user)
            .end((err, res) => {
                try {
                    expect(res).have.status(200)
                    expect(res.body).have.property('user_id')
                    user_id = res.body.user_id
                    expect(user_id).to.be.greaterThan(0)
                    login_cookie = (res.header['set-cookie'][0].toString())

                    done()
                } catch (error) {
                    done(error)
                }
            })
    })
    it('verfies just added user', (done) => {
        chai.request(url)
            .get(`/users/${user_id}`)
            .end((err, res) => {
                try {
                    expect(res).have.status(200)
                    expect(res.body).to.not.be.null
                    expect(res.body).have.property('user_id', user_id)
                    expect(res.body).have.property('email', testing_user.email)
                    expect(res.body).have.property('gender', testing_user.gender)
                    expect(res.body).have.property('username', testing_user.username)
                    done()
                } catch (error) {
                    done(error)
                }
            })
    })
    it('reject adding user with used email', (done) => {
        chai.request(url)
            .post('/users')
            .send(testing_user)
            .end((err, res) => {
                expect(res).have.status(301)
                done()
            })
    })
    it('reject adding user with invalid password', (done) => {
        chai.request(url)
            .post('/users')
            .send(testing_user_invalid_password)
            .end((err, res) => {
                expect(res).have.status(400)
                done()
            })
    })

    it('reject adding user with invalid username', (done) => {
        chai.request(url)
            .post('/users')
            .send(testing_user_invalid_username)
            .end((err, res) => {
                expect(res).have.status(400)
                done()
            })
    })
    it('verfies user loggged in & gets user data', (done) => {
        chai.request(url)
            .get('/users/me')
            .set('cookie', login_cookie)
            .end((err, res) => {
                if (err) done(err)
                try {
                    expect(res).have.status(200)
                    done()
                }
                catch (error) { done(error) }
            })
    })
    it(`user can't get his data without authentication`, (done) => {
        chai.request(url)
            .get('/users/me')
            .end((err, res) => {
                if (err) done(err)
                try {
                    expect(res).have.status(403)
                    done()
                }
                catch (error) { done(error) }
            })
    })
})