
var mongoose = require('mongoose');
const Planet = require('../model/Planet')//mongoose.model('Planet')
const PlanetService = require("../services/PlanetService.js");

module.exports = {          

     /**
      * List Planets
      * @param {*} req request http 
      * @param {*} res response http
      * @param {page} req.query page to list items
      * @param {limit} req.query limit items to show
      * @param {name} req.query name to find planet
      * @param {id} req.query id to find planet
     */
     async index(req, res) {  
          const {page = 1, limit = 10, name, id } = req.query
          
          if(name) {
               await Planet.find({name: name}, async (error, planet) => {
                    if(error)
                         return(res.status(404).json({message: "error to find planet name: " + name}))
                    else if(planet.length > 0) {
                         await PlanetService.addMovies(planet)
                         return(res.status(200).json(planet))
                    } else     
                         return(res.status(404).json({message: "planet not found: " + name}))
               })
          } else if(id) {
               if(mongoose.Types.ObjectId.isValid(id)) {
                    await Planet.find({_id: id}, async (error, planet) => {
                         if(error)
                              return(res.status(404).json({message: "error to find planet id: " + id}))
                         else {
                              await PlanetService.addMovies(planet)
                              return(res.status(200).json(planet))
                         }     
                    })
               } else  
                    return res.status(404).json({message: 'you need inform a valid id'});   
          } else {
               const planets = await Planet.paginate({}, {page: page, limit: limit})
               await PlanetService.addMovies(planets.docs)
               return res.json(planets)
          }
     },

     /**
      * Show a planet
      * @param {*} req request http 
      * @param {*} res response http
      * @param {*} req.params.id id item to show      
     */
     async show(req, res) {      
          const id = req.params.id            
          if(mongoose.Types.ObjectId.isValid(id)) {
               await Planet.findById(id, async (err, planet) => { 
                    if(err) {                         
                         return res.status(404).json({message: 'dont found id'});
                    } else {                    
                         await PlanetService.addMovies([planet]) 
                         return res.status(200).json(planet)    
                    }     
               } );          
          } else 
               return res.status(404).json({message: 'you need inform a valid id'}); 
     },

     /**
      * Save Planet
      * @param {*} req request http 
      * @param {*} res response http
      * @param {name} req.body string planet name
      * @param {climate} req.query string planet climate
      * @param {terrain} req.query string planet terrain      
     */
     async save(req, res) { 
          const {name, climate, terrain} = req.body

          if(name == undefined || climate == undefined || terrain == undefined)                            
               return res.status(404).json({message: 'you need inform params: name, climate and terrain'});
          else {
               var planet = new Planet({name: name, climate: climate, terrain: terrain})   
               var movieList = await PlanetService.getMovieListByPlanet(planet)
               
               planet.movies = movieList                           

               await planet.save((err, plane) => {
                    if(err)
                         return res.status(500).json(err)
                    else
                         return res.status(201).json({message: plane})
               })
          }          
     },

     /**
      * Update Planet
      * @param {*} req request http 
      * @param {*} res response http
      * @param {*} req.params.id id to find planet
      * @param {name} req.body name to find planet
      * @param {climate} req.query string planet climate
      * @param {terrain} req.query string planet terrain      
     */
     async update(req, res){
          const id = req.params.id
          const {name, climate, terrain} = req.body

          if(name == undefined || climate == undefined || terrain == undefined || id == undefined)                            
               return res.status(404).json({message: 'you need inform params: name, climate, terrain and id(param)'});
          else { 
               if(mongoose.Types.ObjectId.isValid(id)) {                       
                    var planet = new Planet({_id: id, name: name, climate: climate, terrain: terrain, updatedAt: new Date()})
                    
                    await Planet.findOneAndUpdate({_id:id}, planet, (err, plane) => {
                         if(err)
                              return res.status(500).json({message: err})
                         else {
                              PlanetService.addMovies([planet])
                              return res.status(200).json({message: planet})
                         }     
                    })
               } else
                    return res.status(404).json({message: 'you need inform a valid id'}); 

          }
     },

     /**
      * Delete Planet
      * @param {*} req request http 
      * @param {*} res response http
      * @param {*} req.params.id id to delete planet      
      */
     async delete(req, res){
          const id = req.params.id

          if(mongoose.Types.ObjectId.isValid(id)) {               
               await Planet.deleteOne({_id:id})
               return res.status(204).json({message: "removed id: " + id})   
          } else
               return res.status(404).json({message:`you need inform /planet/${id}`});          
     }
}