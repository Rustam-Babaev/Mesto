export default class UserInfo {
    constructor({ userNameSelector, userInfoSelector }) {
        this._userNameInput = document.querySelector(userNameSelector);
        this._userInfoInput = document.querySelector(userInfoSelector);
        this._userName = document.querySelector(userNameSelector).textContent;
        this._userInfo = document.querySelector(userInfoSelector).textContent;
    }

    getUserInfo() {
        return { userName: this._userName, userInfo: this._userInfo }
    }

    setUserInfo(userName, userInfo) {
        this._userName = userName;
        this._userInfo = userInfo;
        this._userNameInput.textContent = this._userName;
        this._userInfoInput.textContent = this._userInfo
    }
}
