export default class UserInfo {
    constructor({ userNameSelector, userInfoSelector }) {
        this._userName = document.querySelector(userNameSelector);
        this._userInfo = document.querySelector(userInfoSelector);
    }

    getUserInfo() {
        return { userName: this._userName.textContent, userInfo: this._userInfo.textContent }
    }

    setUserInfo(userName, userInfo) {
        if (userName) { this._userName.textContent = userName };
        if (userInfo) { this._userInfo.textContent = userInfo };
    }
}
