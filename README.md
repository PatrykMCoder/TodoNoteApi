# TodoNoteApi

## Documentation API

## Server

here will configuration of project and server(local)start

## Login User

Required data: `email, password`</br>
Path: POST `/login`

When user is successful login return code `200` and user data. If user enter bad data or user is not found return code `400` with error message.

## Register User

Required data: `username, email, password and accepted privacy`</br>
Path: POST `/user`

When user is successfuly register return code `200`. If will be problem with create user account will be return code `400` with error message. If user don't enter all data will return code `500` error message.

## Create todo

Required data: `user id, todo title, tag, archive status and array with todos[task and done status]`</br>
Path: POST `/create_todo`

When todo will save in database will be return code 200 with todo data. If todo exist will be return code 409 with error message about existing todo. When is not saving return code 400. If will be problem with saving todo return code 500 with error message.

## Load todos

Required data: `user id`</br>
Path: GET `/todos/:user_id`

If user have saved todo this function load all data todos with code 201. When todos not found return code 400. With is problem with load data return code 500 with error message.

## Delete todo

Required data: `user id, todo id`</br>
Path: DELETE `/todos/:user_id/:todo_id`

When todo is found by user id and todo id is delete from database and return code 201. When todo is not found or not delete is return code 400. When is error with found and delete return code 500 with error message.

## Edit todo

Required data: `todo id, user id, tag, status and array with todos[task and done status]`
Path: PUT `/todos/:user_id/:todo_id`

When todo is found by user id and todo id old data is replace with new. When todo is updated successfuly return code 200. If updated not successfuly return code 400. When is problem with found and update return code 500 with error message.

## Load todo data

Required data: `user id, todo id`
Path: GET `/todos/:user_id/:todo_id`

When todo is found by user id and todo id return code 201 with all task data from todo. When todo is not found return code 400. When is problem with found return code 500 with error message.

## Update task status

Required data: `user id, todo id`
Path: PUT `/todos/status/:user_id/:todo_id`

When todo is found by user id and todo id old data is replace with new. When todo is updated successfuly return code 200. If updated not successfuly return code 400. When is problem with found and update return code 500 with error message.

## Archive operation

Requried data: `archive status`
Path: PUT `/todos/archive/:user_id/:todo_id/`

When todo is found by user id and todo id todo change status on archive/unarchive. If is operation is successfuly return code 200. If operation is not successfuly return code 400. When is problem with operation return code 500.

## Create tags

Required data: `tag name, user id`
Path: POST `/create_tag`

When tag is created return code 201. When tag exist return code 409 with inforamtion messgae. When is problem with save is return code 500 with error message.

## Load tags

Required data: `user id`
Path: GET `/tags/:user_id`

If user have saved tags this function load all data tags with code 201. When tags not found return code 400. With is problem with load data return code 500 with error message.

## Delete tags

Required data: `user id, tag id`
Path: delete `/tags/:user_id/:tag_id`

When tag is found by user id and tag id is delete from database and return code 201. When tag is not found or not delete is return code 400. When is error with found and delete return code 500 with error message.

## Get user data

Required data: `user id`
Path: GET `/user/:user_id`

When user is found return code 201 with user data. When user is not found return code 400 with information message. When is problem with found data return code 500 with error message.
<p style='color:red'>
    Attention! Password and userid  are not loaded!
</p>

## Edit user data

Require data: `nothing`
Can be: `new email, new password, new username`
Path: PUT `/user/edit/:user_id`

When user send new email to server, user data will be updated. When user send new email, will be updated. When user send new password, data will be updated.
That data are not required. User can send one data in one time. Alse 3 data in one time. When task is successfuly return code 201. When user eneter exist email will be return code 409 with inforamtion message. When is problem with update user data is return code 500. 
