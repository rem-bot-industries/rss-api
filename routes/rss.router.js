/**
 * Created by Wolke on 11.06.2017.
 */
let router = require('express').Router();
const winston = require('winston');
let accountModel = require('../DB/rss.mongo');
const shortid = require('shortid');

router.post('/unsubscribe', async (req, res) => 
{
    try 
    {
        if (!req.params.token) 
        {
            return res.status(404).json({status: 404, message: 'No token was passed'});
        }
    } 
    catch (e) 
    {
        winston.error(e);
        return res.status(500).json({status: 500, message: 'Internal error'});
    }
});


router.post('/subscribe', async (req, res) => {
    try 
    {
        let tokens = [];

        console.log("body : " + req.body.token);

        if (req.body && req.body.token) 
        {
            tokens.push(req.body.token.substring(0, req.body.token.length / 2));
        }

        if(tokens.length == 0)
        {
            return res.status(401).json({status: 401, response: "get a token you noob"});
        }

        var RssReader = require("../services/rssreader");
        var rss = new RssReader(req.body.url);

        rss.GetData();

        return res.status(200).json({status: 200, response: "Successfully subscribed to " + req.body.url});

    } 
    catch (e) 
    {
        winston.error(e);
        return res.status(500).json({status: 500, message: 'Internal error'});
    }
});

module.exports = router;