const Joi = require('Joi')
const asyncHandler = require('express-async-handler');
const multer = require('multer')
const uuidv4= require('uuidv4')

const DIRECTORY = "./uploads/"
const protectProduct = asyncHandler(
        async(req, res, next) => {

          console.log("passe dans joy")
           const pattern =Joi.object({

                name: Joi.string().required(),
                price: Joi.number(),
                description: Joi.string().required(),
                //image: Joi.string().required(),
                quantity: Joi.number()
            }) 

           pattern.validate(req)

           next()
        }
        )
        
        const storage = multer.diskStorage({
          destination: (req, file, cb) => {
            console.log("sa passe");
            cb(null,DIRECTORY);
          },
          filename: (req, file, cb) => {
            const filename = file.originalname.toLowerCase().split(' ').join('-');
            cb(null,filename)
          },
        });



       /* const filefilter = (req, file, cb) => {

          console.log("passe dans le filter")
          console.log(file)
          console.log(cb)
            if (
              file.mimetype === 'image/png' ||
              file.mimetype === 'image/jpg' ||
              file.mimetype === 'image/jpeg'
            ) {
              cb(null, true);
            } else {
              cb(null, false);
            }
          };*/
          
          const upload = multer({ storage: storage });
    

    module.exports={protectProduct,upload}


