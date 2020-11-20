import mongoose from 'mongoose'

const teamSchema = mongoose.Schema({
    name:String,
    wins: Number,
    defeat: Number,
    conference:String,
    division:String,
    coach:String,
    thumbnail:String
});
export default mongoose.model('team',teamSchema)