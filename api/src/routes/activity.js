const { Router } = require('express')
const { Country, Activity } = require('../db')
const router = Router()
 
router.post('/activity', async (req, res) => {
    const { name, difficult, duration, season, codeCountry} = req.body

    try {
        var response = codeCountry.map(async(code) => await Country.findOne({where: {id: code}})
        )

        response = await Promise.all(response)

        Activity.create({            
            name,
            difficult,
            duration,
            season,    
        })
        .then(async (createdTourism) => {

            response.map((codeCountry) => {
                createdTourism.addCountry(codeCountry);
                
            })    

        }).then(
            tourism => {
                res.json(tourism); 
            }
        )

    } catch (error) {
        
    }
    
    
})

module.exports = router;