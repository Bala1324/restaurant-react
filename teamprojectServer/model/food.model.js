const mongoose=require('mongoose')
const crypto=require('crypto')


  
const foodSchema =  new mongoose.Schema({
    uuid:{type:String,required:false},
    foodName:{type:String,required:true},
    Price:{type:Number,required:true},
    ingredients:{type:String,required:true},
    Offer:{type:Number,required:false},
    // reviews: [reviewSchema],
    // rating: {type: Number,required: true,default: 0,},
    // numReviews: {type: Number, required: true,default: 0,},
    OfferPrice:{type:Number,required:false},
    categoryUuid:{type:String,required:true},
    foodImage:{type:String,required:true},
    userUuid:{type:String,required:true},
    quantity:{type:Number,required:true},

},{
    timestamps:true
})

foodSchema.pre('save',function(next){
    this.uuid='FOOD-'+crypto.pseudoRandomBytes(5).toString('hex').toUpperCase()
    console.log(this.uuid)
    next()
})

module.exports=mongoose.model('fooditem',foodSchema,'fooditem')
