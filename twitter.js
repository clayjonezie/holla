var request = require('request'), 
    JSONStream = require('JSONStream'), 
    es = require('event-stream'),
    qs = require('querystring');

// var parser = JSONStream.parse(['rows', true]);
// var req = request({url: });
// var logger = es.mapSync(function(data) {
//     console.error(data)
//     return data
// })

request({url: ''})
.pipe(JSONStream.parse('*'))
.pipe(es.mapSync(function (data) {
    console.error(data)
    return data
}))

request.post({url:url, oauth:oauth}, function (e, r, body) {
    var perm_token = qs.parse(body)
      , oauth = {
            consumer_key: '9pZfxRPQHqPYHbZFiRckDA',
            consumer_secret: 'FgASXwfv7iD7GyHKTdB7u94kiOZ6dvp6N4TjCWJ8',
            token: '1634603744-Zk0t1EmY7xt8r8GjLbEosJM6YbtC4NYOmIxXzNX',
            token_secret: '38MJ2NW0TabbOlu26M78ZlSKqO6FQZxCqFDIXlMJ0'
        }, 
        url = 'https://api.twitter.com/1/users/show.json?',
        params = { 
            screen_name: perm_token.screen_name, 
            user_id: perm_token.user_id
        };
    url += qs.stringify(params);
    request.get({url:url, oauth:oauth, json:true}, function (e, r, user) {
      console.log(user)
    })
  })