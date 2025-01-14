var express = require('express');
var app = express();

app.use(express.urlencoded({ extended: true }));

var fs = require('fs');
var fname = "user_data.json";

if (fs.existsSync(fname)) {
    var data = fs.readFileSync(fname, 'utf-8');
    var users_data = JSON.parse(data);
    console.log(users_data);
} else {
    console.log("Sorry file " + fname + " does not exist.");
}

app.get("/login", function (request, response) {
    // Give a simple login form
    str = `
<body>
<form action="" method="POST">
<input type="text" name="username" size="40" placeholder="enter username" ><br />
<input type="password" name="password" size="40" placeholder="enter password"><br />
<input type="submit" value="Submit" id="submit">
</form>
</body>
    `;
    response.send(str);
 });

app.post("/login", function (request, response) {
    // Process login form POST and redirect to logged in page if ok, back to login page if not
    let POST = request.body;
    let user_name = POST["username"];
    let user_pass = POST["password"];

    console.log("User name=" + user_name + " password=" + user_pass);
    
    if (users_data[user_name] != undefined) {
        if (users_data[user_name].password == user_pass) {
            response.send("Good login for user " + user_name);
        } else {
            response.redirect("/login?error='Bad password'");
        }
    } else {
        response.redirect("/login?error='No such user'");
    }

});

app.get("/register", function (request, response) {
    // Give a simple register form
    str = `
<body>
<form action="" method="POST">
<input type="text" name="username" size="40" placeholder="enter username" ><br />
<input type="password" name="password" size="40" placeholder="enter password"><br />
<input type="password" name="repeat_password" size="40" placeholder="enter password again"><br />
<input type="email" name="email" size="40" placeholder="enter email"><br />
<input type="submit" value="Submit" id="submit">
</form>
</body>
    `;
    response.send(str);
 });

 app.post("/register", function (request, response) {
    // process a simple register form
    let POST = request.body;
    console.log(POST);
    let user_name = POST["username"];
    let user_pass = POST["password"];
    let user_email = POST["email"];
    let user_pass2 = POST["repeat_password"];

    if 
        (users_data[user_name] == undefined) {
        users_data[user_name] = {};
        users_data[user_name].name = user_name;
        users_data[user_name].password = user_pass;
        users_data[user_name].email = user_email;

        let data = JSON.stringify(users_data);
        fs.writeFileSync(fname, data, 'utf-8');

        response.send("Got a registration");
    } else {
        response.send("User " + user_name + " already exists!");
    }
 });

app.listen(8080, () => console.log(`listening on port 8080`));