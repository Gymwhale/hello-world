var express = require('express');
var app = express();
const fs = require('fs');

var filename = 'user_data.json';

if (fs.existsSync(filename)) {
    var data = fs.readFileSync(filename, 'utf-8');
    var users_data = JSON.parse(data);

    var file_stats = fs.statSync(filename);

} else {
    console.log(`${filename} doesn't exist :(`);
}

app.use(express.urlencoded({ extended: true }));

app.get("/login", function (request, response) {
    // Give a simple login form
    str = `
<body>
<form action="" method="POST">
<input type="text" name="usernames" size="40" placeholder="enter username" ><br />
<input type="password" name="password" size="40" placeholder="enter password"><br />
<input type="submit" value="Submit" id="submit">
</form>
</body>
    `;
    response.send(str);
 });

app.post("/login", function (request, response) {
console.log(request.body);
// Process login form POST and redirect to logged in page if ok, back to login page if not
let login_username = request.body['usernames'];
let login_password = request.body['password'];

    if (typeof users_data[login_username] != 'undefined') {
        //username exists so get stored password and check if it is correct
        if (users_data[login_username]['password'] == login_password) {
            response.send(`${login_username} is logged in`);
            return;
        } else {
        response.send(`Incorrect password for ${login_username}`)
        } 
    }
    else {
        response.send(`${login_username} file does not exist :(`);
    }
});

app.listen(8080, () => console.log(`listening on port 8080`));