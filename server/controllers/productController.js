const {Products, Idol} = require ('../models')

class productController{
    static async read(req,response,next){
        try {
            let data = await Idol.findAll({
                include:[
                    {
                        model: Products,
                        right: true
                    }
                ]
            })
            response.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }
    static async readId(req,response,next){
        try {
            let {id} = req.params
            let data = await Products.findAll({
                where: {IdolId: id},
                include:[{model:Idol}]
            })
            if (!data.length) {
                throw { name: 'Data Not Found' }
            }
            response.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }
}

module.exports=productController