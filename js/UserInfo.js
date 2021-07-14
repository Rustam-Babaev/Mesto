export default class UserInfo {
    constructor({ userName, userInfo }) {
        this._userName = userName;
        this._userInfo = userInfo
    }

    getUserInfo() {
        return { userName: this._userName, userInfo: this._userInfo }
    }

    setUserInfo(userName, userInfo) {
        this._userName = userName;
        this._userInfo = userInfo;
    }
}