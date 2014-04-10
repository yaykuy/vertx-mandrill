# vertx-mandrill :: Mandrill API access

## Dependencies

No dependencies on other modules

## Name

The module name is `mandrill`.

## Configuration

This busmod takes the following configuration:

    {
        "address": <address>,
        "mandrill_apikey": <mandrill_api_key>
        
    }
    
For example:

    {
        "address": "mandrill",
  		"mandrill_apikey": "xYYL34Sv1CfrnOgmnbj9Tw"
    }        
    
Let's take a look at each field in turn:

* `address` The main address for the busmod. Optional field. Default value is `mandrill`
* `mandrill_apikey` The API key provided by mandrill

##Actions

Look at https://mandrillapp.com/api/docs/

Implemented:
 
 * Users: Info, Ping2, Senders
 * Messages: Send, Send-Template
