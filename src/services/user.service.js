export const userService = {
    updateUserPassword,
    updateUserData
};

const users = JSON.parse(localStorage.getItem('users'));


function updateUserPassword(id, newPassword) {
    const user = users.find(user => user.id === id);
    const userIndex = users.findIndex(user => user.id === id);
    user.password = newPassword;
    users.splice(userIndex, 1, user);
    localStorage.setItem('users', JSON.stringify(users));
}

function updateUserData() {

}
