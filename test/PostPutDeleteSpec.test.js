var chai = require("chai");
var chaiHttp = require('chai-http');
var app = require('../server')
var expect = chai.expect;

chai.use(chaiHttp)
var id_temp

var objectBody = {
     "name": "new_planet",
     "climate": "temperate, tropical",
     "terrain": "jungle, rainforests"
}

var objectWrongBody = {
     "name": "new_planet",
     "climate": "temperate, tropical"
}

var objectUpdatedBody = {
     "name": "new_planet2",
     "climate": "temperate2, tropical2",
     "terrain": "jungle2, rainforests2"
}



describe("Post Planets", () => {             
   it("Post planet to record", (done) => {
      chai.request(app)
         .post('/api/planet')
         .send(objectBody)
         .end((err, res) => {                  
            switch (res.statusCode) {
               case 500:
                    expect(res.body.name).to.be.an('string');
                    expect(res.body.errmsg).to.be.an('string');
               break;
               case 201:                    
                    id_temp = res.body.message._id
                    expect(res.body.message.movies).to.be.an('array')
                    expect(res.body.message.name).to.be.an('string')                    
               break;               
            }
            done();
         });
   });    
   
   it("Post wrong planet to record", (done) => {
        
     chai.request(app)
        .put(`/api/planet/${id_temp}`)
        .send(objectWrongBody)
        .end((err, res) => {          
          expect(res.statusCode).to.equal(404);
          expect(res.body.message).to.equal('you need inform params: name, climate, terrain and id(param)');
           
          done();
        });
  }); 

  it("Put planet to record", (done) => {
       
     chai.request(app)
        .put('/api/planet')
        .send(objectUpdatedBody)
        .end((err, res) => {
          switch (res.statusCode) {
               case 500:
                    expect(res.body.name).to.be.an('string');
                    expect(res.body.errmsg).to.be.an('string');
               break;
               case 200:
                    expect(res.body.message.movies).to.be.an('array')
                    expect(res.body.message.name).to.be.an('string') 
                    expect(res.body.message).to.equal(objectUpdatedBody) 
               break;               
            }
           
          done();
        });
  });

  it("Delete planet", (done) => {
       
     chai.request(app)
        .delete(`/api/planet/${id_temp}`)
        .send(objectUpdatedBody)
        .end((err, res) => {
          switch (res.statusCode) {
               case 404:
                    expect(res.body.message).to.equal(`you need inform /planet/${id_temp}`);                    
               break;
               case 204:
                    expect(res.body).to.be.empty
               break;               
            }
           
          done();
        });
  });
});