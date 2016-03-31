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

    describe('Get all products', function() {

        it('should get all products', function(done) {
            chai.request(server)
            .get('/api/products')
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                res.body.length.should.equal(3);
                res.body[0].should.have.property('name');
                res.body[0].name.should.equal('Wolf Picker');
                res.body[0].should.have.property('type');
                res.body[0].type.should.equal('Pale Ale');
                res.body[0].should.have.property('price');
                res.body[0].price.should.equal('20.99');
                res.body[0].should.have.property('volume');
                res.body[0].volume.should.equal('12 Pack');
                res.body[0].should.have.property('img_url');
                res.body[0].img_url.should.equal('http://brewtallyinsane.com/wp-content/uploads/2014/12/odell-wolfpicker-595x1024.jpg');
                res.body[0].should.have.property('mfc_id');
                res.body[0].mfc_id.should.equal(1);
                done();
            });
        });
    });


    describe('Get a single product', function(){
        it ('should get a single product', function(done){
            chai.request(server)
            .get('/api/products/1')
            .end(function(err, res){
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                res.body.length.should.equal(1);
                res.body[0].should.have.property('name');
                res.body[0].name.should.equal('Wolf Picker');
                res.body[0].should.have.property('type');
                res.body[0].type.should.equal('Pale Ale');
                res.body[0].should.have.property('price');
                res.body[0].price.should.equal('20.99');
                res.body[0].should.have.property('volume');
                res.body[0].volume.should.equal('12 Pack');
                res.body[0].should.have.property('img_url');
                res.body[0].img_url.should.equal('http://brewtallyinsane.com/wp-content/uploads/2014/12/odell-wolfpicker-595x1024.jpg');
                res.body[0].should.have.property('mfc_id');
                res.body[0].mfc_id.should.equal(1);
                done();
            })
        })
    })

    describe('Add a product', function(){
        it ('should add a single products', function(done){
            chai.request(server)
            .post('/api/products')
            .send({
                name: 'Sawtooth Ale',
                type: 'Amber Ale',
                price: 120.99,
                volume: 'keg',
                img_url: 'http://lefthandbrewing.com/wp/wp-content/uploads/2014/04/Sawtooth-Ale_Bottle-300dpi-5x12.jpg',
                mfc_id: 1
            })
            .end(function(error, response){
                console.log("res body", response.body);
                //send same stuff right here for testing
                chai.request(server)
                .get('/api/products/'+response.body)
                .end(function(err, res){
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('array');
                    res.body.length.should.equal(1);
                    res.body[0].should.have.property('name');
                    res.body[0].name.should.equal('Sawtooth Ale');
                    res.body[0].should.have.property('type');
                    res.body[0].type.should.equal('Amber Ale');
                    res.body[0].should.have.property('price');
                    res.body[0].price.should.equal('120.99');
                    res.body[0].should.have.property('volume');
                    res.body[0].volume.should.equal('keg');
                    res.body[0].should.have.property('img_url');
                    res.body[0].img_url.should.equal('http://lefthandbrewing.com/wp/wp-content/uploads/2014/04/Sawtooth-Ale_Bottle-300dpi-5x12.jpg');
                    res.body[0].should.have.property('mfc_id');
                    res.body[0].mfc_id.should.equal(1);
                    done();
                });
            });
        });
    });

    describe('Deletes a product', function(){
        it('should delete a show', function(done) {
            chai.request(server)
            .delete('/api/products/1')
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.status.should.equal('Deleted');
                done();
            });
        });
    });
});
