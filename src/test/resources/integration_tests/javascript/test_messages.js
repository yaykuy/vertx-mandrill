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

var container = require("vertx/container")
var vertx = require("vertx");
var vertxTests = require("vertx_tests");
var vassert = require("vertx_assert");
var console = require("vertx/console");

var eb = vertx.eventBus;

function testSendEmpty() {
  eb.send('test_mandrill.messages.send', {}, function(reply) {
      console.log("testSendEmpty reply:"+JSON.stringify(reply,null,4));
      vassert.assertEquals('error', reply.status);
      vassert.assertEquals('Incorrect value for `message`', reply.data);
      vassert.testComplete();
    });
}

function _testSend0() {
  var m={
    text: 'Probando 123 BODY',
    subject: 'Probando 123 (Subject)',
    from_email: 'test@yaykuy.cl',
    to: [
      {email: 'ajunge@totexa.cl', 'name': 'Andres Junge'}
    ]
  }
  var toMandrill={
    message: m
  }

  eb.send('test_mandrill.messages.send', toMandrill, function(reply) {
      console.log("testSend0 reply:"+JSON.stringify(reply,null,4));
      vassert.assertEquals('ok', reply.status);
      vassert.testComplete();
    });
}

function testSend0_async() {
  var m={
    text: 'Probando 123 async BODY',
    subject: 'Probando 123 async (Subject)',
    from_email: 'test@yaykuy.cl',
    to: [
      {email: 'ajunge@totexa.cl', 'name': 'Andres Junge'}
    ]
  }
  var toMandrill={
    message: m,
    async: true
  }

  eb.send('test_mandrill.messages.send', toMandrill, function(reply) {
      console.log("testSend0 reply:"+JSON.stringify(reply,null,4));
      vassert.assertEquals('ok', reply.status);
      vassert.testComplete();
    });
}


var script = this;

var mandrillConfig = { "address": "test_mandrill", "mandrill_apikey": "xYYL34Sv1CfrnOgmnbj9Tw" }
container.deployModule(java.lang.System.getProperty("vertx.modulename"), mandrillConfig, 1, function(err, depID) {
    vertxTests.startTests(script);
});
