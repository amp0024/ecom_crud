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

    describe('Get all manufacturers', function() {

        it('should get all manufacturers', function(done) {
            chai.request(server)
            .get('/api/manufacturers')
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                res.body.length.should.equal(3);
                res.body[0].should.have.property('name');
                res.body[0].name.should.equal('Odell');
                res.body[0].should.have.property('location');
                res.body[0].location.should.equal('Ft Collins');
                res.body[0].should.have.property('contact');
                res.body[0].contact.should.equal('7207207198');
                res.body[0].should.have.property('logo_url');
                res.body[0].logo_url.should.equal('https://upload.wikimedia.org/wikipedia/en/3/33/Odell_Brewing_Company_logo.png');
                done();
            });
        });
    });


    describe('Get a single manufacturer', function(){
        it ('should get a single manufacturer', function(done){
            chai.request(server)
            .get('/api/manufacturers/1')
            .end(function(err, res){
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                res.body.length.should.equal(1);
                res.body[0].should.have.property('name');
                res.body[0].name.should.equal('Odell');
                res.body[0].should.have.property('location');
                res.body[0].location.should.equal('Ft Collins');
                res.body[0].should.have.property('contact');
                res.body[0].contact.should.equal('7207207198');
                res.body[0].should.have.property('logo_url');
                res.body[0].logo_url.should.equal('https://upload.wikimedia.org/wikipedia/en/3/33/Odell_Brewing_Company_logo.png');
                done();
            })
        })
    })

    describe('Add a manufacturer', function(){
        it ('should add a single manufacturers', function(done){
            chai.request(server)
            .post('/api/manufacturers')
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
                .get('/api/manufacturers/'+response.body)
                .end(function(err, res){
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('array');
                    res.body.length.should.equal(1);
                    res.body[0].should.have.property('name');
                    res.body[0].name.should.equal('Coors');
                    res.body[0].should.have.property('location');
                    res.body[0].location.should.equal('Golden');
                    res.body[0].should.have.property('contact');
                    res.body[0].contact.should.equal('555-323-4323');
                    res.body[0].should.have.property('logo_url');
                    res.body[0].logo_url.should.equal('http://www.molsoncoors.com/~/media/Molson%20US/en/Image%20Assets/Media%20Library%20Images/Photo%20Gallery/Actual/Logos/banquet.ashx');
                    done();
                })
            });
        });
    });

    describe('Deletes a manufacturer', function(){
        it('should delete a show', function(done) {
            chai.request(server)
            .delete('/api/manufacturers/1')
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.status.should.equal('Deleted');
                done();
            });
        });
    });
});