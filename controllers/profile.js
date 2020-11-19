const User = require('../models/User');
const Movie = require('../models/Movies');
const Auth = require('../utils/Auth');


const getProfile =  async (req, res) => {
    
    const { authorization } = req.headers;
    const userid = Auth.verifyToken(authorization);
    if(!userid)
        return res.status(401).json("Not authorized");

    const user = await User.findOne({_id:userid})
                .populate({path:'wishlist',select:'-__v'});
    const movies = await Movie.find({})
    return res.status(200).json({movies:movies,wishlist:user.wishlist});

 

}

const addToWishList = async (req,res) =>{
    const {title} = req.body;
    const { authorization } = req.headers;
    const userid = Auth.verifyToken(authorization);

    if(!userid)
        return res.status(401).json("Not authorized");

    const result = await Movie.find({title})
    if(!result[0])
        return res.status(422).json("There is no such movie");
    
    const user = await User.findOne({_id:userid})
    if (!user.wishlist.includes(result[0]._id)){
        
        user.wishlist.push(result[0]._id);
        user.save();
        return res.status(200).json("succeed");
    }

    
}

const removeFromWishList = async (req,res) =>{
    const {title} = req.body;
    const { authorization } = req.headers;

    const userid = Auth.verifyToken(authorization);
    if(!userid)
        return res.status(401).json("Not authorized");

    const result = await Movie.find({title})
    if(!result[0])
        return res.status(422).json("There is no such movie");
    
    const user = await User.findOne({_id:userid})
    if (user.wishlist.includes(result[0]._id)){
        const list = user.wishlist.filter(id => {
            return id.toString()!=(result[0]._id).toString()
        });
        user.wishlist = list;
        user.save();
        return res.status(200).json("succeed");
    }
    return res.status(422).json("There is no such movie");

    
}


module.exports = {
    getProfile:getProfile,
    addToWishList:addToWishList,
    removeFromWishList:removeFromWishList
}