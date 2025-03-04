const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../server');
const User = require('../models/User');

chai.should();
chai.use(chaiHttp);

describe('Auth Controller', () => {
  beforeEach((done) => {
    User.deleteMany({}, (err) => {
      done();
    });
  });

  describe('/POST register', () => {
    it('it should register a new user', (done) => {
      const user = {
        name: 'John Doe',
        email: 'john@example.com',
        password: '123456',
        userType: 'patient'
      };
      chai.request(server)
        .post('/api/auth/register')
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('token');
          done();
        });
    });
  });

  describe('/POST login', () => {
    it('it should login an existing user', (done) => {
      const user = new User({
        name: 'John Doe',
        email: 'john@example.com',
        password: '123456',
        userType: 'patient'
      });
      user.save((err, user) => {
        chai.request(server)
          .post('/api/auth/login')
          .send({ email: 'john@example.com', password: '123456' })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property('token');
            done();
          });
      });
    });
  });
});