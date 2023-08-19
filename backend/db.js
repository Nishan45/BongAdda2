
const mongoose=require('mongoose')

const mongoURI='mongodb+srv://Captain:Captain1987@cluster0.rqbujm0.mongodb.net/'


const mongoToConnect=()=>{
    mongoose.connect(mongoURI).then(()=>{
    console.log('connected')
}).catch((err)=>{
    console.log(err)
})
}

module.exports=mongoToConnect




