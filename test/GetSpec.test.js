var chai = require("chai");
var chaiHttp = require('chai-http');
var app = require('../server')
var expect = chai.expect;

chai.use(chaiHttp)


describe("Get Planets", () => {             
   it("Get all planets record with default structure", (done) => {
      chai.request(app)
         .get('/api/planet')
         .end((err, res) => {                    
            expect(res.statusCode).to.equal(200);
            expect(res.body).to.be.an('object');
            expect(res.body.page).to.equal(1);

            if(res.body.docs.length > 0) {
               expect(res.body.docs[0].movies).to.be.an('array');
               expect(res.body.docs[0].name).to.be.an('string');
            }                     
            done();
         });
   });
   
   it("Get planet by param name", (done) => {
      var planet = "Hoth"
      chai.request(app)
         .get(`/api/planet?name=${planet}`)
         .end((err, res) => {
            if(res.statusCode == 404) {
               expect(res.body.message).to.equal("planet not found: " + planet)
            } else {
               expect(res.body).to.have.lengthOf(1)
               expect(res.body[0].movies).to.be.an('array')
               expect(res.body[0].name).to.be.an('string')
            }
            done();
         });
   });

   it("Get planet by param id", (done) => {
      var id = "xpto"
      chai.request(app)
         .get(`/api/planet?id=${id}`)
         .end((err, res) => {
            if(res.statusCode == 404) {
               expect(res.body.message).to.be.an('string')
            } else {
               expect(res.body).to.have.lengthOf(1)
               expect(res.body[0].movies).to.be.an('array')
               expect(res.body[0].name).to.be.an('string')
            }
            done();
         });
   });

   it("Get planet by id", (done) => {
      var id = "xpto"
      chai.request(app)
         .get(`/api/planet/${id}`)
         .end((err, res) => {
            if(res.statusCode == 404) {
               expect(res.body.message).to.be.an('string')
            } else {
               expect(res.body).to.have.lengthOf(1)
               expect(res.body[0].movies).to.be.an('array')
               expect(res.body[0].name).to.be.an('string')
            }
            done();
         });
   });
});