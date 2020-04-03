const Dev = require('../models/dev');
const parseStringAsArray = require('../utils/ParseStringAsArray');

module.exports = {
  async index(request, response){

    const { latitude, longitude, techs } = request.query;

    const arrayTechs = parseStringAsArray(techs);

    const devs = await Dev.find({
      techs: {
        $in: arrayTechs
      },
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [ longitude, latitude ]
          },
          $maxDistance: 10000
        }
      }
    })
    
    return response.json(devs);
  }
}