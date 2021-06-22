# Monday.com-Connector
This is Monday.com connector built on wM.IO to interact with Monday.com 
wM.IO Custom connector to Monday.com using Connector Builder App
webMethods.io Integration is an integration platform as a service (iPaaS) that lets you connect web apps, on-premises systems, and devices to create integrations and automate tasks. 
The Connector Builder app is a custom Node.js application that you build using a web application’s APIs. So, for example, if you have a private API or an API that is not in webMethods.io Integration yet, you can create custom webMethods.io Integration actions and triggers for those APIs. Once you have created these custom actions and triggers, you can use them like any other action on the webMethods.io integration platform. Once you deploy the app on webMethods.io Integration, it is validated by the webMethods.io integration platform. 
You can then share this app with specific users or publish it to webMethods.io Integration to make it available to all the users of webMethods.io integration.

Please visit the below link to get more detailed information on webMethods.IO
https://docs.webmethods.io/integration/starthere/home/

<b>What is Monday.com?</b><br>
Monday.com is a project management tool that enables organizations to manage tasks, projects, and teamwork. As of 2020, the company serves 100,000 organizations, including many non-technical organizations. In July 2019, the company raised $150 million, based on $1.9 billion valuation. Please visit https://monday.com/ for more information.

Why integration with Monday.com?
•	Enable webMethods as an Integration platform on Monday.com marketplace
•	Reduced Opportunity Cost
•	Partner with Monday.com to leverage mutual growth
•	Integration to all systems which cannot be integrated with Monday.com directly including legacy applications, on-prem apps etc.




How to Integrate with Monday.com?
Integration with Monday.com is enabled with the help of API’s provided by Monday.com.  Monday.com API is built on GraphQL and will give you a ton of flexibility for accessing and changing information in your monday.com account.
What is GraphQL?
GraphQL is an open-source data query and manipulation language for APIs, and a runtime for fulfilling queries with existing data. It provides an approach to developing web APIs and has been compared and contrasted with REST and other web service architectures. It allows clients to define the structure of the data required, and the same structure of the data is returned from the server, therefore preventing excessively large amounts of data from being returned. More information - https://en.wikipedia.org/wiki/GraphQL

Monday.com Connector Installation
Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. This is a just a POC connector for Monday.com which can be further enhanced as per the requirement.

Prerequisites
1.	The Connector requires any Node version between 8.14.2 and 10.14.2.

If you have installed any other Node version, for example, v8.9.4 on your system, you can choose from one of the following options:
Switch to one of the Node versions between 4.x.x and 8.14.x using tools such as node-windows, nvm, n, and run the app locally.
For Windows, use:
	nvm-windows
	nodist
2.	Install the connector builder package on your local machine. Refer to below link for instructions on how to build the custom connector.
https://docs.webmethods.io/integration/developer_guide/connector_builder/
Installation
Clone the repo https://github.com/SoftwareAG/webmethods.io-OpenPGP-Connector.git.
1.	Run npm install -g @webmethodsio/wmiocli.
2.	Login to your webmethods.io tenant using wmio login.
3.	Execute npm install to get started.
Running the tests
       To test, you can execute command - wmio test
Connector Deployment
Execute command - wmio deploy to deploy this connector to your tenant.
Once deployed, it’ll be automatically registered with webMethods.io Integration and will be available to you locally in the Connectors panel under the Services tab.

Monday.com connector setup in wM.IO
1.	API Token from Monday.com for authentication

Any API request to Monday.com must be accompanied by an API token. Below steps guide to generate the API token from Monday.com account.
API token for admins users
To generate your API token: 
1.	Log into your monday.com account.
2.	Click on your avatar in the bottom left corner.
3.	Select Admin.
4.	Select "API" on the left side of the admin page.
5.	Scroll down to the "API V2 Token" section and click "Generate".
6.	Copy this token. This is what you should be looking at:
 
API token for non-admins users
If you are not an admin of your monday.com account, you can get your API tokens via the developer’s section, following these steps: 
•	Go to your avatar menu 
•	Select "developers"
•	Click "My Tokens" in the top
 
You can use this API token to authenticate all your requests to our API, as well as in our testing environment. If you need to, you can regenerate the token at any time (causing the old one to expire). 
2.	Accessing GraphQL API at Monday.com
Users like to test things out before implementing them, so a query editor directly available in Monday.com platform! You can use this to try queries and mutations before implementing them in your application. 
Once you've opened the explorer page, enter your API token in this field: 
 
After supplying your token, you will enter our testing environment. The left pane of the explorer is where you enter your query or mutation, and when you press "Play" at the top left, the right pane will contain your results. 
 
You can also click the "Docs" button in the top right to access our documentation directly from the explorer. 
3.	Sending Requests from wM.IO to Monday.com
All requests to Monday.com server should be POST requests sent to api.monday.com/v2. Be sure to use the application/json as content type, and pass your API key as an "Authorization" parameter in the headers:
{
    "Content-Type" : "application/json",
    "Authorization" : "xxxxx….xxxxxxx"
}
The request body is where your query and variables are passed. It should look like this:
{ 
    "query" : "...",
    "variables" : {"myVariable" : "foo", "yourVariable" : "bar"}
}  

Sample code for reading the board details from Monday.com

const request = require('request');
module.exports = {

  name: "fetchboard",

  title: "Fetch Board",

  description: "",
  version: "v1",

  input:{
    title: "Fetchboard",
    type: "object",
    properties: {
      "boardID":{
        "title": "Board ID",
        "type":"string",
        "lookup":{
          "id": "fetchboards"
        }
      }
      
    }
  },

  output: {
    title: "output",
    type: "object",
    properties: {

    }
  },

  mock_input:{
    "api_key":"my api key"
  },

  execute: function(input, output){
    // to access auth info use input.auth , eg: input.auth.username
    // and to return output use output callback like this output(null, { 'notice' : 'successful'})
    // your code here
    request({
      "url":'https://api.monday.com/v2',
      "method": 'POST',
      "headers": {
          "Content-type": "application/json",
          "Authorization": input.auth.api_key
      },
      "body": JSON.stringify({"query": "{boards (ids: "+input.boardID+") {id name description state board_kind owner{id} groups{id title} items{id name updates{text_body}} }}"})
      
        
        
      
  }, function (error,response, body) {
    
  if (error) {
    return output(error)

    }
    if (response.statusCode >= 200 && response.statusCode < 400) {
      output(null,{responseBody:JSON.parse(body)})}
      else {
        return output(body)
      };
}
)
} 
}


Multiple actions can be created for the Monday.com connector depending on the requirement. Below are the sample actions created as a part of POC.

Actions currently available with Monday.com Connector 

Action	Description
Fetch Board	Read the details of the board
Create Board	Create new board at Monday.com
Fetch Item/Items	Fetch individual item details as well as list of items under the board
Create Item	Create new item in the board
Delete Item	Delete the item in the board
Create Update on Item	Create an update on the item
Fetch Board Views	Read all the views configured for the board
Fetch Activities on Board	Read any new activities performed on the board
Fetch Group details	Read all the groups configured for the board. Also items available under each group.
**And much more can be implemented


Sample Use Case: 
Automated backup of the Monday.com board and store the backup files in Google Drive
Backup of the board data from Monday.com will be taken on scheduled intervals. The data will be converted to CSV files and then store those back up files in Google drive. Below shows the recipe snapshot for the same.

 
Once data from Monday.com is stored in google drive, it can be further utilized for backup, analytics and much more.

For a quick demo of the POC and further collaboration, contact partner-sales-support@softwareag.com
