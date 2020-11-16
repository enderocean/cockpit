/**
 * @apiDefine token
 * @apiParam (Query parameters) {String} token API Bearer Token, required for authentication
 */
/**
 * @apiDefine tokenLimitOffset
 * @apiParam (Query parameters) {String} token API Bearer Token, required for authentication
 * @apiParam (Query parameters) {Integer} [limit=50] The number of rows to be fetched
 * @apiParam (Query parameters) {Integer} [offset=0] The offset by which rows will be fetched
 */

/**
 * @api {get} /api/getToken/ 1 - Basic Auth


 * @apiVersion 1.0.0
 * @apiGroup 1-General knowledge

 * @apiDescription To be able to interact with the API, you need to generate a Bearer Token using the <code>/api/getToken/</code> url
 *
 * Set your HTTP header like so with basic64 encoding : <code>Authorization clientID:clientSecret</code>

 * @apiExample {node} Example
 * var request = require('request');
 *
 * // API credentials
 * var clientKey = 'THcfYQ7sGW3jRdq';
 * var clientSecret = 'dexXLYNwdhezlxk';
 *
 * // Base64 encoding
 * var auth = 'Basic ' + new Buffer(clientKey + ':' + clientSecret).toString('base64');
 *
 * // API request
 * request(
 *	 {
 *		 url : 'http://127.0.0.1:9034/api/getToken',
 *		 headers : {
 *			 "Authorization" : auth
 *		 }
 *	 },
 *	 function (error, response, body) {
 *	 	body = JSON.parse(body);
 *		 console.log(body.token);
 *	 }
 * );

 * @apiHeader {String} ClientID Generated application's API credentials
 * @apiHeader {String} ClientSecret Generated application's API credentials

 * @apiSuccess {String} token Bearer Token, required for further API calls

 * @apiError (Error 500) BadAuthorizationHeader There is an invalid or no authorization header
 * @apiError (Error 401) AuthenticationFailed Couldn't match clientID/clientSecret with database
 */

/**
 * @api {get} /api/user?limit=42&offset=0&f_name=Doe&f_is_children=1&fk_id_hair_style=4 2 - Filter results
 * @apiGroup 1-General knowledge
 * @apiDescription Each entity's services <strong>1 - Find all</strong> and <strong>2 - Find one</strong> can accept an optional query parameter to filter the results.<br><br>
 * To filter on a specific field value, you need to specify the field and its encoded value along with the query parameters<br>
 * All fields and foreignKeys of an entity can be filtered that way. Have a look at target entity's <strong>create</strong> service's body to know what is available<br><br>
 * Ex:<br>You want to get all blonde users that are children of the same family "Doe", by filtering on <code>f_name</code> (string), <code>f_is_children</code> (boolean) and <code>fk_id_hair_style</code> (foreign key).<br><br>
 * Using <code>get /api/user</code> service, you would do as follow :
 *//********************************************
 ********************************************
 * E_USER
 ********************************************
 *******************************************/
/** @apiDefine e_user E_user */
/**
 * @api {get} /api/user?token=TOKEN 1 - Find all
 * @apiVersion 1.0.0
 * @apiDescription Fetch records of <code>user</code> from <code>offset</code> until <code>limit</code>
 * @apiGroup User
 * @apiParam (Query parameters) {String=r_role,r_group,r_notification} [include] Include specified association(s) to each <code>user</code> result.<br>Multiple values can be given separated by a comma <br><br>Ex: ?include=r_asso1,r_asso2
 * @apiUse tokenLimitOffset
 * @apiSuccess {Object[]} users List of user
 * @apiSuccess {Integer} users.id <code>id</code> of user
 * @apiSuccess {Integer} users.version <code>version</code> of user
 * @apiSuccess {String} users.createdBy <code>createdBy</code> of user
 * @apiSuccess {String} users.updatedBy <code>updatedBy</code> of user
 * @apiSuccess {String} users.f_login <code>f_login</code> of user
 * @apiSuccess {String} users.f_password <code>f_password</code> of user
 * @apiSuccess {String} users.f_email <code>f_email</code> of user
 * @apiSuccess {String} users.f_token_password_reset <code>f_token_password_reset</code> of user
 * @apiSuccess {Integer} users.f_enabled <code>f_enabled</code> of user
 * @apiSuccess {Integer} limit Limit used to fetch data
 * @apiSuccess {Integer} offset Offset used to fetch data
 * @apiSuccess {Integer} totalCount The total count of records for user
 */

/**
 * @api {get} /api/user/:id?token=TOKEN 2 - Find one
 * @apiVersion 1.0.0
 * @apiDescription Fetch one record of <code>user</code> with <code>id</code>
 * @apiGroup User
 * @apiUse token
 * @apiParam (Query parameters) {String=r_role,r_group,r_notification} [include] Include specified association(s) to each <code>user</code> result.<br>Multiple values can be given separated by a comma <br><br>Ex: ?include=r_asso1,r_asso2
 * @apiParam (Params parameters) {Integer} id The <code>id</code> of user to fetch
 * @apiSuccess {Object} user Object of user
 * @apiSuccess {Integer} user.id <code>id</code> of user
 * @apiSuccess {Integer} user.version <code>version</code> of user
 * @apiSuccess {String} user.createdBy <code>createdBy</code> of user
 * @apiSuccess {String} user.updatedBy <code>updatedBy</code> of user
 * @apiSuccess {String} user.f_login <code>f_login</code> of user
 * @apiSuccess {String} user.f_password <code>f_password</code> of user
 * @apiSuccess {String} user.f_email <code>f_email</code> of user
 * @apiSuccess {String} user.f_token_password_reset <code>f_token_password_reset</code> of user
 * @apiSuccess {Integer} user.f_enabled <code>f_enabled</code> of user
 * @apiError (Error 404) {Object} NotFound No user with ID <code>id</code> found
 */

/**
 * @api {get} /api/user/:id/:association?token=TOKEN 2.a - Find association
 * @apiVersion 1.0.0
 * @apiDescription Fetch records of <code>user</code>'s <code>association</code> from <code>offset</code> until <code>limit</code>
 * @apiGroup User
 * @apiUse tokenLimitOffset
 * @apiParam (Params parameters) {Integer} id <code>id</code> of the user to which <code>association</code> is related
 * @apiParam (Params parameters) {String=role,group,notification} association Name of the related entity
 * @apiSuccess {Object} Object Object of <code>association</code>
 * @apiSuccess {Integer} limit Limit used to fetch data
 * @apiSuccess {Integer} offset Offset used to fetch data
 * @apiError (Error 404) {Object} NotFound No user with ID <code>id</code> found
 * @apiError (Error 404) {Object} AssociationNotFound No association with <code>association</code>
 */

/**
 * @api {post} /api/user/?token=TOKEN 3 - Create
 * @apiVersion 1.0.0
 * @apiDescription Create a record of <code>user</code> using values defined in request's <code>body</code>
 * @apiGroup User
 * @apiUse token
 * @apiParam (Body parameters) {String} [createdBy] <code>createdBy</code> of user
 * @apiParam (Body parameters) {String} [updatedBy] <code>updatedBy</code> of user
 * @apiParam (Body parameters) {String} [f_login] <code>f_login</code> of user
 * @apiParam (Body parameters) {String} [f_email] <code>f_email</code> of user
 * @apiSuccess {Object} user Created user
 * @apiSuccess {Integer} user.id <code>id</code> of user
 * @apiSuccess {String} user.createdBy <code>createdBy</code> of user
 * @apiSuccess {String} user.updatedBy <code>updatedBy</code> of user
 * @apiSuccess {String} user.f_login <code>f_login</code> of user
 * @apiSuccess {String} user.f_email <code>f_email</code> of user
 * @apiError (Error 500) {Object} ServerError An error occured when trying to create user
 */

/**
 * @api {put} /api/user/:id?token=TOKEN 4 - Update
 * @apiVersion 1.0.0
 * @apiDescription Update record of <code>user</code> with <code>id</code> using values defined in request's <code>body</code>
 * @apiGroup User
 * @apiUse token
 * @apiParam (Params parameters) {Integer} id <code>id</code> of the user to update
 * @apiParam (Body parameters) {String} [createdBy] New value of <code>createdBy</code> for user
 * @apiParam (Body parameters) {String} [updatedBy] New value of <code>updatedBy</code> for user
 * @apiParam (Body parameters) {String} [f_login] New value of <code>f_login</code> for user
 * @apiParam (Body parameters) {String} [f_email] New value of <code>f_email</code> for user
 * @apiSuccess {Object} user Updated user
 * @apiSuccess {Integer} user.id <code>id</code> of user
 * @apiSuccess {String} user.createdBy <code>createdBy</code> of user
 * @apiSuccess {String} user.updatedBy <code>updatedBy</code> of user
 * @apiSuccess {String} user.f_login <code>f_login</code> of user
 * @apiSuccess {String} user.f_email <code>f_email</code> of user
 * @apiError (Error 404) {Object} NotFound No user with ID <code>id</code> found
 * @apiError (Error 500) {Object} ServerError An error occured when trying to update user
 */

/**
 * @api {delete} /api/user/:id?token=TOKEN 5 - Delete
 * @apiVersion 1.0.0
 * @apiDescription Permanently delete a record of <code>user</code> with <code>id</code>
 * @apiGroup User
 * @apiUse token
 * @apiParam (Params parameters) {Integer} id <code>id</code> of user to delete
 * @apiSuccessExample {json} Success-Response:
 *	 HTTP/1.1 200 OK
 * @apiError (Error 404) {Object} NotFound No user with ID <code>id</code> found
 */



/********************************************
 ********************************************
 * E_ROLE
 ********************************************
 *******************************************/
/** @apiDefine e_role E_role */
/**
 * @api {get} /api/role?token=TOKEN 1 - Find all
 * @apiVersion 1.0.0
 * @apiDescription Fetch records of <code>role</code> from <code>offset</code> until <code>limit</code>
 * @apiGroup Role
 * @apiParam (Query parameters) {String=r_user} [include] Include specified association(s) to each <code>role</code> result.<br>Multiple values can be given separated by a comma <br><br>Ex: ?include=r_asso1,r_asso2
 * @apiUse tokenLimitOffset
 * @apiSuccess {Object[]} roles List of role
 * @apiSuccess {Integer} roles.id <code>id</code> of role
 * @apiSuccess {Integer} roles.version <code>version</code> of role
 * @apiSuccess {String} roles.createdBy <code>createdBy</code> of role
 * @apiSuccess {String} roles.updatedBy <code>updatedBy</code> of role
 * @apiSuccess {String} roles.f_label <code>f_label</code> of role
 * @apiSuccess {Integer} limit Limit used to fetch data
 * @apiSuccess {Integer} offset Offset used to fetch data
 * @apiSuccess {Integer} totalCount The total count of records for role
 */

/**
 * @api {get} /api/role/:id?token=TOKEN 2 - Find one
 * @apiVersion 1.0.0
 * @apiDescription Fetch one record of <code>role</code> with <code>id</code>
 * @apiGroup Role
 * @apiUse token
 * @apiParam (Query parameters) {String=r_user} [include] Include specified association(s) to each <code>role</code> result.<br>Multiple values can be given separated by a comma <br><br>Ex: ?include=r_asso1,r_asso2
 * @apiParam (Params parameters) {Integer} id The <code>id</code> of role to fetch
 * @apiSuccess {Object} role Object of role
 * @apiSuccess {Integer} role.id <code>id</code> of role
 * @apiSuccess {Integer} role.version <code>version</code> of role
 * @apiSuccess {String} role.createdBy <code>createdBy</code> of role
 * @apiSuccess {String} role.updatedBy <code>updatedBy</code> of role
 * @apiSuccess {String} role.f_label <code>f_label</code> of role
 * @apiError (Error 404) {Object} NotFound No role with ID <code>id</code> found
 */

/**
 * @api {get} /api/role/:id/:association?token=TOKEN 2.a - Find association
 * @apiVersion 1.0.0
 * @apiDescription Fetch records of <code>role</code>'s <code>association</code> from <code>offset</code> until <code>limit</code>
 * @apiGroup Role
 * @apiUse tokenLimitOffset
 * @apiParam (Params parameters) {Integer} id <code>id</code> of the role to which <code>association</code> is related
 * @apiParam (Params parameters) {String=user} association Name of the related entity
 * @apiSuccess {Object} Object Object of <code>association</code>
 * @apiSuccess {Integer} limit Limit used to fetch data
 * @apiSuccess {Integer} offset Offset used to fetch data
 * @apiError (Error 404) {Object} NotFound No role with ID <code>id</code> found
 * @apiError (Error 404) {Object} AssociationNotFound No association with <code>association</code>
 */

/**
 * @api {post} /api/role/?token=TOKEN 3 - Create
 * @apiVersion 1.0.0
 * @apiDescription Create a record of <code>role</code> using values defined in request's <code>body</code>
 * @apiGroup Role
 * @apiUse token
 * @apiParam (Body parameters) {String} [createdBy] <code>createdBy</code> of role
 * @apiParam (Body parameters) {String} [updatedBy] <code>updatedBy</code> of role
 * @apiParam (Body parameters) {String} [f_label] <code>f_label</code> of role
 * @apiSuccess {Object} role Created role
 * @apiSuccess {Integer} role.id <code>id</code> of role
 * @apiSuccess {String} role.createdBy <code>createdBy</code> of role
 * @apiSuccess {String} role.updatedBy <code>updatedBy</code> of role
 * @apiSuccess {String} role.f_label <code>f_label</code> of role
 * @apiError (Error 500) {Object} ServerError An error occured when trying to create role
 */

/**
 * @api {put} /api/role/:id?token=TOKEN 4 - Update
 * @apiVersion 1.0.0
 * @apiDescription Update record of <code>role</code> with <code>id</code> using values defined in request's <code>body</code>
 * @apiGroup Role
 * @apiUse token
 * @apiParam (Params parameters) {Integer} id <code>id</code> of the role to update
 * @apiParam (Body parameters) {String} [createdBy] New value of <code>createdBy</code> for role
 * @apiParam (Body parameters) {String} [updatedBy] New value of <code>updatedBy</code> for role
 * @apiParam (Body parameters) {String} [f_label] New value of <code>f_label</code> for role
 * @apiSuccess {Object} role Updated role
 * @apiSuccess {Integer} role.id <code>id</code> of role
 * @apiSuccess {String} role.createdBy <code>createdBy</code> of role
 * @apiSuccess {String} role.updatedBy <code>updatedBy</code> of role
 * @apiSuccess {String} role.f_label <code>f_label</code> of role
 * @apiError (Error 404) {Object} NotFound No role with ID <code>id</code> found
 * @apiError (Error 500) {Object} ServerError An error occured when trying to update role
 */

/**
 * @api {delete} /api/role/:id?token=TOKEN 5 - Delete
 * @apiVersion 1.0.0
 * @apiDescription Permanently delete a record of <code>role</code> with <code>id</code>
 * @apiGroup Role
 * @apiUse token
 * @apiParam (Params parameters) {Integer} id <code>id</code> of role to delete
 * @apiSuccessExample {json} Success-Response:
 *	 HTTP/1.1 200 OK
 * @apiError (Error 404) {Object} NotFound No role with ID <code>id</code> found
 */



/********************************************
 ********************************************
 * E_GROUP
 ********************************************
 *******************************************/
/** @apiDefine e_group E_group */
/**
 * @api {get} /api/group?token=TOKEN 1 - Find all
 * @apiVersion 1.0.0
 * @apiDescription Fetch records of <code>group</code> from <code>offset</code> until <code>limit</code>
 * @apiGroup Group
 * @apiParam (Query parameters) {String=r_user} [include] Include specified association(s) to each <code>group</code> result.<br>Multiple values can be given separated by a comma <br><br>Ex: ?include=r_asso1,r_asso2
 * @apiUse tokenLimitOffset
 * @apiSuccess {Object[]} groups List of group
 * @apiSuccess {Integer} groups.id <code>id</code> of group
 * @apiSuccess {Integer} groups.version <code>version</code> of group
 * @apiSuccess {String} groups.createdBy <code>createdBy</code> of group
 * @apiSuccess {String} groups.updatedBy <code>updatedBy</code> of group
 * @apiSuccess {String} groups.f_label <code>f_label</code> of group
 * @apiSuccess {Integer} limit Limit used to fetch data
 * @apiSuccess {Integer} offset Offset used to fetch data
 * @apiSuccess {Integer} totalCount The total count of records for group
 */

/**
 * @api {get} /api/group/:id?token=TOKEN 2 - Find one
 * @apiVersion 1.0.0
 * @apiDescription Fetch one record of <code>group</code> with <code>id</code>
 * @apiGroup Group
 * @apiUse token
 * @apiParam (Query parameters) {String=r_user} [include] Include specified association(s) to each <code>group</code> result.<br>Multiple values can be given separated by a comma <br><br>Ex: ?include=r_asso1,r_asso2
 * @apiParam (Params parameters) {Integer} id The <code>id</code> of group to fetch
 * @apiSuccess {Object} group Object of group
 * @apiSuccess {Integer} group.id <code>id</code> of group
 * @apiSuccess {Integer} group.version <code>version</code> of group
 * @apiSuccess {String} group.createdBy <code>createdBy</code> of group
 * @apiSuccess {String} group.updatedBy <code>updatedBy</code> of group
 * @apiSuccess {String} group.f_label <code>f_label</code> of group
 * @apiError (Error 404) {Object} NotFound No group with ID <code>id</code> found
 */

/**
 * @api {get} /api/group/:id/:association?token=TOKEN 2.a - Find association
 * @apiVersion 1.0.0
 * @apiDescription Fetch records of <code>group</code>'s <code>association</code> from <code>offset</code> until <code>limit</code>
 * @apiGroup Group
 * @apiUse tokenLimitOffset
 * @apiParam (Params parameters) {Integer} id <code>id</code> of the group to which <code>association</code> is related
 * @apiParam (Params parameters) {String=user} association Name of the related entity
 * @apiSuccess {Object} Object Object of <code>association</code>
 * @apiSuccess {Integer} limit Limit used to fetch data
 * @apiSuccess {Integer} offset Offset used to fetch data
 * @apiError (Error 404) {Object} NotFound No group with ID <code>id</code> found
 * @apiError (Error 404) {Object} AssociationNotFound No association with <code>association</code>
 */

/**
 * @api {post} /api/group/?token=TOKEN 3 - Create
 * @apiVersion 1.0.0
 * @apiDescription Create a record of <code>group</code> using values defined in request's <code>body</code>
 * @apiGroup Group
 * @apiUse token
 * @apiParam (Body parameters) {String} [createdBy] <code>createdBy</code> of group
 * @apiParam (Body parameters) {String} [updatedBy] <code>updatedBy</code> of group
 * @apiParam (Body parameters) {String} [f_label] <code>f_label</code> of group
 * @apiSuccess {Object} group Created group
 * @apiSuccess {Integer} group.id <code>id</code> of group
 * @apiSuccess {String} group.createdBy <code>createdBy</code> of group
 * @apiSuccess {String} group.updatedBy <code>updatedBy</code> of group
 * @apiSuccess {String} group.f_label <code>f_label</code> of group
 * @apiError (Error 500) {Object} ServerError An error occured when trying to create group
 */

/**
 * @api {put} /api/group/:id?token=TOKEN 4 - Update
 * @apiVersion 1.0.0
 * @apiDescription Update record of <code>group</code> with <code>id</code> using values defined in request's <code>body</code>
 * @apiGroup Group
 * @apiUse token
 * @apiParam (Params parameters) {Integer} id <code>id</code> of the group to update
 * @apiParam (Body parameters) {String} [createdBy] New value of <code>createdBy</code> for group
 * @apiParam (Body parameters) {String} [updatedBy] New value of <code>updatedBy</code> for group
 * @apiParam (Body parameters) {String} [f_label] New value of <code>f_label</code> for group
 * @apiSuccess {Object} group Updated group
 * @apiSuccess {Integer} group.id <code>id</code> of group
 * @apiSuccess {String} group.createdBy <code>createdBy</code> of group
 * @apiSuccess {String} group.updatedBy <code>updatedBy</code> of group
 * @apiSuccess {String} group.f_label <code>f_label</code> of group
 * @apiError (Error 404) {Object} NotFound No group with ID <code>id</code> found
 * @apiError (Error 500) {Object} ServerError An error occured when trying to update group
 */

/**
 * @api {delete} /api/group/:id?token=TOKEN 5 - Delete
 * @apiVersion 1.0.0
 * @apiDescription Permanently delete a record of <code>group</code> with <code>id</code>
 * @apiGroup Group
 * @apiUse token
 * @apiParam (Params parameters) {Integer} id <code>id</code> of group to delete
 * @apiSuccessExample {json} Success-Response:
 *	 HTTP/1.1 200 OK
 * @apiError (Error 404) {Object} NotFound No group with ID <code>id</code> found
 */



/********************************************
 ********************************************
 * E_SYNCHRONIZATION
 ********************************************
 *******************************************/
/** @apiDefine e_synchronization E_synchronization */
/**
 * @api {get} /api/synchronization?token=TOKEN 1 - Find all
 * @apiVersion 1.0.0
 * @apiDescription Fetch records of <code>synchronization</code> from <code>offset</code> until <code>limit</code>
 * @apiGroup Synchronization
 * @apiParam (Query parameters) {String=r_api_credentials} [include] Include specified association(s) to each <code>synchronization</code> result.<br>Multiple values can be given separated by a comma <br><br>Ex: ?include=r_asso1,r_asso2
 * @apiUse tokenLimitOffset
 * @apiSuccess {Object[]} synchronizations List of synchronization
 * @apiSuccess {Integer} synchronizations.id <code>id</code> of synchronization
 * @apiSuccess {Integer} synchronizations.version <code>version</code> of synchronization
 * @apiSuccess {String} synchronizations.createdBy <code>createdBy</code> of synchronization
 * @apiSuccess {String} synchronizations.updatedBy <code>updatedBy</code> of synchronization
 * @apiSuccess {String} synchronizations.f_journal_backup_file <code>f_journal_backup_file</code> of synchronization
 * @apiSuccess {Integer} limit Limit used to fetch data
 * @apiSuccess {Integer} offset Offset used to fetch data
 * @apiSuccess {Integer} totalCount The total count of records for synchronization
 */

/**
 * @api {get} /api/synchronization/:id?token=TOKEN 2 - Find one
 * @apiVersion 1.0.0
 * @apiDescription Fetch one record of <code>synchronization</code> with <code>id</code>
 * @apiGroup Synchronization
 * @apiUse token
 * @apiParam (Query parameters) {String=r_api_credentials} [include] Include specified association(s) to each <code>synchronization</code> result.<br>Multiple values can be given separated by a comma <br><br>Ex: ?include=r_asso1,r_asso2
 * @apiParam (Params parameters) {Integer} id The <code>id</code> of synchronization to fetch
 * @apiSuccess {Object} synchronization Object of synchronization
 * @apiSuccess {Integer} synchronization.id <code>id</code> of synchronization
 * @apiSuccess {Integer} synchronization.version <code>version</code> of synchronization
 * @apiSuccess {String} synchronization.createdBy <code>createdBy</code> of synchronization
 * @apiSuccess {String} synchronization.updatedBy <code>updatedBy</code> of synchronization
 * @apiSuccess {String} synchronization.f_journal_backup_file <code>f_journal_backup_file</code> of synchronization
 * @apiError (Error 404) {Object} NotFound No synchronization with ID <code>id</code> found
 */

/**
 * @api {get} /api/synchronization/:id/:association?token=TOKEN 2.a - Find association
 * @apiVersion 1.0.0
 * @apiDescription Fetch records of <code>synchronization</code>'s <code>association</code> from <code>offset</code> until <code>limit</code>
 * @apiGroup Synchronization
 * @apiUse tokenLimitOffset
 * @apiParam (Params parameters) {Integer} id <code>id</code> of the synchronization to which <code>association</code> is related
 * @apiParam (Params parameters) {String=api_credentials} association Name of the related entity
 * @apiSuccess {Object} Object Object of <code>association</code>
 * @apiSuccess {Integer} limit Limit used to fetch data
 * @apiSuccess {Integer} offset Offset used to fetch data
 * @apiError (Error 404) {Object} NotFound No synchronization with ID <code>id</code> found
 * @apiError (Error 404) {Object} AssociationNotFound No association with <code>association</code>
 */

/**
 * @api {post} /api/synchronization/?token=TOKEN 3 - Create
 * @apiVersion 1.0.0
 * @apiDescription Create a record of <code>synchronization</code> using values defined in request's <code>body</code>
 * @apiGroup Synchronization
 * @apiUse token
 * @apiParam (Body parameters) {String} [createdBy] <code>createdBy</code> of synchronization
 * @apiParam (Body parameters) {String} [updatedBy] <code>updatedBy</code> of synchronization
 * @apiParam (Body parameters) {String} [f_journal_backup_file] <code>f_journal_backup_file</code> of synchronization
 * @apiParam (Body parameters) {Integer} [fk_id_api_credentials] <code>id</code> of entity api_credentials to associate
 * @apiSuccess {Object} synchronization Created synchronization
 * @apiSuccess {Integer} synchronization.id <code>id</code> of synchronization
 * @apiSuccess {String} synchronization.createdBy <code>createdBy</code> of synchronization
 * @apiSuccess {String} synchronization.updatedBy <code>updatedBy</code> of synchronization
 * @apiSuccess {String} synchronization.f_journal_backup_file <code>f_journal_backup_file</code> of synchronization
 * @apiError (Error 500) {Object} ServerError An error occured when trying to create synchronization
 */

/**
 * @api {put} /api/synchronization/:id?token=TOKEN 4 - Update
 * @apiVersion 1.0.0
 * @apiDescription Update record of <code>synchronization</code> with <code>id</code> using values defined in request's <code>body</code>
 * @apiGroup Synchronization
 * @apiUse token
 * @apiParam (Params parameters) {Integer} id <code>id</code> of the synchronization to update
 * @apiParam (Body parameters) {String} [createdBy] New value of <code>createdBy</code> for synchronization
 * @apiParam (Body parameters) {String} [updatedBy] New value of <code>updatedBy</code> for synchronization
 * @apiParam (Body parameters) {String} [f_journal_backup_file] New value of <code>f_journal_backup_file</code> for synchronization
 * @apiParam (Body parameters) {Integer} [fk_id_api_credentials] <code>id</code> of entity api_credentials to associate
 * @apiSuccess {Object} synchronization Updated synchronization
 * @apiSuccess {Integer} synchronization.id <code>id</code> of synchronization
 * @apiSuccess {String} synchronization.createdBy <code>createdBy</code> of synchronization
 * @apiSuccess {String} synchronization.updatedBy <code>updatedBy</code> of synchronization
 * @apiSuccess {String} synchronization.f_journal_backup_file <code>f_journal_backup_file</code> of synchronization
 * @apiError (Error 404) {Object} NotFound No synchronization with ID <code>id</code> found
 * @apiError (Error 500) {Object} ServerError An error occured when trying to update synchronization
 */

/**
 * @api {delete} /api/synchronization/:id?token=TOKEN 5 - Delete
 * @apiVersion 1.0.0
 * @apiDescription Permanently delete a record of <code>synchronization</code> with <code>id</code>
 * @apiGroup Synchronization
 * @apiUse token
 * @apiParam (Params parameters) {Integer} id <code>id</code> of synchronization to delete
 * @apiSuccessExample {json} Success-Response:
 *	 HTTP/1.1 200 OK
 * @apiError (Error 404) {Object} NotFound No synchronization with ID <code>id</code> found
 */



/********************************************
 ********************************************
 * E_SYNCHRO_CREDENTIALS
 ********************************************
 *******************************************/
/** @apiDefine e_synchro_credentials E_synchro_credentials */
/**
 * @api {get} /api/synchro_credentials?token=TOKEN 1 - Find all
 * @apiVersion 1.0.0
 * @apiDescription Fetch records of <code>synchro_credentials</code> from <code>offset</code> until <code>limit</code>
 * @apiGroup Synchro credentials
 * @apiParam (Query parameters) {String=} [include] Include specified association(s) to each <code>synchro_credentials</code> result.<br>Multiple values can be given separated by a comma <br><br>Ex: ?include=r_asso1,r_asso2
 * @apiUse tokenLimitOffset
 * @apiSuccess {Object[]} synchro_credentialss List of synchro_credentials
 * @apiSuccess {Integer} synchro_credentialss.id <code>id</code> of synchro_credentials
 * @apiSuccess {Integer} synchro_credentialss.version <code>version</code> of synchro_credentials
 * @apiSuccess {String} synchro_credentialss.createdBy <code>createdBy</code> of synchro_credentials
 * @apiSuccess {String} synchro_credentialss.updatedBy <code>updatedBy</code> of synchro_credentials
 * @apiSuccess {String} synchro_credentialss.f_cloud_host <code>f_cloud_host</code> of synchro_credentials
 * @apiSuccess {String} synchro_credentialss.f_client_key <code>f_client_key</code> of synchro_credentials
 * @apiSuccess {String} synchro_credentialss.f_client_secret <code>f_client_secret</code> of synchro_credentials
 * @apiSuccess {Integer} limit Limit used to fetch data
 * @apiSuccess {Integer} offset Offset used to fetch data
 * @apiSuccess {Integer} totalCount The total count of records for synchro_credentials
 */

/**
 * @api {get} /api/synchro_credentials/:id?token=TOKEN 2 - Find one
 * @apiVersion 1.0.0
 * @apiDescription Fetch one record of <code>synchro_credentials</code> with <code>id</code>
 * @apiGroup Synchro credentials
 * @apiUse token
 * @apiParam (Query parameters) {String=} [include] Include specified association(s) to each <code>synchro_credentials</code> result.<br>Multiple values can be given separated by a comma <br><br>Ex: ?include=r_asso1,r_asso2
 * @apiParam (Params parameters) {Integer} id The <code>id</code> of synchro_credentials to fetch
 * @apiSuccess {Object} synchro_credentials Object of synchro_credentials
 * @apiSuccess {Integer} synchro_credentials.id <code>id</code> of synchro_credentials
 * @apiSuccess {Integer} synchro_credentials.version <code>version</code> of synchro_credentials
 * @apiSuccess {String} synchro_credentials.createdBy <code>createdBy</code> of synchro_credentials
 * @apiSuccess {String} synchro_credentials.updatedBy <code>updatedBy</code> of synchro_credentials
 * @apiSuccess {String} synchro_credentials.f_cloud_host <code>f_cloud_host</code> of synchro_credentials
 * @apiSuccess {String} synchro_credentials.f_client_key <code>f_client_key</code> of synchro_credentials
 * @apiSuccess {String} synchro_credentials.f_client_secret <code>f_client_secret</code> of synchro_credentials
 * @apiError (Error 404) {Object} NotFound No synchro_credentials with ID <code>id</code> found
 */

/**
 * @api {post} /api/synchro_credentials/?token=TOKEN 3 - Create
 * @apiVersion 1.0.0
 * @apiDescription Create a record of <code>synchro_credentials</code> using values defined in request's <code>body</code>
 * @apiGroup Synchro credentials
 * @apiUse token
 * @apiParam (Body parameters) {String} [createdBy] <code>createdBy</code> of synchro_credentials
 * @apiParam (Body parameters) {String} [updatedBy] <code>updatedBy</code> of synchro_credentials
 * @apiParam (Body parameters) {String} [f_cloud_host] <code>f_cloud_host</code> of synchro_credentials
 * @apiParam (Body parameters) {String} [f_client_key] <code>f_client_key</code> of synchro_credentials
 * @apiParam (Body parameters) {String} [f_client_secret] <code>f_client_secret</code> of synchro_credentials
 * @apiSuccess {Object} synchro_credentials Created synchro_credentials
 * @apiSuccess {Integer} synchro_credentials.id <code>id</code> of synchro_credentials
 * @apiSuccess {String} synchro_credentials.createdBy <code>createdBy</code> of synchro_credentials
 * @apiSuccess {String} synchro_credentials.updatedBy <code>updatedBy</code> of synchro_credentials
 * @apiSuccess {String} synchro_credentials.f_cloud_host <code>f_cloud_host</code> of synchro_credentials
 * @apiSuccess {String} synchro_credentials.f_client_key <code>f_client_key</code> of synchro_credentials
 * @apiSuccess {String} synchro_credentials.f_client_secret <code>f_client_secret</code> of synchro_credentials
 * @apiError (Error 500) {Object} ServerError An error occured when trying to create synchro_credentials
 */

/**
 * @api {put} /api/synchro_credentials/:id?token=TOKEN 4 - Update
 * @apiVersion 1.0.0
 * @apiDescription Update record of <code>synchro_credentials</code> with <code>id</code> using values defined in request's <code>body</code>
 * @apiGroup Synchro credentials
 * @apiUse token
 * @apiParam (Params parameters) {Integer} id <code>id</code> of the synchro_credentials to update
 * @apiParam (Body parameters) {String} [createdBy] New value of <code>createdBy</code> for synchro_credentials
 * @apiParam (Body parameters) {String} [updatedBy] New value of <code>updatedBy</code> for synchro_credentials
 * @apiParam (Body parameters) {String} [f_cloud_host] New value of <code>f_cloud_host</code> for synchro_credentials
 * @apiParam (Body parameters) {String} [f_client_key] New value of <code>f_client_key</code> for synchro_credentials
 * @apiParam (Body parameters) {String} [f_client_secret] New value of <code>f_client_secret</code> for synchro_credentials
 * @apiSuccess {Object} synchro_credentials Updated synchro_credentials
 * @apiSuccess {Integer} synchro_credentials.id <code>id</code> of synchro_credentials
 * @apiSuccess {String} synchro_credentials.createdBy <code>createdBy</code> of synchro_credentials
 * @apiSuccess {String} synchro_credentials.updatedBy <code>updatedBy</code> of synchro_credentials
 * @apiSuccess {String} synchro_credentials.f_cloud_host <code>f_cloud_host</code> of synchro_credentials
 * @apiSuccess {String} synchro_credentials.f_client_key <code>f_client_key</code> of synchro_credentials
 * @apiSuccess {String} synchro_credentials.f_client_secret <code>f_client_secret</code> of synchro_credentials
 * @apiError (Error 404) {Object} NotFound No synchro_credentials with ID <code>id</code> found
 * @apiError (Error 500) {Object} ServerError An error occured when trying to update synchro_credentials
 */

/**
 * @api {delete} /api/synchro_credentials/:id?token=TOKEN 5 - Delete
 * @apiVersion 1.0.0
 * @apiDescription Permanently delete a record of <code>synchro_credentials</code> with <code>id</code>
 * @apiGroup Synchro credentials
 * @apiUse token
 * @apiParam (Params parameters) {Integer} id <code>id</code> of synchro_credentials to delete
 * @apiSuccessExample {json} Success-Response:
 *	 HTTP/1.1 200 OK
 * @apiError (Error 404) {Object} NotFound No synchro_credentials with ID <code>id</code> found
 */



/********************************************
 ********************************************
 * E_STATUS
 ********************************************
 *******************************************/
/** @apiDefine e_status E_status */
/**
 * @api {get} /api/status?token=TOKEN 1 - Find all
 * @apiVersion 1.0.0
 * @apiDescription Fetch records of <code>status</code> from <code>offset</code> until <code>limit</code>
 * @apiGroup Status
 * @apiParam (Query parameters) {String=r_accepted_group,r_status_children,r_translations,r_task,r_actions,r_children} [include] Include specified association(s) to each <code>status</code> result.<br>Multiple values can be given separated by a comma <br><br>Ex: ?include=r_asso1,r_asso2
 * @apiUse tokenLimitOffset
 * @apiSuccess {Object[]} statuss List of status
 * @apiSuccess {Integer} statuss.id <code>id</code> of status
 * @apiSuccess {Integer} statuss.version <code>version</code> of status
 * @apiSuccess {String} statuss.createdBy <code>createdBy</code> of status
 * @apiSuccess {String} statuss.updatedBy <code>updatedBy</code> of status
 * @apiSuccess {String} statuss.f_entity <code>f_entity</code> of status
 * @apiSuccess {String} statuss.f_field <code>f_field</code> of status
 * @apiSuccess {String} statuss.f_name <code>f_name</code> of status
 * @apiSuccess {String} statuss.f_color <code>f_color</code> of status
 * @apiSuccess {String} statuss.f_button_label <code>f_button_label</code> of status
 * @apiSuccess {Integer} statuss.f_position <code>f_position</code> of status
 * @apiSuccess {Boolean} statuss.f_default <code>f_default</code> of status
 * @apiSuccess {Boolean} statuss.f_comment <code>f_comment</code> of status
 * @apiSuccess {Integer} limit Limit used to fetch data
 * @apiSuccess {Integer} offset Offset used to fetch data
 * @apiSuccess {Integer} totalCount The total count of records for status
 */

/**
 * @api {get} /api/status/:id?token=TOKEN 2 - Find one
 * @apiVersion 1.0.0
 * @apiDescription Fetch one record of <code>status</code> with <code>id</code>
 * @apiGroup Status
 * @apiUse token
 * @apiParam (Query parameters) {String=r_accepted_group,r_status_children,r_translations,r_task,r_actions,r_children} [include] Include specified association(s) to each <code>status</code> result.<br>Multiple values can be given separated by a comma <br><br>Ex: ?include=r_asso1,r_asso2
 * @apiParam (Params parameters) {Integer} id The <code>id</code> of status to fetch
 * @apiSuccess {Object} status Object of status
 * @apiSuccess {Integer} status.id <code>id</code> of status
 * @apiSuccess {Integer} status.version <code>version</code> of status
 * @apiSuccess {String} status.createdBy <code>createdBy</code> of status
 * @apiSuccess {String} status.updatedBy <code>updatedBy</code> of status
 * @apiSuccess {String} status.f_entity <code>f_entity</code> of status
 * @apiSuccess {String} status.f_field <code>f_field</code> of status
 * @apiSuccess {String} status.f_name <code>f_name</code> of status
 * @apiSuccess {String} status.f_color <code>f_color</code> of status
 * @apiSuccess {String} status.f_button_label <code>f_button_label</code> of status
 * @apiSuccess {Integer} status.f_position <code>f_position</code> of status
 * @apiSuccess {Boolean} status.f_default <code>f_default</code> of status
 * @apiSuccess {Boolean} status.f_comment <code>f_comment</code> of status
 * @apiError (Error 404) {Object} NotFound No status with ID <code>id</code> found
 */

/**
 * @api {get} /api/status/:id/:association?token=TOKEN 2.a - Find association
 * @apiVersion 1.0.0
 * @apiDescription Fetch records of <code>status</code>'s <code>association</code> from <code>offset</code> until <code>limit</code>
 * @apiGroup Status
 * @apiUse tokenLimitOffset
 * @apiParam (Params parameters) {Integer} id <code>id</code> of the status to which <code>association</code> is related
 * @apiParam (Params parameters) {String=group,status,translation,task,action,status} association Name of the related entity
 * @apiSuccess {Object} Object Object of <code>association</code>
 * @apiSuccess {Integer} limit Limit used to fetch data
 * @apiSuccess {Integer} offset Offset used to fetch data
 * @apiError (Error 404) {Object} NotFound No status with ID <code>id</code> found
 * @apiError (Error 404) {Object} AssociationNotFound No association with <code>association</code>
 */

/**
 * @api {post} /api/status/?token=TOKEN 3 - Create
 * @apiVersion 1.0.0
 * @apiDescription Create a record of <code>status</code> using values defined in request's <code>body</code>
 * @apiGroup Status
 * @apiUse token
 * @apiParam (Body parameters) {String} [createdBy] <code>createdBy</code> of status
 * @apiParam (Body parameters) {String} [updatedBy] <code>updatedBy</code> of status
 * @apiParam (Body parameters) {String} [f_entity] <code>f_entity</code> of status
 * @apiParam (Body parameters) {String} [f_field] <code>f_field</code> of status
 * @apiParam (Body parameters) {String} [f_name] <code>f_name</code> of status
 * @apiParam (Body parameters) {String} [f_color] <code>f_color</code> of status
 * @apiParam (Body parameters) {String} [f_button_label] <code>f_button_label</code> of status
 * @apiParam (Body parameters) {Integer} [f_position] <code>f_position</code> of status
 * @apiParam (Body parameters) {Boolean} [f_default] <code>f_default</code> of status
 * @apiParam (Body parameters) {Boolean} [f_comment] <code>f_comment</code> of status
 * @apiParam (Body parameters) {Integer} [fk_id_status_children] <code>id</code> of entity status to associate
 * @apiParam (Body parameters) {Integer} [fk_id_status_translations] <code>id</code> of entity translation to associate
 * @apiParam (Body parameters) {Integer} [fk_id_status_state] <code>id</code> of entity task to associate
 * @apiParam (Body parameters) {Integer} [fk_id_status_actions] <code>id</code> of entity action to associate
 * @apiSuccess {Object} status Created status
 * @apiSuccess {Integer} status.id <code>id</code> of status
 * @apiSuccess {String} status.createdBy <code>createdBy</code> of status
 * @apiSuccess {String} status.updatedBy <code>updatedBy</code> of status
 * @apiSuccess {String} status.f_entity <code>f_entity</code> of status
 * @apiSuccess {String} status.f_field <code>f_field</code> of status
 * @apiSuccess {String} status.f_name <code>f_name</code> of status
 * @apiSuccess {String} status.f_color <code>f_color</code> of status
 * @apiSuccess {String} status.f_button_label <code>f_button_label</code> of status
 * @apiSuccess {Integer} status.f_position <code>f_position</code> of status
 * @apiSuccess {Boolean} status.f_default <code>f_default</code> of status
 * @apiSuccess {Boolean} status.f_comment <code>f_comment</code> of status
 * @apiError (Error 500) {Object} ServerError An error occured when trying to create status
 */

/**
 * @api {put} /api/status/:id?token=TOKEN 4 - Update
 * @apiVersion 1.0.0
 * @apiDescription Update record of <code>status</code> with <code>id</code> using values defined in request's <code>body</code>
 * @apiGroup Status
 * @apiUse token
 * @apiParam (Params parameters) {Integer} id <code>id</code> of the status to update
 * @apiParam (Body parameters) {String} [createdBy] New value of <code>createdBy</code> for status
 * @apiParam (Body parameters) {String} [updatedBy] New value of <code>updatedBy</code> for status
 * @apiParam (Body parameters) {String} [f_entity] New value of <code>f_entity</code> for status
 * @apiParam (Body parameters) {String} [f_field] New value of <code>f_field</code> for status
 * @apiParam (Body parameters) {String} [f_name] New value of <code>f_name</code> for status
 * @apiParam (Body parameters) {String} [f_color] New value of <code>f_color</code> for status
 * @apiParam (Body parameters) {String} [f_button_label] New value of <code>f_button_label</code> for status
 * @apiParam (Body parameters) {Integer} [f_position] New value of <code>f_position</code> for status
 * @apiParam (Body parameters) {Boolean} [f_default] New value of <code>f_default</code> for status
 * @apiParam (Body parameters) {Boolean} [f_comment] New value of <code>f_comment</code> for status
 * @apiParam (Body parameters) {Integer} [fk_id_status_children] <code>id</code> of entity status to associate
 * @apiParam (Body parameters) {Integer} [fk_id_status_translations] <code>id</code> of entity translation to associate
 * @apiParam (Body parameters) {Integer} [fk_id_status_state] <code>id</code> of entity task to associate
 * @apiParam (Body parameters) {Integer} [fk_id_status_actions] <code>id</code> of entity action to associate
 * @apiSuccess {Object} status Updated status
 * @apiSuccess {Integer} status.id <code>id</code> of status
 * @apiSuccess {String} status.createdBy <code>createdBy</code> of status
 * @apiSuccess {String} status.updatedBy <code>updatedBy</code> of status
 * @apiSuccess {String} status.f_entity <code>f_entity</code> of status
 * @apiSuccess {String} status.f_field <code>f_field</code> of status
 * @apiSuccess {String} status.f_name <code>f_name</code> of status
 * @apiSuccess {String} status.f_color <code>f_color</code> of status
 * @apiSuccess {String} status.f_button_label <code>f_button_label</code> of status
 * @apiSuccess {Integer} status.f_position <code>f_position</code> of status
 * @apiSuccess {Boolean} status.f_default <code>f_default</code> of status
 * @apiSuccess {Boolean} status.f_comment <code>f_comment</code> of status
 * @apiError (Error 404) {Object} NotFound No status with ID <code>id</code> found
 * @apiError (Error 500) {Object} ServerError An error occured when trying to update status
 */

/**
 * @api {delete} /api/status/:id?token=TOKEN 5 - Delete
 * @apiVersion 1.0.0
 * @apiDescription Permanently delete a record of <code>status</code> with <code>id</code>
 * @apiGroup Status
 * @apiUse token
 * @apiParam (Params parameters) {Integer} id <code>id</code> of status to delete
 * @apiSuccessExample {json} Success-Response:
 *	 HTTP/1.1 200 OK
 * @apiError (Error 404) {Object} NotFound No status with ID <code>id</code> found
 */



/********************************************
 ********************************************
 * E_TRANSLATION
 ********************************************
 *******************************************/
/** @apiDefine e_translation E_translation */
/**
 * @api {get} /api/translation?token=TOKEN 1 - Find all
 * @apiVersion 1.0.0
 * @apiDescription Fetch records of <code>translation</code> from <code>offset</code> until <code>limit</code>
 * @apiGroup Translation
 * @apiParam (Query parameters) {String=r_status_translations} [include] Include specified association(s) to each <code>translation</code> result.<br>Multiple values can be given separated by a comma <br><br>Ex: ?include=r_asso1,r_asso2
 * @apiUse tokenLimitOffset
 * @apiSuccess {Object[]} translations List of translation
 * @apiSuccess {Integer} translations.id <code>id</code> of translation
 * @apiSuccess {Integer} translations.version <code>version</code> of translation
 * @apiSuccess {String} translations.createdBy <code>createdBy</code> of translation
 * @apiSuccess {String} translations.updatedBy <code>updatedBy</code> of translation
 * @apiSuccess {String} translations.f_language <code>f_language</code> of translation
 * @apiSuccess {String} translations.f_value <code>f_value</code> of translation
 * @apiSuccess {Integer} limit Limit used to fetch data
 * @apiSuccess {Integer} offset Offset used to fetch data
 * @apiSuccess {Integer} totalCount The total count of records for translation
 */

/**
 * @api {get} /api/translation/:id?token=TOKEN 2 - Find one
 * @apiVersion 1.0.0
 * @apiDescription Fetch one record of <code>translation</code> with <code>id</code>
 * @apiGroup Translation
 * @apiUse token
 * @apiParam (Query parameters) {String=r_status_translations} [include] Include specified association(s) to each <code>translation</code> result.<br>Multiple values can be given separated by a comma <br><br>Ex: ?include=r_asso1,r_asso2
 * @apiParam (Params parameters) {Integer} id The <code>id</code> of translation to fetch
 * @apiSuccess {Object} translation Object of translation
 * @apiSuccess {Integer} translation.id <code>id</code> of translation
 * @apiSuccess {Integer} translation.version <code>version</code> of translation
 * @apiSuccess {String} translation.createdBy <code>createdBy</code> of translation
 * @apiSuccess {String} translation.updatedBy <code>updatedBy</code> of translation
 * @apiSuccess {String} translation.f_language <code>f_language</code> of translation
 * @apiSuccess {String} translation.f_value <code>f_value</code> of translation
 * @apiError (Error 404) {Object} NotFound No translation with ID <code>id</code> found
 */

/**
 * @api {get} /api/translation/:id/:association?token=TOKEN 2.a - Find association
 * @apiVersion 1.0.0
 * @apiDescription Fetch records of <code>translation</code>'s <code>association</code> from <code>offset</code> until <code>limit</code>
 * @apiGroup Translation
 * @apiUse tokenLimitOffset
 * @apiParam (Params parameters) {Integer} id <code>id</code> of the translation to which <code>association</code> is related
 * @apiParam (Params parameters) {String=status} association Name of the related entity
 * @apiSuccess {Object} Object Object of <code>association</code>
 * @apiSuccess {Integer} limit Limit used to fetch data
 * @apiSuccess {Integer} offset Offset used to fetch data
 * @apiError (Error 404) {Object} NotFound No translation with ID <code>id</code> found
 * @apiError (Error 404) {Object} AssociationNotFound No association with <code>association</code>
 */

/**
 * @api {post} /api/translation/?token=TOKEN 3 - Create
 * @apiVersion 1.0.0
 * @apiDescription Create a record of <code>translation</code> using values defined in request's <code>body</code>
 * @apiGroup Translation
 * @apiUse token
 * @apiParam (Body parameters) {String} [createdBy] <code>createdBy</code> of translation
 * @apiParam (Body parameters) {String} [updatedBy] <code>updatedBy</code> of translation
 * @apiParam (Body parameters) {String} [f_language] <code>f_language</code> of translation
 * @apiParam (Body parameters) {String} [f_value] <code>f_value</code> of translation
 * @apiParam (Body parameters) {Integer} [fk_id_status_translations] <code>id</code> of entity status to associate
 * @apiSuccess {Object} translation Created translation
 * @apiSuccess {Integer} translation.id <code>id</code> of translation
 * @apiSuccess {String} translation.createdBy <code>createdBy</code> of translation
 * @apiSuccess {String} translation.updatedBy <code>updatedBy</code> of translation
 * @apiSuccess {String} translation.f_language <code>f_language</code> of translation
 * @apiSuccess {String} translation.f_value <code>f_value</code> of translation
 * @apiError (Error 500) {Object} ServerError An error occured when trying to create translation
 */

/**
 * @api {put} /api/translation/:id?token=TOKEN 4 - Update
 * @apiVersion 1.0.0
 * @apiDescription Update record of <code>translation</code> with <code>id</code> using values defined in request's <code>body</code>
 * @apiGroup Translation
 * @apiUse token
 * @apiParam (Params parameters) {Integer} id <code>id</code> of the translation to update
 * @apiParam (Body parameters) {String} [createdBy] New value of <code>createdBy</code> for translation
 * @apiParam (Body parameters) {String} [updatedBy] New value of <code>updatedBy</code> for translation
 * @apiParam (Body parameters) {String} [f_language] New value of <code>f_language</code> for translation
 * @apiParam (Body parameters) {String} [f_value] New value of <code>f_value</code> for translation
 * @apiParam (Body parameters) {Integer} [fk_id_status_translations] <code>id</code> of entity status to associate
 * @apiSuccess {Object} translation Updated translation
 * @apiSuccess {Integer} translation.id <code>id</code> of translation
 * @apiSuccess {String} translation.createdBy <code>createdBy</code> of translation
 * @apiSuccess {String} translation.updatedBy <code>updatedBy</code> of translation
 * @apiSuccess {String} translation.f_language <code>f_language</code> of translation
 * @apiSuccess {String} translation.f_value <code>f_value</code> of translation
 * @apiError (Error 404) {Object} NotFound No translation with ID <code>id</code> found
 * @apiError (Error 500) {Object} ServerError An error occured when trying to update translation
 */

/**
 * @api {delete} /api/translation/:id?token=TOKEN 5 - Delete
 * @apiVersion 1.0.0
 * @apiDescription Permanently delete a record of <code>translation</code> with <code>id</code>
 * @apiGroup Translation
 * @apiUse token
 * @apiParam (Params parameters) {Integer} id <code>id</code> of translation to delete
 * @apiSuccessExample {json} Success-Response:
 *	 HTTP/1.1 200 OK
 * @apiError (Error 404) {Object} NotFound No translation with ID <code>id</code> found
 */



/********************************************
 ********************************************
 * E_ROBOT
 ********************************************
 *******************************************/
/** @apiDefine e_robot E_robot */
/**
 * @api {get} /api/robot?token=TOKEN 1 - Find all
 * @apiVersion 1.0.0
 * @apiDescription Fetch records of <code>robot</code> from <code>offset</code> until <code>limit</code>
 * @apiGroup Robot
 * @apiParam (Query parameters) {String=r_api_credentials,r_task} [include] Include specified association(s) to each <code>robot</code> result.<br>Multiple values can be given separated by a comma <br><br>Ex: ?include=r_asso1,r_asso2
 * @apiUse tokenLimitOffset
 * @apiSuccess {Object[]} robots List of robot
 * @apiSuccess {Integer} robots.id <code>id</code> of robot
 * @apiSuccess {Integer} robots.version <code>version</code> of robot
 * @apiSuccess {String} robots.createdBy <code>createdBy</code> of robot
 * @apiSuccess {String} robots.updatedBy <code>updatedBy</code> of robot
 * @apiSuccess {Enum} robots.f_current_status <code>f_current_status</code> of robot
 * @apiSuccess {String} robots.f_name <code>f_name</code> of robot
 * @apiSuccess {Text} robots.f_comment <code>f_comment</code> of robot
 * @apiSuccess {Integer} limit Limit used to fetch data
 * @apiSuccess {Integer} offset Offset used to fetch data
 * @apiSuccess {Integer} totalCount The total count of records for robot
 */

/**
 * @api {get} /api/robot/:id?token=TOKEN 2 - Find one
 * @apiVersion 1.0.0
 * @apiDescription Fetch one record of <code>robot</code> with <code>id</code>
 * @apiGroup Robot
 * @apiUse token
 * @apiParam (Query parameters) {String=r_api_credentials,r_task} [include] Include specified association(s) to each <code>robot</code> result.<br>Multiple values can be given separated by a comma <br><br>Ex: ?include=r_asso1,r_asso2
 * @apiParam (Params parameters) {Integer} id The <code>id</code> of robot to fetch
 * @apiSuccess {Object} robot Object of robot
 * @apiSuccess {Integer} robot.id <code>id</code> of robot
 * @apiSuccess {Integer} robot.version <code>version</code> of robot
 * @apiSuccess {String} robot.createdBy <code>createdBy</code> of robot
 * @apiSuccess {String} robot.updatedBy <code>updatedBy</code> of robot
 * @apiSuccess {Enum} robot.f_current_status <code>f_current_status</code> of robot
 * @apiSuccess {String} robot.f_name <code>f_name</code> of robot
 * @apiSuccess {Text} robot.f_comment <code>f_comment</code> of robot
 * @apiError (Error 404) {Object} NotFound No robot with ID <code>id</code> found
 */

/**
 * @api {get} /api/robot/:id/:association?token=TOKEN 2.a - Find association
 * @apiVersion 1.0.0
 * @apiDescription Fetch records of <code>robot</code>'s <code>association</code> from <code>offset</code> until <code>limit</code>
 * @apiGroup Robot
 * @apiUse tokenLimitOffset
 * @apiParam (Params parameters) {Integer} id <code>id</code> of the robot to which <code>association</code> is related
 * @apiParam (Params parameters) {String=api_credentials,task} association Name of the related entity
 * @apiSuccess {Object} Object Object of <code>association</code>
 * @apiSuccess {Integer} limit Limit used to fetch data
 * @apiSuccess {Integer} offset Offset used to fetch data
 * @apiError (Error 404) {Object} NotFound No robot with ID <code>id</code> found
 * @apiError (Error 404) {Object} AssociationNotFound No association with <code>association</code>
 */

/**
 * @api {post} /api/robot/?token=TOKEN 3 - Create
 * @apiVersion 1.0.0
 * @apiDescription Create a record of <code>robot</code> using values defined in request's <code>body</code>
 * @apiGroup Robot
 * @apiUse token
 * @apiParam (Body parameters) {String} [createdBy] <code>createdBy</code> of robot
 * @apiParam (Body parameters) {String} [updatedBy] <code>updatedBy</code> of robot
 * @apiParam (Body parameters) {Enum} [f_current_status] <code>f_current_status</code> of robot
 * @apiParam (Body parameters) {String} [f_name] <code>f_name</code> of robot
 * @apiParam (Body parameters) {Text} [f_comment] <code>f_comment</code> of robot
 * @apiParam (Body parameters) {Integer} [fk_id_api_credentials_api_credentials] <code>id</code> of entity api_credentials to associate
 * @apiParam (Body parameters) {Integer} [fk_id_robot_robot] <code>id</code> of entity task to associate
 * @apiSuccess {Object} robot Created robot
 * @apiSuccess {Integer} robot.id <code>id</code> of robot
 * @apiSuccess {String} robot.createdBy <code>createdBy</code> of robot
 * @apiSuccess {String} robot.updatedBy <code>updatedBy</code> of robot
 * @apiSuccess {Enum} robot.f_current_status <code>f_current_status</code> of robot
 * @apiSuccess {String} robot.f_name <code>f_name</code> of robot
 * @apiSuccess {Text} robot.f_comment <code>f_comment</code> of robot
 * @apiError (Error 500) {Object} ServerError An error occured when trying to create robot
 */

/**
 * @api {put} /api/robot/:id?token=TOKEN 4 - Update
 * @apiVersion 1.0.0
 * @apiDescription Update record of <code>robot</code> with <code>id</code> using values defined in request's <code>body</code>
 * @apiGroup Robot
 * @apiUse token
 * @apiParam (Params parameters) {Integer} id <code>id</code> of the robot to update
 * @apiParam (Body parameters) {String} [createdBy] New value of <code>createdBy</code> for robot
 * @apiParam (Body parameters) {String} [updatedBy] New value of <code>updatedBy</code> for robot
 * @apiParam (Body parameters) {Enum} [f_current_status] New value of <code>f_current_status</code> for robot
 * @apiParam (Body parameters) {String} [f_name] New value of <code>f_name</code> for robot
 * @apiParam (Body parameters) {Text} [f_comment] New value of <code>f_comment</code> for robot
 * @apiParam (Body parameters) {Integer} [fk_id_api_credentials_api_credentials] <code>id</code> of entity api_credentials to associate
 * @apiParam (Body parameters) {Integer} [fk_id_robot_robot] <code>id</code> of entity task to associate
 * @apiSuccess {Object} robot Updated robot
 * @apiSuccess {Integer} robot.id <code>id</code> of robot
 * @apiSuccess {String} robot.createdBy <code>createdBy</code> of robot
 * @apiSuccess {String} robot.updatedBy <code>updatedBy</code> of robot
 * @apiSuccess {Enum} robot.f_current_status <code>f_current_status</code> of robot
 * @apiSuccess {String} robot.f_name <code>f_name</code> of robot
 * @apiSuccess {Text} robot.f_comment <code>f_comment</code> of robot
 * @apiError (Error 404) {Object} NotFound No robot with ID <code>id</code> found
 * @apiError (Error 500) {Object} ServerError An error occured when trying to update robot
 */

/**
 * @api {delete} /api/robot/:id?token=TOKEN 5 - Delete
 * @apiVersion 1.0.0
 * @apiDescription Permanently delete a record of <code>robot</code> with <code>id</code>
 * @apiGroup Robot
 * @apiUse token
 * @apiParam (Params parameters) {Integer} id <code>id</code> of robot to delete
 * @apiSuccessExample {json} Success-Response:
 *	 HTTP/1.1 200 OK
 * @apiError (Error 404) {Object} NotFound No robot with ID <code>id</code> found
 */



/********************************************
 ********************************************
 * E_TASK
 ********************************************
 *******************************************/
/** @apiDefine e_task E_task */
/**
 * @api {get} /api/task?token=TOKEN 1 - Find all
 * @apiVersion 1.0.0
 * @apiDescription Fetch records of <code>task</code> from <code>offset</code> until <code>limit</code>
 * @apiGroup Task
 * @apiParam (Query parameters) {String=r_history_state,r_state,r_robot,r_documents_task} [include] Include specified association(s) to each <code>task</code> result.<br>Multiple values can be given separated by a comma <br><br>Ex: ?include=r_asso1,r_asso2
 * @apiUse tokenLimitOffset
 * @apiSuccess {Object[]} tasks List of task
 * @apiSuccess {Integer} tasks.id <code>id</code> of task
 * @apiSuccess {Integer} tasks.version <code>version</code> of task
 * @apiSuccess {String} tasks.createdBy <code>createdBy</code> of task
 * @apiSuccess {String} tasks.updatedBy <code>updatedBy</code> of task
 * @apiSuccess {Virtual} tasks.s_state <code>s_state</code> of task
 * @apiSuccess {String} tasks.f_title <code>f_title</code> of task
 * @apiSuccess {Enum} tasks.f_type <code>f_type</code> of task
 * @apiSuccess {Date} tasks.f_planned_date <code>f_planned_date</code> of task
 * @apiSuccess {Date} tasks.f_execution_start_date <code>f_execution_start_date</code> of task
 * @apiSuccess {Date} tasks.f_execution_finish_date <code>f_execution_finish_date</code> of task
 * @apiSuccess {String} tasks.f_duration <code>f_duration</code> of task
 * @apiSuccess {Text} tasks.f_data_flow <code>f_data_flow</code> of task
 * @apiSuccess {String} tasks.f_program_file <code>f_program_file</code> of task
 * @apiSuccess {Text} tasks.f_procedure <code>f_procedure</code> of task
 * @apiSuccess {Integer} limit Limit used to fetch data
 * @apiSuccess {Integer} offset Offset used to fetch data
 * @apiSuccess {Integer} totalCount The total count of records for task
 */

/**
 * @api {get} /api/task/:id?token=TOKEN 2 - Find one
 * @apiVersion 1.0.0
 * @apiDescription Fetch one record of <code>task</code> with <code>id</code>
 * @apiGroup Task
 * @apiUse token
 * @apiParam (Query parameters) {String=r_history_state,r_state,r_robot,r_documents_task} [include] Include specified association(s) to each <code>task</code> result.<br>Multiple values can be given separated by a comma <br><br>Ex: ?include=r_asso1,r_asso2
 * @apiParam (Params parameters) {Integer} id The <code>id</code> of task to fetch
 * @apiSuccess {Object} task Object of task
 * @apiSuccess {Integer} task.id <code>id</code> of task
 * @apiSuccess {Integer} task.version <code>version</code> of task
 * @apiSuccess {String} task.createdBy <code>createdBy</code> of task
 * @apiSuccess {String} task.updatedBy <code>updatedBy</code> of task
 * @apiSuccess {Virtual} task.s_state <code>s_state</code> of task
 * @apiSuccess {String} task.f_title <code>f_title</code> of task
 * @apiSuccess {Enum} task.f_type <code>f_type</code> of task
 * @apiSuccess {Date} task.f_planned_date <code>f_planned_date</code> of task
 * @apiSuccess {Date} task.f_execution_start_date <code>f_execution_start_date</code> of task
 * @apiSuccess {Date} task.f_execution_finish_date <code>f_execution_finish_date</code> of task
 * @apiSuccess {String} task.f_duration <code>f_duration</code> of task
 * @apiSuccess {Text} task.f_data_flow <code>f_data_flow</code> of task
 * @apiSuccess {String} task.f_program_file <code>f_program_file</code> of task
 * @apiSuccess {Text} task.f_procedure <code>f_procedure</code> of task
 * @apiError (Error 404) {Object} NotFound No task with ID <code>id</code> found
 */

/**
 * @api {get} /api/task/:id/:association?token=TOKEN 2.a - Find association
 * @apiVersion 1.0.0
 * @apiDescription Fetch records of <code>task</code>'s <code>association</code> from <code>offset</code> until <code>limit</code>
 * @apiGroup Task
 * @apiUse tokenLimitOffset
 * @apiParam (Params parameters) {Integer} id <code>id</code> of the task to which <code>association</code> is related
 * @apiParam (Params parameters) {String=history_task_state,status,robot,documents_task} association Name of the related entity
 * @apiSuccess {Object} Object Object of <code>association</code>
 * @apiSuccess {Integer} limit Limit used to fetch data
 * @apiSuccess {Integer} offset Offset used to fetch data
 * @apiError (Error 404) {Object} NotFound No task with ID <code>id</code> found
 * @apiError (Error 404) {Object} AssociationNotFound No association with <code>association</code>
 */

/**
 * @api {post} /api/task/?token=TOKEN 3 - Create
 * @apiVersion 1.0.0
 * @apiDescription Create a record of <code>task</code> using values defined in request's <code>body</code>
 * @apiGroup Task
 * @apiUse token
 * @apiParam (Body parameters) {String} [createdBy] <code>createdBy</code> of task
 * @apiParam (Body parameters) {String} [updatedBy] <code>updatedBy</code> of task
 * @apiParam (Body parameters) {Virtual} [s_state] <code>s_state</code> of task
 * @apiParam (Body parameters) {String} [f_title] <code>f_title</code> of task
 * @apiParam (Body parameters) {Enum} [f_type] <code>f_type</code> of task
 * @apiParam (Body parameters) {Date} [f_planned_date] <code>f_planned_date</code> of task
 * @apiParam (Body parameters) {Date} [f_execution_start_date] <code>f_execution_start_date</code> of task
 * @apiParam (Body parameters) {Date} [f_execution_finish_date] <code>f_execution_finish_date</code> of task
 * @apiParam (Body parameters) {String} [f_duration] <code>f_duration</code> of task
 * @apiParam (Body parameters) {Text} [f_data_flow] <code>f_data_flow</code> of task
 * @apiParam (Body parameters) {String} [f_program_file] <code>f_program_file</code> of task
 * @apiParam (Body parameters) {Text} [f_procedure] <code>f_procedure</code> of task
 * @apiParam (Body parameters) {Integer} [fk_id_task_history_state] <code>id</code> of entity history_task_state to associate
 * @apiParam (Body parameters) {Integer} [fk_id_status_state] <code>id</code> of entity status to associate
 * @apiParam (Body parameters) {Integer} [fk_id_robot_robot] <code>id</code> of entity robot to associate
 * @apiParam (Body parameters) {Integer} [fk_id_task] <code>id</code> of entity documents_task to associate
 * @apiSuccess {Object} task Created task
 * @apiSuccess {Integer} task.id <code>id</code> of task
 * @apiSuccess {String} task.createdBy <code>createdBy</code> of task
 * @apiSuccess {String} task.updatedBy <code>updatedBy</code> of task
 * @apiSuccess {Virtual} task.s_state <code>s_state</code> of task
 * @apiSuccess {String} task.f_title <code>f_title</code> of task
 * @apiSuccess {Enum} task.f_type <code>f_type</code> of task
 * @apiSuccess {Date} task.f_planned_date <code>f_planned_date</code> of task
 * @apiSuccess {Date} task.f_execution_start_date <code>f_execution_start_date</code> of task
 * @apiSuccess {Date} task.f_execution_finish_date <code>f_execution_finish_date</code> of task
 * @apiSuccess {String} task.f_duration <code>f_duration</code> of task
 * @apiSuccess {Text} task.f_data_flow <code>f_data_flow</code> of task
 * @apiSuccess {String} task.f_program_file <code>f_program_file</code> of task
 * @apiSuccess {Text} task.f_procedure <code>f_procedure</code> of task
 * @apiError (Error 500) {Object} ServerError An error occured when trying to create task
 */

/**
 * @api {put} /api/task/:id?token=TOKEN 4 - Update
 * @apiVersion 1.0.0
 * @apiDescription Update record of <code>task</code> with <code>id</code> using values defined in request's <code>body</code>
 * @apiGroup Task
 * @apiUse token
 * @apiParam (Params parameters) {Integer} id <code>id</code> of the task to update
 * @apiParam (Body parameters) {String} [createdBy] New value of <code>createdBy</code> for task
 * @apiParam (Body parameters) {String} [updatedBy] New value of <code>updatedBy</code> for task
 * @apiParam (Body parameters) {Virtual} [s_state] New value of <code>s_state</code> for task
 * @apiParam (Body parameters) {String} [f_title] New value of <code>f_title</code> for task
 * @apiParam (Body parameters) {Enum} [f_type] New value of <code>f_type</code> for task
 * @apiParam (Body parameters) {Date} [f_planned_date] New value of <code>f_planned_date</code> for task
 * @apiParam (Body parameters) {Date} [f_execution_start_date] New value of <code>f_execution_start_date</code> for task
 * @apiParam (Body parameters) {Date} [f_execution_finish_date] New value of <code>f_execution_finish_date</code> for task
 * @apiParam (Body parameters) {String} [f_duration] New value of <code>f_duration</code> for task
 * @apiParam (Body parameters) {Text} [f_data_flow] New value of <code>f_data_flow</code> for task
 * @apiParam (Body parameters) {String} [f_program_file] New value of <code>f_program_file</code> for task
 * @apiParam (Body parameters) {Text} [f_procedure] New value of <code>f_procedure</code> for task
 * @apiParam (Body parameters) {Integer} [fk_id_task_history_state] <code>id</code> of entity history_task_state to associate
 * @apiParam (Body parameters) {Integer} [fk_id_status_state] <code>id</code> of entity status to associate
 * @apiParam (Body parameters) {Integer} [fk_id_robot_robot] <code>id</code> of entity robot to associate
 * @apiParam (Body parameters) {Integer} [fk_id_task] <code>id</code> of entity documents_task to associate
 * @apiSuccess {Object} task Updated task
 * @apiSuccess {Integer} task.id <code>id</code> of task
 * @apiSuccess {String} task.createdBy <code>createdBy</code> of task
 * @apiSuccess {String} task.updatedBy <code>updatedBy</code> of task
 * @apiSuccess {Virtual} task.s_state <code>s_state</code> of task
 * @apiSuccess {String} task.f_title <code>f_title</code> of task
 * @apiSuccess {Enum} task.f_type <code>f_type</code> of task
 * @apiSuccess {Date} task.f_planned_date <code>f_planned_date</code> of task
 * @apiSuccess {Date} task.f_execution_start_date <code>f_execution_start_date</code> of task
 * @apiSuccess {Date} task.f_execution_finish_date <code>f_execution_finish_date</code> of task
 * @apiSuccess {String} task.f_duration <code>f_duration</code> of task
 * @apiSuccess {Text} task.f_data_flow <code>f_data_flow</code> of task
 * @apiSuccess {String} task.f_program_file <code>f_program_file</code> of task
 * @apiSuccess {Text} task.f_procedure <code>f_procedure</code> of task
 * @apiError (Error 404) {Object} NotFound No task with ID <code>id</code> found
 * @apiError (Error 500) {Object} ServerError An error occured when trying to update task
 */

/**
 * @api {delete} /api/task/:id?token=TOKEN 5 - Delete
 * @apiVersion 1.0.0
 * @apiDescription Permanently delete a record of <code>task</code> with <code>id</code>
 * @apiGroup Task
 * @apiUse token
 * @apiParam (Params parameters) {Integer} id <code>id</code> of task to delete
 * @apiSuccessExample {json} Success-Response:
 *	 HTTP/1.1 200 OK
 * @apiError (Error 404) {Object} NotFound No task with ID <code>id</code> found
 */



/********************************************
 ********************************************
 * E_DOCUMENTS_TASK
 ********************************************
 *******************************************/
/** @apiDefine e_documents_task E_documents_task */
/**
 * @api {get} /api/documents_task?token=TOKEN 1 - Find all
 * @apiVersion 1.0.0
 * @apiDescription Fetch records of <code>documents_task</code> from <code>offset</code> until <code>limit</code>
 * @apiGroup Documents Task
 * @apiParam (Query parameters) {String=r_task_documents_task} [include] Include specified association(s) to each <code>documents_task</code> result.<br>Multiple values can be given separated by a comma <br><br>Ex: ?include=r_asso1,r_asso2
 * @apiUse tokenLimitOffset
 * @apiSuccess {Object[]} documents_tasks List of documents_task
 * @apiSuccess {Integer} documents_tasks.id <code>id</code> of documents_task
 * @apiSuccess {Integer} documents_tasks.version <code>version</code> of documents_task
 * @apiSuccess {String} documents_tasks.createdBy <code>createdBy</code> of documents_task
 * @apiSuccess {String} documents_tasks.updatedBy <code>updatedBy</code> of documents_task
 * @apiSuccess {String} documents_tasks.f_filename <code>f_filename</code> of documents_task
 * @apiSuccess {Integer} limit Limit used to fetch data
 * @apiSuccess {Integer} offset Offset used to fetch data
 * @apiSuccess {Integer} totalCount The total count of records for documents_task
 */

/**
 * @api {get} /api/documents_task/:id?token=TOKEN 2 - Find one
 * @apiVersion 1.0.0
 * @apiDescription Fetch one record of <code>documents_task</code> with <code>id</code>
 * @apiGroup Documents Task
 * @apiUse token
 * @apiParam (Query parameters) {String=r_task_documents_task} [include] Include specified association(s) to each <code>documents_task</code> result.<br>Multiple values can be given separated by a comma <br><br>Ex: ?include=r_asso1,r_asso2
 * @apiParam (Params parameters) {Integer} id The <code>id</code> of documents_task to fetch
 * @apiSuccess {Object} documents_task Object of documents_task
 * @apiSuccess {Integer} documents_task.id <code>id</code> of documents_task
 * @apiSuccess {Integer} documents_task.version <code>version</code> of documents_task
 * @apiSuccess {String} documents_task.createdBy <code>createdBy</code> of documents_task
 * @apiSuccess {String} documents_task.updatedBy <code>updatedBy</code> of documents_task
 * @apiSuccess {String} documents_task.f_filename <code>f_filename</code> of documents_task
 * @apiError (Error 404) {Object} NotFound No documents_task with ID <code>id</code> found
 */

/**
 * @api {get} /api/documents_task/:id/:association?token=TOKEN 2.a - Find association
 * @apiVersion 1.0.0
 * @apiDescription Fetch records of <code>documents_task</code>'s <code>association</code> from <code>offset</code> until <code>limit</code>
 * @apiGroup Documents Task
 * @apiUse tokenLimitOffset
 * @apiParam (Params parameters) {Integer} id <code>id</code> of the documents_task to which <code>association</code> is related
 * @apiParam (Params parameters) {String=task} association Name of the related entity
 * @apiSuccess {Object} Object Object of <code>association</code>
 * @apiSuccess {Integer} limit Limit used to fetch data
 * @apiSuccess {Integer} offset Offset used to fetch data
 * @apiError (Error 404) {Object} NotFound No documents_task with ID <code>id</code> found
 * @apiError (Error 404) {Object} AssociationNotFound No association with <code>association</code>
 */

/**
 * @api {post} /api/documents_task/?token=TOKEN 3 - Create
 * @apiVersion 1.0.0
 * @apiDescription Create a record of <code>documents_task</code> using values defined in request's <code>body</code>
 * @apiGroup Documents Task
 * @apiUse token
 * @apiParam (Body parameters) {String} [createdBy] <code>createdBy</code> of documents_task
 * @apiParam (Body parameters) {String} [updatedBy] <code>updatedBy</code> of documents_task
 * @apiParam (Body parameters) {String} [f_filename] <code>f_filename</code> of documents_task
 * @apiParam (Body parameters) {Integer} [fk_id_task] <code>id</code> of entity task to associate
 * @apiSuccess {Object} documents_task Created documents_task
 * @apiSuccess {Integer} documents_task.id <code>id</code> of documents_task
 * @apiSuccess {String} documents_task.createdBy <code>createdBy</code> of documents_task
 * @apiSuccess {String} documents_task.updatedBy <code>updatedBy</code> of documents_task
 * @apiSuccess {String} documents_task.f_filename <code>f_filename</code> of documents_task
 * @apiError (Error 500) {Object} ServerError An error occured when trying to create documents_task
 */

/**
 * @api {put} /api/documents_task/:id?token=TOKEN 4 - Update
 * @apiVersion 1.0.0
 * @apiDescription Update record of <code>documents_task</code> with <code>id</code> using values defined in request's <code>body</code>
 * @apiGroup Documents Task
 * @apiUse token
 * @apiParam (Params parameters) {Integer} id <code>id</code> of the documents_task to update
 * @apiParam (Body parameters) {String} [createdBy] New value of <code>createdBy</code> for documents_task
 * @apiParam (Body parameters) {String} [updatedBy] New value of <code>updatedBy</code> for documents_task
 * @apiParam (Body parameters) {String} [f_filename] New value of <code>f_filename</code> for documents_task
 * @apiParam (Body parameters) {Integer} [fk_id_task] <code>id</code> of entity task to associate
 * @apiSuccess {Object} documents_task Updated documents_task
 * @apiSuccess {Integer} documents_task.id <code>id</code> of documents_task
 * @apiSuccess {String} documents_task.createdBy <code>createdBy</code> of documents_task
 * @apiSuccess {String} documents_task.updatedBy <code>updatedBy</code> of documents_task
 * @apiSuccess {String} documents_task.f_filename <code>f_filename</code> of documents_task
 * @apiError (Error 404) {Object} NotFound No documents_task with ID <code>id</code> found
 * @apiError (Error 500) {Object} ServerError An error occured when trying to update documents_task
 */

/**
 * @api {delete} /api/documents_task/:id?token=TOKEN 5 - Delete
 * @apiVersion 1.0.0
 * @apiDescription Permanently delete a record of <code>documents_task</code> with <code>id</code>
 * @apiGroup Documents Task
 * @apiUse token
 * @apiParam (Params parameters) {Integer} id <code>id</code> of documents_task to delete
 * @apiSuccessExample {json} Success-Response:
 *	 HTTP/1.1 200 OK
 * @apiError (Error 404) {Object} NotFound No documents_task with ID <code>id</code> found
 */



/********************************************
 ********************************************
 * E_MEDIA
 ********************************************
 *******************************************/
/** @apiDefine e_media E_media */
/**
 * @api {get} /api/media?token=TOKEN 1 - Find all
 * @apiVersion 1.0.0
 * @apiDescription Fetch records of <code>media</code> from <code>offset</code> until <code>limit</code>
 * @apiGroup Media
 * @apiParam (Query parameters) {String=r_media_mail,r_media_notification,r_media_sms,r_media_task,r_action} [include] Include specified association(s) to each <code>media</code> result.<br>Multiple values can be given separated by a comma <br><br>Ex: ?include=r_asso1,r_asso2
 * @apiUse tokenLimitOffset
 * @apiSuccess {Object[]} medias List of media
 * @apiSuccess {Integer} medias.id <code>id</code> of media
 * @apiSuccess {Integer} medias.version <code>version</code> of media
 * @apiSuccess {String} medias.createdBy <code>createdBy</code> of media
 * @apiSuccess {String} medias.updatedBy <code>updatedBy</code> of media
 * @apiSuccess {Enum} medias.f_type <code>f_type</code> of media
 * @apiSuccess {String} medias.f_name <code>f_name</code> of media
 * @apiSuccess {String} medias.f_target_entity <code>f_target_entity</code> of media
 * @apiSuccess {Integer} limit Limit used to fetch data
 * @apiSuccess {Integer} offset Offset used to fetch data
 * @apiSuccess {Integer} totalCount The total count of records for media
 */

/**
 * @api {get} /api/media/:id?token=TOKEN 2 - Find one
 * @apiVersion 1.0.0
 * @apiDescription Fetch one record of <code>media</code> with <code>id</code>
 * @apiGroup Media
 * @apiUse token
 * @apiParam (Query parameters) {String=r_media_mail,r_media_notification,r_media_sms,r_media_task,r_action} [include] Include specified association(s) to each <code>media</code> result.<br>Multiple values can be given separated by a comma <br><br>Ex: ?include=r_asso1,r_asso2
 * @apiParam (Params parameters) {Integer} id The <code>id</code> of media to fetch
 * @apiSuccess {Object} media Object of media
 * @apiSuccess {Integer} media.id <code>id</code> of media
 * @apiSuccess {Integer} media.version <code>version</code> of media
 * @apiSuccess {String} media.createdBy <code>createdBy</code> of media
 * @apiSuccess {String} media.updatedBy <code>updatedBy</code> of media
 * @apiSuccess {Enum} media.f_type <code>f_type</code> of media
 * @apiSuccess {String} media.f_name <code>f_name</code> of media
 * @apiSuccess {String} media.f_target_entity <code>f_target_entity</code> of media
 * @apiError (Error 404) {Object} NotFound No media with ID <code>id</code> found
 */

/**
 * @api {get} /api/media/:id/:association?token=TOKEN 2.a - Find association
 * @apiVersion 1.0.0
 * @apiDescription Fetch records of <code>media</code>'s <code>association</code> from <code>offset</code> until <code>limit</code>
 * @apiGroup Media
 * @apiUse tokenLimitOffset
 * @apiParam (Params parameters) {Integer} id <code>id</code> of the media to which <code>association</code> is related
 * @apiParam (Params parameters) {String=media_mail,media_notification,media_sms,media_task,action} association Name of the related entity
 * @apiSuccess {Object} Object Object of <code>association</code>
 * @apiSuccess {Integer} limit Limit used to fetch data
 * @apiSuccess {Integer} offset Offset used to fetch data
 * @apiError (Error 404) {Object} NotFound No media with ID <code>id</code> found
 * @apiError (Error 404) {Object} AssociationNotFound No association with <code>association</code>
 */

/**
 * @api {post} /api/media/?token=TOKEN 3 - Create
 * @apiVersion 1.0.0
 * @apiDescription Create a record of <code>media</code> using values defined in request's <code>body</code>
 * @apiGroup Media
 * @apiUse token
 * @apiParam (Body parameters) {String} [createdBy] <code>createdBy</code> of media
 * @apiParam (Body parameters) {String} [updatedBy] <code>updatedBy</code> of media
 * @apiParam (Body parameters) {Enum} [f_type] <code>f_type</code> of media
 * @apiParam (Body parameters) {String} [f_name] <code>f_name</code> of media
 * @apiParam (Body parameters) {String} [f_target_entity] <code>f_target_entity</code> of media
 * @apiParam (Body parameters) {Integer} [fk_id_media_mail] <code>id</code> of entity media_mail to associate
 * @apiParam (Body parameters) {Integer} [fk_id_media_notification] <code>id</code> of entity media_notification to associate
 * @apiParam (Body parameters) {Integer} [fk_id_media_sms] <code>id</code> of entity media_sms to associate
 * @apiParam (Body parameters) {Integer} [fk_id_media_task] <code>id</code> of entity media_task to associate
 * @apiParam (Body parameters) {Integer} [fk_id_media_media] <code>id</code> of entity action to associate
 * @apiSuccess {Object} media Created media
 * @apiSuccess {Integer} media.id <code>id</code> of media
 * @apiSuccess {String} media.createdBy <code>createdBy</code> of media
 * @apiSuccess {String} media.updatedBy <code>updatedBy</code> of media
 * @apiSuccess {Enum} media.f_type <code>f_type</code> of media
 * @apiSuccess {String} media.f_name <code>f_name</code> of media
 * @apiSuccess {String} media.f_target_entity <code>f_target_entity</code> of media
 * @apiError (Error 500) {Object} ServerError An error occured when trying to create media
 */

/**
 * @api {put} /api/media/:id?token=TOKEN 4 - Update
 * @apiVersion 1.0.0
 * @apiDescription Update record of <code>media</code> with <code>id</code> using values defined in request's <code>body</code>
 * @apiGroup Media
 * @apiUse token
 * @apiParam (Params parameters) {Integer} id <code>id</code> of the media to update
 * @apiParam (Body parameters) {String} [createdBy] New value of <code>createdBy</code> for media
 * @apiParam (Body parameters) {String} [updatedBy] New value of <code>updatedBy</code> for media
 * @apiParam (Body parameters) {Enum} [f_type] New value of <code>f_type</code> for media
 * @apiParam (Body parameters) {String} [f_name] New value of <code>f_name</code> for media
 * @apiParam (Body parameters) {String} [f_target_entity] New value of <code>f_target_entity</code> for media
 * @apiParam (Body parameters) {Integer} [fk_id_media_mail] <code>id</code> of entity media_mail to associate
 * @apiParam (Body parameters) {Integer} [fk_id_media_notification] <code>id</code> of entity media_notification to associate
 * @apiParam (Body parameters) {Integer} [fk_id_media_sms] <code>id</code> of entity media_sms to associate
 * @apiParam (Body parameters) {Integer} [fk_id_media_task] <code>id</code> of entity media_task to associate
 * @apiParam (Body parameters) {Integer} [fk_id_media_media] <code>id</code> of entity action to associate
 * @apiSuccess {Object} media Updated media
 * @apiSuccess {Integer} media.id <code>id</code> of media
 * @apiSuccess {String} media.createdBy <code>createdBy</code> of media
 * @apiSuccess {String} media.updatedBy <code>updatedBy</code> of media
 * @apiSuccess {Enum} media.f_type <code>f_type</code> of media
 * @apiSuccess {String} media.f_name <code>f_name</code> of media
 * @apiSuccess {String} media.f_target_entity <code>f_target_entity</code> of media
 * @apiError (Error 404) {Object} NotFound No media with ID <code>id</code> found
 * @apiError (Error 500) {Object} ServerError An error occured when trying to update media
 */

/**
 * @api {delete} /api/media/:id?token=TOKEN 5 - Delete
 * @apiVersion 1.0.0
 * @apiDescription Permanently delete a record of <code>media</code> with <code>id</code>
 * @apiGroup Media
 * @apiUse token
 * @apiParam (Params parameters) {Integer} id <code>id</code> of media to delete
 * @apiSuccessExample {json} Success-Response:
 *	 HTTP/1.1 200 OK
 * @apiError (Error 404) {Object} NotFound No media with ID <code>id</code> found
 */



/********************************************
 ********************************************
 * E_MEDIA_MAIL
 ********************************************
 *******************************************/
/** @apiDefine e_media_mail E_media_mail */
/**
 * @api {get} /api/media_mail?token=TOKEN 1 - Find all
 * @apiVersion 1.0.0
 * @apiDescription Fetch records of <code>media_mail</code> from <code>offset</code> until <code>limit</code>
 * @apiGroup Media Mail
 * @apiParam (Query parameters) {String=r_media} [include] Include specified association(s) to each <code>media_mail</code> result.<br>Multiple values can be given separated by a comma <br><br>Ex: ?include=r_asso1,r_asso2
 * @apiUse tokenLimitOffset
 * @apiSuccess {Object[]} media_mails List of media_mail
 * @apiSuccess {Integer} media_mails.id <code>id</code> of media_mail
 * @apiSuccess {Integer} media_mails.version <code>version</code> of media_mail
 * @apiSuccess {String} media_mails.createdBy <code>createdBy</code> of media_mail
 * @apiSuccess {String} media_mails.updatedBy <code>updatedBy</code> of media_mail
 * @apiSuccess {String} media_mails.f_to <code>f_to</code> of media_mail
 * @apiSuccess {String} media_mails.f_cc <code>f_cc</code> of media_mail
 * @apiSuccess {String} media_mails.f_cci <code>f_cci</code> of media_mail
 * @apiSuccess {String} media_mails.f_from <code>f_from</code> of media_mail
 * @apiSuccess {String} media_mails.f_attachments <code>f_attachments</code> of media_mail
 * @apiSuccess {String} media_mails.f_subject <code>f_subject</code> of media_mail
 * @apiSuccess {Text} media_mails.f_content <code>f_content</code> of media_mail
 * @apiSuccess {Integer} limit Limit used to fetch data
 * @apiSuccess {Integer} offset Offset used to fetch data
 * @apiSuccess {Integer} totalCount The total count of records for media_mail
 */

/**
 * @api {get} /api/media_mail/:id?token=TOKEN 2 - Find one
 * @apiVersion 1.0.0
 * @apiDescription Fetch one record of <code>media_mail</code> with <code>id</code>
 * @apiGroup Media Mail
 * @apiUse token
 * @apiParam (Query parameters) {String=r_media} [include] Include specified association(s) to each <code>media_mail</code> result.<br>Multiple values can be given separated by a comma <br><br>Ex: ?include=r_asso1,r_asso2
 * @apiParam (Params parameters) {Integer} id The <code>id</code> of media_mail to fetch
 * @apiSuccess {Object} media_mail Object of media_mail
 * @apiSuccess {Integer} media_mail.id <code>id</code> of media_mail
 * @apiSuccess {Integer} media_mail.version <code>version</code> of media_mail
 * @apiSuccess {String} media_mail.createdBy <code>createdBy</code> of media_mail
 * @apiSuccess {String} media_mail.updatedBy <code>updatedBy</code> of media_mail
 * @apiSuccess {String} media_mail.f_to <code>f_to</code> of media_mail
 * @apiSuccess {String} media_mail.f_cc <code>f_cc</code> of media_mail
 * @apiSuccess {String} media_mail.f_cci <code>f_cci</code> of media_mail
 * @apiSuccess {String} media_mail.f_from <code>f_from</code> of media_mail
 * @apiSuccess {String} media_mail.f_attachments <code>f_attachments</code> of media_mail
 * @apiSuccess {String} media_mail.f_subject <code>f_subject</code> of media_mail
 * @apiSuccess {Text} media_mail.f_content <code>f_content</code> of media_mail
 * @apiError (Error 404) {Object} NotFound No media_mail with ID <code>id</code> found
 */

/**
 * @api {get} /api/media_mail/:id/:association?token=TOKEN 2.a - Find association
 * @apiVersion 1.0.0
 * @apiDescription Fetch records of <code>media_mail</code>'s <code>association</code> from <code>offset</code> until <code>limit</code>
 * @apiGroup Media Mail
 * @apiUse tokenLimitOffset
 * @apiParam (Params parameters) {Integer} id <code>id</code> of the media_mail to which <code>association</code> is related
 * @apiParam (Params parameters) {String=media} association Name of the related entity
 * @apiSuccess {Object} Object Object of <code>association</code>
 * @apiSuccess {Integer} limit Limit used to fetch data
 * @apiSuccess {Integer} offset Offset used to fetch data
 * @apiError (Error 404) {Object} NotFound No media_mail with ID <code>id</code> found
 * @apiError (Error 404) {Object} AssociationNotFound No association with <code>association</code>
 */

/**
 * @api {post} /api/media_mail/?token=TOKEN 3 - Create
 * @apiVersion 1.0.0
 * @apiDescription Create a record of <code>media_mail</code> using values defined in request's <code>body</code>
 * @apiGroup Media Mail
 * @apiUse token
 * @apiParam (Body parameters) {String} [createdBy] <code>createdBy</code> of media_mail
 * @apiParam (Body parameters) {String} [updatedBy] <code>updatedBy</code> of media_mail
 * @apiParam (Body parameters) {String} [f_to] <code>f_to</code> of media_mail
 * @apiParam (Body parameters) {String} [f_cc] <code>f_cc</code> of media_mail
 * @apiParam (Body parameters) {String} [f_cci] <code>f_cci</code> of media_mail
 * @apiParam (Body parameters) {String} [f_from] <code>f_from</code> of media_mail
 * @apiParam (Body parameters) {String} [f_attachments] <code>f_attachments</code> of media_mail
 * @apiParam (Body parameters) {String} [f_subject] <code>f_subject</code> of media_mail
 * @apiParam (Body parameters) {Text} [f_content] <code>f_content</code> of media_mail
 * @apiParam (Body parameters) {Integer} [fk_id_media_mail] <code>id</code> of entity media to associate
 * @apiSuccess {Object} media_mail Created media_mail
 * @apiSuccess {Integer} media_mail.id <code>id</code> of media_mail
 * @apiSuccess {String} media_mail.createdBy <code>createdBy</code> of media_mail
 * @apiSuccess {String} media_mail.updatedBy <code>updatedBy</code> of media_mail
 * @apiSuccess {String} media_mail.f_to <code>f_to</code> of media_mail
 * @apiSuccess {String} media_mail.f_cc <code>f_cc</code> of media_mail
 * @apiSuccess {String} media_mail.f_cci <code>f_cci</code> of media_mail
 * @apiSuccess {String} media_mail.f_from <code>f_from</code> of media_mail
 * @apiSuccess {String} media_mail.f_attachments <code>f_attachments</code> of media_mail
 * @apiSuccess {String} media_mail.f_subject <code>f_subject</code> of media_mail
 * @apiSuccess {Text} media_mail.f_content <code>f_content</code> of media_mail
 * @apiError (Error 500) {Object} ServerError An error occured when trying to create media_mail
 */

/**
 * @api {put} /api/media_mail/:id?token=TOKEN 4 - Update
 * @apiVersion 1.0.0
 * @apiDescription Update record of <code>media_mail</code> with <code>id</code> using values defined in request's <code>body</code>
 * @apiGroup Media Mail
 * @apiUse token
 * @apiParam (Params parameters) {Integer} id <code>id</code> of the media_mail to update
 * @apiParam (Body parameters) {String} [createdBy] New value of <code>createdBy</code> for media_mail
 * @apiParam (Body parameters) {String} [updatedBy] New value of <code>updatedBy</code> for media_mail
 * @apiParam (Body parameters) {String} [f_to] New value of <code>f_to</code> for media_mail
 * @apiParam (Body parameters) {String} [f_cc] New value of <code>f_cc</code> for media_mail
 * @apiParam (Body parameters) {String} [f_cci] New value of <code>f_cci</code> for media_mail
 * @apiParam (Body parameters) {String} [f_from] New value of <code>f_from</code> for media_mail
 * @apiParam (Body parameters) {String} [f_attachments] New value of <code>f_attachments</code> for media_mail
 * @apiParam (Body parameters) {String} [f_subject] New value of <code>f_subject</code> for media_mail
 * @apiParam (Body parameters) {Text} [f_content] New value of <code>f_content</code> for media_mail
 * @apiParam (Body parameters) {Integer} [fk_id_media_mail] <code>id</code> of entity media to associate
 * @apiSuccess {Object} media_mail Updated media_mail
 * @apiSuccess {Integer} media_mail.id <code>id</code> of media_mail
 * @apiSuccess {String} media_mail.createdBy <code>createdBy</code> of media_mail
 * @apiSuccess {String} media_mail.updatedBy <code>updatedBy</code> of media_mail
 * @apiSuccess {String} media_mail.f_to <code>f_to</code> of media_mail
 * @apiSuccess {String} media_mail.f_cc <code>f_cc</code> of media_mail
 * @apiSuccess {String} media_mail.f_cci <code>f_cci</code> of media_mail
 * @apiSuccess {String} media_mail.f_from <code>f_from</code> of media_mail
 * @apiSuccess {String} media_mail.f_attachments <code>f_attachments</code> of media_mail
 * @apiSuccess {String} media_mail.f_subject <code>f_subject</code> of media_mail
 * @apiSuccess {Text} media_mail.f_content <code>f_content</code> of media_mail
 * @apiError (Error 404) {Object} NotFound No media_mail with ID <code>id</code> found
 * @apiError (Error 500) {Object} ServerError An error occured when trying to update media_mail
 */

/**
 * @api {delete} /api/media_mail/:id?token=TOKEN 5 - Delete
 * @apiVersion 1.0.0
 * @apiDescription Permanently delete a record of <code>media_mail</code> with <code>id</code>
 * @apiGroup Media Mail
 * @apiUse token
 * @apiParam (Params parameters) {Integer} id <code>id</code> of media_mail to delete
 * @apiSuccessExample {json} Success-Response:
 *	 HTTP/1.1 200 OK
 * @apiError (Error 404) {Object} NotFound No media_mail with ID <code>id</code> found
 */



/********************************************
 ********************************************
 * E_MEDIA_NOTIFICATION
 ********************************************
 *******************************************/
/** @apiDefine e_media_notification E_media_notification */
/**
 * @api {get} /api/media_notification?token=TOKEN 1 - Find all
 * @apiVersion 1.0.0
 * @apiDescription Fetch records of <code>media_notification</code> from <code>offset</code> until <code>limit</code>
 * @apiGroup Media Notification
 * @apiParam (Query parameters) {String=r_media} [include] Include specified association(s) to each <code>media_notification</code> result.<br>Multiple values can be given separated by a comma <br><br>Ex: ?include=r_asso1,r_asso2
 * @apiUse tokenLimitOffset
 * @apiSuccess {Object[]} media_notifications List of media_notification
 * @apiSuccess {Integer} media_notifications.id <code>id</code> of media_notification
 * @apiSuccess {Integer} media_notifications.version <code>version</code> of media_notification
 * @apiSuccess {String} media_notifications.createdBy <code>createdBy</code> of media_notification
 * @apiSuccess {String} media_notifications.updatedBy <code>updatedBy</code> of media_notification
 * @apiSuccess {String} media_notifications.f_title <code>f_title</code> of media_notification
 * @apiSuccess {String} media_notifications.f_description <code>f_description</code> of media_notification
 * @apiSuccess {String} media_notifications.f_icon <code>f_icon</code> of media_notification
 * @apiSuccess {String} media_notifications.f_color <code>f_color</code> of media_notification
 * @apiSuccess {String} media_notifications.f_targets <code>f_targets</code> of media_notification
 * @apiSuccess {Integer} limit Limit used to fetch data
 * @apiSuccess {Integer} offset Offset used to fetch data
 * @apiSuccess {Integer} totalCount The total count of records for media_notification
 */

/**
 * @api {get} /api/media_notification/:id?token=TOKEN 2 - Find one
 * @apiVersion 1.0.0
 * @apiDescription Fetch one record of <code>media_notification</code> with <code>id</code>
 * @apiGroup Media Notification
 * @apiUse token
 * @apiParam (Query parameters) {String=r_media} [include] Include specified association(s) to each <code>media_notification</code> result.<br>Multiple values can be given separated by a comma <br><br>Ex: ?include=r_asso1,r_asso2
 * @apiParam (Params parameters) {Integer} id The <code>id</code> of media_notification to fetch
 * @apiSuccess {Object} media_notification Object of media_notification
 * @apiSuccess {Integer} media_notification.id <code>id</code> of media_notification
 * @apiSuccess {Integer} media_notification.version <code>version</code> of media_notification
 * @apiSuccess {String} media_notification.createdBy <code>createdBy</code> of media_notification
 * @apiSuccess {String} media_notification.updatedBy <code>updatedBy</code> of media_notification
 * @apiSuccess {String} media_notification.f_title <code>f_title</code> of media_notification
 * @apiSuccess {String} media_notification.f_description <code>f_description</code> of media_notification
 * @apiSuccess {String} media_notification.f_icon <code>f_icon</code> of media_notification
 * @apiSuccess {String} media_notification.f_color <code>f_color</code> of media_notification
 * @apiSuccess {String} media_notification.f_targets <code>f_targets</code> of media_notification
 * @apiError (Error 404) {Object} NotFound No media_notification with ID <code>id</code> found
 */

/**
 * @api {get} /api/media_notification/:id/:association?token=TOKEN 2.a - Find association
 * @apiVersion 1.0.0
 * @apiDescription Fetch records of <code>media_notification</code>'s <code>association</code> from <code>offset</code> until <code>limit</code>
 * @apiGroup Media Notification
 * @apiUse tokenLimitOffset
 * @apiParam (Params parameters) {Integer} id <code>id</code> of the media_notification to which <code>association</code> is related
 * @apiParam (Params parameters) {String=media} association Name of the related entity
 * @apiSuccess {Object} Object Object of <code>association</code>
 * @apiSuccess {Integer} limit Limit used to fetch data
 * @apiSuccess {Integer} offset Offset used to fetch data
 * @apiError (Error 404) {Object} NotFound No media_notification with ID <code>id</code> found
 * @apiError (Error 404) {Object} AssociationNotFound No association with <code>association</code>
 */

/**
 * @api {post} /api/media_notification/?token=TOKEN 3 - Create
 * @apiVersion 1.0.0
 * @apiDescription Create a record of <code>media_notification</code> using values defined in request's <code>body</code>
 * @apiGroup Media Notification
 * @apiUse token
 * @apiParam (Body parameters) {String} [createdBy] <code>createdBy</code> of media_notification
 * @apiParam (Body parameters) {String} [updatedBy] <code>updatedBy</code> of media_notification
 * @apiParam (Body parameters) {String} [f_title] <code>f_title</code> of media_notification
 * @apiParam (Body parameters) {String} [f_description] <code>f_description</code> of media_notification
 * @apiParam (Body parameters) {String} [f_icon] <code>f_icon</code> of media_notification
 * @apiParam (Body parameters) {String} [f_color] <code>f_color</code> of media_notification
 * @apiParam (Body parameters) {String} [f_targets] <code>f_targets</code> of media_notification
 * @apiParam (Body parameters) {Integer} [fk_id_media_notification] <code>id</code> of entity media to associate
 * @apiSuccess {Object} media_notification Created media_notification
 * @apiSuccess {Integer} media_notification.id <code>id</code> of media_notification
 * @apiSuccess {String} media_notification.createdBy <code>createdBy</code> of media_notification
 * @apiSuccess {String} media_notification.updatedBy <code>updatedBy</code> of media_notification
 * @apiSuccess {String} media_notification.f_title <code>f_title</code> of media_notification
 * @apiSuccess {String} media_notification.f_description <code>f_description</code> of media_notification
 * @apiSuccess {String} media_notification.f_icon <code>f_icon</code> of media_notification
 * @apiSuccess {String} media_notification.f_color <code>f_color</code> of media_notification
 * @apiSuccess {String} media_notification.f_targets <code>f_targets</code> of media_notification
 * @apiError (Error 500) {Object} ServerError An error occured when trying to create media_notification
 */

/**
 * @api {put} /api/media_notification/:id?token=TOKEN 4 - Update
 * @apiVersion 1.0.0
 * @apiDescription Update record of <code>media_notification</code> with <code>id</code> using values defined in request's <code>body</code>
 * @apiGroup Media Notification
 * @apiUse token
 * @apiParam (Params parameters) {Integer} id <code>id</code> of the media_notification to update
 * @apiParam (Body parameters) {String} [createdBy] New value of <code>createdBy</code> for media_notification
 * @apiParam (Body parameters) {String} [updatedBy] New value of <code>updatedBy</code> for media_notification
 * @apiParam (Body parameters) {String} [f_title] New value of <code>f_title</code> for media_notification
 * @apiParam (Body parameters) {String} [f_description] New value of <code>f_description</code> for media_notification
 * @apiParam (Body parameters) {String} [f_icon] New value of <code>f_icon</code> for media_notification
 * @apiParam (Body parameters) {String} [f_color] New value of <code>f_color</code> for media_notification
 * @apiParam (Body parameters) {String} [f_targets] New value of <code>f_targets</code> for media_notification
 * @apiParam (Body parameters) {Integer} [fk_id_media_notification] <code>id</code> of entity media to associate
 * @apiSuccess {Object} media_notification Updated media_notification
 * @apiSuccess {Integer} media_notification.id <code>id</code> of media_notification
 * @apiSuccess {String} media_notification.createdBy <code>createdBy</code> of media_notification
 * @apiSuccess {String} media_notification.updatedBy <code>updatedBy</code> of media_notification
 * @apiSuccess {String} media_notification.f_title <code>f_title</code> of media_notification
 * @apiSuccess {String} media_notification.f_description <code>f_description</code> of media_notification
 * @apiSuccess {String} media_notification.f_icon <code>f_icon</code> of media_notification
 * @apiSuccess {String} media_notification.f_color <code>f_color</code> of media_notification
 * @apiSuccess {String} media_notification.f_targets <code>f_targets</code> of media_notification
 * @apiError (Error 404) {Object} NotFound No media_notification with ID <code>id</code> found
 * @apiError (Error 500) {Object} ServerError An error occured when trying to update media_notification
 */

/**
 * @api {delete} /api/media_notification/:id?token=TOKEN 5 - Delete
 * @apiVersion 1.0.0
 * @apiDescription Permanently delete a record of <code>media_notification</code> with <code>id</code>
 * @apiGroup Media Notification
 * @apiUse token
 * @apiParam (Params parameters) {Integer} id <code>id</code> of media_notification to delete
 * @apiSuccessExample {json} Success-Response:
 *	 HTTP/1.1 200 OK
 * @apiError (Error 404) {Object} NotFound No media_notification with ID <code>id</code> found
 */



/********************************************
 ********************************************
 * E_MEDIA_SMS
 ********************************************
 *******************************************/
/** @apiDefine e_media_sms E_media_sms */
/**
 * @api {get} /api/media_sms?token=TOKEN 1 - Find all
 * @apiVersion 1.0.0
 * @apiDescription Fetch records of <code>media_sms</code> from <code>offset</code> until <code>limit</code>
 * @apiGroup Media SMS
 * @apiParam (Query parameters) {String=r_media} [include] Include specified association(s) to each <code>media_sms</code> result.<br>Multiple values can be given separated by a comma <br><br>Ex: ?include=r_asso1,r_asso2
 * @apiUse tokenLimitOffset
 * @apiSuccess {Object[]} media_smss List of media_sms
 * @apiSuccess {Integer} media_smss.id <code>id</code> of media_sms
 * @apiSuccess {Integer} media_smss.version <code>version</code> of media_sms
 * @apiSuccess {String} media_smss.createdBy <code>createdBy</code> of media_sms
 * @apiSuccess {String} media_smss.updatedBy <code>updatedBy</code> of media_sms
 * @apiSuccess {Text} media_smss.f_message <code>f_message</code> of media_sms
 * @apiSuccess {String} media_smss.f_phone_numbers <code>f_phone_numbers</code> of media_sms
 * @apiSuccess {Integer} limit Limit used to fetch data
 * @apiSuccess {Integer} offset Offset used to fetch data
 * @apiSuccess {Integer} totalCount The total count of records for media_sms
 */

/**
 * @api {get} /api/media_sms/:id?token=TOKEN 2 - Find one
 * @apiVersion 1.0.0
 * @apiDescription Fetch one record of <code>media_sms</code> with <code>id</code>
 * @apiGroup Media SMS
 * @apiUse token
 * @apiParam (Query parameters) {String=r_media} [include] Include specified association(s) to each <code>media_sms</code> result.<br>Multiple values can be given separated by a comma <br><br>Ex: ?include=r_asso1,r_asso2
 * @apiParam (Params parameters) {Integer} id The <code>id</code> of media_sms to fetch
 * @apiSuccess {Object} media_sms Object of media_sms
 * @apiSuccess {Integer} media_sms.id <code>id</code> of media_sms
 * @apiSuccess {Integer} media_sms.version <code>version</code> of media_sms
 * @apiSuccess {String} media_sms.createdBy <code>createdBy</code> of media_sms
 * @apiSuccess {String} media_sms.updatedBy <code>updatedBy</code> of media_sms
 * @apiSuccess {Text} media_sms.f_message <code>f_message</code> of media_sms
 * @apiSuccess {String} media_sms.f_phone_numbers <code>f_phone_numbers</code> of media_sms
 * @apiError (Error 404) {Object} NotFound No media_sms with ID <code>id</code> found
 */

/**
 * @api {get} /api/media_sms/:id/:association?token=TOKEN 2.a - Find association
 * @apiVersion 1.0.0
 * @apiDescription Fetch records of <code>media_sms</code>'s <code>association</code> from <code>offset</code> until <code>limit</code>
 * @apiGroup Media SMS
 * @apiUse tokenLimitOffset
 * @apiParam (Params parameters) {Integer} id <code>id</code> of the media_sms to which <code>association</code> is related
 * @apiParam (Params parameters) {String=media} association Name of the related entity
 * @apiSuccess {Object} Object Object of <code>association</code>
 * @apiSuccess {Integer} limit Limit used to fetch data
 * @apiSuccess {Integer} offset Offset used to fetch data
 * @apiError (Error 404) {Object} NotFound No media_sms with ID <code>id</code> found
 * @apiError (Error 404) {Object} AssociationNotFound No association with <code>association</code>
 */

/**
 * @api {post} /api/media_sms/?token=TOKEN 3 - Create
 * @apiVersion 1.0.0
 * @apiDescription Create a record of <code>media_sms</code> using values defined in request's <code>body</code>
 * @apiGroup Media SMS
 * @apiUse token
 * @apiParam (Body parameters) {String} [createdBy] <code>createdBy</code> of media_sms
 * @apiParam (Body parameters) {String} [updatedBy] <code>updatedBy</code> of media_sms
 * @apiParam (Body parameters) {Text} [f_message] <code>f_message</code> of media_sms
 * @apiParam (Body parameters) {String} [f_phone_numbers] <code>f_phone_numbers</code> of media_sms
 * @apiParam (Body parameters) {Integer} [fk_id_media_sms] <code>id</code> of entity media to associate
 * @apiSuccess {Object} media_sms Created media_sms
 * @apiSuccess {Integer} media_sms.id <code>id</code> of media_sms
 * @apiSuccess {String} media_sms.createdBy <code>createdBy</code> of media_sms
 * @apiSuccess {String} media_sms.updatedBy <code>updatedBy</code> of media_sms
 * @apiSuccess {Text} media_sms.f_message <code>f_message</code> of media_sms
 * @apiSuccess {String} media_sms.f_phone_numbers <code>f_phone_numbers</code> of media_sms
 * @apiError (Error 500) {Object} ServerError An error occured when trying to create media_sms
 */

/**
 * @api {put} /api/media_sms/:id?token=TOKEN 4 - Update
 * @apiVersion 1.0.0
 * @apiDescription Update record of <code>media_sms</code> with <code>id</code> using values defined in request's <code>body</code>
 * @apiGroup Media SMS
 * @apiUse token
 * @apiParam (Params parameters) {Integer} id <code>id</code> of the media_sms to update
 * @apiParam (Body parameters) {String} [createdBy] New value of <code>createdBy</code> for media_sms
 * @apiParam (Body parameters) {String} [updatedBy] New value of <code>updatedBy</code> for media_sms
 * @apiParam (Body parameters) {Text} [f_message] New value of <code>f_message</code> for media_sms
 * @apiParam (Body parameters) {String} [f_phone_numbers] New value of <code>f_phone_numbers</code> for media_sms
 * @apiParam (Body parameters) {Integer} [fk_id_media_sms] <code>id</code> of entity media to associate
 * @apiSuccess {Object} media_sms Updated media_sms
 * @apiSuccess {Integer} media_sms.id <code>id</code> of media_sms
 * @apiSuccess {String} media_sms.createdBy <code>createdBy</code> of media_sms
 * @apiSuccess {String} media_sms.updatedBy <code>updatedBy</code> of media_sms
 * @apiSuccess {Text} media_sms.f_message <code>f_message</code> of media_sms
 * @apiSuccess {String} media_sms.f_phone_numbers <code>f_phone_numbers</code> of media_sms
 * @apiError (Error 404) {Object} NotFound No media_sms with ID <code>id</code> found
 * @apiError (Error 500) {Object} ServerError An error occured when trying to update media_sms
 */

/**
 * @api {delete} /api/media_sms/:id?token=TOKEN 5 - Delete
 * @apiVersion 1.0.0
 * @apiDescription Permanently delete a record of <code>media_sms</code> with <code>id</code>
 * @apiGroup Media SMS
 * @apiUse token
 * @apiParam (Params parameters) {Integer} id <code>id</code> of media_sms to delete
 * @apiSuccessExample {json} Success-Response:
 *	 HTTP/1.1 200 OK
 * @apiError (Error 404) {Object} NotFound No media_sms with ID <code>id</code> found
 */



/********************************************
 ********************************************
 * E_MEDIA_TASK
 ********************************************
 *******************************************/
/** @apiDefine e_media_task E_media_task */
/**
 * @api {get} /api/media_task?token=TOKEN 1 - Find all
 * @apiVersion 1.0.0
 * @apiDescription Fetch records of <code>media_task</code> from <code>offset</code> until <code>limit</code>
 * @apiGroup Media Task
 * @apiParam (Query parameters) {String=r_media} [include] Include specified association(s) to each <code>media_task</code> result.<br>Multiple values can be given separated by a comma <br><br>Ex: ?include=r_asso1,r_asso2
 * @apiUse tokenLimitOffset
 * @apiSuccess {Object[]} media_tasks List of media_task
 * @apiSuccess {Integer} media_tasks.id <code>id</code> of media_task
 * @apiSuccess {Integer} media_tasks.version <code>version</code> of media_task
 * @apiSuccess {String} media_tasks.createdBy <code>createdBy</code> of media_task
 * @apiSuccess {String} media_tasks.updatedBy <code>updatedBy</code> of media_task
 * @apiSuccess {String} media_tasks.f_task_name <code>f_task_name</code> of media_task
 * @apiSuccess {Enum} media_tasks.f_task_type <code>f_task_type</code> of media_task
 * @apiSuccess {String} media_tasks.f_assignment_logic <code>f_assignment_logic</code> of media_task
 * @apiSuccess {String} media_tasks.f_program_file <code>f_program_file</code> of media_task
 * @apiSuccess {Text} media_tasks.f_data_flow <code>f_data_flow</code> of media_task
 * @apiSuccess {Integer} limit Limit used to fetch data
 * @apiSuccess {Integer} offset Offset used to fetch data
 * @apiSuccess {Integer} totalCount The total count of records for media_task
 */

/**
 * @api {get} /api/media_task/:id?token=TOKEN 2 - Find one
 * @apiVersion 1.0.0
 * @apiDescription Fetch one record of <code>media_task</code> with <code>id</code>
 * @apiGroup Media Task
 * @apiUse token
 * @apiParam (Query parameters) {String=r_media} [include] Include specified association(s) to each <code>media_task</code> result.<br>Multiple values can be given separated by a comma <br><br>Ex: ?include=r_asso1,r_asso2
 * @apiParam (Params parameters) {Integer} id The <code>id</code> of media_task to fetch
 * @apiSuccess {Object} media_task Object of media_task
 * @apiSuccess {Integer} media_task.id <code>id</code> of media_task
 * @apiSuccess {Integer} media_task.version <code>version</code> of media_task
 * @apiSuccess {String} media_task.createdBy <code>createdBy</code> of media_task
 * @apiSuccess {String} media_task.updatedBy <code>updatedBy</code> of media_task
 * @apiSuccess {String} media_task.f_task_name <code>f_task_name</code> of media_task
 * @apiSuccess {Enum} media_task.f_task_type <code>f_task_type</code> of media_task
 * @apiSuccess {String} media_task.f_assignment_logic <code>f_assignment_logic</code> of media_task
 * @apiSuccess {String} media_task.f_program_file <code>f_program_file</code> of media_task
 * @apiSuccess {Text} media_task.f_data_flow <code>f_data_flow</code> of media_task
 * @apiError (Error 404) {Object} NotFound No media_task with ID <code>id</code> found
 */

/**
 * @api {get} /api/media_task/:id/:association?token=TOKEN 2.a - Find association
 * @apiVersion 1.0.0
 * @apiDescription Fetch records of <code>media_task</code>'s <code>association</code> from <code>offset</code> until <code>limit</code>
 * @apiGroup Media Task
 * @apiUse tokenLimitOffset
 * @apiParam (Params parameters) {Integer} id <code>id</code> of the media_task to which <code>association</code> is related
 * @apiParam (Params parameters) {String=media} association Name of the related entity
 * @apiSuccess {Object} Object Object of <code>association</code>
 * @apiSuccess {Integer} limit Limit used to fetch data
 * @apiSuccess {Integer} offset Offset used to fetch data
 * @apiError (Error 404) {Object} NotFound No media_task with ID <code>id</code> found
 * @apiError (Error 404) {Object} AssociationNotFound No association with <code>association</code>
 */

/**
 * @api {post} /api/media_task/?token=TOKEN 3 - Create
 * @apiVersion 1.0.0
 * @apiDescription Create a record of <code>media_task</code> using values defined in request's <code>body</code>
 * @apiGroup Media Task
 * @apiUse token
 * @apiParam (Body parameters) {String} [createdBy] <code>createdBy</code> of media_task
 * @apiParam (Body parameters) {String} [updatedBy] <code>updatedBy</code> of media_task
 * @apiParam (Body parameters) {String} [f_task_name] <code>f_task_name</code> of media_task
 * @apiParam (Body parameters) {Enum} [f_task_type] <code>f_task_type</code> of media_task
 * @apiParam (Body parameters) {String} [f_assignment_logic] <code>f_assignment_logic</code> of media_task
 * @apiParam (Body parameters) {String} [f_program_file] <code>f_program_file</code> of media_task
 * @apiParam (Body parameters) {Text} [f_data_flow] <code>f_data_flow</code> of media_task
 * @apiParam (Body parameters) {Integer} [fk_id_media_task] <code>id</code> of entity media to associate
 * @apiSuccess {Object} media_task Created media_task
 * @apiSuccess {Integer} media_task.id <code>id</code> of media_task
 * @apiSuccess {String} media_task.createdBy <code>createdBy</code> of media_task
 * @apiSuccess {String} media_task.updatedBy <code>updatedBy</code> of media_task
 * @apiSuccess {String} media_task.f_task_name <code>f_task_name</code> of media_task
 * @apiSuccess {Enum} media_task.f_task_type <code>f_task_type</code> of media_task
 * @apiSuccess {String} media_task.f_assignment_logic <code>f_assignment_logic</code> of media_task
 * @apiSuccess {String} media_task.f_program_file <code>f_program_file</code> of media_task
 * @apiSuccess {Text} media_task.f_data_flow <code>f_data_flow</code> of media_task
 * @apiError (Error 500) {Object} ServerError An error occured when trying to create media_task
 */

/**
 * @api {put} /api/media_task/:id?token=TOKEN 4 - Update
 * @apiVersion 1.0.0
 * @apiDescription Update record of <code>media_task</code> with <code>id</code> using values defined in request's <code>body</code>
 * @apiGroup Media Task
 * @apiUse token
 * @apiParam (Params parameters) {Integer} id <code>id</code> of the media_task to update
 * @apiParam (Body parameters) {String} [createdBy] New value of <code>createdBy</code> for media_task
 * @apiParam (Body parameters) {String} [updatedBy] New value of <code>updatedBy</code> for media_task
 * @apiParam (Body parameters) {String} [f_task_name] New value of <code>f_task_name</code> for media_task
 * @apiParam (Body parameters) {Enum} [f_task_type] New value of <code>f_task_type</code> for media_task
 * @apiParam (Body parameters) {String} [f_assignment_logic] New value of <code>f_assignment_logic</code> for media_task
 * @apiParam (Body parameters) {String} [f_program_file] New value of <code>f_program_file</code> for media_task
 * @apiParam (Body parameters) {Text} [f_data_flow] New value of <code>f_data_flow</code> for media_task
 * @apiParam (Body parameters) {Integer} [fk_id_media_task] <code>id</code> of entity media to associate
 * @apiSuccess {Object} media_task Updated media_task
 * @apiSuccess {Integer} media_task.id <code>id</code> of media_task
 * @apiSuccess {String} media_task.createdBy <code>createdBy</code> of media_task
 * @apiSuccess {String} media_task.updatedBy <code>updatedBy</code> of media_task
 * @apiSuccess {String} media_task.f_task_name <code>f_task_name</code> of media_task
 * @apiSuccess {Enum} media_task.f_task_type <code>f_task_type</code> of media_task
 * @apiSuccess {String} media_task.f_assignment_logic <code>f_assignment_logic</code> of media_task
 * @apiSuccess {String} media_task.f_program_file <code>f_program_file</code> of media_task
 * @apiSuccess {Text} media_task.f_data_flow <code>f_data_flow</code> of media_task
 * @apiError (Error 404) {Object} NotFound No media_task with ID <code>id</code> found
 * @apiError (Error 500) {Object} ServerError An error occured when trying to update media_task
 */

/**
 * @api {delete} /api/media_task/:id?token=TOKEN 5 - Delete
 * @apiVersion 1.0.0
 * @apiDescription Permanently delete a record of <code>media_task</code> with <code>id</code>
 * @apiGroup Media Task
 * @apiUse token
 * @apiParam (Params parameters) {Integer} id <code>id</code> of media_task to delete
 * @apiSuccessExample {json} Success-Response:
 *	 HTTP/1.1 200 OK
 * @apiError (Error 404) {Object} NotFound No media_task with ID <code>id</code> found
 */



/********************************************
 ********************************************
 * E_ACTION
 ********************************************
 *******************************************/
/** @apiDefine e_action E_action */
/**
 * @api {get} /api/action?token=TOKEN 1 - Find all
 * @apiVersion 1.0.0
 * @apiDescription Fetch records of <code>action</code> from <code>offset</code> until <code>limit</code>
 * @apiGroup Action
 * @apiParam (Query parameters) {String=r_status_actions,r_media} [include] Include specified association(s) to each <code>action</code> result.<br>Multiple values can be given separated by a comma <br><br>Ex: ?include=r_asso1,r_asso2
 * @apiUse tokenLimitOffset
 * @apiSuccess {Object[]} actions List of action
 * @apiSuccess {Integer} actions.id <code>id</code> of action
 * @apiSuccess {Integer} actions.version <code>version</code> of action
 * @apiSuccess {String} actions.createdBy <code>createdBy</code> of action
 * @apiSuccess {String} actions.updatedBy <code>updatedBy</code> of action
 * @apiSuccess {Integer} actions.f_order <code>f_order</code> of action
 * @apiSuccess {Enum} actions.f_execution <code>f_execution</code> of action
 * @apiSuccess {Integer} limit Limit used to fetch data
 * @apiSuccess {Integer} offset Offset used to fetch data
 * @apiSuccess {Integer} totalCount The total count of records for action
 */

/**
 * @api {get} /api/action/:id?token=TOKEN 2 - Find one
 * @apiVersion 1.0.0
 * @apiDescription Fetch one record of <code>action</code> with <code>id</code>
 * @apiGroup Action
 * @apiUse token
 * @apiParam (Query parameters) {String=r_status_actions,r_media} [include] Include specified association(s) to each <code>action</code> result.<br>Multiple values can be given separated by a comma <br><br>Ex: ?include=r_asso1,r_asso2
 * @apiParam (Params parameters) {Integer} id The <code>id</code> of action to fetch
 * @apiSuccess {Object} action Object of action
 * @apiSuccess {Integer} action.id <code>id</code> of action
 * @apiSuccess {Integer} action.version <code>version</code> of action
 * @apiSuccess {String} action.createdBy <code>createdBy</code> of action
 * @apiSuccess {String} action.updatedBy <code>updatedBy</code> of action
 * @apiSuccess {Integer} action.f_order <code>f_order</code> of action
 * @apiSuccess {Enum} action.f_execution <code>f_execution</code> of action
 * @apiError (Error 404) {Object} NotFound No action with ID <code>id</code> found
 */

/**
 * @api {get} /api/action/:id/:association?token=TOKEN 2.a - Find association
 * @apiVersion 1.0.0
 * @apiDescription Fetch records of <code>action</code>'s <code>association</code> from <code>offset</code> until <code>limit</code>
 * @apiGroup Action
 * @apiUse tokenLimitOffset
 * @apiParam (Params parameters) {Integer} id <code>id</code> of the action to which <code>association</code> is related
 * @apiParam (Params parameters) {String=status,media} association Name of the related entity
 * @apiSuccess {Object} Object Object of <code>association</code>
 * @apiSuccess {Integer} limit Limit used to fetch data
 * @apiSuccess {Integer} offset Offset used to fetch data
 * @apiError (Error 404) {Object} NotFound No action with ID <code>id</code> found
 * @apiError (Error 404) {Object} AssociationNotFound No association with <code>association</code>
 */

/**
 * @api {post} /api/action/?token=TOKEN 3 - Create
 * @apiVersion 1.0.0
 * @apiDescription Create a record of <code>action</code> using values defined in request's <code>body</code>
 * @apiGroup Action
 * @apiUse token
 * @apiParam (Body parameters) {String} [createdBy] <code>createdBy</code> of action
 * @apiParam (Body parameters) {String} [updatedBy] <code>updatedBy</code> of action
 * @apiParam (Body parameters) {Integer} [f_order] <code>f_order</code> of action
 * @apiParam (Body parameters) {Enum} [f_execution] <code>f_execution</code> of action
 * @apiParam (Body parameters) {Integer} [fk_id_status_actions] <code>id</code> of entity status to associate
 * @apiParam (Body parameters) {Integer} [fk_id_media_media] <code>id</code> of entity media to associate
 * @apiSuccess {Object} action Created action
 * @apiSuccess {Integer} action.id <code>id</code> of action
 * @apiSuccess {String} action.createdBy <code>createdBy</code> of action
 * @apiSuccess {String} action.updatedBy <code>updatedBy</code> of action
 * @apiSuccess {Integer} action.f_order <code>f_order</code> of action
 * @apiSuccess {Enum} action.f_execution <code>f_execution</code> of action
 * @apiError (Error 500) {Object} ServerError An error occured when trying to create action
 */

/**
 * @api {put} /api/action/:id?token=TOKEN 4 - Update
 * @apiVersion 1.0.0
 * @apiDescription Update record of <code>action</code> with <code>id</code> using values defined in request's <code>body</code>
 * @apiGroup Action
 * @apiUse token
 * @apiParam (Params parameters) {Integer} id <code>id</code> of the action to update
 * @apiParam (Body parameters) {String} [createdBy] New value of <code>createdBy</code> for action
 * @apiParam (Body parameters) {String} [updatedBy] New value of <code>updatedBy</code> for action
 * @apiParam (Body parameters) {Integer} [f_order] New value of <code>f_order</code> for action
 * @apiParam (Body parameters) {Enum} [f_execution] New value of <code>f_execution</code> for action
 * @apiParam (Body parameters) {Integer} [fk_id_status_actions] <code>id</code> of entity status to associate
 * @apiParam (Body parameters) {Integer} [fk_id_media_media] <code>id</code> of entity media to associate
 * @apiSuccess {Object} action Updated action
 * @apiSuccess {Integer} action.id <code>id</code> of action
 * @apiSuccess {String} action.createdBy <code>createdBy</code> of action
 * @apiSuccess {String} action.updatedBy <code>updatedBy</code> of action
 * @apiSuccess {Integer} action.f_order <code>f_order</code> of action
 * @apiSuccess {Enum} action.f_execution <code>f_execution</code> of action
 * @apiError (Error 404) {Object} NotFound No action with ID <code>id</code> found
 * @apiError (Error 500) {Object} ServerError An error occured when trying to update action
 */

/**
 * @api {delete} /api/action/:id?token=TOKEN 5 - Delete
 * @apiVersion 1.0.0
 * @apiDescription Permanently delete a record of <code>action</code> with <code>id</code>
 * @apiGroup Action
 * @apiUse token
 * @apiParam (Params parameters) {Integer} id <code>id</code> of action to delete
 * @apiSuccessExample {json} Success-Response:
 *	 HTTP/1.1 200 OK
 * @apiError (Error 404) {Object} NotFound No action with ID <code>id</code> found
 */



/********************************************
 ********************************************
 * E_NOTIFICATION
 ********************************************
 *******************************************/
/** @apiDefine e_notification E_notification */
/**
 * @api {get} /api/notification?token=TOKEN 1 - Find all
 * @apiVersion 1.0.0
 * @apiDescription Fetch records of <code>notification</code> from <code>offset</code> until <code>limit</code>
 * @apiGroup Notification
 * @apiParam (Query parameters) {String=r_user} [include] Include specified association(s) to each <code>notification</code> result.<br>Multiple values can be given separated by a comma <br><br>Ex: ?include=r_asso1,r_asso2
 * @apiUse tokenLimitOffset
 * @apiSuccess {Object[]} notifications List of notification
 * @apiSuccess {Integer} notifications.id <code>id</code> of notification
 * @apiSuccess {Integer} notifications.version <code>version</code> of notification
 * @apiSuccess {String} notifications.createdBy <code>createdBy</code> of notification
 * @apiSuccess {String} notifications.updatedBy <code>updatedBy</code> of notification
 * @apiSuccess {String} notifications.f_title <code>f_title</code> of notification
 * @apiSuccess {String} notifications.f_description <code>f_description</code> of notification
 * @apiSuccess {String} notifications.f_url <code>f_url</code> of notification
 * @apiSuccess {String} notifications.f_color <code>f_color</code> of notification
 * @apiSuccess {String} notifications.f_icon <code>f_icon</code> of notification
 * @apiSuccess {Integer} limit Limit used to fetch data
 * @apiSuccess {Integer} offset Offset used to fetch data
 * @apiSuccess {Integer} totalCount The total count of records for notification
 */

/**
 * @api {get} /api/notification/:id?token=TOKEN 2 - Find one
 * @apiVersion 1.0.0
 * @apiDescription Fetch one record of <code>notification</code> with <code>id</code>
 * @apiGroup Notification
 * @apiUse token
 * @apiParam (Query parameters) {String=r_user} [include] Include specified association(s) to each <code>notification</code> result.<br>Multiple values can be given separated by a comma <br><br>Ex: ?include=r_asso1,r_asso2
 * @apiParam (Params parameters) {Integer} id The <code>id</code> of notification to fetch
 * @apiSuccess {Object} notification Object of notification
 * @apiSuccess {Integer} notification.id <code>id</code> of notification
 * @apiSuccess {Integer} notification.version <code>version</code> of notification
 * @apiSuccess {String} notification.createdBy <code>createdBy</code> of notification
 * @apiSuccess {String} notification.updatedBy <code>updatedBy</code> of notification
 * @apiSuccess {String} notification.f_title <code>f_title</code> of notification
 * @apiSuccess {String} notification.f_description <code>f_description</code> of notification
 * @apiSuccess {String} notification.f_url <code>f_url</code> of notification
 * @apiSuccess {String} notification.f_color <code>f_color</code> of notification
 * @apiSuccess {String} notification.f_icon <code>f_icon</code> of notification
 * @apiError (Error 404) {Object} NotFound No notification with ID <code>id</code> found
 */

/**
 * @api {get} /api/notification/:id/:association?token=TOKEN 2.a - Find association
 * @apiVersion 1.0.0
 * @apiDescription Fetch records of <code>notification</code>'s <code>association</code> from <code>offset</code> until <code>limit</code>
 * @apiGroup Notification
 * @apiUse tokenLimitOffset
 * @apiParam (Params parameters) {Integer} id <code>id</code> of the notification to which <code>association</code> is related
 * @apiParam (Params parameters) {String=user} association Name of the related entity
 * @apiSuccess {Object} Object Object of <code>association</code>
 * @apiSuccess {Integer} limit Limit used to fetch data
 * @apiSuccess {Integer} offset Offset used to fetch data
 * @apiError (Error 404) {Object} NotFound No notification with ID <code>id</code> found
 * @apiError (Error 404) {Object} AssociationNotFound No association with <code>association</code>
 */

/**
 * @api {post} /api/notification/?token=TOKEN 3 - Create
 * @apiVersion 1.0.0
 * @apiDescription Create a record of <code>notification</code> using values defined in request's <code>body</code>
 * @apiGroup Notification
 * @apiUse token
 * @apiParam (Body parameters) {String} [createdBy] <code>createdBy</code> of notification
 * @apiParam (Body parameters) {String} [updatedBy] <code>updatedBy</code> of notification
 * @apiParam (Body parameters) {String} [f_title] <code>f_title</code> of notification
 * @apiParam (Body parameters) {String} [f_description] <code>f_description</code> of notification
 * @apiParam (Body parameters) {String} [f_url] <code>f_url</code> of notification
 * @apiParam (Body parameters) {String} [f_color] <code>f_color</code> of notification
 * @apiParam (Body parameters) {String} [f_icon] <code>f_icon</code> of notification
 * @apiSuccess {Object} notification Created notification
 * @apiSuccess {Integer} notification.id <code>id</code> of notification
 * @apiSuccess {String} notification.createdBy <code>createdBy</code> of notification
 * @apiSuccess {String} notification.updatedBy <code>updatedBy</code> of notification
 * @apiSuccess {String} notification.f_title <code>f_title</code> of notification
 * @apiSuccess {String} notification.f_description <code>f_description</code> of notification
 * @apiSuccess {String} notification.f_url <code>f_url</code> of notification
 * @apiSuccess {String} notification.f_color <code>f_color</code> of notification
 * @apiSuccess {String} notification.f_icon <code>f_icon</code> of notification
 * @apiError (Error 500) {Object} ServerError An error occured when trying to create notification
 */

/**
 * @api {put} /api/notification/:id?token=TOKEN 4 - Update
 * @apiVersion 1.0.0
 * @apiDescription Update record of <code>notification</code> with <code>id</code> using values defined in request's <code>body</code>
 * @apiGroup Notification
 * @apiUse token
 * @apiParam (Params parameters) {Integer} id <code>id</code> of the notification to update
 * @apiParam (Body parameters) {String} [createdBy] New value of <code>createdBy</code> for notification
 * @apiParam (Body parameters) {String} [updatedBy] New value of <code>updatedBy</code> for notification
 * @apiParam (Body parameters) {String} [f_title] New value of <code>f_title</code> for notification
 * @apiParam (Body parameters) {String} [f_description] New value of <code>f_description</code> for notification
 * @apiParam (Body parameters) {String} [f_url] New value of <code>f_url</code> for notification
 * @apiParam (Body parameters) {String} [f_color] New value of <code>f_color</code> for notification
 * @apiParam (Body parameters) {String} [f_icon] New value of <code>f_icon</code> for notification
 * @apiSuccess {Object} notification Updated notification
 * @apiSuccess {Integer} notification.id <code>id</code> of notification
 * @apiSuccess {String} notification.createdBy <code>createdBy</code> of notification
 * @apiSuccess {String} notification.updatedBy <code>updatedBy</code> of notification
 * @apiSuccess {String} notification.f_title <code>f_title</code> of notification
 * @apiSuccess {String} notification.f_description <code>f_description</code> of notification
 * @apiSuccess {String} notification.f_url <code>f_url</code> of notification
 * @apiSuccess {String} notification.f_color <code>f_color</code> of notification
 * @apiSuccess {String} notification.f_icon <code>f_icon</code> of notification
 * @apiError (Error 404) {Object} NotFound No notification with ID <code>id</code> found
 * @apiError (Error 500) {Object} ServerError An error occured when trying to update notification
 */

/**
 * @api {delete} /api/notification/:id?token=TOKEN 5 - Delete
 * @apiVersion 1.0.0
 * @apiDescription Permanently delete a record of <code>notification</code> with <code>id</code>
 * @apiGroup Notification
 * @apiUse token
 * @apiParam (Params parameters) {Integer} id <code>id</code> of notification to delete
 * @apiSuccessExample {json} Success-Response:
 *	 HTTP/1.1 200 OK
 * @apiError (Error 404) {Object} NotFound No notification with ID <code>id</code> found
 */



/********************************************
 ********************************************
 * E_INLINE_HELP
 ********************************************
 *******************************************/
/** @apiDefine e_inline_help E_inline_help */
/**
 * @api {get} /api/inline_help?token=TOKEN 1 - Find all
 * @apiVersion 1.0.0
 * @apiDescription Fetch records of <code>inline_help</code> from <code>offset</code> until <code>limit</code>
 * @apiGroup Inline Help
 * @apiParam (Query parameters) {String=} [include] Include specified association(s) to each <code>inline_help</code> result.<br>Multiple values can be given separated by a comma <br><br>Ex: ?include=r_asso1,r_asso2
 * @apiUse tokenLimitOffset
 * @apiSuccess {Object[]} inline_helps List of inline_help
 * @apiSuccess {Integer} inline_helps.id <code>id</code> of inline_help
 * @apiSuccess {Integer} inline_helps.version <code>version</code> of inline_help
 * @apiSuccess {String} inline_helps.createdBy <code>createdBy</code> of inline_help
 * @apiSuccess {String} inline_helps.updatedBy <code>updatedBy</code> of inline_help
 * @apiSuccess {String} inline_helps.f_entity <code>f_entity</code> of inline_help
 * @apiSuccess {String} inline_helps.f_field <code>f_field</code> of inline_help
 * @apiSuccess {Text} inline_helps.f_content <code>f_content</code> of inline_help
 * @apiSuccess {Integer} limit Limit used to fetch data
 * @apiSuccess {Integer} offset Offset used to fetch data
 * @apiSuccess {Integer} totalCount The total count of records for inline_help
 */

/**
 * @api {get} /api/inline_help/:id?token=TOKEN 2 - Find one
 * @apiVersion 1.0.0
 * @apiDescription Fetch one record of <code>inline_help</code> with <code>id</code>
 * @apiGroup Inline Help
 * @apiUse token
 * @apiParam (Query parameters) {String=} [include] Include specified association(s) to each <code>inline_help</code> result.<br>Multiple values can be given separated by a comma <br><br>Ex: ?include=r_asso1,r_asso2
 * @apiParam (Params parameters) {Integer} id The <code>id</code> of inline_help to fetch
 * @apiSuccess {Object} inline_help Object of inline_help
 * @apiSuccess {Integer} inline_help.id <code>id</code> of inline_help
 * @apiSuccess {Integer} inline_help.version <code>version</code> of inline_help
 * @apiSuccess {String} inline_help.createdBy <code>createdBy</code> of inline_help
 * @apiSuccess {String} inline_help.updatedBy <code>updatedBy</code> of inline_help
 * @apiSuccess {String} inline_help.f_entity <code>f_entity</code> of inline_help
 * @apiSuccess {String} inline_help.f_field <code>f_field</code> of inline_help
 * @apiSuccess {Text} inline_help.f_content <code>f_content</code> of inline_help
 * @apiError (Error 404) {Object} NotFound No inline_help with ID <code>id</code> found
 */

/**
 * @api {post} /api/inline_help/?token=TOKEN 3 - Create
 * @apiVersion 1.0.0
 * @apiDescription Create a record of <code>inline_help</code> using values defined in request's <code>body</code>
 * @apiGroup Inline Help
 * @apiUse token
 * @apiParam (Body parameters) {String} [createdBy] <code>createdBy</code> of inline_help
 * @apiParam (Body parameters) {String} [updatedBy] <code>updatedBy</code> of inline_help
 * @apiParam (Body parameters) {String} [f_entity] <code>f_entity</code> of inline_help
 * @apiParam (Body parameters) {String} [f_field] <code>f_field</code> of inline_help
 * @apiParam (Body parameters) {Text} [f_content] <code>f_content</code> of inline_help
 * @apiSuccess {Object} inline_help Created inline_help
 * @apiSuccess {Integer} inline_help.id <code>id</code> of inline_help
 * @apiSuccess {String} inline_help.createdBy <code>createdBy</code> of inline_help
 * @apiSuccess {String} inline_help.updatedBy <code>updatedBy</code> of inline_help
 * @apiSuccess {String} inline_help.f_entity <code>f_entity</code> of inline_help
 * @apiSuccess {String} inline_help.f_field <code>f_field</code> of inline_help
 * @apiSuccess {Text} inline_help.f_content <code>f_content</code> of inline_help
 * @apiError (Error 500) {Object} ServerError An error occured when trying to create inline_help
 */

/**
 * @api {put} /api/inline_help/:id?token=TOKEN 4 - Update
 * @apiVersion 1.0.0
 * @apiDescription Update record of <code>inline_help</code> with <code>id</code> using values defined in request's <code>body</code>
 * @apiGroup Inline Help
 * @apiUse token
 * @apiParam (Params parameters) {Integer} id <code>id</code> of the inline_help to update
 * @apiParam (Body parameters) {String} [createdBy] New value of <code>createdBy</code> for inline_help
 * @apiParam (Body parameters) {String} [updatedBy] New value of <code>updatedBy</code> for inline_help
 * @apiParam (Body parameters) {String} [f_entity] New value of <code>f_entity</code> for inline_help
 * @apiParam (Body parameters) {String} [f_field] New value of <code>f_field</code> for inline_help
 * @apiParam (Body parameters) {Text} [f_content] New value of <code>f_content</code> for inline_help
 * @apiSuccess {Object} inline_help Updated inline_help
 * @apiSuccess {Integer} inline_help.id <code>id</code> of inline_help
 * @apiSuccess {String} inline_help.createdBy <code>createdBy</code> of inline_help
 * @apiSuccess {String} inline_help.updatedBy <code>updatedBy</code> of inline_help
 * @apiSuccess {String} inline_help.f_entity <code>f_entity</code> of inline_help
 * @apiSuccess {String} inline_help.f_field <code>f_field</code> of inline_help
 * @apiSuccess {Text} inline_help.f_content <code>f_content</code> of inline_help
 * @apiError (Error 404) {Object} NotFound No inline_help with ID <code>id</code> found
 * @apiError (Error 500) {Object} ServerError An error occured when trying to update inline_help
 */

/**
 * @api {delete} /api/inline_help/:id?token=TOKEN 5 - Delete
 * @apiVersion 1.0.0
 * @apiDescription Permanently delete a record of <code>inline_help</code> with <code>id</code>
 * @apiGroup Inline Help
 * @apiUse token
 * @apiParam (Params parameters) {Integer} id <code>id</code> of inline_help to delete
 * @apiSuccessExample {json} Success-Response:
 *	 HTTP/1.1 200 OK
 * @apiError (Error 404) {Object} NotFound No inline_help with ID <code>id</code> found
 */



/********************************************
 ********************************************
 * E_USER_GUIDE
 ********************************************
 *******************************************/
/** @apiDefine e_user_guide E_user_guide */
/**
 * @api {get} /api/user_guide?token=TOKEN 1 - Find all
 * @apiVersion 1.0.0
 * @apiDescription Fetch records of <code>user_guide</code> from <code>offset</code> until <code>limit</code>
 * @apiGroup User Guide
 * @apiParam (Query parameters) {String=} [include] Include specified association(s) to each <code>user_guide</code> result.<br>Multiple values can be given separated by a comma <br><br>Ex: ?include=r_asso1,r_asso2
 * @apiUse tokenLimitOffset
 * @apiSuccess {Object[]} user_guides List of user_guide
 * @apiSuccess {Integer} user_guides.id <code>id</code> of user_guide
 * @apiSuccess {Integer} user_guides.version <code>version</code> of user_guide
 * @apiSuccess {String} user_guides.createdBy <code>createdBy</code> of user_guide
 * @apiSuccess {String} user_guides.updatedBy <code>updatedBy</code> of user_guide
 * @apiSuccess {String} user_guides.f_file <code>f_file</code> of user_guide
 * @apiSuccess {Integer} limit Limit used to fetch data
 * @apiSuccess {Integer} offset Offset used to fetch data
 * @apiSuccess {Integer} totalCount The total count of records for user_guide
 */

/**
 * @api {get} /api/user_guide/:id?token=TOKEN 2 - Find one
 * @apiVersion 1.0.0
 * @apiDescription Fetch one record of <code>user_guide</code> with <code>id</code>
 * @apiGroup User Guide
 * @apiUse token
 * @apiParam (Query parameters) {String=} [include] Include specified association(s) to each <code>user_guide</code> result.<br>Multiple values can be given separated by a comma <br><br>Ex: ?include=r_asso1,r_asso2
 * @apiParam (Params parameters) {Integer} id The <code>id</code> of user_guide to fetch
 * @apiSuccess {Object} user_guide Object of user_guide
 * @apiSuccess {Integer} user_guide.id <code>id</code> of user_guide
 * @apiSuccess {Integer} user_guide.version <code>version</code> of user_guide
 * @apiSuccess {String} user_guide.createdBy <code>createdBy</code> of user_guide
 * @apiSuccess {String} user_guide.updatedBy <code>updatedBy</code> of user_guide
 * @apiSuccess {String} user_guide.f_file <code>f_file</code> of user_guide
 * @apiError (Error 404) {Object} NotFound No user_guide with ID <code>id</code> found
 */

/**
 * @api {post} /api/user_guide/?token=TOKEN 3 - Create
 * @apiVersion 1.0.0
 * @apiDescription Create a record of <code>user_guide</code> using values defined in request's <code>body</code>
 * @apiGroup User Guide
 * @apiUse token
 * @apiParam (Body parameters) {String} [createdBy] <code>createdBy</code> of user_guide
 * @apiParam (Body parameters) {String} [updatedBy] <code>updatedBy</code> of user_guide
 * @apiParam (Body parameters) {String} [f_file] <code>f_file</code> of user_guide
 * @apiSuccess {Object} user_guide Created user_guide
 * @apiSuccess {Integer} user_guide.id <code>id</code> of user_guide
 * @apiSuccess {String} user_guide.createdBy <code>createdBy</code> of user_guide
 * @apiSuccess {String} user_guide.updatedBy <code>updatedBy</code> of user_guide
 * @apiSuccess {String} user_guide.f_file <code>f_file</code> of user_guide
 * @apiError (Error 500) {Object} ServerError An error occured when trying to create user_guide
 */

/**
 * @api {put} /api/user_guide/:id?token=TOKEN 4 - Update
 * @apiVersion 1.0.0
 * @apiDescription Update record of <code>user_guide</code> with <code>id</code> using values defined in request's <code>body</code>
 * @apiGroup User Guide
 * @apiUse token
 * @apiParam (Params parameters) {Integer} id <code>id</code> of the user_guide to update
 * @apiParam (Body parameters) {String} [createdBy] New value of <code>createdBy</code> for user_guide
 * @apiParam (Body parameters) {String} [updatedBy] New value of <code>updatedBy</code> for user_guide
 * @apiParam (Body parameters) {String} [f_file] New value of <code>f_file</code> for user_guide
 * @apiSuccess {Object} user_guide Updated user_guide
 * @apiSuccess {Integer} user_guide.id <code>id</code> of user_guide
 * @apiSuccess {String} user_guide.createdBy <code>createdBy</code> of user_guide
 * @apiSuccess {String} user_guide.updatedBy <code>updatedBy</code> of user_guide
 * @apiSuccess {String} user_guide.f_file <code>f_file</code> of user_guide
 * @apiError (Error 404) {Object} NotFound No user_guide with ID <code>id</code> found
 * @apiError (Error 500) {Object} ServerError An error occured when trying to update user_guide
 */

/**
 * @api {delete} /api/user_guide/:id?token=TOKEN 5 - Delete
 * @apiVersion 1.0.0
 * @apiDescription Permanently delete a record of <code>user_guide</code> with <code>id</code>
 * @apiGroup User Guide
 * @apiUse token
 * @apiParam (Params parameters) {Integer} id <code>id</code> of user_guide to delete
 * @apiSuccessExample {json} Success-Response:
 *	 HTTP/1.1 200 OK
 * @apiError (Error 404) {Object} NotFound No user_guide with ID <code>id</code> found
 */



