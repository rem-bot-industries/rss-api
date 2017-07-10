// Please wolke do not kill me for using newlines on brackets-only. SHOULDA SENT ME A CODE STYLE DOCUMENT :^))))))))))))))))

const FeedParser = require("feedparser");

class RssReader 
{
    constructor(feed)
    {
        this.feed = feed;
        this.request = require('request');
        this.winston = require('winston');
    }

    GetData()
    {
        var req = this.request('http://rss.news.yahoo.com/rss/entertainment')
        var feedparser = new FeedParser();

        req.on('error', function (error) 
        {
            this.winston.error(error);
        });

        req.on('response', function (res) 
        {
            var stream = this;

            if (res.statusCode !== 200) 
            {
                this.emit('error', new Error('Bad status code'));
            }
            else 
            {
                stream.pipe(feedparser);
            }
        });

        feedparser.on('error', function (error) 
        {
            this.winston.error(error);
        });

        feedparser.on('readable', function () 
        {
            var stream = this;
            var meta = this.meta;
            var item;

            while (item = stream.read()) {
                console.log(item);
            }
        });
    }
}

module.exports = RssReader;