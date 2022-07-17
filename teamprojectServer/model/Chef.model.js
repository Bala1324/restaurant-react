const mongoose=require('mongoose')
const crypto=require('crypto')


const ChefSchema = new mongoose.Schema({
    
    chefName : {
        type : String,
        required: true
    },

	City : {
        type: String,
        required: true
    },
    
    Sex: {
        type: String,
        required: true
    },
    
   
})
TableSchema.pre('save',function(next){
    this.uuid='chef-'+crypto.pseudoRandomBytes(5).toString('hex').toUpperCase()
    console.log(this.uuid)
    next()
})

module.exports=mongoose.model('chef',ChefSchema,'chef')