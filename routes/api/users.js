const router = require('express').Router();
const { route } = require('.');
const { User, Thought } = require('../../models');

router.get("/", async (req, res) =>{//get all users. 'get'-/api/users/
 try {
    const getAllUsers = await User.find();
    res.status(200).json(getAllUsers);
}
 catch (err) {
    res.status(500).json(err)
 }
});

router.get('/:_id', async (req, res) => {//get user by id. 'get'-/api/users/:_id
 try {
    const getUser = await User.findOne({
        _id: req.params._id
    }).populate('thoughts','friends')
    res.status(200).json(getUser);
 }
 catch (err) {
    res.status(500).json(err)
 }
});

router.post('/', async (req, res) => {//create user. 'post'-/api/users/
    try {
            User.create(req.body)
            res.status(200).send('user created')

        
    }
    catch (err) {
        res.status(500).json(err)
    }
});


router.put('/:_id', async (req, res) => {//update user info by _id. 'put'-/api/users/
    try{
        const updateUser = await User.findOneAndUpdate(
            {'_id': req.params._id}, 
             req.body, {
                 new:true
             }
        );
        res.status(200).json(updateUser) 
     }
    catch (err) {
        res.status(500).json(err)
    }
});

router.delete('/:_id', async (req, res) => {
    try {
            const findUsersThoughts = await User.findOne({_id: req.params._id})
            const usersThoughts = findUsersThoughts.thoughts
            usersThoughts.forEach(async element => {

                const deleteThoughts =  await Thought.findOneAndRemove({
                    '_id': element._id
                })
                deleteThoughts;
            })
        const deleteUser = await User.findOneAndRemove({
        _id: req.params._id});
        deleteUser;
        res.status(200).send('user and their thoughts successfully deleted')
} catch  (err) {
    res.status(500).json(err);
}} )


        
    
