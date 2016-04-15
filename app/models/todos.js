/**
 * Created by leandroloi on 15/04/16.
 */


var mongoose = require('mongoose');

//Model
module.exports = mongoose.model('Todo',{
    text : String,
    done : Boolean
});
