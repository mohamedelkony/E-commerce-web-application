const users = [
    {
        username: 'mohamed_elkony',
        password: '123',
        gender: 'male',
        email: 'konykony22@gmail.com',
        birth: new Date().toUTCString(),
    },
    {
        username: 'leo_messi',
        password: '111',
        gender: 'male',
        email: 'messi19@gmail.com',
        birth: new Date().toUTCString(),
    }
];
function ofMail(email){
    const user=users.find(e=>e.email===email);
    if(user!=undefined)
        return user;
    return null;
}

function ofUsername(username){
    const user=users.find(e=>e.username===username);
    if(user!=undefined)
        return user;
    return null;
}
function addUser(data)
{
    users.push(data);
}
exports.addUser=addUser;
exports.ofUsername=ofUsername;
exports.ofMail=ofMail;
exports.DB=users;