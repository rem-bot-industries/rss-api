/**
 * Created by Veld on 11.07.2017.
 */
const mongoose = require('mongoose');

let feedSchema = mongoose.Schema(
{
    url:String,
    id:String,
});

let rssModel = mongoose.model('RssSchema', feedSchema);

module.exports = rssModel;