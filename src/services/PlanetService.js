var swapi = require('axios')
const config = require('./../../config/config')
const thirtyminutes = 30 * 60 * 1000
const oneminute = 60 * 1000
const thiryseconds = 30 * 1000

module.exports = {     

     /**
      * Find Movies Url By Planet on api swapi
      * @param planet planet object
      * @return movies list           
      */
     async findMoviesByPlanet(planet) {
          var movies;
          
          await swapi.get(config.base_sw_url + "planets?search=" + planet, {timeout: thiryseconds})
               .then((response) => {                    
                    if(response.data.results.length > 0)
                         movies = response.data.results[0].films               
                    
               })
               .catch(e => {
                    console.log("error: " + e)
               })

          return movies
     },
     
     /**
      * Find Movie By Url on api swapi
      * @param url planet url
      * @return movie data           
      */
     async getMovie(url) {
          var movie;

          await swapi.get(url, {timeout: thiryseconds})
               .then(function(response) {
               movie = response.data
               
               })
               .catch(e => {
                    console.log("error: " + e)
               })

          return movie
     },

     /**
      * Get Movie title list By planet on api swapi
      * @param planet planet object
      * @return nameList movie title list           
      */
     async getMovieListByPlanet(planet) {
          var movieUrlList = await module.exports.findMoviesByPlanet(planet.name)
          var nameList = []

          for (idx in movieUrlList) {
               const url = movieUrlList[idx]               
               const movie = await module.exports.getMovie(url);

               if(movie != undefined) 
                    nameList.push(movie.title)               
          }

          if(nameList.length <= 0)
               nameList = planet.movies

          return nameList
     },
     
     /**
      * Add Movies title if old update in planets objectList and save Planet
      * @param planets planets objectList                 
      */
     async addMovies(planets) {
          for (idx in planets) {
               const planet = planets[idx]
               
               if((planet.updatedAt.getTime() + thirtyminutes) < new Date().getTime()) {
                    planet.movies = await module.exports.getMovieListByPlanet(planet)
                    planet.updatedAt = new Date()
                    module.exports.save(planet)
               } else 
                    console.log(`Not necessary update now...wait: ${planet.updatedAt.getTime() + thirtyminutes} millis`)
          }
     },     

     /**
      * Save planet object
      * @param planet planet object
      */
     async save(planet) {          
          await planet.save((err, plane) => {
               if(err)
                    return {status: 500, message: err}
               else
                    return {status: 201, message: plane}                    
          })
     }          
}


