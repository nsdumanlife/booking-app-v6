const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate')

const imageSchema = new mongoose.Schema({
  src: String,
  alt: String,
})

// class Image {
// 	// add methods here
// }

// imageSchema.loadClass(Image)
imageSchema.plugin(autopopulate)

module.exports = mongoose.model('Image', imageSchema)
