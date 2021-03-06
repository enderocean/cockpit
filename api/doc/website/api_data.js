define({ "api": [
  {
    "type": "get",
    "url": "/api/getToken/",
    "title": "1 - Basic Auth",
    "version": "1.0.0",
    "group": "1_General_knowledge",
    "description": "<p>To be able to interact with the API, you need to generate a Bearer Token using the <code>/api/getToken/</code> url</p> <p>Set your HTTP header like so with basic64 encoding : <code>Authorization clientID:clientSecret</code></p>",
    "examples": [
      {
        "title": "Example",
        "content": "var request = require('request');\n\n// API credentials\nvar clientKey = 'THcfYQ7sGW3jRdq';\nvar clientSecret = 'dexXLYNwdhezlxk';\n\n// Base64 encoding\nvar auth = 'Basic ' + new Buffer(clientKey + ':' + clientSecret).toString('base64');\n\n// API request\nrequest(\n\t {\n\t\t url : 'http://127.0.0.1:9034/api/getToken',\n\t\t headers : {\n\t\t\t \"Authorization\" : auth\n\t\t }\n\t },\n\t function (error, response, body) {\n\t \tbody = JSON.parse(body);\n\t\t console.log(body.token);\n\t }\n);",
        "type": "node"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "ClientID",
            "description": "<p>Generated application's API credentials</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "ClientSecret",
            "description": "<p>Generated application's API credentials</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Bearer Token, required for further API calls</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 500": [
          {
            "group": "Error 500",
            "optional": false,
            "field": "BadAuthorizationHeader",
            "description": "<p>There is an invalid or no authorization header</p>"
          }
        ],
        "Error 401": [
          {
            "group": "Error 401",
            "optional": false,
            "field": "AuthenticationFailed",
            "description": "<p>Couldn't match clientID/clientSecret with database</p>"
          }
        ]
      }
    },
    "filename": "/usr/src/app/workspace/a_cockpit/api/doc/doc_descriptor.js",
    "groupTitle": "1_General_knowledge",
    "name": "GetApiGettoken"
  },
  {
    "type": "get",
    "url": "/api/user?limit=42&offset=0&f_name=Doe&f_is_children=1&fk_id_hair_style=4",
    "title": "2 - Filter results",
    "group": "1_General_knowledge",
    "description": "<p>Each entity's services <strong>1 - Find all</strong> and <strong>2 - Find one</strong> can accept an optional query parameter to filter the results.<br><br> To filter on a specific field value, you need to specify the field and its encoded value along with the query parameters<br> All fields and foreignKeys of an entity can be filtered that way. Have a look at target entity's <strong>create</strong> service's body to know what is available<br><br> Ex:<br>You want to get all blonde users that are children of the same family &quot;Doe&quot;, by filtering on <code>f_name</code> (string), <code>f_is_children</code> (boolean) and <code>fk_id_hair_style</code> (foreign key).<br><br> Using <code>get /api/user</code> service, you would do as follow :</p>",
    "version": "0.0.0",
    "filename": "/usr/src/app/workspace/a_cockpit/api/doc/doc_descriptor.js",
    "groupTitle": "1_General_knowledge",
    "name": "GetApiUserLimit42Offset0F_nameDoeF_is_children1Fk_id_hair_style4"
  },
  {
    "type": "delete",
    "url": "/api/action/:id?token=TOKEN",
    "title": "5 - Delete",
    "version": "1.0.0",
    "description": "<p>Permanently delete a record of <code>action</code> with <code>id</code></p>",
    "group": "Action",
    "parameter": {
      "fields": {
        "Params parameters": [
          {
            "group": "Params parameters",
            "type": "Integer",
            "optional": false,
            "field": "id",
            "description": "<p><code>id</code> of action to delete</p>"
          }
        ],
        "Query parameters": [
          {
            "group": "Query parameters",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>API Bearer Token, required for authentication</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 404": [
          {
            "group": "Error 404",
            "type": "Object",
            "optional": false,
            "field": "NotFound",
            "description": "<p>No action with ID <code>id</code> found</p>"
          }
        ]
      }
    },
    "filename": "/usr/src/app/workspace/a_cockpit/api/doc/doc_descriptor.js",
    "groupTitle": "Action",
    "name": "DeleteApiActionIdTokenToken"
  },
  {
    "type": "get",
    "url": "/api/action/:id/:association?token=TOKEN",
    "title": "2.a - Find association",
    "version": "1.0.0",
    "description": "<p>Fetch records of <code>action</code>'s <code>association</code> from <code>offset</code> until <code>limit</code></p>",
    "group": "Action",
    "parameter": {
      "fields": {
        "Params parameters": [
          {
            "group": "Params parameters",
            "type": "Integer",
            "optional": false,
            "field": "id",
            "description": "<p><code>id</code> of the action to which <code>association</code> is related</p>"
          },
          {
            "group": "Params parameters",
            "type": "String",
            "allowedValues": [
              "status",
              "media"
            ],
            "optional": false,
            "field": "association",
            "description": "<p>Name of the related entity</p>"
          }
        ],
        "Query parameters": [
          {
            "group": "Query parameters",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>API Bearer Token, required for authentication</p>"
          },
          {
            "group": "Query parameters",
            "type": "Integer",
            "optional": true,
            "field": "limit",
            "defaultValue": "50",
            "description": "<p>The number of rows to be fetched</p>"
          },
          {
            "group": "Query parameters",
            "type": "Integer",
            "optional": true,
            "field": "offset",
            "defaultValue": "0",
            "description": "<p>The offset by which rows will be fetched</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "Object",
            "description": "<p>Object of <code>association</code></p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "limit",
            "description": "<p>Limit used to fetch data</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "offset",
            "description": "<p>Offset used to fetch data</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 404": [
          {
            "group": "Error 404",
            "type": "Object",
            "optional": false,
            "field": "NotFound",
            "description": "<p>No action with ID <code>id</code> found</p>"
          },
          {
            "group": "Error 404",
            "type": "Object",
            "optional": false,
            "field": "AssociationNotFound",
            "description": "<p>No association with <code>association</code></p>"
          }
        ]
      }
    },
    "filename": "/usr/src/app/workspace/a_cockpit/api/doc/doc_descriptor.js",
    "groupTitle": "Action",
    "name": "GetApiActionIdAssociationTokenToken"
  },
  {
    "type": "get",
    "url": "/api/action/:id?token=TOKEN",
    "title": "2 - Find one",
    "version": "1.0.0",
    "description": "<p>Fetch one record of <code>action</code> with <code>id</code></p>",
    "group": "Action",
    "parameter": {
      "fields": {
        "Query parameters": [
          {
            "group": "Query parameters",
            "type": "String",
            "allowedValues": [
              "r_status_actions",
              "r_media"
            ],
            "optional": true,
            "field": "include",
            "description": "<p>Include specified association(s) to each <code>action</code> result.<br>Multiple values can be given separated by a comma <br><br>Ex: ?include=r_asso1,r_asso2</p>"
          },
          {
            "group": "Query parameters",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>API Bearer Token, required for authentication</p>"
          }
        ],
        "Params parameters": [
          {
            "group": "Params parameters",
            "type": "Integer",
            "optional": false,
            "field": "id",
            "description": "<p>The <code>id</code> of action to fetch</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "action",
            "description": "<p>Object of action</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "action.id",
            "description": "<p><code>id</code> of action</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "action.version",
            "description": "<p><code>version</code> of action</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "action.createdBy",
            "description": "<p><code>createdBy</code> of action</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "action.updatedBy",
            "description": "<p><code>updatedBy</code> of action</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "action.f_order",
            "description": "<p><code>f_order</code> of action</p>"
          },
          {
            "group": "Success 200",
            "type": "Enum",
            "optional": false,
            "field": "action.f_execution",
            "description": "<p><code>f_execution</code> of action</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 404": [
          {
            "group": "Error 404",
            "type": "Object",
            "optional": false,
            "field": "NotFound",
            "description": "<p>No action with ID <code>id</code> found</p>"
          }
        ]
      }
    },
    "filename": "/usr/src/app/workspace/a_cockpit/api/doc/doc_descriptor.js",
    "groupTitle": "Action",
    "name": "GetApiActionIdTokenToken"
  },
  {
    "type": "get",
    "url": "/api/action?token=TOKEN",
    "title": "1 - Find all",
    "version": "1.0.0",
    "description": "<p>Fetch records of <code>action</code> from <code>offset</code> until <code>limit</code></p>",
    "group": "Action",
    "parameter": {
      "fields": {
        "Query parameters": [
          {
            "group": "Query parameters",
            "type": "String",
            "allowedValues": [
              "r_status_actions",
              "r_media"
            ],
            "optional": true,
            "field": "include",
            "description": "<p>Include specified association(s) to each <code>action</code> result.<br>Multiple values can be given separated by a comma <br><br>Ex: ?include=r_asso1,r_asso2</p>"
          },
          {
            "group": "Query parameters",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>API Bearer Token, required for authentication</p>"
          },
          {
            "group": "Query parameters",
            "type": "Integer",
            "optional": true,
            "field": "limit",
            "defaultValue": "50",
            "description": "<p>The number of rows to be fetched</p>"
          },
          {
            "group": "Query parameters",
            "type": "Integer",
            "optional": true,
            "field": "offset",
            "defaultValue": "0",
            "description": "<p>The offset by which rows will be fetched</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "actions",
            "description": "<p>List of action</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "actions.id",
            "description": "<p><code>id</code> of action</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "actions.version",
            "description": "<p><code>version</code> of action</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "actions.createdBy",
            "description": "<p><code>createdBy</code> of action</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "actions.updatedBy",
            "description": "<p><code>updatedBy</code> of action</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "actions.f_order",
            "description": "<p><code>f_order</code> of action</p>"
          },
          {
            "group": "Success 200",
            "type": "Enum",
            "optional": false,
            "field": "actions.f_execution",
            "description": "<p><code>f_execution</code> of action</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "limit",
            "description": "<p>Limit used to fetch data</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "offset",
            "description": "<p>Offset used to fetch data</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "totalCount",
            "description": "<p>The total count of records for action</p>"
          }
        ]
      }
    },
    "filename": "/usr/src/app/workspace/a_cockpit/api/doc/doc_descriptor.js",
    "groupTitle": "Action",
    "name": "GetApiActionTokenToken"
  },
  {
    "type": "post",
    "url": "/api/action/?token=TOKEN",
    "title": "3 - Create",
    "version": "1.0.0",
    "description": "<p>Create a record of <code>action</code> using values defined in request's <code>body</code></p>",
    "group": "Action",
    "parameter": {
      "fields": {
        "Body parameters": [
          {
            "group": "Body parameters",
            "type": "String",
            "optional": true,
            "field": "createdBy",
            "description": "<p><code>createdBy</code> of action</p>"
          },
          {
            "group": "Body parameters",
            "type": "String",
            "optional": true,
            "field": "updatedBy",
            "description": "<p><code>updatedBy</code> of action</p>"
          },
          {
            "group": "Body parameters",
            "type": "Integer",
            "optional": true,
            "field": "f_order",
            "description": "<p><code>f_order</code> of action</p>"
          },
          {
            "group": "Body parameters",
            "type": "Enum",
            "optional": true,
            "field": "f_execution",
            "description": "<p><code>f_execution</code> of action</p>"
          },
          {
            "group": "Body parameters",
            "type": "Integer",
            "optional": true,
            "field": "fk_id_status_actions",
            "description": "<p><code>id</code> of entity status to associate</p>"
          },
          {
            "group": "Body parameters",
            "type": "Integer",
            "optional": true,
            "field": "fk_id_media_media",
            "description": "<p><code>id</code> of entity media to associate</p>"
          }
        ],
        "Query parameters": [
          {
            "group": "Query parameters",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>API Bearer Token, required for authentication</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "action",
            "description": "<p>Created action</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "action.id",
            "description": "<p><code>id</code> of action</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "action.createdBy",
            "description": "<p><code>createdBy</code> of action</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "action.updatedBy",
            "description": "<p><code>updatedBy</code> of action</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "action.f_order",
            "description": "<p><code>f_order</code> of action</p>"
          },
          {
            "group": "Success 200",
            "type": "Enum",
            "optional": false,
            "field": "action.f_execution",
            "description": "<p><code>f_execution</code> of action</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 500": [
          {
            "group": "Error 500",
            "type": "Object",
            "optional": false,
            "field": "ServerError",
            "description": "<p>An error occured when trying to create action</p>"
          }
        ]
      }
    },
    "filename": "/usr/src/app/workspace/a_cockpit/api/doc/doc_descriptor.js",
    "groupTitle": "Action",
    "name": "PostApiActionTokenToken"
  },
  {
    "type": "put",
    "url": "/api/action/:id?token=TOKEN",
    "title": "4 - Update",
    "version": "1.0.0",
    "description": "<p>Update record of <code>action</code> with <code>id</code> using values defined in request's <code>body</code></p>",
    "group": "Action",
    "parameter": {
      "fields": {
        "Params parameters": [
          {
            "group": "Params parameters",
            "type": "Integer",
            "optional": false,
            "field": "id",
            "description": "<p><code>id</code> of the action to update</p>"
          }
        ],
        "Body parameters": [
          {
            "group": "Body parameters",
            "type": "String",
            "optional": true,
            "field": "createdBy",
            "description": "<p>New value of <code>createdBy</code> for action</p>"
          },
          {
            "group": "Body parameters",
            "type": "String",
            "optional": true,
            "field": "updatedBy",
            "description": "<p>New value of <code>updatedBy</code> for action</p>"
          },
          {
            "group": "Body parameters",
            "type": "Integer",
            "optional": true,
            "field": "f_order",
            "description": "<p>New value of <code>f_order</code> for action</p>"
          },
          {
            "group": "Body parameters",
            "type": "Enum",
            "optional": true,
            "field": "f_execution",
            "description": "<p>New value of <code>f_execution</code> for action</p>"
          },
          {
            "group": "Body parameters",
            "type": "Integer",
            "optional": true,
            "field": "fk_id_status_actions",
            "description": "<p><code>id</code> of entity status to associate</p>"
          },
          {
            "group": "Body parameters",
            "type": "Integer",
            "optional": true,
            "field": "fk_id_media_media",
            "description": "<p><code>id</code> of entity media to associate</p>"
          }
        ],
        "Query parameters": [
          {
            "group": "Query parameters",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>API Bearer Token, required for authentication</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "action",
            "description": "<p>Updated action</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "action.id",
            "description": "<p><code>id</code> of action</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "action.createdBy",
            "description": "<p><code>createdBy</code> of action</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "action.updatedBy",
            "description": "<p><code>updatedBy</code> of action</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "action.f_order",
            "description": "<p><code>f_order</code> of action</p>"
          },
          {
            "group": "Success 200",
            "type": "Enum",
            "optional": false,
            "field": "action.f_execution",
            "description": "<p><code>f_execution</code> of action</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 404": [
          {
            "group": "Error 404",
            "type": "Object",
            "optional": false,
            "field": "NotFound",
            "description": "<p>No action with ID <code>id</code> found</p>"
          }
        ],
        "Error 500": [
          {
            "group": "Error 500",
            "type": "Object",
            "optional": false,
            "field": "ServerError",
            "description": "<p>An error occured when trying to update action</p>"
          }
        ]
      }
    },
    "filename": "/usr/src/app/workspace/a_cockpit/api/doc/doc_descriptor.js",
    "groupTitle": "Action",
    "name": "PutApiActionIdTokenToken"
  },
  {
    "type": "delete",
    "url": "/api/documents_task/:id?token=TOKEN",
    "title": "5 - Delete",
    "version": "1.0.0",
    "description": "<p>Permanently delete a record of <code>documents_task</code> with <code>id</code></p>",
    "group": "Documents_Task",
    "parameter": {
      "fields": {
        "Params parameters": [
          {
            "group": "Params parameters",
            "type": "Integer",
            "optional": false,
            "field": "id",
            "description": "<p><code>id</code> of documents_task to delete</p>"
          }
        ],
        "Query parameters": [
          {
            "group": "Query parameters",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>API Bearer Token, required for authentication</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 404": [
          {
            "group": "Error 404",
            "type": "Object",
            "optional": false,
            "field": "NotFound",
            "description": "<p>No documents_task with ID <code>id</code> found</p>"
          }
        ]
      }
    },
    "filename": "/usr/src/app/workspace/a_cockpit/api/doc/doc_descriptor.js",
    "groupTitle": "Documents_Task",
    "name": "DeleteApiDocuments_taskIdTokenToken"
  },
  {
    "type": "get",
    "url": "/api/documents_task/:id/:association?token=TOKEN",
    "title": "2.a - Find association",
    "version": "1.0.0",
    "description": "<p>Fetch records of <code>documents_task</code>'s <code>association</code> from <code>offset</code> until <code>limit</code></p>",
    "group": "Documents_Task",
    "parameter": {
      "fields": {
        "Params parameters": [
          {
            "group": "Params parameters",
            "type": "Integer",
            "optional": false,
            "field": "id",
            "description": "<p><code>id</code> of the documents_task to which <code>association</code> is related</p>"
          },
          {
            "group": "Params parameters",
            "type": "String",
            "allowedValues": [
              "task"
            ],
            "optional": false,
            "field": "association",
            "description": "<p>Name of the related entity</p>"
          }
        ],
        "Query parameters": [
          {
            "group": "Query parameters",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>API Bearer Token, required for authentication</p>"
          },
          {
            "group": "Query parameters",
            "type": "Integer",
            "optional": true,
            "field": "limit",
            "defaultValue": "50",
            "description": "<p>The number of rows to be fetched</p>"
          },
          {
            "group": "Query parameters",
            "type": "Integer",
            "optional": true,
            "field": "offset",
            "defaultValue": "0",
            "description": "<p>The offset by which rows will be fetched</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "Object",
            "description": "<p>Object of <code>association</code></p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "limit",
            "description": "<p>Limit used to fetch data</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "offset",
            "description": "<p>Offset used to fetch data</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 404": [
          {
            "group": "Error 404",
            "type": "Object",
            "optional": false,
            "field": "NotFound",
            "description": "<p>No documents_task with ID <code>id</code> found</p>"
          },
          {
            "group": "Error 404",
            "type": "Object",
            "optional": false,
            "field": "AssociationNotFound",
            "description": "<p>No association with <code>association</code></p>"
          }
        ]
      }
    },
    "filename": "/usr/src/app/workspace/a_cockpit/api/doc/doc_descriptor.js",
    "groupTitle": "Documents_Task",
    "name": "GetApiDocuments_taskIdAssociationTokenToken"
  },
  {
    "type": "get",
    "url": "/api/documents_task/:id?token=TOKEN",
    "title": "2 - Find one",
    "version": "1.0.0",
    "description": "<p>Fetch one record of <code>documents_task</code> with <code>id</code></p>",
    "group": "Documents_Task",
    "parameter": {
      "fields": {
        "Query parameters": [
          {
            "group": "Query parameters",
            "type": "String",
            "allowedValues": [
              "r_task_documents_task"
            ],
            "optional": true,
            "field": "include",
            "description": "<p>Include specified association(s) to each <code>documents_task</code> result.<br>Multiple values can be given separated by a comma <br><br>Ex: ?include=r_asso1,r_asso2</p>"
          },
          {
            "group": "Query parameters",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>API Bearer Token, required for authentication</p>"
          }
        ],
        "Params parameters": [
          {
            "group": "Params parameters",
            "type": "Integer",
            "optional": false,
            "field": "id",
            "description": "<p>The <code>id</code> of documents_task to fetch</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "documents_task",
            "description": "<p>Object of documents_task</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "documents_task.id",
            "description": "<p><code>id</code> of documents_task</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "documents_task.version",
            "description": "<p><code>version</code> of documents_task</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "documents_task.createdBy",
            "description": "<p><code>createdBy</code> of documents_task</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "documents_task.updatedBy",
            "description": "<p><code>updatedBy</code> of documents_task</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "documents_task.f_filename",
            "description": "<p><code>f_filename</code> of documents_task</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 404": [
          {
            "group": "Error 404",
            "type": "Object",
            "optional": false,
            "field": "NotFound",
            "description": "<p>No documents_task with ID <code>id</code> found</p>"
          }
        ]
      }
    },
    "filename": "/usr/src/app/workspace/a_cockpit/api/doc/doc_descriptor.js",
    "groupTitle": "Documents_Task",
    "name": "GetApiDocuments_taskIdTokenToken"
  },
  {
    "type": "get",
    "url": "/api/documents_task?token=TOKEN",
    "title": "1 - Find all",
    "version": "1.0.0",
    "description": "<p>Fetch records of <code>documents_task</code> from <code>offset</code> until <code>limit</code></p>",
    "group": "Documents_Task",
    "parameter": {
      "fields": {
        "Query parameters": [
          {
            "group": "Query parameters",
            "type": "String",
            "allowedValues": [
              "r_task_documents_task"
            ],
            "optional": true,
            "field": "include",
            "description": "<p>Include specified association(s) to each <code>documents_task</code> result.<br>Multiple values can be given separated by a comma <br><br>Ex: ?include=r_asso1,r_asso2</p>"
          },
          {
            "group": "Query parameters",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>API Bearer Token, required for authentication</p>"
          },
          {
            "group": "Query parameters",
            "type": "Integer",
            "optional": true,
            "field": "limit",
            "defaultValue": "50",
            "description": "<p>The number of rows to be fetched</p>"
          },
          {
            "group": "Query parameters",
            "type": "Integer",
            "optional": true,
            "field": "offset",
            "defaultValue": "0",
            "description": "<p>The offset by which rows will be fetched</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "documents_tasks",
            "description": "<p>List of documents_task</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "documents_tasks.id",
            "description": "<p><code>id</code> of documents_task</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "documents_tasks.version",
            "description": "<p><code>version</code> of documents_task</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "documents_tasks.createdBy",
            "description": "<p><code>createdBy</code> of documents_task</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "documents_tasks.updatedBy",
            "description": "<p><code>updatedBy</code> of documents_task</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "documents_tasks.f_filename",
            "description": "<p><code>f_filename</code> of documents_task</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "limit",
            "description": "<p>Limit used to fetch data</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "offset",
            "description": "<p>Offset used to fetch data</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "totalCount",
            "description": "<p>The total count of records for documents_task</p>"
          }
        ]
      }
    },
    "filename": "/usr/src/app/workspace/a_cockpit/api/doc/doc_descriptor.js",
    "groupTitle": "Documents_Task",
    "name": "GetApiDocuments_taskTokenToken"
  },
  {
    "type": "post",
    "url": "/api/documents_task/?token=TOKEN",
    "title": "3 - Create",
    "version": "1.0.0",
    "description": "<p>Create a record of <code>documents_task</code> using values defined in request's <code>body</code></p>",
    "group": "Documents_Task",
    "parameter": {
      "fields": {
        "Body parameters": [
          {
            "group": "Body parameters",
            "type": "String",
            "optional": true,
            "field": "createdBy",
            "description": "<p><code>createdBy</code> of documents_task</p>"
          },
          {
            "group": "Body parameters",
            "type": "String",
            "optional": true,
            "field": "updatedBy",
            "description": "<p><code>updatedBy</code> of documents_task</p>"
          },
          {
            "group": "Body parameters",
            "type": "String",
            "optional": true,
            "field": "f_filename",
            "description": "<p><code>f_filename</code> of documents_task</p>"
          },
          {
            "group": "Body parameters",
            "type": "Integer",
            "optional": true,
            "field": "fk_id_task",
            "description": "<p><code>id</code> of entity task to associate</p>"
          }
        ],
        "Query parameters": [
          {
            "group": "Query parameters",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>API Bearer Token, required for authentication</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "documents_task",
            "description": "<p>Created documents_task</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "documents_task.id",
            "description": "<p><code>id</code> of documents_task</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "documents_task.createdBy",
            "description": "<p><code>createdBy</code> of documents_task</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "documents_task.updatedBy",
            "description": "<p><code>updatedBy</code> of documents_task</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "documents_task.f_filename",
            "description": "<p><code>f_filename</code> of documents_task</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 500": [
          {
            "group": "Error 500",
            "type": "Object",
            "optional": false,
            "field": "ServerError",
            "description": "<p>An error occured when trying to create documents_task</p>"
          }
        ]
      }
    },
    "filename": "/usr/src/app/workspace/a_cockpit/api/doc/doc_descriptor.js",
    "groupTitle": "Documents_Task",
    "name": "PostApiDocuments_taskTokenToken"
  },
  {
    "type": "put",
    "url": "/api/documents_task/:id?token=TOKEN",
    "title": "4 - Update",
    "version": "1.0.0",
    "description": "<p>Update record of <code>documents_task</code> with <code>id</code> using values defined in request's <code>body</code></p>",
    "group": "Documents_Task",
    "parameter": {
      "fields": {
        "Params parameters": [
          {
            "group": "Params parameters",
            "type": "Integer",
            "optional": false,
            "field": "id",
            "description": "<p><code>id</code> of the documents_task to update</p>"
          }
        ],
        "Body parameters": [
          {
            "group": "Body parameters",
            "type": "String",
            "optional": true,
            "field": "createdBy",
            "description": "<p>New value of <code>createdBy</code> for documents_task</p>"
          },
          {
            "group": "Body parameters",
            "type": "String",
            "optional": true,
            "field": "updatedBy",
            "description": "<p>New value of <code>updatedBy</code> for documents_task</p>"
          },
          {
            "group": "Body parameters",
            "type": "String",
            "optional": true,
            "field": "f_filename",
            "description": "<p>New value of <code>f_filename</code> for documents_task</p>"
          },
          {
            "group": "Body parameters",
            "type": "Integer",
            "optional": true,
            "field": "fk_id_task",
            "description": "<p><code>id</code> of entity task to associate</p>"
          }
        ],
        "Query parameters": [
          {
            "group": "Query parameters",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>API Bearer Token, required for authentication</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "documents_task",
            "description": "<p>Updated documents_task</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "documents_task.id",
            "description": "<p><code>id</code> of documents_task</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "documents_task.createdBy",
            "description": "<p><code>createdBy</code> of documents_task</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "documents_task.updatedBy",
            "description": "<p><code>updatedBy</code> of documents_task</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "documents_task.f_filename",
            "description": "<p><code>f_filename</code> of documents_task</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 404": [
          {
            "group": "Error 404",
            "type": "Object",
            "optional": false,
            "field": "NotFound",
            "description": "<p>No documents_task with ID <code>id</code> found</p>"
          }
        ],
        "Error 500": [
          {
            "group": "Error 500",
            "type": "Object",
            "optional": false,
            "field": "ServerError",
            "description": "<p>An error occured when trying to update documents_task</p>"
          }
        ]
      }
    },
    "filename": "/usr/src/app/workspace/a_cockpit/api/doc/doc_descriptor.js",
    "groupTitle": "Documents_Task",
    "name": "PutApiDocuments_taskIdTokenToken"
  },
  {
    "type": "delete",
    "url": "/api/group/:id?token=TOKEN",
    "title": "5 - Delete",
    "version": "1.0.0",
    "description": "<p>Permanently delete a record of <code>group</code> with <code>id</code></p>",
    "group": "Group",
    "parameter": {
      "fields": {
        "Params parameters": [
          {
            "group": "Params parameters",
            "type": "Integer",
            "optional": false,
            "field": "id",
            "description": "<p><code>id</code> of group to delete</p>"
          }
        ],
        "Query parameters": [
          {
            "group": "Query parameters",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>API Bearer Token, required for authentication</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 404": [
          {
            "group": "Error 404",
            "type": "Object",
            "optional": false,
            "field": "NotFound",
            "description": "<p>No group with ID <code>id</code> found</p>"
          }
        ]
      }
    },
    "filename": "/usr/src/app/workspace/a_cockpit/api/doc/doc_descriptor.js",
    "groupTitle": "Group",
    "name": "DeleteApiGroupIdTokenToken"
  },
  {
    "type": "get",
    "url": "/api/group/:id/:association?token=TOKEN",
    "title": "2.a - Find association",
    "version": "1.0.0",
    "description": "<p>Fetch records of <code>group</code>'s <code>association</code> from <code>offset</code> until <code>limit</code></p>",
    "group": "Group",
    "parameter": {
      "fields": {
        "Params parameters": [
          {
            "group": "Params parameters",
            "type": "Integer",
            "optional": false,
            "field": "id",
            "description": "<p><code>id</code> of the group to which <code>association</code> is related</p>"
          },
          {
            "group": "Params parameters",
            "type": "String",
            "allowedValues": [
              "user"
            ],
            "optional": false,
            "field": "association",
            "description": "<p>Name of the related entity</p>"
          }
        ],
        "Query parameters": [
          {
            "group": "Query parameters",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>API Bearer Token, required for authentication</p>"
          },
          {
            "group": "Query parameters",
            "type": "Integer",
            "optional": true,
            "field": "limit",
            "defaultValue": "50",
            "description": "<p>The number of rows to be fetched</p>"
          },
          {
            "group": "Query parameters",
            "type": "Integer",
            "optional": true,
            "field": "offset",
            "defaultValue": "0",
            "description": "<p>The offset by which rows will be fetched</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "Object",
            "description": "<p>Object of <code>association</code></p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "limit",
            "description": "<p>Limit used to fetch data</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "offset",
            "description": "<p>Offset used to fetch data</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 404": [
          {
            "group": "Error 404",
            "type": "Object",
            "optional": false,
            "field": "NotFound",
            "description": "<p>No group with ID <code>id</code> found</p>"
          },
          {
            "group": "Error 404",
            "type": "Object",
            "optional": false,
            "field": "AssociationNotFound",
            "description": "<p>No association with <code>association</code></p>"
          }
        ]
      }
    },
    "filename": "/usr/src/app/workspace/a_cockpit/api/doc/doc_descriptor.js",
    "groupTitle": "Group",
    "name": "GetApiGroupIdAssociationTokenToken"
  },
  {
    "type": "get",
    "url": "/api/group/:id?token=TOKEN",
    "title": "2 - Find one",
    "version": "1.0.0",
    "description": "<p>Fetch one record of <code>group</code> with <code>id</code></p>",
    "group": "Group",
    "parameter": {
      "fields": {
        "Query parameters": [
          {
            "group": "Query parameters",
            "type": "String",
            "allowedValues": [
              "r_user"
            ],
            "optional": true,
            "field": "include",
            "description": "<p>Include specified association(s) to each <code>group</code> result.<br>Multiple values can be given separated by a comma <br><br>Ex: ?include=r_asso1,r_asso2</p>"
          },
          {
            "group": "Query parameters",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>API Bearer Token, required for authentication</p>"
          }
        ],
        "Params parameters": [
          {
            "group": "Params parameters",
            "type": "Integer",
            "optional": false,
            "field": "id",
            "description": "<p>The <code>id</code> of group to fetch</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "group",
            "description": "<p>Object of group</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "group.id",
            "description": "<p><code>id</code> of group</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "group.version",
            "description": "<p><code>version</code> of group</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "group.createdBy",
            "description": "<p><code>createdBy</code> of group</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "group.updatedBy",
            "description": "<p><code>updatedBy</code> of group</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "group.f_label",
            "description": "<p><code>f_label</code> of group</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 404": [
          {
            "group": "Error 404",
            "type": "Object",
            "optional": false,
            "field": "NotFound",
            "description": "<p>No group with ID <code>id</code> found</p>"
          }
        ]
      }
    },
    "filename": "/usr/src/app/workspace/a_cockpit/api/doc/doc_descriptor.js",
    "groupTitle": "Group",
    "name": "GetApiGroupIdTokenToken"
  },
  {
    "type": "get",
    "url": "/api/group?token=TOKEN",
    "title": "1 - Find all",
    "version": "1.0.0",
    "description": "<p>Fetch records of <code>group</code> from <code>offset</code> until <code>limit</code></p>",
    "group": "Group",
    "parameter": {
      "fields": {
        "Query parameters": [
          {
            "group": "Query parameters",
            "type": "String",
            "allowedValues": [
              "r_user"
            ],
            "optional": true,
            "field": "include",
            "description": "<p>Include specified association(s) to each <code>group</code> result.<br>Multiple values can be given separated by a comma <br><br>Ex: ?include=r_asso1,r_asso2</p>"
          },
          {
            "group": "Query parameters",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>API Bearer Token, required for authentication</p>"
          },
          {
            "group": "Query parameters",
            "type": "Integer",
            "optional": true,
            "field": "limit",
            "defaultValue": "50",
            "description": "<p>The number of rows to be fetched</p>"
          },
          {
            "group": "Query parameters",
            "type": "Integer",
            "optional": true,
            "field": "offset",
            "defaultValue": "0",
            "description": "<p>The offset by which rows will be fetched</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "groups",
            "description": "<p>List of group</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "groups.id",
            "description": "<p><code>id</code> of group</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "groups.version",
            "description": "<p><code>version</code> of group</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "groups.createdBy",
            "description": "<p><code>createdBy</code> of group</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "groups.updatedBy",
            "description": "<p><code>updatedBy</code> of group</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "groups.f_label",
            "description": "<p><code>f_label</code> of group</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "limit",
            "description": "<p>Limit used to fetch data</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "offset",
            "description": "<p>Offset used to fetch data</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "totalCount",
            "description": "<p>The total count of records for group</p>"
          }
        ]
      }
    },
    "filename": "/usr/src/app/workspace/a_cockpit/api/doc/doc_descriptor.js",
    "groupTitle": "Group",
    "name": "GetApiGroupTokenToken"
  },
  {
    "type": "post",
    "url": "/api/group/?token=TOKEN",
    "title": "3 - Create",
    "version": "1.0.0",
    "description": "<p>Create a record of <code>group</code> using values defined in request's <code>body</code></p>",
    "group": "Group",
    "parameter": {
      "fields": {
        "Body parameters": [
          {
            "group": "Body parameters",
            "type": "String",
            "optional": true,
            "field": "createdBy",
            "description": "<p><code>createdBy</code> of group</p>"
          },
          {
            "group": "Body parameters",
            "type": "String",
            "optional": true,
            "field": "updatedBy",
            "description": "<p><code>updatedBy</code> of group</p>"
          },
          {
            "group": "Body parameters",
            "type": "String",
            "optional": true,
            "field": "f_label",
            "description": "<p><code>f_label</code> of group</p>"
          }
        ],
        "Query parameters": [
          {
            "group": "Query parameters",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>API Bearer Token, required for authentication</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "group",
            "description": "<p>Created group</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "group.id",
            "description": "<p><code>id</code> of group</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "group.createdBy",
            "description": "<p><code>createdBy</code> of group</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "group.updatedBy",
            "description": "<p><code>updatedBy</code> of group</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "group.f_label",
            "description": "<p><code>f_label</code> of group</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 500": [
          {
            "group": "Error 500",
            "type": "Object",
            "optional": false,
            "field": "ServerError",
            "description": "<p>An error occured when trying to create group</p>"
          }
        ]
      }
    },
    "filename": "/usr/src/app/workspace/a_cockpit/api/doc/doc_descriptor.js",
    "groupTitle": "Group",
    "name": "PostApiGroupTokenToken"
  },
  {
    "type": "put",
    "url": "/api/group/:id?token=TOKEN",
    "title": "4 - Update",
    "version": "1.0.0",
    "description": "<p>Update record of <code>group</code> with <code>id</code> using values defined in request's <code>body</code></p>",
    "group": "Group",
    "parameter": {
      "fields": {
        "Params parameters": [
          {
            "group": "Params parameters",
            "type": "Integer",
            "optional": false,
            "field": "id",
            "description": "<p><code>id</code> of the group to update</p>"
          }
        ],
        "Body parameters": [
          {
            "group": "Body parameters",
            "type": "String",
            "optional": true,
            "field": "createdBy",
            "description": "<p>New value of <code>createdBy</code> for group</p>"
          },
          {
            "group": "Body parameters",
            "type": "String",
            "optional": true,
            "field": "updatedBy",
            "description": "<p>New value of <code>updatedBy</code> for group</p>"
          },
          {
            "group": "Body parameters",
            "type": "String",
            "optional": true,
            "field": "f_label",
            "description": "<p>New value of <code>f_label</code> for group</p>"
          }
        ],
        "Query parameters": [
          {
            "group": "Query parameters",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>API Bearer Token, required for authentication</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "group",
            "description": "<p>Updated group</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "group.id",
            "description": "<p><code>id</code> of group</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "group.createdBy",
            "description": "<p><code>createdBy</code> of group</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "group.updatedBy",
            "description": "<p><code>updatedBy</code> of group</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "group.f_label",
            "description": "<p><code>f_label</code> of group</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 404": [
          {
            "group": "Error 404",
            "type": "Object",
            "optional": false,
            "field": "NotFound",
            "description": "<p>No group with ID <code>id</code> found</p>"
          }
        ],
        "Error 500": [
          {
            "group": "Error 500",
            "type": "Object",
            "optional": false,
            "field": "ServerError",
            "description": "<p>An error occured when trying to update group</p>"
          }
        ]
      }
    },
    "filename": "/usr/src/app/workspace/a_cockpit/api/doc/doc_descriptor.js",
    "groupTitle": "Group",
    "name": "PutApiGroupIdTokenToken"
  },
  {
    "type": "delete",
    "url": "/api/inline_help/:id?token=TOKEN",
    "title": "5 - Delete",
    "version": "1.0.0",
    "description": "<p>Permanently delete a record of <code>inline_help</code> with <code>id</code></p>",
    "group": "Inline_Help",
    "parameter": {
      "fields": {
        "Params parameters": [
          {
            "group": "Params parameters",
            "type": "Integer",
            "optional": false,
            "field": "id",
            "description": "<p><code>id</code> of inline_help to delete</p>"
          }
        ],
        "Query parameters": [
          {
            "group": "Query parameters",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>API Bearer Token, required for authentication</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 404": [
          {
            "group": "Error 404",
            "type": "Object",
            "optional": false,
            "field": "NotFound",
            "description": "<p>No inline_help with ID <code>id</code> found</p>"
          }
        ]
      }
    },
    "filename": "/usr/src/app/workspace/a_cockpit/api/doc/doc_descriptor.js",
    "groupTitle": "Inline_Help",
    "name": "DeleteApiInline_helpIdTokenToken"
  },
  {
    "type": "get",
    "url": "/api/inline_help/:id?token=TOKEN",
    "title": "2 - Find one",
    "version": "1.0.0",
    "description": "<p>Fetch one record of <code>inline_help</code> with <code>id</code></p>",
    "group": "Inline_Help",
    "parameter": {
      "fields": {
        "Query parameters) {String=} [include] Include specified association(s": [
          {
            "group": "Query parameters) {String=} [include] Include specified association(s",
            "optional": false,
            "field": "to",
            "description": "<p>each <code>inline_help</code> result.<br>Multiple values can be given separated by a comma <br><br>Ex: ?include=r_asso1,r_asso2</p>"
          }
        ],
        "Params parameters": [
          {
            "group": "Params parameters",
            "type": "Integer",
            "optional": false,
            "field": "id",
            "description": "<p>The <code>id</code> of inline_help to fetch</p>"
          }
        ],
        "Query parameters": [
          {
            "group": "Query parameters",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>API Bearer Token, required for authentication</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "inline_help",
            "description": "<p>Object of inline_help</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "inline_help.id",
            "description": "<p><code>id</code> of inline_help</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "inline_help.version",
            "description": "<p><code>version</code> of inline_help</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "inline_help.createdBy",
            "description": "<p><code>createdBy</code> of inline_help</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "inline_help.updatedBy",
            "description": "<p><code>updatedBy</code> of inline_help</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "inline_help.f_entity",
            "description": "<p><code>f_entity</code> of inline_help</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "inline_help.f_field",
            "description": "<p><code>f_field</code> of inline_help</p>"
          },
          {
            "group": "Success 200",
            "type": "Text",
            "optional": false,
            "field": "inline_help.f_content",
            "description": "<p><code>f_content</code> of inline_help</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 404": [
          {
            "group": "Error 404",
            "type": "Object",
            "optional": false,
            "field": "NotFound",
            "description": "<p>No inline_help with ID <code>id</code> found</p>"
          }
        ]
      }
    },
    "filename": "/usr/src/app/workspace/a_cockpit/api/doc/doc_descriptor.js",
    "groupTitle": "Inline_Help",
    "name": "GetApiInline_helpIdTokenToken"
  },
  {
    "type": "get",
    "url": "/api/inline_help?token=TOKEN",
    "title": "1 - Find all",
    "version": "1.0.0",
    "description": "<p>Fetch records of <code>inline_help</code> from <code>offset</code> until <code>limit</code></p>",
    "group": "Inline_Help",
    "parameter": {
      "fields": {
        "Query parameters) {String=} [include] Include specified association(s": [
          {
            "group": "Query parameters) {String=} [include] Include specified association(s",
            "optional": false,
            "field": "to",
            "description": "<p>each <code>inline_help</code> result.<br>Multiple values can be given separated by a comma <br><br>Ex: ?include=r_asso1,r_asso2</p>"
          }
        ],
        "Query parameters": [
          {
            "group": "Query parameters",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>API Bearer Token, required for authentication</p>"
          },
          {
            "group": "Query parameters",
            "type": "Integer",
            "optional": true,
            "field": "limit",
            "defaultValue": "50",
            "description": "<p>The number of rows to be fetched</p>"
          },
          {
            "group": "Query parameters",
            "type": "Integer",
            "optional": true,
            "field": "offset",
            "defaultValue": "0",
            "description": "<p>The offset by which rows will be fetched</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "inline_helps",
            "description": "<p>List of inline_help</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "inline_helps.id",
            "description": "<p><code>id</code> of inline_help</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "inline_helps.version",
            "description": "<p><code>version</code> of inline_help</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "inline_helps.createdBy",
            "description": "<p><code>createdBy</code> of inline_help</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "inline_helps.updatedBy",
            "description": "<p><code>updatedBy</code> of inline_help</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "inline_helps.f_entity",
            "description": "<p><code>f_entity</code> of inline_help</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "inline_helps.f_field",
            "description": "<p><code>f_field</code> of inline_help</p>"
          },
          {
            "group": "Success 200",
            "type": "Text",
            "optional": false,
            "field": "inline_helps.f_content",
            "description": "<p><code>f_content</code> of inline_help</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "limit",
            "description": "<p>Limit used to fetch data</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "offset",
            "description": "<p>Offset used to fetch data</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "totalCount",
            "description": "<p>The total count of records for inline_help</p>"
          }
        ]
      }
    },
    "filename": "/usr/src/app/workspace/a_cockpit/api/doc/doc_descriptor.js",
    "groupTitle": "Inline_Help",
    "name": "GetApiInline_helpTokenToken"
  },
  {
    "type": "post",
    "url": "/api/inline_help/?token=TOKEN",
    "title": "3 - Create",
    "version": "1.0.0",
    "description": "<p>Create a record of <code>inline_help</code> using values defined in request's <code>body</code></p>",
    "group": "Inline_Help",
    "parameter": {
      "fields": {
        "Body parameters": [
          {
            "group": "Body parameters",
            "type": "String",
            "optional": true,
            "field": "createdBy",
            "description": "<p><code>createdBy</code> of inline_help</p>"
          },
          {
            "group": "Body parameters",
            "type": "String",
            "optional": true,
            "field": "updatedBy",
            "description": "<p><code>updatedBy</code> of inline_help</p>"
          },
          {
            "group": "Body parameters",
            "type": "String",
            "optional": true,
            "field": "f_entity",
            "description": "<p><code>f_entity</code> of inline_help</p>"
          },
          {
            "group": "Body parameters",
            "type": "String",
            "optional": true,
            "field": "f_field",
            "description": "<p><code>f_field</code> of inline_help</p>"
          },
          {
            "group": "Body parameters",
            "type": "Text",
            "optional": true,
            "field": "f_content",
            "description": "<p><code>f_content</code> of inline_help</p>"
          }
        ],
        "Query parameters": [
          {
            "group": "Query parameters",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>API Bearer Token, required for authentication</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "inline_help",
            "description": "<p>Created inline_help</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "inline_help.id",
            "description": "<p><code>id</code> of inline_help</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "inline_help.createdBy",
            "description": "<p><code>createdBy</code> of inline_help</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "inline_help.updatedBy",
            "description": "<p><code>updatedBy</code> of inline_help</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "inline_help.f_entity",
            "description": "<p><code>f_entity</code> of inline_help</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "inline_help.f_field",
            "description": "<p><code>f_field</code> of inline_help</p>"
          },
          {
            "group": "Success 200",
            "type": "Text",
            "optional": false,
            "field": "inline_help.f_content",
            "description": "<p><code>f_content</code> of inline_help</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 500": [
          {
            "group": "Error 500",
            "type": "Object",
            "optional": false,
            "field": "ServerError",
            "description": "<p>An error occured when trying to create inline_help</p>"
          }
        ]
      }
    },
    "filename": "/usr/src/app/workspace/a_cockpit/api/doc/doc_descriptor.js",
    "groupTitle": "Inline_Help",
    "name": "PostApiInline_helpTokenToken"
  },
  {
    "type": "put",
    "url": "/api/inline_help/:id?token=TOKEN",
    "title": "4 - Update",
    "version": "1.0.0",
    "description": "<p>Update record of <code>inline_help</code> with <code>id</code> using values defined in request's <code>body</code></p>",
    "group": "Inline_Help",
    "parameter": {
      "fields": {
        "Params parameters": [
          {
            "group": "Params parameters",
            "type": "Integer",
            "optional": false,
            "field": "id",
            "description": "<p><code>id</code> of the inline_help to update</p>"
          }
        ],
        "Body parameters": [
          {
            "group": "Body parameters",
            "type": "String",
            "optional": true,
            "field": "createdBy",
            "description": "<p>New value of <code>createdBy</code> for inline_help</p>"
          },
          {
            "group": "Body parameters",
            "type": "String",
            "optional": true,
            "field": "updatedBy",
            "description": "<p>New value of <code>updatedBy</code> for inline_help</p>"
          },
          {
            "group": "Body parameters",
            "type": "String",
            "optional": true,
            "field": "f_entity",
            "description": "<p>New value of <code>f_entity</code> for inline_help</p>"
          },
          {
            "group": "Body parameters",
            "type": "String",
            "optional": true,
            "field": "f_field",
            "description": "<p>New value of <code>f_field</code> for inline_help</p>"
          },
          {
            "group": "Body parameters",
            "type": "Text",
            "optional": true,
            "field": "f_content",
            "description": "<p>New value of <code>f_content</code> for inline_help</p>"
          }
        ],
        "Query parameters": [
          {
            "group": "Query parameters",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>API Bearer Token, required for authentication</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "inline_help",
            "description": "<p>Updated inline_help</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "inline_help.id",
            "description": "<p><code>id</code> of inline_help</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "inline_help.createdBy",
            "description": "<p><code>createdBy</code> of inline_help</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "inline_help.updatedBy",
            "description": "<p><code>updatedBy</code> of inline_help</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "inline_help.f_entity",
            "description": "<p><code>f_entity</code> of inline_help</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "inline_help.f_field",
            "description": "<p><code>f_field</code> of inline_help</p>"
          },
          {
            "group": "Success 200",
            "type": "Text",
            "optional": false,
            "field": "inline_help.f_content",
            "description": "<p><code>f_content</code> of inline_help</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 404": [
          {
            "group": "Error 404",
            "type": "Object",
            "optional": false,
            "field": "NotFound",
            "description": "<p>No inline_help with ID <code>id</code> found</p>"
          }
        ],
        "Error 500": [
          {
            "group": "Error 500",
            "type": "Object",
            "optional": false,
            "field": "ServerError",
            "description": "<p>An error occured when trying to update inline_help</p>"
          }
        ]
      }
    },
    "filename": "/usr/src/app/workspace/a_cockpit/api/doc/doc_descriptor.js",
    "groupTitle": "Inline_Help",
    "name": "PutApiInline_helpIdTokenToken"
  },
  {
    "type": "delete",
    "url": "/api/media/:id?token=TOKEN",
    "title": "5 - Delete",
    "version": "1.0.0",
    "description": "<p>Permanently delete a record of <code>media</code> with <code>id</code></p>",
    "group": "Media",
    "parameter": {
      "fields": {
        "Params parameters": [
          {
            "group": "Params parameters",
            "type": "Integer",
            "optional": false,
            "field": "id",
            "description": "<p><code>id</code> of media to delete</p>"
          }
        ],
        "Query parameters": [
          {
            "group": "Query parameters",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>API Bearer Token, required for authentication</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 404": [
          {
            "group": "Error 404",
            "type": "Object",
            "optional": false,
            "field": "NotFound",
            "description": "<p>No media with ID <code>id</code> found</p>"
          }
        ]
      }
    },
    "filename": "/usr/src/app/workspace/a_cockpit/api/doc/doc_descriptor.js",
    "groupTitle": "Media",
    "name": "DeleteApiMediaIdTokenToken"
  },
  {
    "type": "get",
    "url": "/api/media/:id/:association?token=TOKEN",
    "title": "2.a - Find association",
    "version": "1.0.0",
    "description": "<p>Fetch records of <code>media</code>'s <code>association</code> from <code>offset</code> until <code>limit</code></p>",
    "group": "Media",
    "parameter": {
      "fields": {
        "Params parameters": [
          {
            "group": "Params parameters",
            "type": "Integer",
            "optional": false,
            "field": "id",
            "description": "<p><code>id</code> of the media to which <code>association</code> is related</p>"
          },
          {
            "group": "Params parameters",
            "type": "String",
            "allowedValues": [
              "media_mail",
              "media_notification",
              "media_sms",
              "media_task",
              "action"
            ],
            "optional": false,
            "field": "association",
            "description": "<p>Name of the related entity</p>"
          }
        ],
        "Query parameters": [
          {
            "group": "Query parameters",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>API Bearer Token, required for authentication</p>"
          },
          {
            "group": "Query parameters",
            "type": "Integer",
            "optional": true,
            "field": "limit",
            "defaultValue": "50",
            "description": "<p>The number of rows to be fetched</p>"
          },
          {
            "group": "Query parameters",
            "type": "Integer",
            "optional": true,
            "field": "offset",
            "defaultValue": "0",
            "description": "<p>The offset by which rows will be fetched</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "Object",
            "description": "<p>Object of <code>association</code></p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "limit",
            "description": "<p>Limit used to fetch data</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "offset",
            "description": "<p>Offset used to fetch data</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 404": [
          {
            "group": "Error 404",
            "type": "Object",
            "optional": false,
            "field": "NotFound",
            "description": "<p>No media with ID <code>id</code> found</p>"
          },
          {
            "group": "Error 404",
            "type": "Object",
            "optional": false,
            "field": "AssociationNotFound",
            "description": "<p>No association with <code>association</code></p>"
          }
        ]
      }
    },
    "filename": "/usr/src/app/workspace/a_cockpit/api/doc/doc_descriptor.js",
    "groupTitle": "Media",
    "name": "GetApiMediaIdAssociationTokenToken"
  },
  {
    "type": "get",
    "url": "/api/media/:id?token=TOKEN",
    "title": "2 - Find one",
    "version": "1.0.0",
    "description": "<p>Fetch one record of <code>media</code> with <code>id</code></p>",
    "group": "Media",
    "parameter": {
      "fields": {
        "Query parameters": [
          {
            "group": "Query parameters",
            "type": "String",
            "allowedValues": [
              "r_media_mail",
              "r_media_notification",
              "r_media_sms",
              "r_media_task",
              "r_action"
            ],
            "optional": true,
            "field": "include",
            "description": "<p>Include specified association(s) to each <code>media</code> result.<br>Multiple values can be given separated by a comma <br><br>Ex: ?include=r_asso1,r_asso2</p>"
          },
          {
            "group": "Query parameters",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>API Bearer Token, required for authentication</p>"
          }
        ],
        "Params parameters": [
          {
            "group": "Params parameters",
            "type": "Integer",
            "optional": false,
            "field": "id",
            "description": "<p>The <code>id</code> of media to fetch</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "media",
            "description": "<p>Object of media</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "media.id",
            "description": "<p><code>id</code> of media</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "media.version",
            "description": "<p><code>version</code> of media</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "media.createdBy",
            "description": "<p><code>createdBy</code> of media</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "media.updatedBy",
            "description": "<p><code>updatedBy</code> of media</p>"
          },
          {
            "group": "Success 200",
            "type": "Enum",
            "optional": false,
            "field": "media.f_type",
            "description": "<p><code>f_type</code> of media</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "media.f_name",
            "description": "<p><code>f_name</code> of media</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "media.f_target_entity",
            "description": "<p><code>f_target_entity</code> of media</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 404": [
          {
            "group": "Error 404",
            "type": "Object",
            "optional": false,
            "field": "NotFound",
            "description": "<p>No media with ID <code>id</code> found</p>"
          }
        ]
      }
    },
    "filename": "/usr/src/app/workspace/a_cockpit/api/doc/doc_descriptor.js",
    "groupTitle": "Media",
    "name": "GetApiMediaIdTokenToken"
  },
  {
    "type": "get",
    "url": "/api/media?token=TOKEN",
    "title": "1 - Find all",
    "version": "1.0.0",
    "description": "<p>Fetch records of <code>media</code> from <code>offset</code> until <code>limit</code></p>",
    "group": "Media",
    "parameter": {
      "fields": {
        "Query parameters": [
          {
            "group": "Query parameters",
            "type": "String",
            "allowedValues": [
              "r_media_mail",
              "r_media_notification",
              "r_media_sms",
              "r_media_task",
              "r_action"
            ],
            "optional": true,
            "field": "include",
            "description": "<p>Include specified association(s) to each <code>media</code> result.<br>Multiple values can be given separated by a comma <br><br>Ex: ?include=r_asso1,r_asso2</p>"
          },
          {
            "group": "Query parameters",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>API Bearer Token, required for authentication</p>"
          },
          {
            "group": "Query parameters",
            "type": "Integer",
            "optional": true,
            "field": "limit",
            "defaultValue": "50",
            "description": "<p>The number of rows to be fetched</p>"
          },
          {
            "group": "Query parameters",
            "type": "Integer",
            "optional": true,
            "field": "offset",
            "defaultValue": "0",
            "description": "<p>The offset by which rows will be fetched</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "medias",
            "description": "<p>List of media</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "medias.id",
            "description": "<p><code>id</code> of media</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "medias.version",
            "description": "<p><code>version</code> of media</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "medias.createdBy",
            "description": "<p><code>createdBy</code> of media</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "medias.updatedBy",
            "description": "<p><code>updatedBy</code> of media</p>"
          },
          {
            "group": "Success 200",
            "type": "Enum",
            "optional": false,
            "field": "medias.f_type",
            "description": "<p><code>f_type</code> of media</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "medias.f_name",
            "description": "<p><code>f_name</code> of media</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "medias.f_target_entity",
            "description": "<p><code>f_target_entity</code> of media</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "limit",
            "description": "<p>Limit used to fetch data</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "offset",
            "description": "<p>Offset used to fetch data</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "totalCount",
            "description": "<p>The total count of records for media</p>"
          }
        ]
      }
    },
    "filename": "/usr/src/app/workspace/a_cockpit/api/doc/doc_descriptor.js",
    "groupTitle": "Media",
    "name": "GetApiMediaTokenToken"
  },
  {
    "type": "post",
    "url": "/api/media/?token=TOKEN",
    "title": "3 - Create",
    "version": "1.0.0",
    "description": "<p>Create a record of <code>media</code> using values defined in request's <code>body</code></p>",
    "group": "Media",
    "parameter": {
      "fields": {
        "Body parameters": [
          {
            "group": "Body parameters",
            "type": "String",
            "optional": true,
            "field": "createdBy",
            "description": "<p><code>createdBy</code> of media</p>"
          },
          {
            "group": "Body parameters",
            "type": "String",
            "optional": true,
            "field": "updatedBy",
            "description": "<p><code>updatedBy</code> of media</p>"
          },
          {
            "group": "Body parameters",
            "type": "Enum",
            "optional": true,
            "field": "f_type",
            "description": "<p><code>f_type</code> of media</p>"
          },
          {
            "group": "Body parameters",
            "type": "String",
            "optional": true,
            "field": "f_name",
            "description": "<p><code>f_name</code> of media</p>"
          },
          {
            "group": "Body parameters",
            "type": "String",
            "optional": true,
            "field": "f_target_entity",
            "description": "<p><code>f_target_entity</code> of media</p>"
          },
          {
            "group": "Body parameters",
            "type": "Integer",
            "optional": true,
            "field": "fk_id_media_mail",
            "description": "<p><code>id</code> of entity media_mail to associate</p>"
          },
          {
            "group": "Body parameters",
            "type": "Integer",
            "optional": true,
            "field": "fk_id_media_notification",
            "description": "<p><code>id</code> of entity media_notification to associate</p>"
          },
          {
            "group": "Body parameters",
            "type": "Integer",
            "optional": true,
            "field": "fk_id_media_sms",
            "description": "<p><code>id</code> of entity media_sms to associate</p>"
          },
          {
            "group": "Body parameters",
            "type": "Integer",
            "optional": true,
            "field": "fk_id_media_task",
            "description": "<p><code>id</code> of entity media_task to associate</p>"
          },
          {
            "group": "Body parameters",
            "type": "Integer",
            "optional": true,
            "field": "fk_id_media_media",
            "description": "<p><code>id</code> of entity action to associate</p>"
          }
        ],
        "Query parameters": [
          {
            "group": "Query parameters",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>API Bearer Token, required for authentication</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "media",
            "description": "<p>Created media</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "media.id",
            "description": "<p><code>id</code> of media</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "media.createdBy",
            "description": "<p><code>createdBy</code> of media</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "media.updatedBy",
            "description": "<p><code>updatedBy</code> of media</p>"
          },
          {
            "group": "Success 200",
            "type": "Enum",
            "optional": false,
            "field": "media.f_type",
            "description": "<p><code>f_type</code> of media</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "media.f_name",
            "description": "<p><code>f_name</code> of media</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "media.f_target_entity",
            "description": "<p><code>f_target_entity</code> of media</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 500": [
          {
            "group": "Error 500",
            "type": "Object",
            "optional": false,
            "field": "ServerError",
            "description": "<p>An error occured when trying to create media</p>"
          }
        ]
      }
    },
    "filename": "/usr/src/app/workspace/a_cockpit/api/doc/doc_descriptor.js",
    "groupTitle": "Media",
    "name": "PostApiMediaTokenToken"
  },
  {
    "type": "put",
    "url": "/api/media/:id?token=TOKEN",
    "title": "4 - Update",
    "version": "1.0.0",
    "description": "<p>Update record of <code>media</code> with <code>id</code> using values defined in request's <code>body</code></p>",
    "group": "Media",
    "parameter": {
      "fields": {
        "Params parameters": [
          {
            "group": "Params parameters",
            "type": "Integer",
            "optional": false,
            "field": "id",
            "description": "<p><code>id</code> of the media to update</p>"
          }
        ],
        "Body parameters": [
          {
            "group": "Body parameters",
            "type": "String",
            "optional": true,
            "field": "createdBy",
            "description": "<p>New value of <code>createdBy</code> for media</p>"
          },
          {
            "group": "Body parameters",
            "type": "String",
            "optional": true,
            "field": "updatedBy",
            "description": "<p>New value of <code>updatedBy</code> for media</p>"
          },
          {
            "group": "Body parameters",
            "type": "Enum",
            "optional": true,
            "field": "f_type",
            "description": "<p>New value of <code>f_type</code> for media</p>"
          },
          {
            "group": "Body parameters",
            "type": "String",
            "optional": true,
            "field": "f_name",
            "description": "<p>New value of <code>f_name</code> for media</p>"
          },
          {
            "group": "Body parameters",
            "type": "String",
            "optional": true,
            "field": "f_target_entity",
            "description": "<p>New value of <code>f_target_entity</code> for media</p>"
          },
          {
            "group": "Body parameters",
            "type": "Integer",
            "optional": true,
            "field": "fk_id_media_mail",
            "description": "<p><code>id</code> of entity media_mail to associate</p>"
          },
          {
            "group": "Body parameters",
            "type": "Integer",
            "optional": true,
            "field": "fk_id_media_notification",
            "description": "<p><code>id</code> of entity media_notification to associate</p>"
          },
          {
            "group": "Body parameters",
            "type": "Integer",
            "optional": true,
            "field": "fk_id_media_sms",
            "description": "<p><code>id</code> of entity media_sms to associate</p>"
          },
          {
            "group": "Body parameters",
            "type": "Integer",
            "optional": true,
            "field": "fk_id_media_task",
            "description": "<p><code>id</code> of entity media_task to associate</p>"
          },
          {
            "group": "Body parameters",
            "type": "Integer",
            "optional": true,
            "field": "fk_id_media_media",
            "description": "<p><code>id</code> of entity action to associate</p>"
          }
        ],
        "Query parameters": [
          {
            "group": "Query parameters",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>API Bearer Token, required for authentication</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "media",
            "description": "<p>Updated media</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "media.id",
            "description": "<p><code>id</code> of media</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "media.createdBy",
            "description": "<p><code>createdBy</code> of media</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "media.updatedBy",
            "description": "<p><code>updatedBy</code> of media</p>"
          },
          {
            "group": "Success 200",
            "type": "Enum",
            "optional": false,
            "field": "media.f_type",
            "description": "<p><code>f_type</code> of media</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "media.f_name",
            "description": "<p><code>f_name</code> of media</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "media.f_target_entity",
            "description": "<p><code>f_target_entity</code> of media</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 404": [
          {
            "group": "Error 404",
            "type": "Object",
            "optional": false,
            "field": "NotFound",
            "description": "<p>No media with ID <code>id</code> found</p>"
          }
        ],
        "Error 500": [
          {
            "group": "Error 500",
            "type": "Object",
            "optional": false,
            "field": "ServerError",
            "description": "<p>An error occured when trying to update media</p>"
          }
        ]
      }
    },
    "filename": "/usr/src/app/workspace/a_cockpit/api/doc/doc_descriptor.js",
    "groupTitle": "Media",
    "name": "PutApiMediaIdTokenToken"
  },
  {
    "type": "delete",
    "url": "/api/media_mail/:id?token=TOKEN",
    "title": "5 - Delete",
    "version": "1.0.0",
    "description": "<p>Permanently delete a record of <code>media_mail</code> with <code>id</code></p>",
    "group": "Media_Mail",
    "parameter": {
      "fields": {
        "Params parameters": [
          {
            "group": "Params parameters",
            "type": "Integer",
            "optional": false,
            "field": "id",
            "description": "<p><code>id</code> of media_mail to delete</p>"
          }
        ],
        "Query parameters": [
          {
            "group": "Query parameters",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>API Bearer Token, required for authentication</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 404": [
          {
            "group": "Error 404",
            "type": "Object",
            "optional": false,
            "field": "NotFound",
            "description": "<p>No media_mail with ID <code>id</code> found</p>"
          }
        ]
      }
    },
    "filename": "/usr/src/app/workspace/a_cockpit/api/doc/doc_descriptor.js",
    "groupTitle": "Media_Mail",
    "name": "DeleteApiMedia_mailIdTokenToken"
  },
  {
    "type": "get",
    "url": "/api/media_mail/:id/:association?token=TOKEN",
    "title": "2.a - Find association",
    "version": "1.0.0",
    "description": "<p>Fetch records of <code>media_mail</code>'s <code>association</code> from <code>offset</code> until <code>limit</code></p>",
    "group": "Media_Mail",
    "parameter": {
      "fields": {
        "Params parameters": [
          {
            "group": "Params parameters",
            "type": "Integer",
            "optional": false,
            "field": "id",
            "description": "<p><code>id</code> of the media_mail to which <code>association</code> is related</p>"
          },
          {
            "group": "Params parameters",
            "type": "String",
            "allowedValues": [
              "media"
            ],
            "optional": false,
            "field": "association",
            "description": "<p>Name of the related entity</p>"
          }
        ],
        "Query parameters": [
          {
            "group": "Query parameters",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>API Bearer Token, required for authentication</p>"
          },
          {
            "group": "Query parameters",
            "type": "Integer",
            "optional": true,
            "field": "limit",
            "defaultValue": "50",
            "description": "<p>The number of rows to be fetched</p>"
          },
          {
            "group": "Query parameters",
            "type": "Integer",
            "optional": true,
            "field": "offset",
            "defaultValue": "0",
            "description": "<p>The offset by which rows will be fetched</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "Object",
            "description": "<p>Object of <code>association</code></p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "limit",
            "description": "<p>Limit used to fetch data</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "offset",
            "description": "<p>Offset used to fetch data</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 404": [
          {
            "group": "Error 404",
            "type": "Object",
            "optional": false,
            "field": "NotFound",
            "description": "<p>No media_mail with ID <code>id</code> found</p>"
          },
          {
            "group": "Error 404",
            "type": "Object",
            "optional": false,
            "field": "AssociationNotFound",
            "description": "<p>No association with <code>association</code></p>"
          }
        ]
      }
    },
    "filename": "/usr/src/app/workspace/a_cockpit/api/doc/doc_descriptor.js",
    "groupTitle": "Media_Mail",
    "name": "GetApiMedia_mailIdAssociationTokenToken"
  },
  {
    "type": "get",
    "url": "/api/media_mail/:id?token=TOKEN",
    "title": "2 - Find one",
    "version": "1.0.0",
    "description": "<p>Fetch one record of <code>media_mail</code> with <code>id</code></p>",
    "group": "Media_Mail",
    "parameter": {
      "fields": {
        "Query parameters": [
          {
            "group": "Query parameters",
            "type": "String",
            "allowedValues": [
              "r_media"
            ],
            "optional": true,
            "field": "include",
            "description": "<p>Include specified association(s) to each <code>media_mail</code> result.<br>Multiple values can be given separated by a comma <br><br>Ex: ?include=r_asso1,r_asso2</p>"
          },
          {
            "group": "Query parameters",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>API Bearer Token, required for authentication</p>"
          }
        ],
        "Params parameters": [
          {
            "group": "Params parameters",
            "type": "Integer",
            "optional": false,
            "field": "id",
            "description": "<p>The <code>id</code> of media_mail to fetch</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "media_mail",
            "description": "<p>Object of media_mail</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "media_mail.id",
            "description": "<p><code>id</code> of media_mail</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "media_mail.version",
            "description": "<p><code>version</code> of media_mail</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "media_mail.createdBy",
            "description": "<p><code>createdBy</code> of media_mail</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "media_mail.updatedBy",
            "description": "<p><code>updatedBy</code> of media_mail</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "media_mail.f_to",
            "description": "<p><code>f_to</code> of media_mail</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "media_mail.f_cc",
            "description": "<p><code>f_cc</code> of media_mail</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "media_mail.f_cci",
            "description": "<p><code>f_cci</code> of media_mail</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "media_mail.f_from",
            "description": "<p><code>f_from</code> of media_mail</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "media_mail.f_attachments",
            "description": "<p><code>f_attachments</code> of media_mail</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "media_mail.f_subject",
            "description": "<p><code>f_subject</code> of media_mail</p>"
          },
          {
            "group": "Success 200",
            "type": "Text",
            "optional": false,
            "field": "media_mail.f_content",
            "description": "<p><code>f_content</code> of media_mail</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 404": [
          {
            "group": "Error 404",
            "type": "Object",
            "optional": false,
            "field": "NotFound",
            "description": "<p>No media_mail with ID <code>id</code> found</p>"
          }
        ]
      }
    },
    "filename": "/usr/src/app/workspace/a_cockpit/api/doc/doc_descriptor.js",
    "groupTitle": "Media_Mail",
    "name": "GetApiMedia_mailIdTokenToken"
  },
  {
    "type": "get",
    "url": "/api/media_mail?token=TOKEN",
    "title": "1 - Find all",
    "version": "1.0.0",
    "description": "<p>Fetch records of <code>media_mail</code> from <code>offset</code> until <code>limit</code></p>",
    "group": "Media_Mail",
    "parameter": {
      "fields": {
        "Query parameters": [
          {
            "group": "Query parameters",
            "type": "String",
            "allowedValues": [
              "r_media"
            ],
            "optional": true,
            "field": "include",
            "description": "<p>Include specified association(s) to each <code>media_mail</code> result.<br>Multiple values can be given separated by a comma <br><br>Ex: ?include=r_asso1,r_asso2</p>"
          },
          {
            "group": "Query parameters",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>API Bearer Token, required for authentication</p>"
          },
          {
            "group": "Query parameters",
            "type": "Integer",
            "optional": true,
            "field": "limit",
            "defaultValue": "50",
            "description": "<p>The number of rows to be fetched</p>"
          },
          {
            "group": "Query parameters",
            "type": "Integer",
            "optional": true,
            "field": "offset",
            "defaultValue": "0",
            "description": "<p>The offset by which rows will be fetched</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "media_mails",
            "description": "<p>List of media_mail</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "media_mails.id",
            "description": "<p><code>id</code> of media_mail</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "media_mails.version",
            "description": "<p><code>version</code> of media_mail</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "media_mails.createdBy",
            "description": "<p><code>createdBy</code> of media_mail</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "media_mails.updatedBy",
            "description": "<p><code>updatedBy</code> of media_mail</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "media_mails.f_to",
            "description": "<p><code>f_to</code> of media_mail</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "media_mails.f_cc",
            "description": "<p><code>f_cc</code> of media_mail</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "media_mails.f_cci",
            "description": "<p><code>f_cci</code> of media_mail</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "media_mails.f_from",
            "description": "<p><code>f_from</code> of media_mail</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "media_mails.f_attachments",
            "description": "<p><code>f_attachments</code> of media_mail</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "media_mails.f_subject",
            "description": "<p><code>f_subject</code> of media_mail</p>"
          },
          {
            "group": "Success 200",
            "type": "Text",
            "optional": false,
            "field": "media_mails.f_content",
            "description": "<p><code>f_content</code> of media_mail</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "limit",
            "description": "<p>Limit used to fetch data</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "offset",
            "description": "<p>Offset used to fetch data</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "totalCount",
            "description": "<p>The total count of records for media_mail</p>"
          }
        ]
      }
    },
    "filename": "/usr/src/app/workspace/a_cockpit/api/doc/doc_descriptor.js",
    "groupTitle": "Media_Mail",
    "name": "GetApiMedia_mailTokenToken"
  },
  {
    "type": "post",
    "url": "/api/media_mail/?token=TOKEN",
    "title": "3 - Create",
    "version": "1.0.0",
    "description": "<p>Create a record of <code>media_mail</code> using values defined in request's <code>body</code></p>",
    "group": "Media_Mail",
    "parameter": {
      "fields": {
        "Body parameters": [
          {
            "group": "Body parameters",
            "type": "String",
            "optional": true,
            "field": "createdBy",
            "description": "<p><code>createdBy</code> of media_mail</p>"
          },
          {
            "group": "Body parameters",
            "type": "String",
            "optional": true,
            "field": "updatedBy",
            "description": "<p><code>updatedBy</code> of media_mail</p>"
          },
          {
            "group": "Body parameters",
            "type": "String",
            "optional": true,
            "field": "f_to",
            "description": "<p><code>f_to</code> of media_mail</p>"
          },
          {
            "group": "Body parameters",
            "type": "String",
            "optional": true,
            "field": "f_cc",
            "description": "<p><code>f_cc</code> of media_mail</p>"
          },
          {
            "group": "Body parameters",
            "type": "String",
            "optional": true,
            "field": "f_cci",
            "description": "<p><code>f_cci</code> of media_mail</p>"
          },
          {
            "group": "Body parameters",
            "type": "String",
            "optional": true,
            "field": "f_from",
            "description": "<p><code>f_from</code> of media_mail</p>"
          },
          {
            "group": "Body parameters",
            "type": "String",
            "optional": true,
            "field": "f_attachments",
            "description": "<p><code>f_attachments</code> of media_mail</p>"
          },
          {
            "group": "Body parameters",
            "type": "String",
            "optional": true,
            "field": "f_subject",
            "description": "<p><code>f_subject</code> of media_mail</p>"
          },
          {
            "group": "Body parameters",
            "type": "Text",
            "optional": true,
            "field": "f_content",
            "description": "<p><code>f_content</code> of media_mail</p>"
          },
          {
            "group": "Body parameters",
            "type": "Integer",
            "optional": true,
            "field": "fk_id_media_mail",
            "description": "<p><code>id</code> of entity media to associate</p>"
          }
        ],
        "Query parameters": [
          {
            "group": "Query parameters",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>API Bearer Token, required for authentication</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "media_mail",
            "description": "<p>Created media_mail</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "media_mail.id",
            "description": "<p><code>id</code> of media_mail</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "media_mail.createdBy",
            "description": "<p><code>createdBy</code> of media_mail</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "media_mail.updatedBy",
            "description": "<p><code>updatedBy</code> of media_mail</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "media_mail.f_to",
            "description": "<p><code>f_to</code> of media_mail</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "media_mail.f_cc",
            "description": "<p><code>f_cc</code> of media_mail</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "media_mail.f_cci",
            "description": "<p><code>f_cci</code> of media_mail</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "media_mail.f_from",
            "description": "<p><code>f_from</code> of media_mail</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "media_mail.f_attachments",
            "description": "<p><code>f_attachments</code> of media_mail</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "media_mail.f_subject",
            "description": "<p><code>f_subject</code> of media_mail</p>"
          },
          {
            "group": "Success 200",
            "type": "Text",
            "optional": false,
            "field": "media_mail.f_content",
            "description": "<p><code>f_content</code> of media_mail</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 500": [
          {
            "group": "Error 500",
            "type": "Object",
            "optional": false,
            "field": "ServerError",
            "description": "<p>An error occured when trying to create media_mail</p>"
          }
        ]
      }
    },
    "filename": "/usr/src/app/workspace/a_cockpit/api/doc/doc_descriptor.js",
    "groupTitle": "Media_Mail",
    "name": "PostApiMedia_mailTokenToken"
  },
  {
    "type": "put",
    "url": "/api/media_mail/:id?token=TOKEN",
    "title": "4 - Update",
    "version": "1.0.0",
    "description": "<p>Update record of <code>media_mail</code> with <code>id</code> using values defined in request's <code>body</code></p>",
    "group": "Media_Mail",
    "parameter": {
      "fields": {
        "Params parameters": [
          {
            "group": "Params parameters",
            "type": "Integer",
            "optional": false,
            "field": "id",
            "description": "<p><code>id</code> of the media_mail to update</p>"
          }
        ],
        "Body parameters": [
          {
            "group": "Body parameters",
            "type": "String",
            "optional": true,
            "field": "createdBy",
            "description": "<p>New value of <code>createdBy</code> for media_mail</p>"
          },
          {
            "group": "Body parameters",
            "type": "String",
            "optional": true,
            "field": "updatedBy",
            "description": "<p>New value of <code>updatedBy</code> for media_mail</p>"
          },
          {
            "group": "Body parameters",
            "type": "String",
            "optional": true,
            "field": "f_to",
            "description": "<p>New value of <code>f_to</code> for media_mail</p>"
          },
          {
            "group": "Body parameters",
            "type": "String",
            "optional": true,
            "field": "f_cc",
            "description": "<p>New value of <code>f_cc</code> for media_mail</p>"
          },
          {
            "group": "Body parameters",
            "type": "String",
            "optional": true,
            "field": "f_cci",
            "description": "<p>New value of <code>f_cci</code> for media_mail</p>"
          },
          {
            "group": "Body parameters",
            "type": "String",
            "optional": true,
            "field": "f_from",
            "description": "<p>New value of <code>f_from</code> for media_mail</p>"
          },
          {
            "group": "Body parameters",
            "type": "String",
            "optional": true,
            "field": "f_attachments",
            "description": "<p>New value of <code>f_attachments</code> for media_mail</p>"
          },
          {
            "group": "Body parameters",
            "type": "String",
            "optional": true,
            "field": "f_subject",
            "description": "<p>New value of <code>f_subject</code> for media_mail</p>"
          },
          {
            "group": "Body parameters",
            "type": "Text",
            "optional": true,
            "field": "f_content",
            "description": "<p>New value of <code>f_content</code> for media_mail</p>"
          },
          {
            "group": "Body parameters",
            "type": "Integer",
            "optional": true,
            "field": "fk_id_media_mail",
            "description": "<p><code>id</code> of entity media to associate</p>"
          }
        ],
        "Query parameters": [
          {
            "group": "Query parameters",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>API Bearer Token, required for authentication</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "media_mail",
            "description": "<p>Updated media_mail</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "media_mail.id",
            "description": "<p><code>id</code> of media_mail</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "media_mail.createdBy",
            "description": "<p><code>createdBy</code> of media_mail</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "media_mail.updatedBy",
            "description": "<p><code>updatedBy</code> of media_mail</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "media_mail.f_to",
            "description": "<p><code>f_to</code> of media_mail</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "media_mail.f_cc",
            "description": "<p><code>f_cc</code> of media_mail</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "media_mail.f_cci",
            "description": "<p><code>f_cci</code> of media_mail</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "media_mail.f_from",
            "description": "<p><code>f_from</code> of media_mail</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "media_mail.f_attachments",
            "description": "<p><code>f_attachments</code> of media_mail</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "media_mail.f_subject",
            "description": "<p><code>f_subject</code> of media_mail</p>"
          },
          {
            "group": "Success 200",
            "type": "Text",
            "optional": false,
            "field": "media_mail.f_content",
            "description": "<p><code>f_content</code> of media_mail</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 404": [
          {
            "group": "Error 404",
            "type": "Object",
            "optional": false,
            "field": "NotFound",
            "description": "<p>No media_mail with ID <code>id</code> found</p>"
          }
        ],
        "Error 500": [
          {
            "group": "Error 500",
            "type": "Object",
            "optional": false,
            "field": "ServerError",
            "description": "<p>An error occured when trying to update media_mail</p>"
          }
        ]
      }
    },
    "filename": "/usr/src/app/workspace/a_cockpit/api/doc/doc_descriptor.js",
    "groupTitle": "Media_Mail",
    "name": "PutApiMedia_mailIdTokenToken"
  },
  {
    "type": "delete",
    "url": "/api/media_notification/:id?token=TOKEN",
    "title": "5 - Delete",
    "version": "1.0.0",
    "description": "<p>Permanently delete a record of <code>media_notification</code> with <code>id</code></p>",
    "group": "Media_Notification",
    "parameter": {
      "fields": {
        "Params parameters": [
          {
            "group": "Params parameters",
            "type": "Integer",
            "optional": false,
            "field": "id",
            "description": "<p><code>id</code> of media_notification to delete</p>"
          }
        ],
        "Query parameters": [
          {
            "group": "Query parameters",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>API Bearer Token, required for authentication</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 404": [
          {
            "group": "Error 404",
            "type": "Object",
            "optional": false,
            "field": "NotFound",
            "description": "<p>No media_notification with ID <code>id</code> found</p>"
          }
        ]
      }
    },
    "filename": "/usr/src/app/workspace/a_cockpit/api/doc/doc_descriptor.js",
    "groupTitle": "Media_Notification",
    "name": "DeleteApiMedia_notificationIdTokenToken"
  },
  {
    "type": "get",
    "url": "/api/media_notification/:id/:association?token=TOKEN",
    "title": "2.a - Find association",
    "version": "1.0.0",
    "description": "<p>Fetch records of <code>media_notification</code>'s <code>association</code> from <code>offset</code> until <code>limit</code></p>",
    "group": "Media_Notification",
    "parameter": {
      "fields": {
        "Params parameters": [
          {
            "group": "Params parameters",
            "type": "Integer",
            "optional": false,
            "field": "id",
            "description": "<p><code>id</code> of the media_notification to which <code>association</code> is related</p>"
          },
          {
            "group": "Params parameters",
            "type": "String",
            "allowedValues": [
              "media"
            ],
            "optional": false,
            "field": "association",
            "description": "<p>Name of the related entity</p>"
          }
        ],
        "Query parameters": [
          {
            "group": "Query parameters",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>API Bearer Token, required for authentication</p>"
          },
          {
            "group": "Query parameters",
            "type": "Integer",
            "optional": true,
            "field": "limit",
            "defaultValue": "50",
            "description": "<p>The number of rows to be fetched</p>"
          },
          {
            "group": "Query parameters",
            "type": "Integer",
            "optional": true,
            "field": "offset",
            "defaultValue": "0",
            "description": "<p>The offset by which rows will be fetched</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "Object",
            "description": "<p>Object of <code>association</code></p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "limit",
            "description": "<p>Limit used to fetch data</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "offset",
            "description": "<p>Offset used to fetch data</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 404": [
          {
            "group": "Error 404",
            "type": "Object",
            "optional": false,
            "field": "NotFound",
            "description": "<p>No media_notification with ID <code>id</code> found</p>"
          },
          {
            "group": "Error 404",
            "type": "Object",
            "optional": false,
            "field": "AssociationNotFound",
            "description": "<p>No association with <code>association</code></p>"
          }
        ]
      }
    },
    "filename": "/usr/src/app/workspace/a_cockpit/api/doc/doc_descriptor.js",
    "groupTitle": "Media_Notification",
    "name": "GetApiMedia_notificationIdAssociationTokenToken"
  },
  {
    "type": "get",
    "url": "/api/media_notification/:id?token=TOKEN",
    "title": "2 - Find one",
    "version": "1.0.0",
    "description": "<p>Fetch one record of <code>media_notification</code> with <code>id</code></p>",
    "group": "Media_Notification",
    "parameter": {
      "fields": {
        "Query parameters": [
          {
            "group": "Query parameters",
            "type": "String",
            "allowedValues": [
              "r_media"
            ],
            "optional": true,
            "field": "include",
            "description": "<p>Include specified association(s) to each <code>media_notification</code> result.<br>Multiple values can be given separated by a comma <br><br>Ex: ?include=r_asso1,r_asso2</p>"
          },
          {
            "group": "Query parameters",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>API Bearer Token, required for authentication</p>"
          }
        ],
        "Params parameters": [
          {
            "group": "Params parameters",
            "type": "Integer",
            "optional": false,
            "field": "id",
            "description": "<p>The <code>id</code> of media_notification to fetch</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "media_notification",
            "description": "<p>Object of media_notification</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "media_notification.id",
            "description": "<p><code>id</code> of media_notification</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "media_notification.version",
            "description": "<p><code>version</code> of media_notification</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "media_notification.createdBy",
            "description": "<p><code>createdBy</code> of media_notification</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "media_notification.updatedBy",
            "description": "<p><code>updatedBy</code> of media_notification</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "media_notification.f_title",
            "description": "<p><code>f_title</code> of media_notification</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "media_notification.f_description",
            "description": "<p><code>f_description</code> of media_notification</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "media_notification.f_icon",
            "description": "<p><code>f_icon</code> of media_notification</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "media_notification.f_color",
            "description": "<p><code>f_color</code> of media_notification</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "media_notification.f_targets",
            "description": "<p><code>f_targets</code> of media_notification</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 404": [
          {
            "group": "Error 404",
            "type": "Object",
            "optional": false,
            "field": "NotFound",
            "description": "<p>No media_notification with ID <code>id</code> found</p>"
          }
        ]
      }
    },
    "filename": "/usr/src/app/workspace/a_cockpit/api/doc/doc_descriptor.js",
    "groupTitle": "Media_Notification",
    "name": "GetApiMedia_notificationIdTokenToken"
  },
  {
    "type": "get",
    "url": "/api/media_notification?token=TOKEN",
    "title": "1 - Find all",
    "version": "1.0.0",
    "description": "<p>Fetch records of <code>media_notification</code> from <code>offset</code> until <code>limit</code></p>",
    "group": "Media_Notification",
    "parameter": {
      "fields": {
        "Query parameters": [
          {
            "group": "Query parameters",
            "type": "String",
            "allowedValues": [
              "r_media"
            ],
            "optional": true,
            "field": "include",
            "description": "<p>Include specified association(s) to each <code>media_notification</code> result.<br>Multiple values can be given separated by a comma <br><br>Ex: ?include=r_asso1,r_asso2</p>"
          },
          {
            "group": "Query parameters",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>API Bearer Token, required for authentication</p>"
          },
          {
            "group": "Query parameters",
            "type": "Integer",
            "optional": true,
            "field": "limit",
            "defaultValue": "50",
            "description": "<p>The number of rows to be fetched</p>"
          },
          {
            "group": "Query parameters",
            "type": "Integer",
            "optional": true,
            "field": "offset",
            "defaultValue": "0",
            "description": "<p>The offset by which rows will be fetched</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "media_notifications",
            "description": "<p>List of media_notification</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "media_notifications.id",
            "description": "<p><code>id</code> of media_notification</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "media_notifications.version",
            "description": "<p><code>version</code> of media_notification</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "media_notifications.createdBy",
            "description": "<p><code>createdBy</code> of media_notification</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "media_notifications.updatedBy",
            "description": "<p><code>updatedBy</code> of media_notification</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "media_notifications.f_title",
            "description": "<p><code>f_title</code> of media_notification</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "media_notifications.f_description",
            "description": "<p><code>f_description</code> of media_notification</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "media_notifications.f_icon",
            "description": "<p><code>f_icon</code> of media_notification</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "media_notifications.f_color",
            "description": "<p><code>f_color</code> of media_notification</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "media_notifications.f_targets",
            "description": "<p><code>f_targets</code> of media_notification</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "limit",
            "description": "<p>Limit used to fetch data</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "offset",
            "description": "<p>Offset used to fetch data</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "totalCount",
            "description": "<p>The total count of records for media_notification</p>"
          }
        ]
      }
    },
    "filename": "/usr/src/app/workspace/a_cockpit/api/doc/doc_descriptor.js",
    "groupTitle": "Media_Notification",
    "name": "GetApiMedia_notificationTokenToken"
  },
  {
    "type": "post",
    "url": "/api/media_notification/?token=TOKEN",
    "title": "3 - Create",
    "version": "1.0.0",
    "description": "<p>Create a record of <code>media_notification</code> using values defined in request's <code>body</code></p>",
    "group": "Media_Notification",
    "parameter": {
      "fields": {
        "Body parameters": [
          {
            "group": "Body parameters",
            "type": "String",
            "optional": true,
            "field": "createdBy",
            "description": "<p><code>createdBy</code> of media_notification</p>"
          },
          {
            "group": "Body parameters",
            "type": "String",
            "optional": true,
            "field": "updatedBy",
            "description": "<p><code>updatedBy</code> of media_notification</p>"
          },
          {
            "group": "Body parameters",
            "type": "String",
            "optional": true,
            "field": "f_title",
            "description": "<p><code>f_title</code> of media_notification</p>"
          },
          {
            "group": "Body parameters",
            "type": "String",
            "optional": true,
            "field": "f_description",
            "description": "<p><code>f_description</code> of media_notification</p>"
          },
          {
            "group": "Body parameters",
            "type": "String",
            "optional": true,
            "field": "f_icon",
            "description": "<p><code>f_icon</code> of media_notification</p>"
          },
          {
            "group": "Body parameters",
            "type": "String",
            "optional": true,
            "field": "f_color",
            "description": "<p><code>f_color</code> of media_notification</p>"
          },
          {
            "group": "Body parameters",
            "type": "String",
            "optional": true,
            "field": "f_targets",
            "description": "<p><code>f_targets</code> of media_notification</p>"
          },
          {
            "group": "Body parameters",
            "type": "Integer",
            "optional": true,
            "field": "fk_id_media_notification",
            "description": "<p><code>id</code> of entity media to associate</p>"
          }
        ],
        "Query parameters": [
          {
            "group": "Query parameters",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>API Bearer Token, required for authentication</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "media_notification",
            "description": "<p>Created media_notification</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "media_notification.id",
            "description": "<p><code>id</code> of media_notification</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "media_notification.createdBy",
            "description": "<p><code>createdBy</code> of media_notification</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "media_notification.updatedBy",
            "description": "<p><code>updatedBy</code> of media_notification</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "media_notification.f_title",
            "description": "<p><code>f_title</code> of media_notification</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "media_notification.f_description",
            "description": "<p><code>f_description</code> of media_notification</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "media_notification.f_icon",
            "description": "<p><code>f_icon</code> of media_notification</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "media_notification.f_color",
            "description": "<p><code>f_color</code> of media_notification</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "media_notification.f_targets",
            "description": "<p><code>f_targets</code> of media_notification</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 500": [
          {
            "group": "Error 500",
            "type": "Object",
            "optional": false,
            "field": "ServerError",
            "description": "<p>An error occured when trying to create media_notification</p>"
          }
        ]
      }
    },
    "filename": "/usr/src/app/workspace/a_cockpit/api/doc/doc_descriptor.js",
    "groupTitle": "Media_Notification",
    "name": "PostApiMedia_notificationTokenToken"
  },
  {
    "type": "put",
    "url": "/api/media_notification/:id?token=TOKEN",
    "title": "4 - Update",
    "version": "1.0.0",
    "description": "<p>Update record of <code>media_notification</code> with <code>id</code> using values defined in request's <code>body</code></p>",
    "group": "Media_Notification",
    "parameter": {
      "fields": {
        "Params parameters": [
          {
            "group": "Params parameters",
            "type": "Integer",
            "optional": false,
            "field": "id",
            "description": "<p><code>id</code> of the media_notification to update</p>"
          }
        ],
        "Body parameters": [
          {
            "group": "Body parameters",
            "type": "String",
            "optional": true,
            "field": "createdBy",
            "description": "<p>New value of <code>createdBy</code> for media_notification</p>"
          },
          {
            "group": "Body parameters",
            "type": "String",
            "optional": true,
            "field": "updatedBy",
            "description": "<p>New value of <code>updatedBy</code> for media_notification</p>"
          },
          {
            "group": "Body parameters",
            "type": "String",
            "optional": true,
            "field": "f_title",
            "description": "<p>New value of <code>f_title</code> for media_notification</p>"
          },
          {
            "group": "Body parameters",
            "type": "String",
            "optional": true,
            "field": "f_description",
            "description": "<p>New value of <code>f_description</code> for media_notification</p>"
          },
          {
            "group": "Body parameters",
            "type": "String",
            "optional": true,
            "field": "f_icon",
            "description": "<p>New value of <code>f_icon</code> for media_notification</p>"
          },
          {
            "group": "Body parameters",
            "type": "String",
            "optional": true,
            "field": "f_color",
            "description": "<p>New value of <code>f_color</code> for media_notification</p>"
          },
          {
            "group": "Body parameters",
            "type": "String",
            "optional": true,
            "field": "f_targets",
            "description": "<p>New value of <code>f_targets</code> for media_notification</p>"
          },
          {
            "group": "Body parameters",
            "type": "Integer",
            "optional": true,
            "field": "fk_id_media_notification",
            "description": "<p><code>id</code> of entity media to associate</p>"
          }
        ],
        "Query parameters": [
          {
            "group": "Query parameters",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>API Bearer Token, required for authentication</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "media_notification",
            "description": "<p>Updated media_notification</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "media_notification.id",
            "description": "<p><code>id</code> of media_notification</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "media_notification.createdBy",
            "description": "<p><code>createdBy</code> of media_notification</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "media_notification.updatedBy",
            "description": "<p><code>updatedBy</code> of media_notification</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "media_notification.f_title",
            "description": "<p><code>f_title</code> of media_notification</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "media_notification.f_description",
            "description": "<p><code>f_description</code> of media_notification</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "media_notification.f_icon",
            "description": "<p><code>f_icon</code> of media_notification</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "media_notification.f_color",
            "description": "<p><code>f_color</code> of media_notification</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "media_notification.f_targets",
            "description": "<p><code>f_targets</code> of media_notification</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 404": [
          {
            "group": "Error 404",
            "type": "Object",
            "optional": false,
            "field": "NotFound",
            "description": "<p>No media_notification with ID <code>id</code> found</p>"
          }
        ],
        "Error 500": [
          {
            "group": "Error 500",
            "type": "Object",
            "optional": false,
            "field": "ServerError",
            "description": "<p>An error occured when trying to update media_notification</p>"
          }
        ]
      }
    },
    "filename": "/usr/src/app/workspace/a_cockpit/api/doc/doc_descriptor.js",
    "groupTitle": "Media_Notification",
    "name": "PutApiMedia_notificationIdTokenToken"
  },
  {
    "type": "delete",
    "url": "/api/media_sms/:id?token=TOKEN",
    "title": "5 - Delete",
    "version": "1.0.0",
    "description": "<p>Permanently delete a record of <code>media_sms</code> with <code>id</code></p>",
    "group": "Media_SMS",
    "parameter": {
      "fields": {
        "Params parameters": [
          {
            "group": "Params parameters",
            "type": "Integer",
            "optional": false,
            "field": "id",
            "description": "<p><code>id</code> of media_sms to delete</p>"
          }
        ],
        "Query parameters": [
          {
            "group": "Query parameters",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>API Bearer Token, required for authentication</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 404": [
          {
            "group": "Error 404",
            "type": "Object",
            "optional": false,
            "field": "NotFound",
            "description": "<p>No media_sms with ID <code>id</code> found</p>"
          }
        ]
      }
    },
    "filename": "/usr/src/app/workspace/a_cockpit/api/doc/doc_descriptor.js",
    "groupTitle": "Media_SMS",
    "name": "DeleteApiMedia_smsIdTokenToken"
  },
  {
    "type": "get",
    "url": "/api/media_sms/:id/:association?token=TOKEN",
    "title": "2.a - Find association",
    "version": "1.0.0",
    "description": "<p>Fetch records of <code>media_sms</code>'s <code>association</code> from <code>offset</code> until <code>limit</code></p>",
    "group": "Media_SMS",
    "parameter": {
      "fields": {
        "Params parameters": [
          {
            "group": "Params parameters",
            "type": "Integer",
            "optional": false,
            "field": "id",
            "description": "<p><code>id</code> of the media_sms to which <code>association</code> is related</p>"
          },
          {
            "group": "Params parameters",
            "type": "String",
            "allowedValues": [
              "media"
            ],
            "optional": false,
            "field": "association",
            "description": "<p>Name of the related entity</p>"
          }
        ],
        "Query parameters": [
          {
            "group": "Query parameters",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>API Bearer Token, required for authentication</p>"
          },
          {
            "group": "Query parameters",
            "type": "Integer",
            "optional": true,
            "field": "limit",
            "defaultValue": "50",
            "description": "<p>The number of rows to be fetched</p>"
          },
          {
            "group": "Query parameters",
            "type": "Integer",
            "optional": true,
            "field": "offset",
            "defaultValue": "0",
            "description": "<p>The offset by which rows will be fetched</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "Object",
            "description": "<p>Object of <code>association</code></p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "limit",
            "description": "<p>Limit used to fetch data</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "offset",
            "description": "<p>Offset used to fetch data</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 404": [
          {
            "group": "Error 404",
            "type": "Object",
            "optional": false,
            "field": "NotFound",
            "description": "<p>No media_sms with ID <code>id</code> found</p>"
          },
          {
            "group": "Error 404",
            "type": "Object",
            "optional": false,
            "field": "AssociationNotFound",
            "description": "<p>No association with <code>association</code></p>"
          }
        ]
      }
    },
    "filename": "/usr/src/app/workspace/a_cockpit/api/doc/doc_descriptor.js",
    "groupTitle": "Media_SMS",
    "name": "GetApiMedia_smsIdAssociationTokenToken"
  },
  {
    "type": "get",
    "url": "/api/media_sms/:id?token=TOKEN",
    "title": "2 - Find one",
    "version": "1.0.0",
    "description": "<p>Fetch one record of <code>media_sms</code> with <code>id</code></p>",
    "group": "Media_SMS",
    "parameter": {
      "fields": {
        "Query parameters": [
          {
            "group": "Query parameters",
            "type": "String",
            "allowedValues": [
              "r_media"
            ],
            "optional": true,
            "field": "include",
            "description": "<p>Include specified association(s) to each <code>media_sms</code> result.<br>Multiple values can be given separated by a comma <br><br>Ex: ?include=r_asso1,r_asso2</p>"
          },
          {
            "group": "Query parameters",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>API Bearer Token, required for authentication</p>"
          }
        ],
        "Params parameters": [
          {
            "group": "Params parameters",
            "type": "Integer",
            "optional": false,
            "field": "id",
            "description": "<p>The <code>id</code> of media_sms to fetch</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "media_sms",
            "description": "<p>Object of media_sms</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "media_sms.id",
            "description": "<p><code>id</code> of media_sms</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "media_sms.version",
            "description": "<p><code>version</code> of media_sms</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "media_sms.createdBy",
            "description": "<p><code>createdBy</code> of media_sms</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "media_sms.updatedBy",
            "description": "<p><code>updatedBy</code> of media_sms</p>"
          },
          {
            "group": "Success 200",
            "type": "Text",
            "optional": false,
            "field": "media_sms.f_message",
            "description": "<p><code>f_message</code> of media_sms</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "media_sms.f_phone_numbers",
            "description": "<p><code>f_phone_numbers</code> of media_sms</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 404": [
          {
            "group": "Error 404",
            "type": "Object",
            "optional": false,
            "field": "NotFound",
            "description": "<p>No media_sms with ID <code>id</code> found</p>"
          }
        ]
      }
    },
    "filename": "/usr/src/app/workspace/a_cockpit/api/doc/doc_descriptor.js",
    "groupTitle": "Media_SMS",
    "name": "GetApiMedia_smsIdTokenToken"
  },
  {
    "type": "get",
    "url": "/api/media_sms?token=TOKEN",
    "title": "1 - Find all",
    "version": "1.0.0",
    "description": "<p>Fetch records of <code>media_sms</code> from <code>offset</code> until <code>limit</code></p>",
    "group": "Media_SMS",
    "parameter": {
      "fields": {
        "Query parameters": [
          {
            "group": "Query parameters",
            "type": "String",
            "allowedValues": [
              "r_media"
            ],
            "optional": true,
            "field": "include",
            "description": "<p>Include specified association(s) to each <code>media_sms</code> result.<br>Multiple values can be given separated by a comma <br><br>Ex: ?include=r_asso1,r_asso2</p>"
          },
          {
            "group": "Query parameters",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>API Bearer Token, required for authentication</p>"
          },
          {
            "group": "Query parameters",
            "type": "Integer",
            "optional": true,
            "field": "limit",
            "defaultValue": "50",
            "description": "<p>The number of rows to be fetched</p>"
          },
          {
            "group": "Query parameters",
            "type": "Integer",
            "optional": true,
            "field": "offset",
            "defaultValue": "0",
            "description": "<p>The offset by which rows will be fetched</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "media_smss",
            "description": "<p>List of media_sms</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "media_smss.id",
            "description": "<p><code>id</code> of media_sms</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "media_smss.version",
            "description": "<p><code>version</code> of media_sms</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "media_smss.createdBy",
            "description": "<p><code>createdBy</code> of media_sms</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "media_smss.updatedBy",
            "description": "<p><code>updatedBy</code> of media_sms</p>"
          },
          {
            "group": "Success 200",
            "type": "Text",
            "optional": false,
            "field": "media_smss.f_message",
            "description": "<p><code>f_message</code> of media_sms</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "media_smss.f_phone_numbers",
            "description": "<p><code>f_phone_numbers</code> of media_sms</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "limit",
            "description": "<p>Limit used to fetch data</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "offset",
            "description": "<p>Offset used to fetch data</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "totalCount",
            "description": "<p>The total count of records for media_sms</p>"
          }
        ]
      }
    },
    "filename": "/usr/src/app/workspace/a_cockpit/api/doc/doc_descriptor.js",
    "groupTitle": "Media_SMS",
    "name": "GetApiMedia_smsTokenToken"
  },
  {
    "type": "post",
    "url": "/api/media_sms/?token=TOKEN",
    "title": "3 - Create",
    "version": "1.0.0",
    "description": "<p>Create a record of <code>media_sms</code> using values defined in request's <code>body</code></p>",
    "group": "Media_SMS",
    "parameter": {
      "fields": {
        "Body parameters": [
          {
            "group": "Body parameters",
            "type": "String",
            "optional": true,
            "field": "createdBy",
            "description": "<p><code>createdBy</code> of media_sms</p>"
          },
          {
            "group": "Body parameters",
            "type": "String",
            "optional": true,
            "field": "updatedBy",
            "description": "<p><code>updatedBy</code> of media_sms</p>"
          },
          {
            "group": "Body parameters",
            "type": "Text",
            "optional": true,
            "field": "f_message",
            "description": "<p><code>f_message</code> of media_sms</p>"
          },
          {
            "group": "Body parameters",
            "type": "String",
            "optional": true,
            "field": "f_phone_numbers",
            "description": "<p><code>f_phone_numbers</code> of media_sms</p>"
          },
          {
            "group": "Body parameters",
            "type": "Integer",
            "optional": true,
            "field": "fk_id_media_sms",
            "description": "<p><code>id</code> of entity media to associate</p>"
          }
        ],
        "Query parameters": [
          {
            "group": "Query parameters",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>API Bearer Token, required for authentication</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "media_sms",
            "description": "<p>Created media_sms</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "media_sms.id",
            "description": "<p><code>id</code> of media_sms</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "media_sms.createdBy",
            "description": "<p><code>createdBy</code> of media_sms</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "media_sms.updatedBy",
            "description": "<p><code>updatedBy</code> of media_sms</p>"
          },
          {
            "group": "Success 200",
            "type": "Text",
            "optional": false,
            "field": "media_sms.f_message",
            "description": "<p><code>f_message</code> of media_sms</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "media_sms.f_phone_numbers",
            "description": "<p><code>f_phone_numbers</code> of media_sms</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 500": [
          {
            "group": "Error 500",
            "type": "Object",
            "optional": false,
            "field": "ServerError",
            "description": "<p>An error occured when trying to create media_sms</p>"
          }
        ]
      }
    },
    "filename": "/usr/src/app/workspace/a_cockpit/api/doc/doc_descriptor.js",
    "groupTitle": "Media_SMS",
    "name": "PostApiMedia_smsTokenToken"
  },
  {
    "type": "put",
    "url": "/api/media_sms/:id?token=TOKEN",
    "title": "4 - Update",
    "version": "1.0.0",
    "description": "<p>Update record of <code>media_sms</code> with <code>id</code> using values defined in request's <code>body</code></p>",
    "group": "Media_SMS",
    "parameter": {
      "fields": {
        "Params parameters": [
          {
            "group": "Params parameters",
            "type": "Integer",
            "optional": false,
            "field": "id",
            "description": "<p><code>id</code> of the media_sms to update</p>"
          }
        ],
        "Body parameters": [
          {
            "group": "Body parameters",
            "type": "String",
            "optional": true,
            "field": "createdBy",
            "description": "<p>New value of <code>createdBy</code> for media_sms</p>"
          },
          {
            "group": "Body parameters",
            "type": "String",
            "optional": true,
            "field": "updatedBy",
            "description": "<p>New value of <code>updatedBy</code> for media_sms</p>"
          },
          {
            "group": "Body parameters",
            "type": "Text",
            "optional": true,
            "field": "f_message",
            "description": "<p>New value of <code>f_message</code> for media_sms</p>"
          },
          {
            "group": "Body parameters",
            "type": "String",
            "optional": true,
            "field": "f_phone_numbers",
            "description": "<p>New value of <code>f_phone_numbers</code> for media_sms</p>"
          },
          {
            "group": "Body parameters",
            "type": "Integer",
            "optional": true,
            "field": "fk_id_media_sms",
            "description": "<p><code>id</code> of entity media to associate</p>"
          }
        ],
        "Query parameters": [
          {
            "group": "Query parameters",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>API Bearer Token, required for authentication</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "media_sms",
            "description": "<p>Updated media_sms</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "media_sms.id",
            "description": "<p><code>id</code> of media_sms</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "media_sms.createdBy",
            "description": "<p><code>createdBy</code> of media_sms</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "media_sms.updatedBy",
            "description": "<p><code>updatedBy</code> of media_sms</p>"
          },
          {
            "group": "Success 200",
            "type": "Text",
            "optional": false,
            "field": "media_sms.f_message",
            "description": "<p><code>f_message</code> of media_sms</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "media_sms.f_phone_numbers",
            "description": "<p><code>f_phone_numbers</code> of media_sms</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 404": [
          {
            "group": "Error 404",
            "type": "Object",
            "optional": false,
            "field": "NotFound",
            "description": "<p>No media_sms with ID <code>id</code> found</p>"
          }
        ],
        "Error 500": [
          {
            "group": "Error 500",
            "type": "Object",
            "optional": false,
            "field": "ServerError",
            "description": "<p>An error occured when trying to update media_sms</p>"
          }
        ]
      }
    },
    "filename": "/usr/src/app/workspace/a_cockpit/api/doc/doc_descriptor.js",
    "groupTitle": "Media_SMS",
    "name": "PutApiMedia_smsIdTokenToken"
  },
  {
    "type": "delete",
    "url": "/api/media_task/:id?token=TOKEN",
    "title": "5 - Delete",
    "version": "1.0.0",
    "description": "<p>Permanently delete a record of <code>media_task</code> with <code>id</code></p>",
    "group": "Media_Task",
    "parameter": {
      "fields": {
        "Params parameters": [
          {
            "group": "Params parameters",
            "type": "Integer",
            "optional": false,
            "field": "id",
            "description": "<p><code>id</code> of media_task to delete</p>"
          }
        ],
        "Query parameters": [
          {
            "group": "Query parameters",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>API Bearer Token, required for authentication</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 404": [
          {
            "group": "Error 404",
            "type": "Object",
            "optional": false,
            "field": "NotFound",
            "description": "<p>No media_task with ID <code>id</code> found</p>"
          }
        ]
      }
    },
    "filename": "/usr/src/app/workspace/a_cockpit/api/doc/doc_descriptor.js",
    "groupTitle": "Media_Task",
    "name": "DeleteApiMedia_taskIdTokenToken"
  },
  {
    "type": "get",
    "url": "/api/media_task/:id/:association?token=TOKEN",
    "title": "2.a - Find association",
    "version": "1.0.0",
    "description": "<p>Fetch records of <code>media_task</code>'s <code>association</code> from <code>offset</code> until <code>limit</code></p>",
    "group": "Media_Task",
    "parameter": {
      "fields": {
        "Params parameters": [
          {
            "group": "Params parameters",
            "type": "Integer",
            "optional": false,
            "field": "id",
            "description": "<p><code>id</code> of the media_task to which <code>association</code> is related</p>"
          },
          {
            "group": "Params parameters",
            "type": "String",
            "allowedValues": [
              "media"
            ],
            "optional": false,
            "field": "association",
            "description": "<p>Name of the related entity</p>"
          }
        ],
        "Query parameters": [
          {
            "group": "Query parameters",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>API Bearer Token, required for authentication</p>"
          },
          {
            "group": "Query parameters",
            "type": "Integer",
            "optional": true,
            "field": "limit",
            "defaultValue": "50",
            "description": "<p>The number of rows to be fetched</p>"
          },
          {
            "group": "Query parameters",
            "type": "Integer",
            "optional": true,
            "field": "offset",
            "defaultValue": "0",
            "description": "<p>The offset by which rows will be fetched</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "Object",
            "description": "<p>Object of <code>association</code></p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "limit",
            "description": "<p>Limit used to fetch data</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "offset",
            "description": "<p>Offset used to fetch data</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 404": [
          {
            "group": "Error 404",
            "type": "Object",
            "optional": false,
            "field": "NotFound",
            "description": "<p>No media_task with ID <code>id</code> found</p>"
          },
          {
            "group": "Error 404",
            "type": "Object",
            "optional": false,
            "field": "AssociationNotFound",
            "description": "<p>No association with <code>association</code></p>"
          }
        ]
      }
    },
    "filename": "/usr/src/app/workspace/a_cockpit/api/doc/doc_descriptor.js",
    "groupTitle": "Media_Task",
    "name": "GetApiMedia_taskIdAssociationTokenToken"
  },
  {
    "type": "get",
    "url": "/api/media_task/:id?token=TOKEN",
    "title": "2 - Find one",
    "version": "1.0.0",
    "description": "<p>Fetch one record of <code>media_task</code> with <code>id</code></p>",
    "group": "Media_Task",
    "parameter": {
      "fields": {
        "Query parameters": [
          {
            "group": "Query parameters",
            "type": "String",
            "allowedValues": [
              "r_media"
            ],
            "optional": true,
            "field": "include",
            "description": "<p>Include specified association(s) to each <code>media_task</code> result.<br>Multiple values can be given separated by a comma <br><br>Ex: ?include=r_asso1,r_asso2</p>"
          },
          {
            "group": "Query parameters",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>API Bearer Token, required for authentication</p>"
          }
        ],
        "Params parameters": [
          {
            "group": "Params parameters",
            "type": "Integer",
            "optional": false,
            "field": "id",
            "description": "<p>The <code>id</code> of media_task to fetch</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "media_task",
            "description": "<p>Object of media_task</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "media_task.id",
            "description": "<p><code>id</code> of media_task</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "media_task.version",
            "description": "<p><code>version</code> of media_task</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "media_task.createdBy",
            "description": "<p><code>createdBy</code> of media_task</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "media_task.updatedBy",
            "description": "<p><code>updatedBy</code> of media_task</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "media_task.f_task_name",
            "description": "<p><code>f_task_name</code> of media_task</p>"
          },
          {
            "group": "Success 200",
            "type": "Enum",
            "optional": false,
            "field": "media_task.f_task_type",
            "description": "<p><code>f_task_type</code> of media_task</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "media_task.f_assignment_logic",
            "description": "<p><code>f_assignment_logic</code> of media_task</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "media_task.f_program_file",
            "description": "<p><code>f_program_file</code> of media_task</p>"
          },
          {
            "group": "Success 200",
            "type": "Text",
            "optional": false,
            "field": "media_task.f_data_flow",
            "description": "<p><code>f_data_flow</code> of media_task</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 404": [
          {
            "group": "Error 404",
            "type": "Object",
            "optional": false,
            "field": "NotFound",
            "description": "<p>No media_task with ID <code>id</code> found</p>"
          }
        ]
      }
    },
    "filename": "/usr/src/app/workspace/a_cockpit/api/doc/doc_descriptor.js",
    "groupTitle": "Media_Task",
    "name": "GetApiMedia_taskIdTokenToken"
  },
  {
    "type": "get",
    "url": "/api/media_task?token=TOKEN",
    "title": "1 - Find all",
    "version": "1.0.0",
    "description": "<p>Fetch records of <code>media_task</code> from <code>offset</code> until <code>limit</code></p>",
    "group": "Media_Task",
    "parameter": {
      "fields": {
        "Query parameters": [
          {
            "group": "Query parameters",
            "type": "String",
            "allowedValues": [
              "r_media"
            ],
            "optional": true,
            "field": "include",
            "description": "<p>Include specified association(s) to each <code>media_task</code> result.<br>Multiple values can be given separated by a comma <br><br>Ex: ?include=r_asso1,r_asso2</p>"
          },
          {
            "group": "Query parameters",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>API Bearer Token, required for authentication</p>"
          },
          {
            "group": "Query parameters",
            "type": "Integer",
            "optional": true,
            "field": "limit",
            "defaultValue": "50",
            "description": "<p>The number of rows to be fetched</p>"
          },
          {
            "group": "Query parameters",
            "type": "Integer",
            "optional": true,
            "field": "offset",
            "defaultValue": "0",
            "description": "<p>The offset by which rows will be fetched</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "media_tasks",
            "description": "<p>List of media_task</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "media_tasks.id",
            "description": "<p><code>id</code> of media_task</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "media_tasks.version",
            "description": "<p><code>version</code> of media_task</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "media_tasks.createdBy",
            "description": "<p><code>createdBy</code> of media_task</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "media_tasks.updatedBy",
            "description": "<p><code>updatedBy</code> of media_task</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "media_tasks.f_task_name",
            "description": "<p><code>f_task_name</code> of media_task</p>"
          },
          {
            "group": "Success 200",
            "type": "Enum",
            "optional": false,
            "field": "media_tasks.f_task_type",
            "description": "<p><code>f_task_type</code> of media_task</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "media_tasks.f_assignment_logic",
            "description": "<p><code>f_assignment_logic</code> of media_task</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "media_tasks.f_program_file",
            "description": "<p><code>f_program_file</code> of media_task</p>"
          },
          {
            "group": "Success 200",
            "type": "Text",
            "optional": false,
            "field": "media_tasks.f_data_flow",
            "description": "<p><code>f_data_flow</code> of media_task</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "limit",
            "description": "<p>Limit used to fetch data</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "offset",
            "description": "<p>Offset used to fetch data</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "totalCount",
            "description": "<p>The total count of records for media_task</p>"
          }
        ]
      }
    },
    "filename": "/usr/src/app/workspace/a_cockpit/api/doc/doc_descriptor.js",
    "groupTitle": "Media_Task",
    "name": "GetApiMedia_taskTokenToken"
  },
  {
    "type": "post",
    "url": "/api/media_task/?token=TOKEN",
    "title": "3 - Create",
    "version": "1.0.0",
    "description": "<p>Create a record of <code>media_task</code> using values defined in request's <code>body</code></p>",
    "group": "Media_Task",
    "parameter": {
      "fields": {
        "Body parameters": [
          {
            "group": "Body parameters",
            "type": "String",
            "optional": true,
            "field": "createdBy",
            "description": "<p><code>createdBy</code> of media_task</p>"
          },
          {
            "group": "Body parameters",
            "type": "String",
            "optional": true,
            "field": "updatedBy",
            "description": "<p><code>updatedBy</code> of media_task</p>"
          },
          {
            "group": "Body parameters",
            "type": "String",
            "optional": true,
            "field": "f_task_name",
            "description": "<p><code>f_task_name</code> of media_task</p>"
          },
          {
            "group": "Body parameters",
            "type": "Enum",
            "optional": true,
            "field": "f_task_type",
            "description": "<p><code>f_task_type</code> of media_task</p>"
          },
          {
            "group": "Body parameters",
            "type": "String",
            "optional": true,
            "field": "f_assignment_logic",
            "description": "<p><code>f_assignment_logic</code> of media_task</p>"
          },
          {
            "group": "Body parameters",
            "type": "String",
            "optional": true,
            "field": "f_program_file",
            "description": "<p><code>f_program_file</code> of media_task</p>"
          },
          {
            "group": "Body parameters",
            "type": "Text",
            "optional": true,
            "field": "f_data_flow",
            "description": "<p><code>f_data_flow</code> of media_task</p>"
          },
          {
            "group": "Body parameters",
            "type": "Integer",
            "optional": true,
            "field": "fk_id_media_task",
            "description": "<p><code>id</code> of entity media to associate</p>"
          }
        ],
        "Query parameters": [
          {
            "group": "Query parameters",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>API Bearer Token, required for authentication</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "media_task",
            "description": "<p>Created media_task</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "media_task.id",
            "description": "<p><code>id</code> of media_task</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "media_task.createdBy",
            "description": "<p><code>createdBy</code> of media_task</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "media_task.updatedBy",
            "description": "<p><code>updatedBy</code> of media_task</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "media_task.f_task_name",
            "description": "<p><code>f_task_name</code> of media_task</p>"
          },
          {
            "group": "Success 200",
            "type": "Enum",
            "optional": false,
            "field": "media_task.f_task_type",
            "description": "<p><code>f_task_type</code> of media_task</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "media_task.f_assignment_logic",
            "description": "<p><code>f_assignment_logic</code> of media_task</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "media_task.f_program_file",
            "description": "<p><code>f_program_file</code> of media_task</p>"
          },
          {
            "group": "Success 200",
            "type": "Text",
            "optional": false,
            "field": "media_task.f_data_flow",
            "description": "<p><code>f_data_flow</code> of media_task</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 500": [
          {
            "group": "Error 500",
            "type": "Object",
            "optional": false,
            "field": "ServerError",
            "description": "<p>An error occured when trying to create media_task</p>"
          }
        ]
      }
    },
    "filename": "/usr/src/app/workspace/a_cockpit/api/doc/doc_descriptor.js",
    "groupTitle": "Media_Task",
    "name": "PostApiMedia_taskTokenToken"
  },
  {
    "type": "put",
    "url": "/api/media_task/:id?token=TOKEN",
    "title": "4 - Update",
    "version": "1.0.0",
    "description": "<p>Update record of <code>media_task</code> with <code>id</code> using values defined in request's <code>body</code></p>",
    "group": "Media_Task",
    "parameter": {
      "fields": {
        "Params parameters": [
          {
            "group": "Params parameters",
            "type": "Integer",
            "optional": false,
            "field": "id",
            "description": "<p><code>id</code> of the media_task to update</p>"
          }
        ],
        "Body parameters": [
          {
            "group": "Body parameters",
            "type": "String",
            "optional": true,
            "field": "createdBy",
            "description": "<p>New value of <code>createdBy</code> for media_task</p>"
          },
          {
            "group": "Body parameters",
            "type": "String",
            "optional": true,
            "field": "updatedBy",
            "description": "<p>New value of <code>updatedBy</code> for media_task</p>"
          },
          {
            "group": "Body parameters",
            "type": "String",
            "optional": true,
            "field": "f_task_name",
            "description": "<p>New value of <code>f_task_name</code> for media_task</p>"
          },
          {
            "group": "Body parameters",
            "type": "Enum",
            "optional": true,
            "field": "f_task_type",
            "description": "<p>New value of <code>f_task_type</code> for media_task</p>"
          },
          {
            "group": "Body parameters",
            "type": "String",
            "optional": true,
            "field": "f_assignment_logic",
            "description": "<p>New value of <code>f_assignment_logic</code> for media_task</p>"
          },
          {
            "group": "Body parameters",
            "type": "String",
            "optional": true,
            "field": "f_program_file",
            "description": "<p>New value of <code>f_program_file</code> for media_task</p>"
          },
          {
            "group": "Body parameters",
            "type": "Text",
            "optional": true,
            "field": "f_data_flow",
            "description": "<p>New value of <code>f_data_flow</code> for media_task</p>"
          },
          {
            "group": "Body parameters",
            "type": "Integer",
            "optional": true,
            "field": "fk_id_media_task",
            "description": "<p><code>id</code> of entity media to associate</p>"
          }
        ],
        "Query parameters": [
          {
            "group": "Query parameters",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>API Bearer Token, required for authentication</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "media_task",
            "description": "<p>Updated media_task</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "media_task.id",
            "description": "<p><code>id</code> of media_task</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "media_task.createdBy",
            "description": "<p><code>createdBy</code> of media_task</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "media_task.updatedBy",
            "description": "<p><code>updatedBy</code> of media_task</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "media_task.f_task_name",
            "description": "<p><code>f_task_name</code> of media_task</p>"
          },
          {
            "group": "Success 200",
            "type": "Enum",
            "optional": false,
            "field": "media_task.f_task_type",
            "description": "<p><code>f_task_type</code> of media_task</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "media_task.f_assignment_logic",
            "description": "<p><code>f_assignment_logic</code> of media_task</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "media_task.f_program_file",
            "description": "<p><code>f_program_file</code> of media_task</p>"
          },
          {
            "group": "Success 200",
            "type": "Text",
            "optional": false,
            "field": "media_task.f_data_flow",
            "description": "<p><code>f_data_flow</code> of media_task</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 404": [
          {
            "group": "Error 404",
            "type": "Object",
            "optional": false,
            "field": "NotFound",
            "description": "<p>No media_task with ID <code>id</code> found</p>"
          }
        ],
        "Error 500": [
          {
            "group": "Error 500",
            "type": "Object",
            "optional": false,
            "field": "ServerError",
            "description": "<p>An error occured when trying to update media_task</p>"
          }
        ]
      }
    },
    "filename": "/usr/src/app/workspace/a_cockpit/api/doc/doc_descriptor.js",
    "groupTitle": "Media_Task",
    "name": "PutApiMedia_taskIdTokenToken"
  },
  {
    "type": "delete",
    "url": "/api/notification/:id?token=TOKEN",
    "title": "5 - Delete",
    "version": "1.0.0",
    "description": "<p>Permanently delete a record of <code>notification</code> with <code>id</code></p>",
    "group": "Notification",
    "parameter": {
      "fields": {
        "Params parameters": [
          {
            "group": "Params parameters",
            "type": "Integer",
            "optional": false,
            "field": "id",
            "description": "<p><code>id</code> of notification to delete</p>"
          }
        ],
        "Query parameters": [
          {
            "group": "Query parameters",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>API Bearer Token, required for authentication</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 404": [
          {
            "group": "Error 404",
            "type": "Object",
            "optional": false,
            "field": "NotFound",
            "description": "<p>No notification with ID <code>id</code> found</p>"
          }
        ]
      }
    },
    "filename": "/usr/src/app/workspace/a_cockpit/api/doc/doc_descriptor.js",
    "groupTitle": "Notification",
    "name": "DeleteApiNotificationIdTokenToken"
  },
  {
    "type": "get",
    "url": "/api/notification/:id/:association?token=TOKEN",
    "title": "2.a - Find association",
    "version": "1.0.0",
    "description": "<p>Fetch records of <code>notification</code>'s <code>association</code> from <code>offset</code> until <code>limit</code></p>",
    "group": "Notification",
    "parameter": {
      "fields": {
        "Params parameters": [
          {
            "group": "Params parameters",
            "type": "Integer",
            "optional": false,
            "field": "id",
            "description": "<p><code>id</code> of the notification to which <code>association</code> is related</p>"
          },
          {
            "group": "Params parameters",
            "type": "String",
            "allowedValues": [
              "user"
            ],
            "optional": false,
            "field": "association",
            "description": "<p>Name of the related entity</p>"
          }
        ],
        "Query parameters": [
          {
            "group": "Query parameters",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>API Bearer Token, required for authentication</p>"
          },
          {
            "group": "Query parameters",
            "type": "Integer",
            "optional": true,
            "field": "limit",
            "defaultValue": "50",
            "description": "<p>The number of rows to be fetched</p>"
          },
          {
            "group": "Query parameters",
            "type": "Integer",
            "optional": true,
            "field": "offset",
            "defaultValue": "0",
            "description": "<p>The offset by which rows will be fetched</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "Object",
            "description": "<p>Object of <code>association</code></p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "limit",
            "description": "<p>Limit used to fetch data</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "offset",
            "description": "<p>Offset used to fetch data</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 404": [
          {
            "group": "Error 404",
            "type": "Object",
            "optional": false,
            "field": "NotFound",
            "description": "<p>No notification with ID <code>id</code> found</p>"
          },
          {
            "group": "Error 404",
            "type": "Object",
            "optional": false,
            "field": "AssociationNotFound",
            "description": "<p>No association with <code>association</code></p>"
          }
        ]
      }
    },
    "filename": "/usr/src/app/workspace/a_cockpit/api/doc/doc_descriptor.js",
    "groupTitle": "Notification",
    "name": "GetApiNotificationIdAssociationTokenToken"
  },
  {
    "type": "get",
    "url": "/api/notification/:id?token=TOKEN",
    "title": "2 - Find one",
    "version": "1.0.0",
    "description": "<p>Fetch one record of <code>notification</code> with <code>id</code></p>",
    "group": "Notification",
    "parameter": {
      "fields": {
        "Query parameters": [
          {
            "group": "Query parameters",
            "type": "String",
            "allowedValues": [
              "r_user"
            ],
            "optional": true,
            "field": "include",
            "description": "<p>Include specified association(s) to each <code>notification</code> result.<br>Multiple values can be given separated by a comma <br><br>Ex: ?include=r_asso1,r_asso2</p>"
          },
          {
            "group": "Query parameters",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>API Bearer Token, required for authentication</p>"
          }
        ],
        "Params parameters": [
          {
            "group": "Params parameters",
            "type": "Integer",
            "optional": false,
            "field": "id",
            "description": "<p>The <code>id</code> of notification to fetch</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "notification",
            "description": "<p>Object of notification</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "notification.id",
            "description": "<p><code>id</code> of notification</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "notification.version",
            "description": "<p><code>version</code> of notification</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "notification.createdBy",
            "description": "<p><code>createdBy</code> of notification</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "notification.updatedBy",
            "description": "<p><code>updatedBy</code> of notification</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "notification.f_title",
            "description": "<p><code>f_title</code> of notification</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "notification.f_description",
            "description": "<p><code>f_description</code> of notification</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "notification.f_url",
            "description": "<p><code>f_url</code> of notification</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "notification.f_color",
            "description": "<p><code>f_color</code> of notification</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "notification.f_icon",
            "description": "<p><code>f_icon</code> of notification</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 404": [
          {
            "group": "Error 404",
            "type": "Object",
            "optional": false,
            "field": "NotFound",
            "description": "<p>No notification with ID <code>id</code> found</p>"
          }
        ]
      }
    },
    "filename": "/usr/src/app/workspace/a_cockpit/api/doc/doc_descriptor.js",
    "groupTitle": "Notification",
    "name": "GetApiNotificationIdTokenToken"
  },
  {
    "type": "get",
    "url": "/api/notification?token=TOKEN",
    "title": "1 - Find all",
    "version": "1.0.0",
    "description": "<p>Fetch records of <code>notification</code> from <code>offset</code> until <code>limit</code></p>",
    "group": "Notification",
    "parameter": {
      "fields": {
        "Query parameters": [
          {
            "group": "Query parameters",
            "type": "String",
            "allowedValues": [
              "r_user"
            ],
            "optional": true,
            "field": "include",
            "description": "<p>Include specified association(s) to each <code>notification</code> result.<br>Multiple values can be given separated by a comma <br><br>Ex: ?include=r_asso1,r_asso2</p>"
          },
          {
            "group": "Query parameters",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>API Bearer Token, required for authentication</p>"
          },
          {
            "group": "Query parameters",
            "type": "Integer",
            "optional": true,
            "field": "limit",
            "defaultValue": "50",
            "description": "<p>The number of rows to be fetched</p>"
          },
          {
            "group": "Query parameters",
            "type": "Integer",
            "optional": true,
            "field": "offset",
            "defaultValue": "0",
            "description": "<p>The offset by which rows will be fetched</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "notifications",
            "description": "<p>List of notification</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "notifications.id",
            "description": "<p><code>id</code> of notification</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "notifications.version",
            "description": "<p><code>version</code> of notification</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "notifications.createdBy",
            "description": "<p><code>createdBy</code> of notification</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "notifications.updatedBy",
            "description": "<p><code>updatedBy</code> of notification</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "notifications.f_title",
            "description": "<p><code>f_title</code> of notification</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "notifications.f_description",
            "description": "<p><code>f_description</code> of notification</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "notifications.f_url",
            "description": "<p><code>f_url</code> of notification</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "notifications.f_color",
            "description": "<p><code>f_color</code> of notification</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "notifications.f_icon",
            "description": "<p><code>f_icon</code> of notification</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "limit",
            "description": "<p>Limit used to fetch data</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "offset",
            "description": "<p>Offset used to fetch data</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "totalCount",
            "description": "<p>The total count of records for notification</p>"
          }
        ]
      }
    },
    "filename": "/usr/src/app/workspace/a_cockpit/api/doc/doc_descriptor.js",
    "groupTitle": "Notification",
    "name": "GetApiNotificationTokenToken"
  },
  {
    "type": "post",
    "url": "/api/notification/?token=TOKEN",
    "title": "3 - Create",
    "version": "1.0.0",
    "description": "<p>Create a record of <code>notification</code> using values defined in request's <code>body</code></p>",
    "group": "Notification",
    "parameter": {
      "fields": {
        "Body parameters": [
          {
            "group": "Body parameters",
            "type": "String",
            "optional": true,
            "field": "createdBy",
            "description": "<p><code>createdBy</code> of notification</p>"
          },
          {
            "group": "Body parameters",
            "type": "String",
            "optional": true,
            "field": "updatedBy",
            "description": "<p><code>updatedBy</code> of notification</p>"
          },
          {
            "group": "Body parameters",
            "type": "String",
            "optional": true,
            "field": "f_title",
            "description": "<p><code>f_title</code> of notification</p>"
          },
          {
            "group": "Body parameters",
            "type": "String",
            "optional": true,
            "field": "f_description",
            "description": "<p><code>f_description</code> of notification</p>"
          },
          {
            "group": "Body parameters",
            "type": "String",
            "optional": true,
            "field": "f_url",
            "description": "<p><code>f_url</code> of notification</p>"
          },
          {
            "group": "Body parameters",
            "type": "String",
            "optional": true,
            "field": "f_color",
            "description": "<p><code>f_color</code> of notification</p>"
          },
          {
            "group": "Body parameters",
            "type": "String",
            "optional": true,
            "field": "f_icon",
            "description": "<p><code>f_icon</code> of notification</p>"
          }
        ],
        "Query parameters": [
          {
            "group": "Query parameters",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>API Bearer Token, required for authentication</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "notification",
            "description": "<p>Created notification</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "notification.id",
            "description": "<p><code>id</code> of notification</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "notification.createdBy",
            "description": "<p><code>createdBy</code> of notification</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "notification.updatedBy",
            "description": "<p><code>updatedBy</code> of notification</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "notification.f_title",
            "description": "<p><code>f_title</code> of notification</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "notification.f_description",
            "description": "<p><code>f_description</code> of notification</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "notification.f_url",
            "description": "<p><code>f_url</code> of notification</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "notification.f_color",
            "description": "<p><code>f_color</code> of notification</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "notification.f_icon",
            "description": "<p><code>f_icon</code> of notification</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 500": [
          {
            "group": "Error 500",
            "type": "Object",
            "optional": false,
            "field": "ServerError",
            "description": "<p>An error occured when trying to create notification</p>"
          }
        ]
      }
    },
    "filename": "/usr/src/app/workspace/a_cockpit/api/doc/doc_descriptor.js",
    "groupTitle": "Notification",
    "name": "PostApiNotificationTokenToken"
  },
  {
    "type": "put",
    "url": "/api/notification/:id?token=TOKEN",
    "title": "4 - Update",
    "version": "1.0.0",
    "description": "<p>Update record of <code>notification</code> with <code>id</code> using values defined in request's <code>body</code></p>",
    "group": "Notification",
    "parameter": {
      "fields": {
        "Params parameters": [
          {
            "group": "Params parameters",
            "type": "Integer",
            "optional": false,
            "field": "id",
            "description": "<p><code>id</code> of the notification to update</p>"
          }
        ],
        "Body parameters": [
          {
            "group": "Body parameters",
            "type": "String",
            "optional": true,
            "field": "createdBy",
            "description": "<p>New value of <code>createdBy</code> for notification</p>"
          },
          {
            "group": "Body parameters",
            "type": "String",
            "optional": true,
            "field": "updatedBy",
            "description": "<p>New value of <code>updatedBy</code> for notification</p>"
          },
          {
            "group": "Body parameters",
            "type": "String",
            "optional": true,
            "field": "f_title",
            "description": "<p>New value of <code>f_title</code> for notification</p>"
          },
          {
            "group": "Body parameters",
            "type": "String",
            "optional": true,
            "field": "f_description",
            "description": "<p>New value of <code>f_description</code> for notification</p>"
          },
          {
            "group": "Body parameters",
            "type": "String",
            "optional": true,
            "field": "f_url",
            "description": "<p>New value of <code>f_url</code> for notification</p>"
          },
          {
            "group": "Body parameters",
            "type": "String",
            "optional": true,
            "field": "f_color",
            "description": "<p>New value of <code>f_color</code> for notification</p>"
          },
          {
            "group": "Body parameters",
            "type": "String",
            "optional": true,
            "field": "f_icon",
            "description": "<p>New value of <code>f_icon</code> for notification</p>"
          }
        ],
        "Query parameters": [
          {
            "group": "Query parameters",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>API Bearer Token, required for authentication</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "notification",
            "description": "<p>Updated notification</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "notification.id",
            "description": "<p><code>id</code> of notification</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "notification.createdBy",
            "description": "<p><code>createdBy</code> of notification</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "notification.updatedBy",
            "description": "<p><code>updatedBy</code> of notification</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "notification.f_title",
            "description": "<p><code>f_title</code> of notification</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "notification.f_description",
            "description": "<p><code>f_description</code> of notification</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "notification.f_url",
            "description": "<p><code>f_url</code> of notification</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "notification.f_color",
            "description": "<p><code>f_color</code> of notification</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "notification.f_icon",
            "description": "<p><code>f_icon</code> of notification</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 404": [
          {
            "group": "Error 404",
            "type": "Object",
            "optional": false,
            "field": "NotFound",
            "description": "<p>No notification with ID <code>id</code> found</p>"
          }
        ],
        "Error 500": [
          {
            "group": "Error 500",
            "type": "Object",
            "optional": false,
            "field": "ServerError",
            "description": "<p>An error occured when trying to update notification</p>"
          }
        ]
      }
    },
    "filename": "/usr/src/app/workspace/a_cockpit/api/doc/doc_descriptor.js",
    "groupTitle": "Notification",
    "name": "PutApiNotificationIdTokenToken"
  },
  {
    "type": "delete",
    "url": "/api/robot/:id?token=TOKEN",
    "title": "5 - Delete",
    "version": "1.0.0",
    "description": "<p>Permanently delete a record of <code>robot</code> with <code>id</code></p>",
    "group": "Robot",
    "parameter": {
      "fields": {
        "Params parameters": [
          {
            "group": "Params parameters",
            "type": "Integer",
            "optional": false,
            "field": "id",
            "description": "<p><code>id</code> of robot to delete</p>"
          }
        ],
        "Query parameters": [
          {
            "group": "Query parameters",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>API Bearer Token, required for authentication</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 404": [
          {
            "group": "Error 404",
            "type": "Object",
            "optional": false,
            "field": "NotFound",
            "description": "<p>No robot with ID <code>id</code> found</p>"
          }
        ]
      }
    },
    "filename": "/usr/src/app/workspace/a_cockpit/api/doc/doc_descriptor.js",
    "groupTitle": "Robot",
    "name": "DeleteApiRobotIdTokenToken"
  },
  {
    "type": "get",
    "url": "/api/robot/:id/:association?token=TOKEN",
    "title": "2.a - Find association",
    "version": "1.0.0",
    "description": "<p>Fetch records of <code>robot</code>'s <code>association</code> from <code>offset</code> until <code>limit</code></p>",
    "group": "Robot",
    "parameter": {
      "fields": {
        "Params parameters": [
          {
            "group": "Params parameters",
            "type": "Integer",
            "optional": false,
            "field": "id",
            "description": "<p><code>id</code> of the robot to which <code>association</code> is related</p>"
          },
          {
            "group": "Params parameters",
            "type": "String",
            "allowedValues": [
              "api_credentials",
              "task"
            ],
            "optional": false,
            "field": "association",
            "description": "<p>Name of the related entity</p>"
          }
        ],
        "Query parameters": [
          {
            "group": "Query parameters",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>API Bearer Token, required for authentication</p>"
          },
          {
            "group": "Query parameters",
            "type": "Integer",
            "optional": true,
            "field": "limit",
            "defaultValue": "50",
            "description": "<p>The number of rows to be fetched</p>"
          },
          {
            "group": "Query parameters",
            "type": "Integer",
            "optional": true,
            "field": "offset",
            "defaultValue": "0",
            "description": "<p>The offset by which rows will be fetched</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "Object",
            "description": "<p>Object of <code>association</code></p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "limit",
            "description": "<p>Limit used to fetch data</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "offset",
            "description": "<p>Offset used to fetch data</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 404": [
          {
            "group": "Error 404",
            "type": "Object",
            "optional": false,
            "field": "NotFound",
            "description": "<p>No robot with ID <code>id</code> found</p>"
          },
          {
            "group": "Error 404",
            "type": "Object",
            "optional": false,
            "field": "AssociationNotFound",
            "description": "<p>No association with <code>association</code></p>"
          }
        ]
      }
    },
    "filename": "/usr/src/app/workspace/a_cockpit/api/doc/doc_descriptor.js",
    "groupTitle": "Robot",
    "name": "GetApiRobotIdAssociationTokenToken"
  },
  {
    "type": "get",
    "url": "/api/robot/:id?token=TOKEN",
    "title": "2 - Find one",
    "version": "1.0.0",
    "description": "<p>Fetch one record of <code>robot</code> with <code>id</code></p>",
    "group": "Robot",
    "parameter": {
      "fields": {
        "Query parameters": [
          {
            "group": "Query parameters",
            "type": "String",
            "allowedValues": [
              "r_api_credentials",
              "r_task"
            ],
            "optional": true,
            "field": "include",
            "description": "<p>Include specified association(s) to each <code>robot</code> result.<br>Multiple values can be given separated by a comma <br><br>Ex: ?include=r_asso1,r_asso2</p>"
          },
          {
            "group": "Query parameters",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>API Bearer Token, required for authentication</p>"
          }
        ],
        "Params parameters": [
          {
            "group": "Params parameters",
            "type": "Integer",
            "optional": false,
            "field": "id",
            "description": "<p>The <code>id</code> of robot to fetch</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "robot",
            "description": "<p>Object of robot</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "robot.id",
            "description": "<p><code>id</code> of robot</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "robot.version",
            "description": "<p><code>version</code> of robot</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "robot.createdBy",
            "description": "<p><code>createdBy</code> of robot</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "robot.updatedBy",
            "description": "<p><code>updatedBy</code> of robot</p>"
          },
          {
            "group": "Success 200",
            "type": "Enum",
            "optional": false,
            "field": "robot.f_current_status",
            "description": "<p><code>f_current_status</code> of robot</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "robot.f_name",
            "description": "<p><code>f_name</code> of robot</p>"
          },
          {
            "group": "Success 200",
            "type": "Text",
            "optional": false,
            "field": "robot.f_comment",
            "description": "<p><code>f_comment</code> of robot</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 404": [
          {
            "group": "Error 404",
            "type": "Object",
            "optional": false,
            "field": "NotFound",
            "description": "<p>No robot with ID <code>id</code> found</p>"
          }
        ]
      }
    },
    "filename": "/usr/src/app/workspace/a_cockpit/api/doc/doc_descriptor.js",
    "groupTitle": "Robot",
    "name": "GetApiRobotIdTokenToken"
  },
  {
    "type": "get",
    "url": "/api/robot?token=TOKEN",
    "title": "1 - Find all",
    "version": "1.0.0",
    "description": "<p>Fetch records of <code>robot</code> from <code>offset</code> until <code>limit</code></p>",
    "group": "Robot",
    "parameter": {
      "fields": {
        "Query parameters": [
          {
            "group": "Query parameters",
            "type": "String",
            "allowedValues": [
              "r_api_credentials",
              "r_task"
            ],
            "optional": true,
            "field": "include",
            "description": "<p>Include specified association(s) to each <code>robot</code> result.<br>Multiple values can be given separated by a comma <br><br>Ex: ?include=r_asso1,r_asso2</p>"
          },
          {
            "group": "Query parameters",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>API Bearer Token, required for authentication</p>"
          },
          {
            "group": "Query parameters",
            "type": "Integer",
            "optional": true,
            "field": "limit",
            "defaultValue": "50",
            "description": "<p>The number of rows to be fetched</p>"
          },
          {
            "group": "Query parameters",
            "type": "Integer",
            "optional": true,
            "field": "offset",
            "defaultValue": "0",
            "description": "<p>The offset by which rows will be fetched</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "robots",
            "description": "<p>List of robot</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "robots.id",
            "description": "<p><code>id</code> of robot</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "robots.version",
            "description": "<p><code>version</code> of robot</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "robots.createdBy",
            "description": "<p><code>createdBy</code> of robot</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "robots.updatedBy",
            "description": "<p><code>updatedBy</code> of robot</p>"
          },
          {
            "group": "Success 200",
            "type": "Enum",
            "optional": false,
            "field": "robots.f_current_status",
            "description": "<p><code>f_current_status</code> of robot</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "robots.f_name",
            "description": "<p><code>f_name</code> of robot</p>"
          },
          {
            "group": "Success 200",
            "type": "Text",
            "optional": false,
            "field": "robots.f_comment",
            "description": "<p><code>f_comment</code> of robot</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "limit",
            "description": "<p>Limit used to fetch data</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "offset",
            "description": "<p>Offset used to fetch data</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "totalCount",
            "description": "<p>The total count of records for robot</p>"
          }
        ]
      }
    },
    "filename": "/usr/src/app/workspace/a_cockpit/api/doc/doc_descriptor.js",
    "groupTitle": "Robot",
    "name": "GetApiRobotTokenToken"
  },
  {
    "type": "post",
    "url": "/api/robot/?token=TOKEN",
    "title": "3 - Create",
    "version": "1.0.0",
    "description": "<p>Create a record of <code>robot</code> using values defined in request's <code>body</code></p>",
    "group": "Robot",
    "parameter": {
      "fields": {
        "Body parameters": [
          {
            "group": "Body parameters",
            "type": "String",
            "optional": true,
            "field": "createdBy",
            "description": "<p><code>createdBy</code> of robot</p>"
          },
          {
            "group": "Body parameters",
            "type": "String",
            "optional": true,
            "field": "updatedBy",
            "description": "<p><code>updatedBy</code> of robot</p>"
          },
          {
            "group": "Body parameters",
            "type": "Enum",
            "optional": true,
            "field": "f_current_status",
            "description": "<p><code>f_current_status</code> of robot</p>"
          },
          {
            "group": "Body parameters",
            "type": "String",
            "optional": true,
            "field": "f_name",
            "description": "<p><code>f_name</code> of robot</p>"
          },
          {
            "group": "Body parameters",
            "type": "Text",
            "optional": true,
            "field": "f_comment",
            "description": "<p><code>f_comment</code> of robot</p>"
          },
          {
            "group": "Body parameters",
            "type": "Integer",
            "optional": true,
            "field": "fk_id_api_credentials_api_credentials",
            "description": "<p><code>id</code> of entity api_credentials to associate</p>"
          },
          {
            "group": "Body parameters",
            "type": "Integer",
            "optional": true,
            "field": "fk_id_robot_robot",
            "description": "<p><code>id</code> of entity task to associate</p>"
          }
        ],
        "Query parameters": [
          {
            "group": "Query parameters",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>API Bearer Token, required for authentication</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "robot",
            "description": "<p>Created robot</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "robot.id",
            "description": "<p><code>id</code> of robot</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "robot.createdBy",
            "description": "<p><code>createdBy</code> of robot</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "robot.updatedBy",
            "description": "<p><code>updatedBy</code> of robot</p>"
          },
          {
            "group": "Success 200",
            "type": "Enum",
            "optional": false,
            "field": "robot.f_current_status",
            "description": "<p><code>f_current_status</code> of robot</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "robot.f_name",
            "description": "<p><code>f_name</code> of robot</p>"
          },
          {
            "group": "Success 200",
            "type": "Text",
            "optional": false,
            "field": "robot.f_comment",
            "description": "<p><code>f_comment</code> of robot</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 500": [
          {
            "group": "Error 500",
            "type": "Object",
            "optional": false,
            "field": "ServerError",
            "description": "<p>An error occured when trying to create robot</p>"
          }
        ]
      }
    },
    "filename": "/usr/src/app/workspace/a_cockpit/api/doc/doc_descriptor.js",
    "groupTitle": "Robot",
    "name": "PostApiRobotTokenToken"
  },
  {
    "type": "put",
    "url": "/api/robot/:id?token=TOKEN",
    "title": "4 - Update",
    "version": "1.0.0",
    "description": "<p>Update record of <code>robot</code> with <code>id</code> using values defined in request's <code>body</code></p>",
    "group": "Robot",
    "parameter": {
      "fields": {
        "Params parameters": [
          {
            "group": "Params parameters",
            "type": "Integer",
            "optional": false,
            "field": "id",
            "description": "<p><code>id</code> of the robot to update</p>"
          }
        ],
        "Body parameters": [
          {
            "group": "Body parameters",
            "type": "String",
            "optional": true,
            "field": "createdBy",
            "description": "<p>New value of <code>createdBy</code> for robot</p>"
          },
          {
            "group": "Body parameters",
            "type": "String",
            "optional": true,
            "field": "updatedBy",
            "description": "<p>New value of <code>updatedBy</code> for robot</p>"
          },
          {
            "group": "Body parameters",
            "type": "Enum",
            "optional": true,
            "field": "f_current_status",
            "description": "<p>New value of <code>f_current_status</code> for robot</p>"
          },
          {
            "group": "Body parameters",
            "type": "String",
            "optional": true,
            "field": "f_name",
            "description": "<p>New value of <code>f_name</code> for robot</p>"
          },
          {
            "group": "Body parameters",
            "type": "Text",
            "optional": true,
            "field": "f_comment",
            "description": "<p>New value of <code>f_comment</code> for robot</p>"
          },
          {
            "group": "Body parameters",
            "type": "Integer",
            "optional": true,
            "field": "fk_id_api_credentials_api_credentials",
            "description": "<p><code>id</code> of entity api_credentials to associate</p>"
          },
          {
            "group": "Body parameters",
            "type": "Integer",
            "optional": true,
            "field": "fk_id_robot_robot",
            "description": "<p><code>id</code> of entity task to associate</p>"
          }
        ],
        "Query parameters": [
          {
            "group": "Query parameters",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>API Bearer Token, required for authentication</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "robot",
            "description": "<p>Updated robot</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "robot.id",
            "description": "<p><code>id</code> of robot</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "robot.createdBy",
            "description": "<p><code>createdBy</code> of robot</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "robot.updatedBy",
            "description": "<p><code>updatedBy</code> of robot</p>"
          },
          {
            "group": "Success 200",
            "type": "Enum",
            "optional": false,
            "field": "robot.f_current_status",
            "description": "<p><code>f_current_status</code> of robot</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "robot.f_name",
            "description": "<p><code>f_name</code> of robot</p>"
          },
          {
            "group": "Success 200",
            "type": "Text",
            "optional": false,
            "field": "robot.f_comment",
            "description": "<p><code>f_comment</code> of robot</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 404": [
          {
            "group": "Error 404",
            "type": "Object",
            "optional": false,
            "field": "NotFound",
            "description": "<p>No robot with ID <code>id</code> found</p>"
          }
        ],
        "Error 500": [
          {
            "group": "Error 500",
            "type": "Object",
            "optional": false,
            "field": "ServerError",
            "description": "<p>An error occured when trying to update robot</p>"
          }
        ]
      }
    },
    "filename": "/usr/src/app/workspace/a_cockpit/api/doc/doc_descriptor.js",
    "groupTitle": "Robot",
    "name": "PutApiRobotIdTokenToken"
  },
  {
    "type": "delete",
    "url": "/api/role/:id?token=TOKEN",
    "title": "5 - Delete",
    "version": "1.0.0",
    "description": "<p>Permanently delete a record of <code>role</code> with <code>id</code></p>",
    "group": "Role",
    "parameter": {
      "fields": {
        "Params parameters": [
          {
            "group": "Params parameters",
            "type": "Integer",
            "optional": false,
            "field": "id",
            "description": "<p><code>id</code> of role to delete</p>"
          }
        ],
        "Query parameters": [
          {
            "group": "Query parameters",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>API Bearer Token, required for authentication</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 404": [
          {
            "group": "Error 404",
            "type": "Object",
            "optional": false,
            "field": "NotFound",
            "description": "<p>No role with ID <code>id</code> found</p>"
          }
        ]
      }
    },
    "filename": "/usr/src/app/workspace/a_cockpit/api/doc/doc_descriptor.js",
    "groupTitle": "Role",
    "name": "DeleteApiRoleIdTokenToken"
  },
  {
    "type": "get",
    "url": "/api/role/:id/:association?token=TOKEN",
    "title": "2.a - Find association",
    "version": "1.0.0",
    "description": "<p>Fetch records of <code>role</code>'s <code>association</code> from <code>offset</code> until <code>limit</code></p>",
    "group": "Role",
    "parameter": {
      "fields": {
        "Params parameters": [
          {
            "group": "Params parameters",
            "type": "Integer",
            "optional": false,
            "field": "id",
            "description": "<p><code>id</code> of the role to which <code>association</code> is related</p>"
          },
          {
            "group": "Params parameters",
            "type": "String",
            "allowedValues": [
              "user"
            ],
            "optional": false,
            "field": "association",
            "description": "<p>Name of the related entity</p>"
          }
        ],
        "Query parameters": [
          {
            "group": "Query parameters",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>API Bearer Token, required for authentication</p>"
          },
          {
            "group": "Query parameters",
            "type": "Integer",
            "optional": true,
            "field": "limit",
            "defaultValue": "50",
            "description": "<p>The number of rows to be fetched</p>"
          },
          {
            "group": "Query parameters",
            "type": "Integer",
            "optional": true,
            "field": "offset",
            "defaultValue": "0",
            "description": "<p>The offset by which rows will be fetched</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "Object",
            "description": "<p>Object of <code>association</code></p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "limit",
            "description": "<p>Limit used to fetch data</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "offset",
            "description": "<p>Offset used to fetch data</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 404": [
          {
            "group": "Error 404",
            "type": "Object",
            "optional": false,
            "field": "NotFound",
            "description": "<p>No role with ID <code>id</code> found</p>"
          },
          {
            "group": "Error 404",
            "type": "Object",
            "optional": false,
            "field": "AssociationNotFound",
            "description": "<p>No association with <code>association</code></p>"
          }
        ]
      }
    },
    "filename": "/usr/src/app/workspace/a_cockpit/api/doc/doc_descriptor.js",
    "groupTitle": "Role",
    "name": "GetApiRoleIdAssociationTokenToken"
  },
  {
    "type": "get",
    "url": "/api/role/:id?token=TOKEN",
    "title": "2 - Find one",
    "version": "1.0.0",
    "description": "<p>Fetch one record of <code>role</code> with <code>id</code></p>",
    "group": "Role",
    "parameter": {
      "fields": {
        "Query parameters": [
          {
            "group": "Query parameters",
            "type": "String",
            "allowedValues": [
              "r_user"
            ],
            "optional": true,
            "field": "include",
            "description": "<p>Include specified association(s) to each <code>role</code> result.<br>Multiple values can be given separated by a comma <br><br>Ex: ?include=r_asso1,r_asso2</p>"
          },
          {
            "group": "Query parameters",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>API Bearer Token, required for authentication</p>"
          }
        ],
        "Params parameters": [
          {
            "group": "Params parameters",
            "type": "Integer",
            "optional": false,
            "field": "id",
            "description": "<p>The <code>id</code> of role to fetch</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "role",
            "description": "<p>Object of role</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "role.id",
            "description": "<p><code>id</code> of role</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "role.version",
            "description": "<p><code>version</code> of role</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "role.createdBy",
            "description": "<p><code>createdBy</code> of role</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "role.updatedBy",
            "description": "<p><code>updatedBy</code> of role</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "role.f_label",
            "description": "<p><code>f_label</code> of role</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 404": [
          {
            "group": "Error 404",
            "type": "Object",
            "optional": false,
            "field": "NotFound",
            "description": "<p>No role with ID <code>id</code> found</p>"
          }
        ]
      }
    },
    "filename": "/usr/src/app/workspace/a_cockpit/api/doc/doc_descriptor.js",
    "groupTitle": "Role",
    "name": "GetApiRoleIdTokenToken"
  },
  {
    "type": "get",
    "url": "/api/role?token=TOKEN",
    "title": "1 - Find all",
    "version": "1.0.0",
    "description": "<p>Fetch records of <code>role</code> from <code>offset</code> until <code>limit</code></p>",
    "group": "Role",
    "parameter": {
      "fields": {
        "Query parameters": [
          {
            "group": "Query parameters",
            "type": "String",
            "allowedValues": [
              "r_user"
            ],
            "optional": true,
            "field": "include",
            "description": "<p>Include specified association(s) to each <code>role</code> result.<br>Multiple values can be given separated by a comma <br><br>Ex: ?include=r_asso1,r_asso2</p>"
          },
          {
            "group": "Query parameters",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>API Bearer Token, required for authentication</p>"
          },
          {
            "group": "Query parameters",
            "type": "Integer",
            "optional": true,
            "field": "limit",
            "defaultValue": "50",
            "description": "<p>The number of rows to be fetched</p>"
          },
          {
            "group": "Query parameters",
            "type": "Integer",
            "optional": true,
            "field": "offset",
            "defaultValue": "0",
            "description": "<p>The offset by which rows will be fetched</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "roles",
            "description": "<p>List of role</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "roles.id",
            "description": "<p><code>id</code> of role</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "roles.version",
            "description": "<p><code>version</code> of role</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "roles.createdBy",
            "description": "<p><code>createdBy</code> of role</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "roles.updatedBy",
            "description": "<p><code>updatedBy</code> of role</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "roles.f_label",
            "description": "<p><code>f_label</code> of role</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "limit",
            "description": "<p>Limit used to fetch data</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "offset",
            "description": "<p>Offset used to fetch data</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "totalCount",
            "description": "<p>The total count of records for role</p>"
          }
        ]
      }
    },
    "filename": "/usr/src/app/workspace/a_cockpit/api/doc/doc_descriptor.js",
    "groupTitle": "Role",
    "name": "GetApiRoleTokenToken"
  },
  {
    "type": "post",
    "url": "/api/role/?token=TOKEN",
    "title": "3 - Create",
    "version": "1.0.0",
    "description": "<p>Create a record of <code>role</code> using values defined in request's <code>body</code></p>",
    "group": "Role",
    "parameter": {
      "fields": {
        "Body parameters": [
          {
            "group": "Body parameters",
            "type": "String",
            "optional": true,
            "field": "createdBy",
            "description": "<p><code>createdBy</code> of role</p>"
          },
          {
            "group": "Body parameters",
            "type": "String",
            "optional": true,
            "field": "updatedBy",
            "description": "<p><code>updatedBy</code> of role</p>"
          },
          {
            "group": "Body parameters",
            "type": "String",
            "optional": true,
            "field": "f_label",
            "description": "<p><code>f_label</code> of role</p>"
          }
        ],
        "Query parameters": [
          {
            "group": "Query parameters",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>API Bearer Token, required for authentication</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "role",
            "description": "<p>Created role</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "role.id",
            "description": "<p><code>id</code> of role</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "role.createdBy",
            "description": "<p><code>createdBy</code> of role</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "role.updatedBy",
            "description": "<p><code>updatedBy</code> of role</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "role.f_label",
            "description": "<p><code>f_label</code> of role</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 500": [
          {
            "group": "Error 500",
            "type": "Object",
            "optional": false,
            "field": "ServerError",
            "description": "<p>An error occured when trying to create role</p>"
          }
        ]
      }
    },
    "filename": "/usr/src/app/workspace/a_cockpit/api/doc/doc_descriptor.js",
    "groupTitle": "Role",
    "name": "PostApiRoleTokenToken"
  },
  {
    "type": "put",
    "url": "/api/role/:id?token=TOKEN",
    "title": "4 - Update",
    "version": "1.0.0",
    "description": "<p>Update record of <code>role</code> with <code>id</code> using values defined in request's <code>body</code></p>",
    "group": "Role",
    "parameter": {
      "fields": {
        "Params parameters": [
          {
            "group": "Params parameters",
            "type": "Integer",
            "optional": false,
            "field": "id",
            "description": "<p><code>id</code> of the role to update</p>"
          }
        ],
        "Body parameters": [
          {
            "group": "Body parameters",
            "type": "String",
            "optional": true,
            "field": "createdBy",
            "description": "<p>New value of <code>createdBy</code> for role</p>"
          },
          {
            "group": "Body parameters",
            "type": "String",
            "optional": true,
            "field": "updatedBy",
            "description": "<p>New value of <code>updatedBy</code> for role</p>"
          },
          {
            "group": "Body parameters",
            "type": "String",
            "optional": true,
            "field": "f_label",
            "description": "<p>New value of <code>f_label</code> for role</p>"
          }
        ],
        "Query parameters": [
          {
            "group": "Query parameters",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>API Bearer Token, required for authentication</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "role",
            "description": "<p>Updated role</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "role.id",
            "description": "<p><code>id</code> of role</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "role.createdBy",
            "description": "<p><code>createdBy</code> of role</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "role.updatedBy",
            "description": "<p><code>updatedBy</code> of role</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "role.f_label",
            "description": "<p><code>f_label</code> of role</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 404": [
          {
            "group": "Error 404",
            "type": "Object",
            "optional": false,
            "field": "NotFound",
            "description": "<p>No role with ID <code>id</code> found</p>"
          }
        ],
        "Error 500": [
          {
            "group": "Error 500",
            "type": "Object",
            "optional": false,
            "field": "ServerError",
            "description": "<p>An error occured when trying to update role</p>"
          }
        ]
      }
    },
    "filename": "/usr/src/app/workspace/a_cockpit/api/doc/doc_descriptor.js",
    "groupTitle": "Role",
    "name": "PutApiRoleIdTokenToken"
  },
  {
    "type": "delete",
    "url": "/api/status/:id?token=TOKEN",
    "title": "5 - Delete",
    "version": "1.0.0",
    "description": "<p>Permanently delete a record of <code>status</code> with <code>id</code></p>",
    "group": "Status",
    "parameter": {
      "fields": {
        "Params parameters": [
          {
            "group": "Params parameters",
            "type": "Integer",
            "optional": false,
            "field": "id",
            "description": "<p><code>id</code> of status to delete</p>"
          }
        ],
        "Query parameters": [
          {
            "group": "Query parameters",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>API Bearer Token, required for authentication</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 404": [
          {
            "group": "Error 404",
            "type": "Object",
            "optional": false,
            "field": "NotFound",
            "description": "<p>No status with ID <code>id</code> found</p>"
          }
        ]
      }
    },
    "filename": "/usr/src/app/workspace/a_cockpit/api/doc/doc_descriptor.js",
    "groupTitle": "Status",
    "name": "DeleteApiStatusIdTokenToken"
  },
  {
    "type": "get",
    "url": "/api/status/:id/:association?token=TOKEN",
    "title": "2.a - Find association",
    "version": "1.0.0",
    "description": "<p>Fetch records of <code>status</code>'s <code>association</code> from <code>offset</code> until <code>limit</code></p>",
    "group": "Status",
    "parameter": {
      "fields": {
        "Params parameters": [
          {
            "group": "Params parameters",
            "type": "Integer",
            "optional": false,
            "field": "id",
            "description": "<p><code>id</code> of the status to which <code>association</code> is related</p>"
          },
          {
            "group": "Params parameters",
            "type": "String",
            "allowedValues": [
              "group",
              "status",
              "translation",
              "task",
              "action",
              "status"
            ],
            "optional": false,
            "field": "association",
            "description": "<p>Name of the related entity</p>"
          }
        ],
        "Query parameters": [
          {
            "group": "Query parameters",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>API Bearer Token, required for authentication</p>"
          },
          {
            "group": "Query parameters",
            "type": "Integer",
            "optional": true,
            "field": "limit",
            "defaultValue": "50",
            "description": "<p>The number of rows to be fetched</p>"
          },
          {
            "group": "Query parameters",
            "type": "Integer",
            "optional": true,
            "field": "offset",
            "defaultValue": "0",
            "description": "<p>The offset by which rows will be fetched</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "Object",
            "description": "<p>Object of <code>association</code></p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "limit",
            "description": "<p>Limit used to fetch data</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "offset",
            "description": "<p>Offset used to fetch data</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 404": [
          {
            "group": "Error 404",
            "type": "Object",
            "optional": false,
            "field": "NotFound",
            "description": "<p>No status with ID <code>id</code> found</p>"
          },
          {
            "group": "Error 404",
            "type": "Object",
            "optional": false,
            "field": "AssociationNotFound",
            "description": "<p>No association with <code>association</code></p>"
          }
        ]
      }
    },
    "filename": "/usr/src/app/workspace/a_cockpit/api/doc/doc_descriptor.js",
    "groupTitle": "Status",
    "name": "GetApiStatusIdAssociationTokenToken"
  },
  {
    "type": "get",
    "url": "/api/status/:id?token=TOKEN",
    "title": "2 - Find one",
    "version": "1.0.0",
    "description": "<p>Fetch one record of <code>status</code> with <code>id</code></p>",
    "group": "Status",
    "parameter": {
      "fields": {
        "Query parameters": [
          {
            "group": "Query parameters",
            "type": "String",
            "allowedValues": [
              "r_accepted_group",
              "r_status_children",
              "r_translations",
              "r_task",
              "r_actions",
              "r_children"
            ],
            "optional": true,
            "field": "include",
            "description": "<p>Include specified association(s) to each <code>status</code> result.<br>Multiple values can be given separated by a comma <br><br>Ex: ?include=r_asso1,r_asso2</p>"
          },
          {
            "group": "Query parameters",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>API Bearer Token, required for authentication</p>"
          }
        ],
        "Params parameters": [
          {
            "group": "Params parameters",
            "type": "Integer",
            "optional": false,
            "field": "id",
            "description": "<p>The <code>id</code> of status to fetch</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "status",
            "description": "<p>Object of status</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "status.id",
            "description": "<p><code>id</code> of status</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "status.version",
            "description": "<p><code>version</code> of status</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status.createdBy",
            "description": "<p><code>createdBy</code> of status</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status.updatedBy",
            "description": "<p><code>updatedBy</code> of status</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status.f_entity",
            "description": "<p><code>f_entity</code> of status</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status.f_field",
            "description": "<p><code>f_field</code> of status</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status.f_name",
            "description": "<p><code>f_name</code> of status</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status.f_color",
            "description": "<p><code>f_color</code> of status</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status.f_button_label",
            "description": "<p><code>f_button_label</code> of status</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "status.f_position",
            "description": "<p><code>f_position</code> of status</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "status.f_default",
            "description": "<p><code>f_default</code> of status</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "status.f_comment",
            "description": "<p><code>f_comment</code> of status</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 404": [
          {
            "group": "Error 404",
            "type": "Object",
            "optional": false,
            "field": "NotFound",
            "description": "<p>No status with ID <code>id</code> found</p>"
          }
        ]
      }
    },
    "filename": "/usr/src/app/workspace/a_cockpit/api/doc/doc_descriptor.js",
    "groupTitle": "Status",
    "name": "GetApiStatusIdTokenToken"
  },
  {
    "type": "get",
    "url": "/api/status?token=TOKEN",
    "title": "1 - Find all",
    "version": "1.0.0",
    "description": "<p>Fetch records of <code>status</code> from <code>offset</code> until <code>limit</code></p>",
    "group": "Status",
    "parameter": {
      "fields": {
        "Query parameters": [
          {
            "group": "Query parameters",
            "type": "String",
            "allowedValues": [
              "r_accepted_group",
              "r_status_children",
              "r_translations",
              "r_task",
              "r_actions",
              "r_children"
            ],
            "optional": true,
            "field": "include",
            "description": "<p>Include specified association(s) to each <code>status</code> result.<br>Multiple values can be given separated by a comma <br><br>Ex: ?include=r_asso1,r_asso2</p>"
          },
          {
            "group": "Query parameters",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>API Bearer Token, required for authentication</p>"
          },
          {
            "group": "Query parameters",
            "type": "Integer",
            "optional": true,
            "field": "limit",
            "defaultValue": "50",
            "description": "<p>The number of rows to be fetched</p>"
          },
          {
            "group": "Query parameters",
            "type": "Integer",
            "optional": true,
            "field": "offset",
            "defaultValue": "0",
            "description": "<p>The offset by which rows will be fetched</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "statuss",
            "description": "<p>List of status</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "statuss.id",
            "description": "<p><code>id</code> of status</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "statuss.version",
            "description": "<p><code>version</code> of status</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "statuss.createdBy",
            "description": "<p><code>createdBy</code> of status</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "statuss.updatedBy",
            "description": "<p><code>updatedBy</code> of status</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "statuss.f_entity",
            "description": "<p><code>f_entity</code> of status</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "statuss.f_field",
            "description": "<p><code>f_field</code> of status</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "statuss.f_name",
            "description": "<p><code>f_name</code> of status</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "statuss.f_color",
            "description": "<p><code>f_color</code> of status</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "statuss.f_button_label",
            "description": "<p><code>f_button_label</code> of status</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "statuss.f_position",
            "description": "<p><code>f_position</code> of status</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "statuss.f_default",
            "description": "<p><code>f_default</code> of status</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "statuss.f_comment",
            "description": "<p><code>f_comment</code> of status</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "limit",
            "description": "<p>Limit used to fetch data</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "offset",
            "description": "<p>Offset used to fetch data</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "totalCount",
            "description": "<p>The total count of records for status</p>"
          }
        ]
      }
    },
    "filename": "/usr/src/app/workspace/a_cockpit/api/doc/doc_descriptor.js",
    "groupTitle": "Status",
    "name": "GetApiStatusTokenToken"
  },
  {
    "type": "post",
    "url": "/api/status/?token=TOKEN",
    "title": "3 - Create",
    "version": "1.0.0",
    "description": "<p>Create a record of <code>status</code> using values defined in request's <code>body</code></p>",
    "group": "Status",
    "parameter": {
      "fields": {
        "Body parameters": [
          {
            "group": "Body parameters",
            "type": "String",
            "optional": true,
            "field": "createdBy",
            "description": "<p><code>createdBy</code> of status</p>"
          },
          {
            "group": "Body parameters",
            "type": "String",
            "optional": true,
            "field": "updatedBy",
            "description": "<p><code>updatedBy</code> of status</p>"
          },
          {
            "group": "Body parameters",
            "type": "String",
            "optional": true,
            "field": "f_entity",
            "description": "<p><code>f_entity</code> of status</p>"
          },
          {
            "group": "Body parameters",
            "type": "String",
            "optional": true,
            "field": "f_field",
            "description": "<p><code>f_field</code> of status</p>"
          },
          {
            "group": "Body parameters",
            "type": "String",
            "optional": true,
            "field": "f_name",
            "description": "<p><code>f_name</code> of status</p>"
          },
          {
            "group": "Body parameters",
            "type": "String",
            "optional": true,
            "field": "f_color",
            "description": "<p><code>f_color</code> of status</p>"
          },
          {
            "group": "Body parameters",
            "type": "String",
            "optional": true,
            "field": "f_button_label",
            "description": "<p><code>f_button_label</code> of status</p>"
          },
          {
            "group": "Body parameters",
            "type": "Integer",
            "optional": true,
            "field": "f_position",
            "description": "<p><code>f_position</code> of status</p>"
          },
          {
            "group": "Body parameters",
            "type": "Boolean",
            "optional": true,
            "field": "f_default",
            "description": "<p><code>f_default</code> of status</p>"
          },
          {
            "group": "Body parameters",
            "type": "Boolean",
            "optional": true,
            "field": "f_comment",
            "description": "<p><code>f_comment</code> of status</p>"
          },
          {
            "group": "Body parameters",
            "type": "Integer",
            "optional": true,
            "field": "fk_id_status_children",
            "description": "<p><code>id</code> of entity status to associate</p>"
          },
          {
            "group": "Body parameters",
            "type": "Integer",
            "optional": true,
            "field": "fk_id_status_translations",
            "description": "<p><code>id</code> of entity translation to associate</p>"
          },
          {
            "group": "Body parameters",
            "type": "Integer",
            "optional": true,
            "field": "fk_id_status_state",
            "description": "<p><code>id</code> of entity task to associate</p>"
          },
          {
            "group": "Body parameters",
            "type": "Integer",
            "optional": true,
            "field": "fk_id_status_actions",
            "description": "<p><code>id</code> of entity action to associate</p>"
          }
        ],
        "Query parameters": [
          {
            "group": "Query parameters",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>API Bearer Token, required for authentication</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "status",
            "description": "<p>Created status</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "status.id",
            "description": "<p><code>id</code> of status</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status.createdBy",
            "description": "<p><code>createdBy</code> of status</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status.updatedBy",
            "description": "<p><code>updatedBy</code> of status</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status.f_entity",
            "description": "<p><code>f_entity</code> of status</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status.f_field",
            "description": "<p><code>f_field</code> of status</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status.f_name",
            "description": "<p><code>f_name</code> of status</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status.f_color",
            "description": "<p><code>f_color</code> of status</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status.f_button_label",
            "description": "<p><code>f_button_label</code> of status</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "status.f_position",
            "description": "<p><code>f_position</code> of status</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "status.f_default",
            "description": "<p><code>f_default</code> of status</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "status.f_comment",
            "description": "<p><code>f_comment</code> of status</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 500": [
          {
            "group": "Error 500",
            "type": "Object",
            "optional": false,
            "field": "ServerError",
            "description": "<p>An error occured when trying to create status</p>"
          }
        ]
      }
    },
    "filename": "/usr/src/app/workspace/a_cockpit/api/doc/doc_descriptor.js",
    "groupTitle": "Status",
    "name": "PostApiStatusTokenToken"
  },
  {
    "type": "put",
    "url": "/api/status/:id?token=TOKEN",
    "title": "4 - Update",
    "version": "1.0.0",
    "description": "<p>Update record of <code>status</code> with <code>id</code> using values defined in request's <code>body</code></p>",
    "group": "Status",
    "parameter": {
      "fields": {
        "Params parameters": [
          {
            "group": "Params parameters",
            "type": "Integer",
            "optional": false,
            "field": "id",
            "description": "<p><code>id</code> of the status to update</p>"
          }
        ],
        "Body parameters": [
          {
            "group": "Body parameters",
            "type": "String",
            "optional": true,
            "field": "createdBy",
            "description": "<p>New value of <code>createdBy</code> for status</p>"
          },
          {
            "group": "Body parameters",
            "type": "String",
            "optional": true,
            "field": "updatedBy",
            "description": "<p>New value of <code>updatedBy</code> for status</p>"
          },
          {
            "group": "Body parameters",
            "type": "String",
            "optional": true,
            "field": "f_entity",
            "description": "<p>New value of <code>f_entity</code> for status</p>"
          },
          {
            "group": "Body parameters",
            "type": "String",
            "optional": true,
            "field": "f_field",
            "description": "<p>New value of <code>f_field</code> for status</p>"
          },
          {
            "group": "Body parameters",
            "type": "String",
            "optional": true,
            "field": "f_name",
            "description": "<p>New value of <code>f_name</code> for status</p>"
          },
          {
            "group": "Body parameters",
            "type": "String",
            "optional": true,
            "field": "f_color",
            "description": "<p>New value of <code>f_color</code> for status</p>"
          },
          {
            "group": "Body parameters",
            "type": "String",
            "optional": true,
            "field": "f_button_label",
            "description": "<p>New value of <code>f_button_label</code> for status</p>"
          },
          {
            "group": "Body parameters",
            "type": "Integer",
            "optional": true,
            "field": "f_position",
            "description": "<p>New value of <code>f_position</code> for status</p>"
          },
          {
            "group": "Body parameters",
            "type": "Boolean",
            "optional": true,
            "field": "f_default",
            "description": "<p>New value of <code>f_default</code> for status</p>"
          },
          {
            "group": "Body parameters",
            "type": "Boolean",
            "optional": true,
            "field": "f_comment",
            "description": "<p>New value of <code>f_comment</code> for status</p>"
          },
          {
            "group": "Body parameters",
            "type": "Integer",
            "optional": true,
            "field": "fk_id_status_children",
            "description": "<p><code>id</code> of entity status to associate</p>"
          },
          {
            "group": "Body parameters",
            "type": "Integer",
            "optional": true,
            "field": "fk_id_status_translations",
            "description": "<p><code>id</code> of entity translation to associate</p>"
          },
          {
            "group": "Body parameters",
            "type": "Integer",
            "optional": true,
            "field": "fk_id_status_state",
            "description": "<p><code>id</code> of entity task to associate</p>"
          },
          {
            "group": "Body parameters",
            "type": "Integer",
            "optional": true,
            "field": "fk_id_status_actions",
            "description": "<p><code>id</code> of entity action to associate</p>"
          }
        ],
        "Query parameters": [
          {
            "group": "Query parameters",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>API Bearer Token, required for authentication</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "status",
            "description": "<p>Updated status</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "status.id",
            "description": "<p><code>id</code> of status</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status.createdBy",
            "description": "<p><code>createdBy</code> of status</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status.updatedBy",
            "description": "<p><code>updatedBy</code> of status</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status.f_entity",
            "description": "<p><code>f_entity</code> of status</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status.f_field",
            "description": "<p><code>f_field</code> of status</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status.f_name",
            "description": "<p><code>f_name</code> of status</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status.f_color",
            "description": "<p><code>f_color</code> of status</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status.f_button_label",
            "description": "<p><code>f_button_label</code> of status</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "status.f_position",
            "description": "<p><code>f_position</code> of status</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "status.f_default",
            "description": "<p><code>f_default</code> of status</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "status.f_comment",
            "description": "<p><code>f_comment</code> of status</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 404": [
          {
            "group": "Error 404",
            "type": "Object",
            "optional": false,
            "field": "NotFound",
            "description": "<p>No status with ID <code>id</code> found</p>"
          }
        ],
        "Error 500": [
          {
            "group": "Error 500",
            "type": "Object",
            "optional": false,
            "field": "ServerError",
            "description": "<p>An error occured when trying to update status</p>"
          }
        ]
      }
    },
    "filename": "/usr/src/app/workspace/a_cockpit/api/doc/doc_descriptor.js",
    "groupTitle": "Status",
    "name": "PutApiStatusIdTokenToken"
  },
  {
    "type": "delete",
    "url": "/api/synchro_credentials/:id?token=TOKEN",
    "title": "5 - Delete",
    "version": "1.0.0",
    "description": "<p>Permanently delete a record of <code>synchro_credentials</code> with <code>id</code></p>",
    "group": "Synchro_credentials",
    "parameter": {
      "fields": {
        "Params parameters": [
          {
            "group": "Params parameters",
            "type": "Integer",
            "optional": false,
            "field": "id",
            "description": "<p><code>id</code> of synchro_credentials to delete</p>"
          }
        ],
        "Query parameters": [
          {
            "group": "Query parameters",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>API Bearer Token, required for authentication</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 404": [
          {
            "group": "Error 404",
            "type": "Object",
            "optional": false,
            "field": "NotFound",
            "description": "<p>No synchro_credentials with ID <code>id</code> found</p>"
          }
        ]
      }
    },
    "filename": "/usr/src/app/workspace/a_cockpit/api/doc/doc_descriptor.js",
    "groupTitle": "Synchro_credentials",
    "name": "DeleteApiSynchro_credentialsIdTokenToken"
  },
  {
    "type": "get",
    "url": "/api/synchro_credentials/:id?token=TOKEN",
    "title": "2 - Find one",
    "version": "1.0.0",
    "description": "<p>Fetch one record of <code>synchro_credentials</code> with <code>id</code></p>",
    "group": "Synchro_credentials",
    "parameter": {
      "fields": {
        "Query parameters) {String=} [include] Include specified association(s": [
          {
            "group": "Query parameters) {String=} [include] Include specified association(s",
            "optional": false,
            "field": "to",
            "description": "<p>each <code>synchro_credentials</code> result.<br>Multiple values can be given separated by a comma <br><br>Ex: ?include=r_asso1,r_asso2</p>"
          }
        ],
        "Params parameters": [
          {
            "group": "Params parameters",
            "type": "Integer",
            "optional": false,
            "field": "id",
            "description": "<p>The <code>id</code> of synchro_credentials to fetch</p>"
          }
        ],
        "Query parameters": [
          {
            "group": "Query parameters",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>API Bearer Token, required for authentication</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "synchro_credentials",
            "description": "<p>Object of synchro_credentials</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "synchro_credentials.id",
            "description": "<p><code>id</code> of synchro_credentials</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "synchro_credentials.version",
            "description": "<p><code>version</code> of synchro_credentials</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "synchro_credentials.createdBy",
            "description": "<p><code>createdBy</code> of synchro_credentials</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "synchro_credentials.updatedBy",
            "description": "<p><code>updatedBy</code> of synchro_credentials</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "synchro_credentials.f_cloud_host",
            "description": "<p><code>f_cloud_host</code> of synchro_credentials</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "synchro_credentials.f_client_key",
            "description": "<p><code>f_client_key</code> of synchro_credentials</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "synchro_credentials.f_client_secret",
            "description": "<p><code>f_client_secret</code> of synchro_credentials</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 404": [
          {
            "group": "Error 404",
            "type": "Object",
            "optional": false,
            "field": "NotFound",
            "description": "<p>No synchro_credentials with ID <code>id</code> found</p>"
          }
        ]
      }
    },
    "filename": "/usr/src/app/workspace/a_cockpit/api/doc/doc_descriptor.js",
    "groupTitle": "Synchro_credentials",
    "name": "GetApiSynchro_credentialsIdTokenToken"
  },
  {
    "type": "get",
    "url": "/api/synchro_credentials?token=TOKEN",
    "title": "1 - Find all",
    "version": "1.0.0",
    "description": "<p>Fetch records of <code>synchro_credentials</code> from <code>offset</code> until <code>limit</code></p>",
    "group": "Synchro_credentials",
    "parameter": {
      "fields": {
        "Query parameters) {String=} [include] Include specified association(s": [
          {
            "group": "Query parameters) {String=} [include] Include specified association(s",
            "optional": false,
            "field": "to",
            "description": "<p>each <code>synchro_credentials</code> result.<br>Multiple values can be given separated by a comma <br><br>Ex: ?include=r_asso1,r_asso2</p>"
          }
        ],
        "Query parameters": [
          {
            "group": "Query parameters",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>API Bearer Token, required for authentication</p>"
          },
          {
            "group": "Query parameters",
            "type": "Integer",
            "optional": true,
            "field": "limit",
            "defaultValue": "50",
            "description": "<p>The number of rows to be fetched</p>"
          },
          {
            "group": "Query parameters",
            "type": "Integer",
            "optional": true,
            "field": "offset",
            "defaultValue": "0",
            "description": "<p>The offset by which rows will be fetched</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "synchro_credentialss",
            "description": "<p>List of synchro_credentials</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "synchro_credentialss.id",
            "description": "<p><code>id</code> of synchro_credentials</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "synchro_credentialss.version",
            "description": "<p><code>version</code> of synchro_credentials</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "synchro_credentialss.createdBy",
            "description": "<p><code>createdBy</code> of synchro_credentials</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "synchro_credentialss.updatedBy",
            "description": "<p><code>updatedBy</code> of synchro_credentials</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "synchro_credentialss.f_cloud_host",
            "description": "<p><code>f_cloud_host</code> of synchro_credentials</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "synchro_credentialss.f_client_key",
            "description": "<p><code>f_client_key</code> of synchro_credentials</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "synchro_credentialss.f_client_secret",
            "description": "<p><code>f_client_secret</code> of synchro_credentials</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "limit",
            "description": "<p>Limit used to fetch data</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "offset",
            "description": "<p>Offset used to fetch data</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "totalCount",
            "description": "<p>The total count of records for synchro_credentials</p>"
          }
        ]
      }
    },
    "filename": "/usr/src/app/workspace/a_cockpit/api/doc/doc_descriptor.js",
    "groupTitle": "Synchro_credentials",
    "name": "GetApiSynchro_credentialsTokenToken"
  },
  {
    "type": "post",
    "url": "/api/synchro_credentials/?token=TOKEN",
    "title": "3 - Create",
    "version": "1.0.0",
    "description": "<p>Create a record of <code>synchro_credentials</code> using values defined in request's <code>body</code></p>",
    "group": "Synchro_credentials",
    "parameter": {
      "fields": {
        "Body parameters": [
          {
            "group": "Body parameters",
            "type": "String",
            "optional": true,
            "field": "createdBy",
            "description": "<p><code>createdBy</code> of synchro_credentials</p>"
          },
          {
            "group": "Body parameters",
            "type": "String",
            "optional": true,
            "field": "updatedBy",
            "description": "<p><code>updatedBy</code> of synchro_credentials</p>"
          },
          {
            "group": "Body parameters",
            "type": "String",
            "optional": true,
            "field": "f_cloud_host",
            "description": "<p><code>f_cloud_host</code> of synchro_credentials</p>"
          },
          {
            "group": "Body parameters",
            "type": "String",
            "optional": true,
            "field": "f_client_key",
            "description": "<p><code>f_client_key</code> of synchro_credentials</p>"
          },
          {
            "group": "Body parameters",
            "type": "String",
            "optional": true,
            "field": "f_client_secret",
            "description": "<p><code>f_client_secret</code> of synchro_credentials</p>"
          }
        ],
        "Query parameters": [
          {
            "group": "Query parameters",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>API Bearer Token, required for authentication</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "synchro_credentials",
            "description": "<p>Created synchro_credentials</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "synchro_credentials.id",
            "description": "<p><code>id</code> of synchro_credentials</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "synchro_credentials.createdBy",
            "description": "<p><code>createdBy</code> of synchro_credentials</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "synchro_credentials.updatedBy",
            "description": "<p><code>updatedBy</code> of synchro_credentials</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "synchro_credentials.f_cloud_host",
            "description": "<p><code>f_cloud_host</code> of synchro_credentials</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "synchro_credentials.f_client_key",
            "description": "<p><code>f_client_key</code> of synchro_credentials</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "synchro_credentials.f_client_secret",
            "description": "<p><code>f_client_secret</code> of synchro_credentials</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 500": [
          {
            "group": "Error 500",
            "type": "Object",
            "optional": false,
            "field": "ServerError",
            "description": "<p>An error occured when trying to create synchro_credentials</p>"
          }
        ]
      }
    },
    "filename": "/usr/src/app/workspace/a_cockpit/api/doc/doc_descriptor.js",
    "groupTitle": "Synchro_credentials",
    "name": "PostApiSynchro_credentialsTokenToken"
  },
  {
    "type": "put",
    "url": "/api/synchro_credentials/:id?token=TOKEN",
    "title": "4 - Update",
    "version": "1.0.0",
    "description": "<p>Update record of <code>synchro_credentials</code> with <code>id</code> using values defined in request's <code>body</code></p>",
    "group": "Synchro_credentials",
    "parameter": {
      "fields": {
        "Params parameters": [
          {
            "group": "Params parameters",
            "type": "Integer",
            "optional": false,
            "field": "id",
            "description": "<p><code>id</code> of the synchro_credentials to update</p>"
          }
        ],
        "Body parameters": [
          {
            "group": "Body parameters",
            "type": "String",
            "optional": true,
            "field": "createdBy",
            "description": "<p>New value of <code>createdBy</code> for synchro_credentials</p>"
          },
          {
            "group": "Body parameters",
            "type": "String",
            "optional": true,
            "field": "updatedBy",
            "description": "<p>New value of <code>updatedBy</code> for synchro_credentials</p>"
          },
          {
            "group": "Body parameters",
            "type": "String",
            "optional": true,
            "field": "f_cloud_host",
            "description": "<p>New value of <code>f_cloud_host</code> for synchro_credentials</p>"
          },
          {
            "group": "Body parameters",
            "type": "String",
            "optional": true,
            "field": "f_client_key",
            "description": "<p>New value of <code>f_client_key</code> for synchro_credentials</p>"
          },
          {
            "group": "Body parameters",
            "type": "String",
            "optional": true,
            "field": "f_client_secret",
            "description": "<p>New value of <code>f_client_secret</code> for synchro_credentials</p>"
          }
        ],
        "Query parameters": [
          {
            "group": "Query parameters",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>API Bearer Token, required for authentication</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "synchro_credentials",
            "description": "<p>Updated synchro_credentials</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "synchro_credentials.id",
            "description": "<p><code>id</code> of synchro_credentials</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "synchro_credentials.createdBy",
            "description": "<p><code>createdBy</code> of synchro_credentials</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "synchro_credentials.updatedBy",
            "description": "<p><code>updatedBy</code> of synchro_credentials</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "synchro_credentials.f_cloud_host",
            "description": "<p><code>f_cloud_host</code> of synchro_credentials</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "synchro_credentials.f_client_key",
            "description": "<p><code>f_client_key</code> of synchro_credentials</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "synchro_credentials.f_client_secret",
            "description": "<p><code>f_client_secret</code> of synchro_credentials</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 404": [
          {
            "group": "Error 404",
            "type": "Object",
            "optional": false,
            "field": "NotFound",
            "description": "<p>No synchro_credentials with ID <code>id</code> found</p>"
          }
        ],
        "Error 500": [
          {
            "group": "Error 500",
            "type": "Object",
            "optional": false,
            "field": "ServerError",
            "description": "<p>An error occured when trying to update synchro_credentials</p>"
          }
        ]
      }
    },
    "filename": "/usr/src/app/workspace/a_cockpit/api/doc/doc_descriptor.js",
    "groupTitle": "Synchro_credentials",
    "name": "PutApiSynchro_credentialsIdTokenToken"
  },
  {
    "type": "delete",
    "url": "/api/synchronization/:id?token=TOKEN",
    "title": "5 - Delete",
    "version": "1.0.0",
    "description": "<p>Permanently delete a record of <code>synchronization</code> with <code>id</code></p>",
    "group": "Synchronization",
    "parameter": {
      "fields": {
        "Params parameters": [
          {
            "group": "Params parameters",
            "type": "Integer",
            "optional": false,
            "field": "id",
            "description": "<p><code>id</code> of synchronization to delete</p>"
          }
        ],
        "Query parameters": [
          {
            "group": "Query parameters",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>API Bearer Token, required for authentication</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 404": [
          {
            "group": "Error 404",
            "type": "Object",
            "optional": false,
            "field": "NotFound",
            "description": "<p>No synchronization with ID <code>id</code> found</p>"
          }
        ]
      }
    },
    "filename": "/usr/src/app/workspace/a_cockpit/api/doc/doc_descriptor.js",
    "groupTitle": "Synchronization",
    "name": "DeleteApiSynchronizationIdTokenToken"
  },
  {
    "type": "get",
    "url": "/api/synchronization/:id/:association?token=TOKEN",
    "title": "2.a - Find association",
    "version": "1.0.0",
    "description": "<p>Fetch records of <code>synchronization</code>'s <code>association</code> from <code>offset</code> until <code>limit</code></p>",
    "group": "Synchronization",
    "parameter": {
      "fields": {
        "Params parameters": [
          {
            "group": "Params parameters",
            "type": "Integer",
            "optional": false,
            "field": "id",
            "description": "<p><code>id</code> of the synchronization to which <code>association</code> is related</p>"
          },
          {
            "group": "Params parameters",
            "type": "String",
            "allowedValues": [
              "api_credentials"
            ],
            "optional": false,
            "field": "association",
            "description": "<p>Name of the related entity</p>"
          }
        ],
        "Query parameters": [
          {
            "group": "Query parameters",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>API Bearer Token, required for authentication</p>"
          },
          {
            "group": "Query parameters",
            "type": "Integer",
            "optional": true,
            "field": "limit",
            "defaultValue": "50",
            "description": "<p>The number of rows to be fetched</p>"
          },
          {
            "group": "Query parameters",
            "type": "Integer",
            "optional": true,
            "field": "offset",
            "defaultValue": "0",
            "description": "<p>The offset by which rows will be fetched</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "Object",
            "description": "<p>Object of <code>association</code></p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "limit",
            "description": "<p>Limit used to fetch data</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "offset",
            "description": "<p>Offset used to fetch data</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 404": [
          {
            "group": "Error 404",
            "type": "Object",
            "optional": false,
            "field": "NotFound",
            "description": "<p>No synchronization with ID <code>id</code> found</p>"
          },
          {
            "group": "Error 404",
            "type": "Object",
            "optional": false,
            "field": "AssociationNotFound",
            "description": "<p>No association with <code>association</code></p>"
          }
        ]
      }
    },
    "filename": "/usr/src/app/workspace/a_cockpit/api/doc/doc_descriptor.js",
    "groupTitle": "Synchronization",
    "name": "GetApiSynchronizationIdAssociationTokenToken"
  },
  {
    "type": "get",
    "url": "/api/synchronization/:id?token=TOKEN",
    "title": "2 - Find one",
    "version": "1.0.0",
    "description": "<p>Fetch one record of <code>synchronization</code> with <code>id</code></p>",
    "group": "Synchronization",
    "parameter": {
      "fields": {
        "Query parameters": [
          {
            "group": "Query parameters",
            "type": "String",
            "allowedValues": [
              "r_api_credentials"
            ],
            "optional": true,
            "field": "include",
            "description": "<p>Include specified association(s) to each <code>synchronization</code> result.<br>Multiple values can be given separated by a comma <br><br>Ex: ?include=r_asso1,r_asso2</p>"
          },
          {
            "group": "Query parameters",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>API Bearer Token, required for authentication</p>"
          }
        ],
        "Params parameters": [
          {
            "group": "Params parameters",
            "type": "Integer",
            "optional": false,
            "field": "id",
            "description": "<p>The <code>id</code> of synchronization to fetch</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "synchronization",
            "description": "<p>Object of synchronization</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "synchronization.id",
            "description": "<p><code>id</code> of synchronization</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "synchronization.version",
            "description": "<p><code>version</code> of synchronization</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "synchronization.createdBy",
            "description": "<p><code>createdBy</code> of synchronization</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "synchronization.updatedBy",
            "description": "<p><code>updatedBy</code> of synchronization</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "synchronization.f_journal_backup_file",
            "description": "<p><code>f_journal_backup_file</code> of synchronization</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 404": [
          {
            "group": "Error 404",
            "type": "Object",
            "optional": false,
            "field": "NotFound",
            "description": "<p>No synchronization with ID <code>id</code> found</p>"
          }
        ]
      }
    },
    "filename": "/usr/src/app/workspace/a_cockpit/api/doc/doc_descriptor.js",
    "groupTitle": "Synchronization",
    "name": "GetApiSynchronizationIdTokenToken"
  },
  {
    "type": "get",
    "url": "/api/synchronization?token=TOKEN",
    "title": "1 - Find all",
    "version": "1.0.0",
    "description": "<p>Fetch records of <code>synchronization</code> from <code>offset</code> until <code>limit</code></p>",
    "group": "Synchronization",
    "parameter": {
      "fields": {
        "Query parameters": [
          {
            "group": "Query parameters",
            "type": "String",
            "allowedValues": [
              "r_api_credentials"
            ],
            "optional": true,
            "field": "include",
            "description": "<p>Include specified association(s) to each <code>synchronization</code> result.<br>Multiple values can be given separated by a comma <br><br>Ex: ?include=r_asso1,r_asso2</p>"
          },
          {
            "group": "Query parameters",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>API Bearer Token, required for authentication</p>"
          },
          {
            "group": "Query parameters",
            "type": "Integer",
            "optional": true,
            "field": "limit",
            "defaultValue": "50",
            "description": "<p>The number of rows to be fetched</p>"
          },
          {
            "group": "Query parameters",
            "type": "Integer",
            "optional": true,
            "field": "offset",
            "defaultValue": "0",
            "description": "<p>The offset by which rows will be fetched</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "synchronizations",
            "description": "<p>List of synchronization</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "synchronizations.id",
            "description": "<p><code>id</code> of synchronization</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "synchronizations.version",
            "description": "<p><code>version</code> of synchronization</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "synchronizations.createdBy",
            "description": "<p><code>createdBy</code> of synchronization</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "synchronizations.updatedBy",
            "description": "<p><code>updatedBy</code> of synchronization</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "synchronizations.f_journal_backup_file",
            "description": "<p><code>f_journal_backup_file</code> of synchronization</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "limit",
            "description": "<p>Limit used to fetch data</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "offset",
            "description": "<p>Offset used to fetch data</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "totalCount",
            "description": "<p>The total count of records for synchronization</p>"
          }
        ]
      }
    },
    "filename": "/usr/src/app/workspace/a_cockpit/api/doc/doc_descriptor.js",
    "groupTitle": "Synchronization",
    "name": "GetApiSynchronizationTokenToken"
  },
  {
    "type": "post",
    "url": "/api/synchronization/?token=TOKEN",
    "title": "3 - Create",
    "version": "1.0.0",
    "description": "<p>Create a record of <code>synchronization</code> using values defined in request's <code>body</code></p>",
    "group": "Synchronization",
    "parameter": {
      "fields": {
        "Body parameters": [
          {
            "group": "Body parameters",
            "type": "String",
            "optional": true,
            "field": "createdBy",
            "description": "<p><code>createdBy</code> of synchronization</p>"
          },
          {
            "group": "Body parameters",
            "type": "String",
            "optional": true,
            "field": "updatedBy",
            "description": "<p><code>updatedBy</code> of synchronization</p>"
          },
          {
            "group": "Body parameters",
            "type": "String",
            "optional": true,
            "field": "f_journal_backup_file",
            "description": "<p><code>f_journal_backup_file</code> of synchronization</p>"
          },
          {
            "group": "Body parameters",
            "type": "Integer",
            "optional": true,
            "field": "fk_id_api_credentials",
            "description": "<p><code>id</code> of entity api_credentials to associate</p>"
          }
        ],
        "Query parameters": [
          {
            "group": "Query parameters",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>API Bearer Token, required for authentication</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "synchronization",
            "description": "<p>Created synchronization</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "synchronization.id",
            "description": "<p><code>id</code> of synchronization</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "synchronization.createdBy",
            "description": "<p><code>createdBy</code> of synchronization</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "synchronization.updatedBy",
            "description": "<p><code>updatedBy</code> of synchronization</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "synchronization.f_journal_backup_file",
            "description": "<p><code>f_journal_backup_file</code> of synchronization</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 500": [
          {
            "group": "Error 500",
            "type": "Object",
            "optional": false,
            "field": "ServerError",
            "description": "<p>An error occured when trying to create synchronization</p>"
          }
        ]
      }
    },
    "filename": "/usr/src/app/workspace/a_cockpit/api/doc/doc_descriptor.js",
    "groupTitle": "Synchronization",
    "name": "PostApiSynchronizationTokenToken"
  },
  {
    "type": "put",
    "url": "/api/synchronization/:id?token=TOKEN",
    "title": "4 - Update",
    "version": "1.0.0",
    "description": "<p>Update record of <code>synchronization</code> with <code>id</code> using values defined in request's <code>body</code></p>",
    "group": "Synchronization",
    "parameter": {
      "fields": {
        "Params parameters": [
          {
            "group": "Params parameters",
            "type": "Integer",
            "optional": false,
            "field": "id",
            "description": "<p><code>id</code> of the synchronization to update</p>"
          }
        ],
        "Body parameters": [
          {
            "group": "Body parameters",
            "type": "String",
            "optional": true,
            "field": "createdBy",
            "description": "<p>New value of <code>createdBy</code> for synchronization</p>"
          },
          {
            "group": "Body parameters",
            "type": "String",
            "optional": true,
            "field": "updatedBy",
            "description": "<p>New value of <code>updatedBy</code> for synchronization</p>"
          },
          {
            "group": "Body parameters",
            "type": "String",
            "optional": true,
            "field": "f_journal_backup_file",
            "description": "<p>New value of <code>f_journal_backup_file</code> for synchronization</p>"
          },
          {
            "group": "Body parameters",
            "type": "Integer",
            "optional": true,
            "field": "fk_id_api_credentials",
            "description": "<p><code>id</code> of entity api_credentials to associate</p>"
          }
        ],
        "Query parameters": [
          {
            "group": "Query parameters",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>API Bearer Token, required for authentication</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "synchronization",
            "description": "<p>Updated synchronization</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "synchronization.id",
            "description": "<p><code>id</code> of synchronization</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "synchronization.createdBy",
            "description": "<p><code>createdBy</code> of synchronization</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "synchronization.updatedBy",
            "description": "<p><code>updatedBy</code> of synchronization</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "synchronization.f_journal_backup_file",
            "description": "<p><code>f_journal_backup_file</code> of synchronization</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 404": [
          {
            "group": "Error 404",
            "type": "Object",
            "optional": false,
            "field": "NotFound",
            "description": "<p>No synchronization with ID <code>id</code> found</p>"
          }
        ],
        "Error 500": [
          {
            "group": "Error 500",
            "type": "Object",
            "optional": false,
            "field": "ServerError",
            "description": "<p>An error occured when trying to update synchronization</p>"
          }
        ]
      }
    },
    "filename": "/usr/src/app/workspace/a_cockpit/api/doc/doc_descriptor.js",
    "groupTitle": "Synchronization",
    "name": "PutApiSynchronizationIdTokenToken"
  },
  {
    "type": "delete",
    "url": "/api/task/:id?token=TOKEN",
    "title": "5 - Delete",
    "version": "1.0.0",
    "description": "<p>Permanently delete a record of <code>task</code> with <code>id</code></p>",
    "group": "Task",
    "parameter": {
      "fields": {
        "Params parameters": [
          {
            "group": "Params parameters",
            "type": "Integer",
            "optional": false,
            "field": "id",
            "description": "<p><code>id</code> of task to delete</p>"
          }
        ],
        "Query parameters": [
          {
            "group": "Query parameters",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>API Bearer Token, required for authentication</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 404": [
          {
            "group": "Error 404",
            "type": "Object",
            "optional": false,
            "field": "NotFound",
            "description": "<p>No task with ID <code>id</code> found</p>"
          }
        ]
      }
    },
    "filename": "/usr/src/app/workspace/a_cockpit/api/doc/doc_descriptor.js",
    "groupTitle": "Task",
    "name": "DeleteApiTaskIdTokenToken"
  },
  {
    "type": "get",
    "url": "/api/task/:id/:association?token=TOKEN",
    "title": "2.a - Find association",
    "version": "1.0.0",
    "description": "<p>Fetch records of <code>task</code>'s <code>association</code> from <code>offset</code> until <code>limit</code></p>",
    "group": "Task",
    "parameter": {
      "fields": {
        "Params parameters": [
          {
            "group": "Params parameters",
            "type": "Integer",
            "optional": false,
            "field": "id",
            "description": "<p><code>id</code> of the task to which <code>association</code> is related</p>"
          },
          {
            "group": "Params parameters",
            "type": "String",
            "allowedValues": [
              "history_task_state",
              "status",
              "robot",
              "documents_task"
            ],
            "optional": false,
            "field": "association",
            "description": "<p>Name of the related entity</p>"
          }
        ],
        "Query parameters": [
          {
            "group": "Query parameters",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>API Bearer Token, required for authentication</p>"
          },
          {
            "group": "Query parameters",
            "type": "Integer",
            "optional": true,
            "field": "limit",
            "defaultValue": "50",
            "description": "<p>The number of rows to be fetched</p>"
          },
          {
            "group": "Query parameters",
            "type": "Integer",
            "optional": true,
            "field": "offset",
            "defaultValue": "0",
            "description": "<p>The offset by which rows will be fetched</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "Object",
            "description": "<p>Object of <code>association</code></p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "limit",
            "description": "<p>Limit used to fetch data</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "offset",
            "description": "<p>Offset used to fetch data</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 404": [
          {
            "group": "Error 404",
            "type": "Object",
            "optional": false,
            "field": "NotFound",
            "description": "<p>No task with ID <code>id</code> found</p>"
          },
          {
            "group": "Error 404",
            "type": "Object",
            "optional": false,
            "field": "AssociationNotFound",
            "description": "<p>No association with <code>association</code></p>"
          }
        ]
      }
    },
    "filename": "/usr/src/app/workspace/a_cockpit/api/doc/doc_descriptor.js",
    "groupTitle": "Task",
    "name": "GetApiTaskIdAssociationTokenToken"
  },
  {
    "type": "get",
    "url": "/api/task/:id?token=TOKEN",
    "title": "2 - Find one",
    "version": "1.0.0",
    "description": "<p>Fetch one record of <code>task</code> with <code>id</code></p>",
    "group": "Task",
    "parameter": {
      "fields": {
        "Query parameters": [
          {
            "group": "Query parameters",
            "type": "String",
            "allowedValues": [
              "r_history_state",
              "r_state",
              "r_robot",
              "r_documents_task"
            ],
            "optional": true,
            "field": "include",
            "description": "<p>Include specified association(s) to each <code>task</code> result.<br>Multiple values can be given separated by a comma <br><br>Ex: ?include=r_asso1,r_asso2</p>"
          },
          {
            "group": "Query parameters",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>API Bearer Token, required for authentication</p>"
          }
        ],
        "Params parameters": [
          {
            "group": "Params parameters",
            "type": "Integer",
            "optional": false,
            "field": "id",
            "description": "<p>The <code>id</code> of task to fetch</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "task",
            "description": "<p>Object of task</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "task.id",
            "description": "<p><code>id</code> of task</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "task.version",
            "description": "<p><code>version</code> of task</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "task.createdBy",
            "description": "<p><code>createdBy</code> of task</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "task.updatedBy",
            "description": "<p><code>updatedBy</code> of task</p>"
          },
          {
            "group": "Success 200",
            "type": "Virtual",
            "optional": false,
            "field": "task.s_state",
            "description": "<p><code>s_state</code> of task</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "task.f_title",
            "description": "<p><code>f_title</code> of task</p>"
          },
          {
            "group": "Success 200",
            "type": "Enum",
            "optional": false,
            "field": "task.f_type",
            "description": "<p><code>f_type</code> of task</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "task.f_planned_date",
            "description": "<p><code>f_planned_date</code> of task</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "task.f_execution_start_date",
            "description": "<p><code>f_execution_start_date</code> of task</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "task.f_execution_finish_date",
            "description": "<p><code>f_execution_finish_date</code> of task</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "task.f_duration",
            "description": "<p><code>f_duration</code> of task</p>"
          },
          {
            "group": "Success 200",
            "type": "Text",
            "optional": false,
            "field": "task.f_data_flow",
            "description": "<p><code>f_data_flow</code> of task</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "task.f_program_file",
            "description": "<p><code>f_program_file</code> of task</p>"
          },
          {
            "group": "Success 200",
            "type": "Text",
            "optional": false,
            "field": "task.f_procedure",
            "description": "<p><code>f_procedure</code> of task</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 404": [
          {
            "group": "Error 404",
            "type": "Object",
            "optional": false,
            "field": "NotFound",
            "description": "<p>No task with ID <code>id</code> found</p>"
          }
        ]
      }
    },
    "filename": "/usr/src/app/workspace/a_cockpit/api/doc/doc_descriptor.js",
    "groupTitle": "Task",
    "name": "GetApiTaskIdTokenToken"
  },
  {
    "type": "get",
    "url": "/api/task?token=TOKEN",
    "title": "1 - Find all",
    "version": "1.0.0",
    "description": "<p>Fetch records of <code>task</code> from <code>offset</code> until <code>limit</code></p>",
    "group": "Task",
    "parameter": {
      "fields": {
        "Query parameters": [
          {
            "group": "Query parameters",
            "type": "String",
            "allowedValues": [
              "r_history_state",
              "r_state",
              "r_robot",
              "r_documents_task"
            ],
            "optional": true,
            "field": "include",
            "description": "<p>Include specified association(s) to each <code>task</code> result.<br>Multiple values can be given separated by a comma <br><br>Ex: ?include=r_asso1,r_asso2</p>"
          },
          {
            "group": "Query parameters",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>API Bearer Token, required for authentication</p>"
          },
          {
            "group": "Query parameters",
            "type": "Integer",
            "optional": true,
            "field": "limit",
            "defaultValue": "50",
            "description": "<p>The number of rows to be fetched</p>"
          },
          {
            "group": "Query parameters",
            "type": "Integer",
            "optional": true,
            "field": "offset",
            "defaultValue": "0",
            "description": "<p>The offset by which rows will be fetched</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "tasks",
            "description": "<p>List of task</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "tasks.id",
            "description": "<p><code>id</code> of task</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "tasks.version",
            "description": "<p><code>version</code> of task</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "tasks.createdBy",
            "description": "<p><code>createdBy</code> of task</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "tasks.updatedBy",
            "description": "<p><code>updatedBy</code> of task</p>"
          },
          {
            "group": "Success 200",
            "type": "Virtual",
            "optional": false,
            "field": "tasks.s_state",
            "description": "<p><code>s_state</code> of task</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "tasks.f_title",
            "description": "<p><code>f_title</code> of task</p>"
          },
          {
            "group": "Success 200",
            "type": "Enum",
            "optional": false,
            "field": "tasks.f_type",
            "description": "<p><code>f_type</code> of task</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "tasks.f_planned_date",
            "description": "<p><code>f_planned_date</code> of task</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "tasks.f_execution_start_date",
            "description": "<p><code>f_execution_start_date</code> of task</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "tasks.f_execution_finish_date",
            "description": "<p><code>f_execution_finish_date</code> of task</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "tasks.f_duration",
            "description": "<p><code>f_duration</code> of task</p>"
          },
          {
            "group": "Success 200",
            "type": "Text",
            "optional": false,
            "field": "tasks.f_data_flow",
            "description": "<p><code>f_data_flow</code> of task</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "tasks.f_program_file",
            "description": "<p><code>f_program_file</code> of task</p>"
          },
          {
            "group": "Success 200",
            "type": "Text",
            "optional": false,
            "field": "tasks.f_procedure",
            "description": "<p><code>f_procedure</code> of task</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "limit",
            "description": "<p>Limit used to fetch data</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "offset",
            "description": "<p>Offset used to fetch data</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "totalCount",
            "description": "<p>The total count of records for task</p>"
          }
        ]
      }
    },
    "filename": "/usr/src/app/workspace/a_cockpit/api/doc/doc_descriptor.js",
    "groupTitle": "Task",
    "name": "GetApiTaskTokenToken"
  },
  {
    "type": "post",
    "url": "/api/task/?token=TOKEN",
    "title": "3 - Create",
    "version": "1.0.0",
    "description": "<p>Create a record of <code>task</code> using values defined in request's <code>body</code></p>",
    "group": "Task",
    "parameter": {
      "fields": {
        "Body parameters": [
          {
            "group": "Body parameters",
            "type": "String",
            "optional": true,
            "field": "createdBy",
            "description": "<p><code>createdBy</code> of task</p>"
          },
          {
            "group": "Body parameters",
            "type": "String",
            "optional": true,
            "field": "updatedBy",
            "description": "<p><code>updatedBy</code> of task</p>"
          },
          {
            "group": "Body parameters",
            "type": "Virtual",
            "optional": true,
            "field": "s_state",
            "description": "<p><code>s_state</code> of task</p>"
          },
          {
            "group": "Body parameters",
            "type": "String",
            "optional": true,
            "field": "f_title",
            "description": "<p><code>f_title</code> of task</p>"
          },
          {
            "group": "Body parameters",
            "type": "Enum",
            "optional": true,
            "field": "f_type",
            "description": "<p><code>f_type</code> of task</p>"
          },
          {
            "group": "Body parameters",
            "type": "Date",
            "optional": true,
            "field": "f_planned_date",
            "description": "<p><code>f_planned_date</code> of task</p>"
          },
          {
            "group": "Body parameters",
            "type": "Date",
            "optional": true,
            "field": "f_execution_start_date",
            "description": "<p><code>f_execution_start_date</code> of task</p>"
          },
          {
            "group": "Body parameters",
            "type": "Date",
            "optional": true,
            "field": "f_execution_finish_date",
            "description": "<p><code>f_execution_finish_date</code> of task</p>"
          },
          {
            "group": "Body parameters",
            "type": "String",
            "optional": true,
            "field": "f_duration",
            "description": "<p><code>f_duration</code> of task</p>"
          },
          {
            "group": "Body parameters",
            "type": "Text",
            "optional": true,
            "field": "f_data_flow",
            "description": "<p><code>f_data_flow</code> of task</p>"
          },
          {
            "group": "Body parameters",
            "type": "String",
            "optional": true,
            "field": "f_program_file",
            "description": "<p><code>f_program_file</code> of task</p>"
          },
          {
            "group": "Body parameters",
            "type": "Text",
            "optional": true,
            "field": "f_procedure",
            "description": "<p><code>f_procedure</code> of task</p>"
          },
          {
            "group": "Body parameters",
            "type": "Integer",
            "optional": true,
            "field": "fk_id_task_history_state",
            "description": "<p><code>id</code> of entity history_task_state to associate</p>"
          },
          {
            "group": "Body parameters",
            "type": "Integer",
            "optional": true,
            "field": "fk_id_status_state",
            "description": "<p><code>id</code> of entity status to associate</p>"
          },
          {
            "group": "Body parameters",
            "type": "Integer",
            "optional": true,
            "field": "fk_id_robot_robot",
            "description": "<p><code>id</code> of entity robot to associate</p>"
          },
          {
            "group": "Body parameters",
            "type": "Integer",
            "optional": true,
            "field": "fk_id_task",
            "description": "<p><code>id</code> of entity documents_task to associate</p>"
          }
        ],
        "Query parameters": [
          {
            "group": "Query parameters",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>API Bearer Token, required for authentication</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "task",
            "description": "<p>Created task</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "task.id",
            "description": "<p><code>id</code> of task</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "task.createdBy",
            "description": "<p><code>createdBy</code> of task</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "task.updatedBy",
            "description": "<p><code>updatedBy</code> of task</p>"
          },
          {
            "group": "Success 200",
            "type": "Virtual",
            "optional": false,
            "field": "task.s_state",
            "description": "<p><code>s_state</code> of task</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "task.f_title",
            "description": "<p><code>f_title</code> of task</p>"
          },
          {
            "group": "Success 200",
            "type": "Enum",
            "optional": false,
            "field": "task.f_type",
            "description": "<p><code>f_type</code> of task</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "task.f_planned_date",
            "description": "<p><code>f_planned_date</code> of task</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "task.f_execution_start_date",
            "description": "<p><code>f_execution_start_date</code> of task</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "task.f_execution_finish_date",
            "description": "<p><code>f_execution_finish_date</code> of task</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "task.f_duration",
            "description": "<p><code>f_duration</code> of task</p>"
          },
          {
            "group": "Success 200",
            "type": "Text",
            "optional": false,
            "field": "task.f_data_flow",
            "description": "<p><code>f_data_flow</code> of task</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "task.f_program_file",
            "description": "<p><code>f_program_file</code> of task</p>"
          },
          {
            "group": "Success 200",
            "type": "Text",
            "optional": false,
            "field": "task.f_procedure",
            "description": "<p><code>f_procedure</code> of task</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 500": [
          {
            "group": "Error 500",
            "type": "Object",
            "optional": false,
            "field": "ServerError",
            "description": "<p>An error occured when trying to create task</p>"
          }
        ]
      }
    },
    "filename": "/usr/src/app/workspace/a_cockpit/api/doc/doc_descriptor.js",
    "groupTitle": "Task",
    "name": "PostApiTaskTokenToken"
  },
  {
    "type": "put",
    "url": "/api/task/:id?token=TOKEN",
    "title": "4 - Update",
    "version": "1.0.0",
    "description": "<p>Update record of <code>task</code> with <code>id</code> using values defined in request's <code>body</code></p>",
    "group": "Task",
    "parameter": {
      "fields": {
        "Params parameters": [
          {
            "group": "Params parameters",
            "type": "Integer",
            "optional": false,
            "field": "id",
            "description": "<p><code>id</code> of the task to update</p>"
          }
        ],
        "Body parameters": [
          {
            "group": "Body parameters",
            "type": "String",
            "optional": true,
            "field": "createdBy",
            "description": "<p>New value of <code>createdBy</code> for task</p>"
          },
          {
            "group": "Body parameters",
            "type": "String",
            "optional": true,
            "field": "updatedBy",
            "description": "<p>New value of <code>updatedBy</code> for task</p>"
          },
          {
            "group": "Body parameters",
            "type": "Virtual",
            "optional": true,
            "field": "s_state",
            "description": "<p>New value of <code>s_state</code> for task</p>"
          },
          {
            "group": "Body parameters",
            "type": "String",
            "optional": true,
            "field": "f_title",
            "description": "<p>New value of <code>f_title</code> for task</p>"
          },
          {
            "group": "Body parameters",
            "type": "Enum",
            "optional": true,
            "field": "f_type",
            "description": "<p>New value of <code>f_type</code> for task</p>"
          },
          {
            "group": "Body parameters",
            "type": "Date",
            "optional": true,
            "field": "f_planned_date",
            "description": "<p>New value of <code>f_planned_date</code> for task</p>"
          },
          {
            "group": "Body parameters",
            "type": "Date",
            "optional": true,
            "field": "f_execution_start_date",
            "description": "<p>New value of <code>f_execution_start_date</code> for task</p>"
          },
          {
            "group": "Body parameters",
            "type": "Date",
            "optional": true,
            "field": "f_execution_finish_date",
            "description": "<p>New value of <code>f_execution_finish_date</code> for task</p>"
          },
          {
            "group": "Body parameters",
            "type": "String",
            "optional": true,
            "field": "f_duration",
            "description": "<p>New value of <code>f_duration</code> for task</p>"
          },
          {
            "group": "Body parameters",
            "type": "Text",
            "optional": true,
            "field": "f_data_flow",
            "description": "<p>New value of <code>f_data_flow</code> for task</p>"
          },
          {
            "group": "Body parameters",
            "type": "String",
            "optional": true,
            "field": "f_program_file",
            "description": "<p>New value of <code>f_program_file</code> for task</p>"
          },
          {
            "group": "Body parameters",
            "type": "Text",
            "optional": true,
            "field": "f_procedure",
            "description": "<p>New value of <code>f_procedure</code> for task</p>"
          },
          {
            "group": "Body parameters",
            "type": "Integer",
            "optional": true,
            "field": "fk_id_task_history_state",
            "description": "<p><code>id</code> of entity history_task_state to associate</p>"
          },
          {
            "group": "Body parameters",
            "type": "Integer",
            "optional": true,
            "field": "fk_id_status_state",
            "description": "<p><code>id</code> of entity status to associate</p>"
          },
          {
            "group": "Body parameters",
            "type": "Integer",
            "optional": true,
            "field": "fk_id_robot_robot",
            "description": "<p><code>id</code> of entity robot to associate</p>"
          },
          {
            "group": "Body parameters",
            "type": "Integer",
            "optional": true,
            "field": "fk_id_task",
            "description": "<p><code>id</code> of entity documents_task to associate</p>"
          }
        ],
        "Query parameters": [
          {
            "group": "Query parameters",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>API Bearer Token, required for authentication</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "task",
            "description": "<p>Updated task</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "task.id",
            "description": "<p><code>id</code> of task</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "task.createdBy",
            "description": "<p><code>createdBy</code> of task</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "task.updatedBy",
            "description": "<p><code>updatedBy</code> of task</p>"
          },
          {
            "group": "Success 200",
            "type": "Virtual",
            "optional": false,
            "field": "task.s_state",
            "description": "<p><code>s_state</code> of task</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "task.f_title",
            "description": "<p><code>f_title</code> of task</p>"
          },
          {
            "group": "Success 200",
            "type": "Enum",
            "optional": false,
            "field": "task.f_type",
            "description": "<p><code>f_type</code> of task</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "task.f_planned_date",
            "description": "<p><code>f_planned_date</code> of task</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "task.f_execution_start_date",
            "description": "<p><code>f_execution_start_date</code> of task</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "task.f_execution_finish_date",
            "description": "<p><code>f_execution_finish_date</code> of task</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "task.f_duration",
            "description": "<p><code>f_duration</code> of task</p>"
          },
          {
            "group": "Success 200",
            "type": "Text",
            "optional": false,
            "field": "task.f_data_flow",
            "description": "<p><code>f_data_flow</code> of task</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "task.f_program_file",
            "description": "<p><code>f_program_file</code> of task</p>"
          },
          {
            "group": "Success 200",
            "type": "Text",
            "optional": false,
            "field": "task.f_procedure",
            "description": "<p><code>f_procedure</code> of task</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 404": [
          {
            "group": "Error 404",
            "type": "Object",
            "optional": false,
            "field": "NotFound",
            "description": "<p>No task with ID <code>id</code> found</p>"
          }
        ],
        "Error 500": [
          {
            "group": "Error 500",
            "type": "Object",
            "optional": false,
            "field": "ServerError",
            "description": "<p>An error occured when trying to update task</p>"
          }
        ]
      }
    },
    "filename": "/usr/src/app/workspace/a_cockpit/api/doc/doc_descriptor.js",
    "groupTitle": "Task",
    "name": "PutApiTaskIdTokenToken"
  },
  {
    "type": "delete",
    "url": "/api/translation/:id?token=TOKEN",
    "title": "5 - Delete",
    "version": "1.0.0",
    "description": "<p>Permanently delete a record of <code>translation</code> with <code>id</code></p>",
    "group": "Translation",
    "parameter": {
      "fields": {
        "Params parameters": [
          {
            "group": "Params parameters",
            "type": "Integer",
            "optional": false,
            "field": "id",
            "description": "<p><code>id</code> of translation to delete</p>"
          }
        ],
        "Query parameters": [
          {
            "group": "Query parameters",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>API Bearer Token, required for authentication</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 404": [
          {
            "group": "Error 404",
            "type": "Object",
            "optional": false,
            "field": "NotFound",
            "description": "<p>No translation with ID <code>id</code> found</p>"
          }
        ]
      }
    },
    "filename": "/usr/src/app/workspace/a_cockpit/api/doc/doc_descriptor.js",
    "groupTitle": "Translation",
    "name": "DeleteApiTranslationIdTokenToken"
  },
  {
    "type": "get",
    "url": "/api/translation/:id/:association?token=TOKEN",
    "title": "2.a - Find association",
    "version": "1.0.0",
    "description": "<p>Fetch records of <code>translation</code>'s <code>association</code> from <code>offset</code> until <code>limit</code></p>",
    "group": "Translation",
    "parameter": {
      "fields": {
        "Params parameters": [
          {
            "group": "Params parameters",
            "type": "Integer",
            "optional": false,
            "field": "id",
            "description": "<p><code>id</code> of the translation to which <code>association</code> is related</p>"
          },
          {
            "group": "Params parameters",
            "type": "String",
            "allowedValues": [
              "status"
            ],
            "optional": false,
            "field": "association",
            "description": "<p>Name of the related entity</p>"
          }
        ],
        "Query parameters": [
          {
            "group": "Query parameters",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>API Bearer Token, required for authentication</p>"
          },
          {
            "group": "Query parameters",
            "type": "Integer",
            "optional": true,
            "field": "limit",
            "defaultValue": "50",
            "description": "<p>The number of rows to be fetched</p>"
          },
          {
            "group": "Query parameters",
            "type": "Integer",
            "optional": true,
            "field": "offset",
            "defaultValue": "0",
            "description": "<p>The offset by which rows will be fetched</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "Object",
            "description": "<p>Object of <code>association</code></p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "limit",
            "description": "<p>Limit used to fetch data</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "offset",
            "description": "<p>Offset used to fetch data</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 404": [
          {
            "group": "Error 404",
            "type": "Object",
            "optional": false,
            "field": "NotFound",
            "description": "<p>No translation with ID <code>id</code> found</p>"
          },
          {
            "group": "Error 404",
            "type": "Object",
            "optional": false,
            "field": "AssociationNotFound",
            "description": "<p>No association with <code>association</code></p>"
          }
        ]
      }
    },
    "filename": "/usr/src/app/workspace/a_cockpit/api/doc/doc_descriptor.js",
    "groupTitle": "Translation",
    "name": "GetApiTranslationIdAssociationTokenToken"
  },
  {
    "type": "get",
    "url": "/api/translation/:id?token=TOKEN",
    "title": "2 - Find one",
    "version": "1.0.0",
    "description": "<p>Fetch one record of <code>translation</code> with <code>id</code></p>",
    "group": "Translation",
    "parameter": {
      "fields": {
        "Query parameters": [
          {
            "group": "Query parameters",
            "type": "String",
            "allowedValues": [
              "r_status_translations"
            ],
            "optional": true,
            "field": "include",
            "description": "<p>Include specified association(s) to each <code>translation</code> result.<br>Multiple values can be given separated by a comma <br><br>Ex: ?include=r_asso1,r_asso2</p>"
          },
          {
            "group": "Query parameters",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>API Bearer Token, required for authentication</p>"
          }
        ],
        "Params parameters": [
          {
            "group": "Params parameters",
            "type": "Integer",
            "optional": false,
            "field": "id",
            "description": "<p>The <code>id</code> of translation to fetch</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "translation",
            "description": "<p>Object of translation</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "translation.id",
            "description": "<p><code>id</code> of translation</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "translation.version",
            "description": "<p><code>version</code> of translation</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "translation.createdBy",
            "description": "<p><code>createdBy</code> of translation</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "translation.updatedBy",
            "description": "<p><code>updatedBy</code> of translation</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "translation.f_language",
            "description": "<p><code>f_language</code> of translation</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "translation.f_value",
            "description": "<p><code>f_value</code> of translation</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 404": [
          {
            "group": "Error 404",
            "type": "Object",
            "optional": false,
            "field": "NotFound",
            "description": "<p>No translation with ID <code>id</code> found</p>"
          }
        ]
      }
    },
    "filename": "/usr/src/app/workspace/a_cockpit/api/doc/doc_descriptor.js",
    "groupTitle": "Translation",
    "name": "GetApiTranslationIdTokenToken"
  },
  {
    "type": "get",
    "url": "/api/translation?token=TOKEN",
    "title": "1 - Find all",
    "version": "1.0.0",
    "description": "<p>Fetch records of <code>translation</code> from <code>offset</code> until <code>limit</code></p>",
    "group": "Translation",
    "parameter": {
      "fields": {
        "Query parameters": [
          {
            "group": "Query parameters",
            "type": "String",
            "allowedValues": [
              "r_status_translations"
            ],
            "optional": true,
            "field": "include",
            "description": "<p>Include specified association(s) to each <code>translation</code> result.<br>Multiple values can be given separated by a comma <br><br>Ex: ?include=r_asso1,r_asso2</p>"
          },
          {
            "group": "Query parameters",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>API Bearer Token, required for authentication</p>"
          },
          {
            "group": "Query parameters",
            "type": "Integer",
            "optional": true,
            "field": "limit",
            "defaultValue": "50",
            "description": "<p>The number of rows to be fetched</p>"
          },
          {
            "group": "Query parameters",
            "type": "Integer",
            "optional": true,
            "field": "offset",
            "defaultValue": "0",
            "description": "<p>The offset by which rows will be fetched</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "translations",
            "description": "<p>List of translation</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "translations.id",
            "description": "<p><code>id</code> of translation</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "translations.version",
            "description": "<p><code>version</code> of translation</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "translations.createdBy",
            "description": "<p><code>createdBy</code> of translation</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "translations.updatedBy",
            "description": "<p><code>updatedBy</code> of translation</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "translations.f_language",
            "description": "<p><code>f_language</code> of translation</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "translations.f_value",
            "description": "<p><code>f_value</code> of translation</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "limit",
            "description": "<p>Limit used to fetch data</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "offset",
            "description": "<p>Offset used to fetch data</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "totalCount",
            "description": "<p>The total count of records for translation</p>"
          }
        ]
      }
    },
    "filename": "/usr/src/app/workspace/a_cockpit/api/doc/doc_descriptor.js",
    "groupTitle": "Translation",
    "name": "GetApiTranslationTokenToken"
  },
  {
    "type": "post",
    "url": "/api/translation/?token=TOKEN",
    "title": "3 - Create",
    "version": "1.0.0",
    "description": "<p>Create a record of <code>translation</code> using values defined in request's <code>body</code></p>",
    "group": "Translation",
    "parameter": {
      "fields": {
        "Body parameters": [
          {
            "group": "Body parameters",
            "type": "String",
            "optional": true,
            "field": "createdBy",
            "description": "<p><code>createdBy</code> of translation</p>"
          },
          {
            "group": "Body parameters",
            "type": "String",
            "optional": true,
            "field": "updatedBy",
            "description": "<p><code>updatedBy</code> of translation</p>"
          },
          {
            "group": "Body parameters",
            "type": "String",
            "optional": true,
            "field": "f_language",
            "description": "<p><code>f_language</code> of translation</p>"
          },
          {
            "group": "Body parameters",
            "type": "String",
            "optional": true,
            "field": "f_value",
            "description": "<p><code>f_value</code> of translation</p>"
          },
          {
            "group": "Body parameters",
            "type": "Integer",
            "optional": true,
            "field": "fk_id_status_translations",
            "description": "<p><code>id</code> of entity status to associate</p>"
          }
        ],
        "Query parameters": [
          {
            "group": "Query parameters",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>API Bearer Token, required for authentication</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "translation",
            "description": "<p>Created translation</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "translation.id",
            "description": "<p><code>id</code> of translation</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "translation.createdBy",
            "description": "<p><code>createdBy</code> of translation</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "translation.updatedBy",
            "description": "<p><code>updatedBy</code> of translation</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "translation.f_language",
            "description": "<p><code>f_language</code> of translation</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "translation.f_value",
            "description": "<p><code>f_value</code> of translation</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 500": [
          {
            "group": "Error 500",
            "type": "Object",
            "optional": false,
            "field": "ServerError",
            "description": "<p>An error occured when trying to create translation</p>"
          }
        ]
      }
    },
    "filename": "/usr/src/app/workspace/a_cockpit/api/doc/doc_descriptor.js",
    "groupTitle": "Translation",
    "name": "PostApiTranslationTokenToken"
  },
  {
    "type": "put",
    "url": "/api/translation/:id?token=TOKEN",
    "title": "4 - Update",
    "version": "1.0.0",
    "description": "<p>Update record of <code>translation</code> with <code>id</code> using values defined in request's <code>body</code></p>",
    "group": "Translation",
    "parameter": {
      "fields": {
        "Params parameters": [
          {
            "group": "Params parameters",
            "type": "Integer",
            "optional": false,
            "field": "id",
            "description": "<p><code>id</code> of the translation to update</p>"
          }
        ],
        "Body parameters": [
          {
            "group": "Body parameters",
            "type": "String",
            "optional": true,
            "field": "createdBy",
            "description": "<p>New value of <code>createdBy</code> for translation</p>"
          },
          {
            "group": "Body parameters",
            "type": "String",
            "optional": true,
            "field": "updatedBy",
            "description": "<p>New value of <code>updatedBy</code> for translation</p>"
          },
          {
            "group": "Body parameters",
            "type": "String",
            "optional": true,
            "field": "f_language",
            "description": "<p>New value of <code>f_language</code> for translation</p>"
          },
          {
            "group": "Body parameters",
            "type": "String",
            "optional": true,
            "field": "f_value",
            "description": "<p>New value of <code>f_value</code> for translation</p>"
          },
          {
            "group": "Body parameters",
            "type": "Integer",
            "optional": true,
            "field": "fk_id_status_translations",
            "description": "<p><code>id</code> of entity status to associate</p>"
          }
        ],
        "Query parameters": [
          {
            "group": "Query parameters",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>API Bearer Token, required for authentication</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "translation",
            "description": "<p>Updated translation</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "translation.id",
            "description": "<p><code>id</code> of translation</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "translation.createdBy",
            "description": "<p><code>createdBy</code> of translation</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "translation.updatedBy",
            "description": "<p><code>updatedBy</code> of translation</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "translation.f_language",
            "description": "<p><code>f_language</code> of translation</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "translation.f_value",
            "description": "<p><code>f_value</code> of translation</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 404": [
          {
            "group": "Error 404",
            "type": "Object",
            "optional": false,
            "field": "NotFound",
            "description": "<p>No translation with ID <code>id</code> found</p>"
          }
        ],
        "Error 500": [
          {
            "group": "Error 500",
            "type": "Object",
            "optional": false,
            "field": "ServerError",
            "description": "<p>An error occured when trying to update translation</p>"
          }
        ]
      }
    },
    "filename": "/usr/src/app/workspace/a_cockpit/api/doc/doc_descriptor.js",
    "groupTitle": "Translation",
    "name": "PutApiTranslationIdTokenToken"
  },
  {
    "type": "delete",
    "url": "/api/user/:id?token=TOKEN",
    "title": "5 - Delete",
    "version": "1.0.0",
    "description": "<p>Permanently delete a record of <code>user</code> with <code>id</code></p>",
    "group": "User",
    "parameter": {
      "fields": {
        "Params parameters": [
          {
            "group": "Params parameters",
            "type": "Integer",
            "optional": false,
            "field": "id",
            "description": "<p><code>id</code> of user to delete</p>"
          }
        ],
        "Query parameters": [
          {
            "group": "Query parameters",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>API Bearer Token, required for authentication</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 404": [
          {
            "group": "Error 404",
            "type": "Object",
            "optional": false,
            "field": "NotFound",
            "description": "<p>No user with ID <code>id</code> found</p>"
          }
        ]
      }
    },
    "filename": "/usr/src/app/workspace/a_cockpit/api/doc/doc_descriptor.js",
    "groupTitle": "User",
    "name": "DeleteApiUserIdTokenToken"
  },
  {
    "type": "get",
    "url": "/api/user/:id/:association?token=TOKEN",
    "title": "2.a - Find association",
    "version": "1.0.0",
    "description": "<p>Fetch records of <code>user</code>'s <code>association</code> from <code>offset</code> until <code>limit</code></p>",
    "group": "User",
    "parameter": {
      "fields": {
        "Params parameters": [
          {
            "group": "Params parameters",
            "type": "Integer",
            "optional": false,
            "field": "id",
            "description": "<p><code>id</code> of the user to which <code>association</code> is related</p>"
          },
          {
            "group": "Params parameters",
            "type": "String",
            "allowedValues": [
              "role",
              "group",
              "notification"
            ],
            "optional": false,
            "field": "association",
            "description": "<p>Name of the related entity</p>"
          }
        ],
        "Query parameters": [
          {
            "group": "Query parameters",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>API Bearer Token, required for authentication</p>"
          },
          {
            "group": "Query parameters",
            "type": "Integer",
            "optional": true,
            "field": "limit",
            "defaultValue": "50",
            "description": "<p>The number of rows to be fetched</p>"
          },
          {
            "group": "Query parameters",
            "type": "Integer",
            "optional": true,
            "field": "offset",
            "defaultValue": "0",
            "description": "<p>The offset by which rows will be fetched</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "Object",
            "description": "<p>Object of <code>association</code></p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "limit",
            "description": "<p>Limit used to fetch data</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "offset",
            "description": "<p>Offset used to fetch data</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 404": [
          {
            "group": "Error 404",
            "type": "Object",
            "optional": false,
            "field": "NotFound",
            "description": "<p>No user with ID <code>id</code> found</p>"
          },
          {
            "group": "Error 404",
            "type": "Object",
            "optional": false,
            "field": "AssociationNotFound",
            "description": "<p>No association with <code>association</code></p>"
          }
        ]
      }
    },
    "filename": "/usr/src/app/workspace/a_cockpit/api/doc/doc_descriptor.js",
    "groupTitle": "User",
    "name": "GetApiUserIdAssociationTokenToken"
  },
  {
    "type": "get",
    "url": "/api/user/:id?token=TOKEN",
    "title": "2 - Find one",
    "version": "1.0.0",
    "description": "<p>Fetch one record of <code>user</code> with <code>id</code></p>",
    "group": "User",
    "parameter": {
      "fields": {
        "Query parameters": [
          {
            "group": "Query parameters",
            "type": "String",
            "allowedValues": [
              "r_role",
              "r_group",
              "r_notification"
            ],
            "optional": true,
            "field": "include",
            "description": "<p>Include specified association(s) to each <code>user</code> result.<br>Multiple values can be given separated by a comma <br><br>Ex: ?include=r_asso1,r_asso2</p>"
          },
          {
            "group": "Query parameters",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>API Bearer Token, required for authentication</p>"
          }
        ],
        "Params parameters": [
          {
            "group": "Params parameters",
            "type": "Integer",
            "optional": false,
            "field": "id",
            "description": "<p>The <code>id</code> of user to fetch</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "user",
            "description": "<p>Object of user</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "user.id",
            "description": "<p><code>id</code> of user</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "user.version",
            "description": "<p><code>version</code> of user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.createdBy",
            "description": "<p><code>createdBy</code> of user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.updatedBy",
            "description": "<p><code>updatedBy</code> of user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.f_login",
            "description": "<p><code>f_login</code> of user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.f_password",
            "description": "<p><code>f_password</code> of user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.f_email",
            "description": "<p><code>f_email</code> of user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.f_token_password_reset",
            "description": "<p><code>f_token_password_reset</code> of user</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "user.f_enabled",
            "description": "<p><code>f_enabled</code> of user</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 404": [
          {
            "group": "Error 404",
            "type": "Object",
            "optional": false,
            "field": "NotFound",
            "description": "<p>No user with ID <code>id</code> found</p>"
          }
        ]
      }
    },
    "filename": "/usr/src/app/workspace/a_cockpit/api/doc/doc_descriptor.js",
    "groupTitle": "User",
    "name": "GetApiUserIdTokenToken"
  },
  {
    "type": "get",
    "url": "/api/user?token=TOKEN",
    "title": "1 - Find all",
    "version": "1.0.0",
    "description": "<p>Fetch records of <code>user</code> from <code>offset</code> until <code>limit</code></p>",
    "group": "User",
    "parameter": {
      "fields": {
        "Query parameters": [
          {
            "group": "Query parameters",
            "type": "String",
            "allowedValues": [
              "r_role",
              "r_group",
              "r_notification"
            ],
            "optional": true,
            "field": "include",
            "description": "<p>Include specified association(s) to each <code>user</code> result.<br>Multiple values can be given separated by a comma <br><br>Ex: ?include=r_asso1,r_asso2</p>"
          },
          {
            "group": "Query parameters",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>API Bearer Token, required for authentication</p>"
          },
          {
            "group": "Query parameters",
            "type": "Integer",
            "optional": true,
            "field": "limit",
            "defaultValue": "50",
            "description": "<p>The number of rows to be fetched</p>"
          },
          {
            "group": "Query parameters",
            "type": "Integer",
            "optional": true,
            "field": "offset",
            "defaultValue": "0",
            "description": "<p>The offset by which rows will be fetched</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "users",
            "description": "<p>List of user</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "users.id",
            "description": "<p><code>id</code> of user</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "users.version",
            "description": "<p><code>version</code> of user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "users.createdBy",
            "description": "<p><code>createdBy</code> of user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "users.updatedBy",
            "description": "<p><code>updatedBy</code> of user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "users.f_login",
            "description": "<p><code>f_login</code> of user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "users.f_password",
            "description": "<p><code>f_password</code> of user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "users.f_email",
            "description": "<p><code>f_email</code> of user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "users.f_token_password_reset",
            "description": "<p><code>f_token_password_reset</code> of user</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "users.f_enabled",
            "description": "<p><code>f_enabled</code> of user</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "limit",
            "description": "<p>Limit used to fetch data</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "offset",
            "description": "<p>Offset used to fetch data</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "totalCount",
            "description": "<p>The total count of records for user</p>"
          }
        ]
      }
    },
    "filename": "/usr/src/app/workspace/a_cockpit/api/doc/doc_descriptor.js",
    "groupTitle": "User",
    "name": "GetApiUserTokenToken"
  },
  {
    "type": "post",
    "url": "/api/user/?token=TOKEN",
    "title": "3 - Create",
    "version": "1.0.0",
    "description": "<p>Create a record of <code>user</code> using values defined in request's <code>body</code></p>",
    "group": "User",
    "parameter": {
      "fields": {
        "Body parameters": [
          {
            "group": "Body parameters",
            "type": "String",
            "optional": true,
            "field": "createdBy",
            "description": "<p><code>createdBy</code> of user</p>"
          },
          {
            "group": "Body parameters",
            "type": "String",
            "optional": true,
            "field": "updatedBy",
            "description": "<p><code>updatedBy</code> of user</p>"
          },
          {
            "group": "Body parameters",
            "type": "String",
            "optional": true,
            "field": "f_login",
            "description": "<p><code>f_login</code> of user</p>"
          },
          {
            "group": "Body parameters",
            "type": "String",
            "optional": true,
            "field": "f_email",
            "description": "<p><code>f_email</code> of user</p>"
          }
        ],
        "Query parameters": [
          {
            "group": "Query parameters",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>API Bearer Token, required for authentication</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "user",
            "description": "<p>Created user</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "user.id",
            "description": "<p><code>id</code> of user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.createdBy",
            "description": "<p><code>createdBy</code> of user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.updatedBy",
            "description": "<p><code>updatedBy</code> of user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.f_login",
            "description": "<p><code>f_login</code> of user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.f_email",
            "description": "<p><code>f_email</code> of user</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 500": [
          {
            "group": "Error 500",
            "type": "Object",
            "optional": false,
            "field": "ServerError",
            "description": "<p>An error occured when trying to create user</p>"
          }
        ]
      }
    },
    "filename": "/usr/src/app/workspace/a_cockpit/api/doc/doc_descriptor.js",
    "groupTitle": "User",
    "name": "PostApiUserTokenToken"
  },
  {
    "type": "put",
    "url": "/api/user/:id?token=TOKEN",
    "title": "4 - Update",
    "version": "1.0.0",
    "description": "<p>Update record of <code>user</code> with <code>id</code> using values defined in request's <code>body</code></p>",
    "group": "User",
    "parameter": {
      "fields": {
        "Params parameters": [
          {
            "group": "Params parameters",
            "type": "Integer",
            "optional": false,
            "field": "id",
            "description": "<p><code>id</code> of the user to update</p>"
          }
        ],
        "Body parameters": [
          {
            "group": "Body parameters",
            "type": "String",
            "optional": true,
            "field": "createdBy",
            "description": "<p>New value of <code>createdBy</code> for user</p>"
          },
          {
            "group": "Body parameters",
            "type": "String",
            "optional": true,
            "field": "updatedBy",
            "description": "<p>New value of <code>updatedBy</code> for user</p>"
          },
          {
            "group": "Body parameters",
            "type": "String",
            "optional": true,
            "field": "f_login",
            "description": "<p>New value of <code>f_login</code> for user</p>"
          },
          {
            "group": "Body parameters",
            "type": "String",
            "optional": true,
            "field": "f_email",
            "description": "<p>New value of <code>f_email</code> for user</p>"
          }
        ],
        "Query parameters": [
          {
            "group": "Query parameters",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>API Bearer Token, required for authentication</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "user",
            "description": "<p>Updated user</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "user.id",
            "description": "<p><code>id</code> of user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.createdBy",
            "description": "<p><code>createdBy</code> of user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.updatedBy",
            "description": "<p><code>updatedBy</code> of user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.f_login",
            "description": "<p><code>f_login</code> of user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.f_email",
            "description": "<p><code>f_email</code> of user</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 404": [
          {
            "group": "Error 404",
            "type": "Object",
            "optional": false,
            "field": "NotFound",
            "description": "<p>No user with ID <code>id</code> found</p>"
          }
        ],
        "Error 500": [
          {
            "group": "Error 500",
            "type": "Object",
            "optional": false,
            "field": "ServerError",
            "description": "<p>An error occured when trying to update user</p>"
          }
        ]
      }
    },
    "filename": "/usr/src/app/workspace/a_cockpit/api/doc/doc_descriptor.js",
    "groupTitle": "User",
    "name": "PutApiUserIdTokenToken"
  },
  {
    "type": "delete",
    "url": "/api/user_guide/:id?token=TOKEN",
    "title": "5 - Delete",
    "version": "1.0.0",
    "description": "<p>Permanently delete a record of <code>user_guide</code> with <code>id</code></p>",
    "group": "User_Guide",
    "parameter": {
      "fields": {
        "Params parameters": [
          {
            "group": "Params parameters",
            "type": "Integer",
            "optional": false,
            "field": "id",
            "description": "<p><code>id</code> of user_guide to delete</p>"
          }
        ],
        "Query parameters": [
          {
            "group": "Query parameters",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>API Bearer Token, required for authentication</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 404": [
          {
            "group": "Error 404",
            "type": "Object",
            "optional": false,
            "field": "NotFound",
            "description": "<p>No user_guide with ID <code>id</code> found</p>"
          }
        ]
      }
    },
    "filename": "/usr/src/app/workspace/a_cockpit/api/doc/doc_descriptor.js",
    "groupTitle": "User_Guide",
    "name": "DeleteApiUser_guideIdTokenToken"
  },
  {
    "type": "get",
    "url": "/api/user_guide/:id?token=TOKEN",
    "title": "2 - Find one",
    "version": "1.0.0",
    "description": "<p>Fetch one record of <code>user_guide</code> with <code>id</code></p>",
    "group": "User_Guide",
    "parameter": {
      "fields": {
        "Query parameters) {String=} [include] Include specified association(s": [
          {
            "group": "Query parameters) {String=} [include] Include specified association(s",
            "optional": false,
            "field": "to",
            "description": "<p>each <code>user_guide</code> result.<br>Multiple values can be given separated by a comma <br><br>Ex: ?include=r_asso1,r_asso2</p>"
          }
        ],
        "Params parameters": [
          {
            "group": "Params parameters",
            "type": "Integer",
            "optional": false,
            "field": "id",
            "description": "<p>The <code>id</code> of user_guide to fetch</p>"
          }
        ],
        "Query parameters": [
          {
            "group": "Query parameters",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>API Bearer Token, required for authentication</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "user_guide",
            "description": "<p>Object of user_guide</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "user_guide.id",
            "description": "<p><code>id</code> of user_guide</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "user_guide.version",
            "description": "<p><code>version</code> of user_guide</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user_guide.createdBy",
            "description": "<p><code>createdBy</code> of user_guide</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user_guide.updatedBy",
            "description": "<p><code>updatedBy</code> of user_guide</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user_guide.f_file",
            "description": "<p><code>f_file</code> of user_guide</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 404": [
          {
            "group": "Error 404",
            "type": "Object",
            "optional": false,
            "field": "NotFound",
            "description": "<p>No user_guide with ID <code>id</code> found</p>"
          }
        ]
      }
    },
    "filename": "/usr/src/app/workspace/a_cockpit/api/doc/doc_descriptor.js",
    "groupTitle": "User_Guide",
    "name": "GetApiUser_guideIdTokenToken"
  },
  {
    "type": "get",
    "url": "/api/user_guide?token=TOKEN",
    "title": "1 - Find all",
    "version": "1.0.0",
    "description": "<p>Fetch records of <code>user_guide</code> from <code>offset</code> until <code>limit</code></p>",
    "group": "User_Guide",
    "parameter": {
      "fields": {
        "Query parameters) {String=} [include] Include specified association(s": [
          {
            "group": "Query parameters) {String=} [include] Include specified association(s",
            "optional": false,
            "field": "to",
            "description": "<p>each <code>user_guide</code> result.<br>Multiple values can be given separated by a comma <br><br>Ex: ?include=r_asso1,r_asso2</p>"
          }
        ],
        "Query parameters": [
          {
            "group": "Query parameters",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>API Bearer Token, required for authentication</p>"
          },
          {
            "group": "Query parameters",
            "type": "Integer",
            "optional": true,
            "field": "limit",
            "defaultValue": "50",
            "description": "<p>The number of rows to be fetched</p>"
          },
          {
            "group": "Query parameters",
            "type": "Integer",
            "optional": true,
            "field": "offset",
            "defaultValue": "0",
            "description": "<p>The offset by which rows will be fetched</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "user_guides",
            "description": "<p>List of user_guide</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "user_guides.id",
            "description": "<p><code>id</code> of user_guide</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "user_guides.version",
            "description": "<p><code>version</code> of user_guide</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user_guides.createdBy",
            "description": "<p><code>createdBy</code> of user_guide</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user_guides.updatedBy",
            "description": "<p><code>updatedBy</code> of user_guide</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user_guides.f_file",
            "description": "<p><code>f_file</code> of user_guide</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "limit",
            "description": "<p>Limit used to fetch data</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "offset",
            "description": "<p>Offset used to fetch data</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "totalCount",
            "description": "<p>The total count of records for user_guide</p>"
          }
        ]
      }
    },
    "filename": "/usr/src/app/workspace/a_cockpit/api/doc/doc_descriptor.js",
    "groupTitle": "User_Guide",
    "name": "GetApiUser_guideTokenToken"
  },
  {
    "type": "post",
    "url": "/api/user_guide/?token=TOKEN",
    "title": "3 - Create",
    "version": "1.0.0",
    "description": "<p>Create a record of <code>user_guide</code> using values defined in request's <code>body</code></p>",
    "group": "User_Guide",
    "parameter": {
      "fields": {
        "Body parameters": [
          {
            "group": "Body parameters",
            "type": "String",
            "optional": true,
            "field": "createdBy",
            "description": "<p><code>createdBy</code> of user_guide</p>"
          },
          {
            "group": "Body parameters",
            "type": "String",
            "optional": true,
            "field": "updatedBy",
            "description": "<p><code>updatedBy</code> of user_guide</p>"
          },
          {
            "group": "Body parameters",
            "type": "String",
            "optional": true,
            "field": "f_file",
            "description": "<p><code>f_file</code> of user_guide</p>"
          }
        ],
        "Query parameters": [
          {
            "group": "Query parameters",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>API Bearer Token, required for authentication</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "user_guide",
            "description": "<p>Created user_guide</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "user_guide.id",
            "description": "<p><code>id</code> of user_guide</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user_guide.createdBy",
            "description": "<p><code>createdBy</code> of user_guide</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user_guide.updatedBy",
            "description": "<p><code>updatedBy</code> of user_guide</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user_guide.f_file",
            "description": "<p><code>f_file</code> of user_guide</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 500": [
          {
            "group": "Error 500",
            "type": "Object",
            "optional": false,
            "field": "ServerError",
            "description": "<p>An error occured when trying to create user_guide</p>"
          }
        ]
      }
    },
    "filename": "/usr/src/app/workspace/a_cockpit/api/doc/doc_descriptor.js",
    "groupTitle": "User_Guide",
    "name": "PostApiUser_guideTokenToken"
  },
  {
    "type": "put",
    "url": "/api/user_guide/:id?token=TOKEN",
    "title": "4 - Update",
    "version": "1.0.0",
    "description": "<p>Update record of <code>user_guide</code> with <code>id</code> using values defined in request's <code>body</code></p>",
    "group": "User_Guide",
    "parameter": {
      "fields": {
        "Params parameters": [
          {
            "group": "Params parameters",
            "type": "Integer",
            "optional": false,
            "field": "id",
            "description": "<p><code>id</code> of the user_guide to update</p>"
          }
        ],
        "Body parameters": [
          {
            "group": "Body parameters",
            "type": "String",
            "optional": true,
            "field": "createdBy",
            "description": "<p>New value of <code>createdBy</code> for user_guide</p>"
          },
          {
            "group": "Body parameters",
            "type": "String",
            "optional": true,
            "field": "updatedBy",
            "description": "<p>New value of <code>updatedBy</code> for user_guide</p>"
          },
          {
            "group": "Body parameters",
            "type": "String",
            "optional": true,
            "field": "f_file",
            "description": "<p>New value of <code>f_file</code> for user_guide</p>"
          }
        ],
        "Query parameters": [
          {
            "group": "Query parameters",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>API Bearer Token, required for authentication</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "user_guide",
            "description": "<p>Updated user_guide</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "user_guide.id",
            "description": "<p><code>id</code> of user_guide</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user_guide.createdBy",
            "description": "<p><code>createdBy</code> of user_guide</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user_guide.updatedBy",
            "description": "<p><code>updatedBy</code> of user_guide</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user_guide.f_file",
            "description": "<p><code>f_file</code> of user_guide</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 404": [
          {
            "group": "Error 404",
            "type": "Object",
            "optional": false,
            "field": "NotFound",
            "description": "<p>No user_guide with ID <code>id</code> found</p>"
          }
        ],
        "Error 500": [
          {
            "group": "Error 500",
            "type": "Object",
            "optional": false,
            "field": "ServerError",
            "description": "<p>An error occured when trying to update user_guide</p>"
          }
        ]
      }
    },
    "filename": "/usr/src/app/workspace/a_cockpit/api/doc/doc_descriptor.js",
    "groupTitle": "User_Guide",
    "name": "PutApiUser_guideIdTokenToken"
  }
] });
