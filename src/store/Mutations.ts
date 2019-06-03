import firebase from "firebase"

export const updateUser = "updateUser";

export const recieveServerChange = "recieveServerChange";
export const updateTodoItem = "updateTodoItem";

export const mutationsObj = {
    [updateUser]: function(state: any, user: firebase.UserInfo) {
        state.userInfo = user;
    }
}
export default mutationsObj;