const Joi = require('joi')
const asyncHandler = require('express-async-handler');
const multer = require('multer')
const uuidv4 = require('uuidv4')

const DIRECTORY = "./uploads/"
const DIRECTORYSUPPORT = "./uploadsReturn/"
const protectProduct = asyncHandler(
  async (req, res, next) => {

    console.log("passe dans joy")
    const pattern = Joi.object({

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
    cb(null, DIRECTORY);
  },
  filename: (req, file, cb) => {
    console.log(file, "je suis file update");
    const filename = file.originalname.toLowerCase().split(' ').join('-');
    cb(null, filename)
  },
});


// __________________retour Produit image________________
        const storageReturn = multer.diskStorage({
          destination: (req, file, cb) => {
            console.log("sa passe return");
            cb(null,DIRECTORYSUPPORT);
          },
          filename: (req, file, cb) => {
            const filename = file.originalname.toLowerCase().split(' ').join('-');
            cb(null,filename)
          },
        });

        const upload = multer({ storage: storage });
        const uploadReturn = multer({ storage: storageReturn });

    module.exports={protectProduct,upload, uploadReturn}
          
    

