/*
* Copyright 2011-2012 the original author or authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

//Messages category https://mandrillapp.com/api/docs/messages.JSON.html

/*
 * /messages/send.json
 *
 * Send a new transactional message through Mandrill
 *
 */

eb.registerHandler(busDir+'.messages.send', messagesSend);

function messagesSend (message, replier) {
	if (message.message == '' || message.message === null || message.message == undefined ){
		return reply(replier,'error','Incorrect value for `message`');
	}
	
	var request   = client.request('POST', endpoint+'/messages/send.json', gotResponse);
	request.chunked(true);

	var postBody  = {
					    "key": config.mandrill_apikey,
					    "message": message.message,
					    "async": message.async,
					    "ip_pool" : message.ip_pool,
					    "send_at": message.send_at
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
