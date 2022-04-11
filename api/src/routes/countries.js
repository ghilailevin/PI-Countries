const { Router } = require('express')
const { Country, Activity } = require('../db')
const router = require('express').Router();
const {Op} =  require('sequelize')

router.get('/countries', async(req, res) =>{
    const {name} = req.query
    if(name) {
        let find = await Country.findAll({
            where: {
                name: {[Op.iLike]: `%${name}%`}},
            include: [Activity]
        })
        if(find){
            return res.json(find)
        } else {
            return res.json({error:'COUNTRY IS FAILED'})
        }
    } else {
    try {
        const limitCountries = await Country.findAll({include:[Activity]})
        return res.status(200).json(limitCountries)
    } catch (error) {
        console.log(error)
    }
}
})

router.get('/countries/:idPais', async(req, res) => {
    let idPais = req.params.idPais
    idPais.toUpperCase()

    try{
        let country = await Country.findOne({
            where: {
                id: idPais
            },
            include:[Activity]
        })

        return res.status(200).json(country)

     } catch(err){
      res.status(404).json(err)
     }

})

router.get('/countries/extra/all', async (req, res) => {
    try {
        let extra = await Country.findAll({
            include:[Activity]
        })

        res.json(extra)
    } catch (error) {
        
    }
})

module.exports = router