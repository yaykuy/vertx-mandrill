//Users category https://mandrillapp.com/api/docs/users.JSON.html


/*
 * /users/info.json
 *
 * Return the information about the API-connected user
 *
 */

eb.registerHandler(busDir+'.users.info', userInfo);

function userInfo (message, replier) {
	var request   = client.request('POST', endpoint+'/users/info.json', gotResponse);
	request.chunked(true);

	var postBody  = {
					    "key": config.mandrill_apikey
					}
	request.write(JSON.stringify(postBody));
    request.end();

	function gotResponse (response) {
	    if (response.statusCode() != 200) {
	      reply(replier,'error','Status Code = '+response.statusCode());
	    } else {
	      response.bodyHandler(readBody);
	    }
	}

	function readBody (body) {
	    try {
	      var b = JSON.parse(body.toString());
	      if (b.error) {
	        return reply(replier,'error', JSON.stringify(b.error));
	      } else {
	        return reply(replier,'ok', b);
	      }
	    } catch (e) {
	      return reply(replier,'error', e.toString());
	    }
  	}

}

/*
 * /users/ping2.json
 *
 * Validate an API key and respond to a ping (anal JSON parser version)
 *
 */
eb.registerHandler(busDir+'.users.ping2', userPing2);

function userPing2 (message, replier) {
	var request   = client.request('POST', endpoint+'/users/ping2.json', gotResponse);
	request.chunked(true);

	var postBody  = {
					    "key": config.mandrill_apikey
					}
	request.write(JSON.stringify(postBody));
    request.end();

	function gotResponse (response) {
	    if (response.statusCode() != 200) {
	      reply(replier,'error','Status Code = '+response.statusCode());
	    } else {
	      response.bodyHandler(readBody);
	    }
	}

	function readBody (body) {
	    try {
	      var b = JSON.parse(body.toString());
	      if (b.error) {
	        return reply(replier,'error', JSON.stringify(b.error));
	      } else {
	      	if(b.PING == 'PONG!')
	        return reply(replier,'ok', b);
	      }
	    } catch (e) {
	      return reply(replier,'error', e.toString());
	    }
  	}

}

/*
 * /users/senders.json
 *
 * Return the senders that have tried to use this account, both verified and unverified
 *
 */
eb.registerHandler(busDir+'.users.senders', userSenders);

function userSenders (message, replier) {
	var request   = client.request('POST', endpoint+'/users/senders.json', gotResponse);
	request.chunked(true);

	var postBody  = {
					    "key": config.mandrill_apikey
					}
	request.write(JSON.stringify(postBody));
    request.end();

	function gotResponse (response) {
	    if (response.statusCode() != 200) {
	      reply(replier,'error','Status Code = '+response.statusCode());
	    } else {
	      response.bodyHandler(readBody);
	    }
	}

	function readBody (body) {
	    try {
	      var b = JSON.parse(body.toString());
	      if (b.error) {
	        return reply(replier,'error', JSON.stringify(b.error));
	      } else {
	        return reply(replier,'ok', b);
	      }
	    } catch (e) {
	      return reply(replier,'error', e.toString());
	    }
  	}

}


