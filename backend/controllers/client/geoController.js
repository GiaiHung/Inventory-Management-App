const User = require('../../models/User')
const sendError = require('../../utils/sendError')
const getCountryISO3 = require("country-iso-2-to-3");

const getGeography = async (req, res) => {
  try {
    const users = await User.find()
    const mappedLocations = users.reduce((acc, {country}) => {
        const countryISO3 = getCountryISO3(country)
        if(!acc[countryISO3]) {
            acc[countryISO3] = 0
        }
        acc[countryISO3]++
        return acc
    }, {})

    const formattedLocations = Object.entries(mappedLocations).map(([country, count]) => {
        return {
          id: country,
          value: count
        }
    })

    res.status(200).json(formattedLocations)
  } catch (error) {
    sendError(res, 400, error.message)
  }
}

module.exports = { getGeography }
