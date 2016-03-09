var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var knex = require('../db/knex');

var should = chai.should();

chai.use(chaiHttp);

describe('API routes', function() {

    beforeEach(function(done) {
        knex.migrate.rollback().then(function() {
            knex.migrate.latest()
            .then(function() {
                return knex.seed.run().then(function() {
                    done()
                });
            });
        });
    });

    afterEach(function(done) {
        knex.migrate.rollback().then(function() {
            done();
        });
    });

    describe('Get all carts', function() {

        it('should get all carts', function(done) {
            chai.request(server)
            .get('/api/carts')
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                res.body.length.should.equal(1);
                done();
            });
        });
    });


    describe('Get a single cart', function(){
        it ('should get a single cart', function(done){
            chai.request(server)
            .get('/api/carts/1')
            .end(function(err, res){
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                res.body.length.should.equal(1);
                res.body[0].should.have.property('name');
                res.body[0].should.have.property()
                done();
            })
        })
    })

    describe('Add a cart', function(){
        it ('should add a single carts', function(done){
            chai.request(server)
            .post('/api/carts')
            .send({
                name: 'Coors',
                location: 'Golden',
                contact: '555-323-4323',
                logo_url: 'http://www.molsoncoors.com/~/media/Molson%20US/en/Image%20Assets/Media%20Library%20Images/Photo%20Gallery/Actual/Logos/banquet.ashx'
            })
            .end(function(error, response){
                console.log("res body", response.body);
                //send same stuff right here for testing
                chai.request(server)
                .get('/api/carts/'+response.body)
                .end(function(err, res){
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('array');
                    res.body.length.should.equal(1);
                    done();
                })
            });
        });
    });

    describe('Deletes a cart', function(){
        it('should delete a show', function(done) {
            chai.request(server)
            .delete('/api/carts/1')
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.status.should.equal('Deleted');
                done();
            });
        });
    });
});