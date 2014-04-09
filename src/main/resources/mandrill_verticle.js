var vertx = require('vertx')
var console = require('vertx/console')
var container = require('vertx/container');

var config = container.config;

//console.log("Mandrill config:"+JSON.stringify(config));

var eb = vertx.eventBus;
var client = vertx.createHttpClient()
  .host('mandrillapp.com')
  .port(443)
  .ssl(true)
  .trustAll(true);
var endpoint = "/api/1.0";

var busDir;
if(config.address){
	busDir=config.address;
}else{
	busDir="mandrill"
}


function reply(replier,status,data){
	return replier({
      status  : status,
      data : data
    });
}

load("api_categories/users.js");


