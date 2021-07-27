export default class Api {
    constructor({ baseUrl, headers }) {
        this.baseUrl = baseUrl;
        this.headers = headers
        this.urlCards = this.baseUrl + '/cards';
        this.urlOwnerMe = this.baseUrl + '/users/me';
    }

    _checkResults(fetch) {
        return fetch
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
    }

    getInitialCards() {
        return this._checkResults(
            fetch(this.urlCards, {
                headers: this.headers
            }))
    }

    getOwner() {
        return this._checkResults(
            fetch(this.urlOwnerMe, {
                headers: this.headers
            })
        )
    }

    editNameRequest(name, about) {
        return this._checkResults(
            fetch(this.urlOwnerMe, {
                method: 'PATCH',
                headers: this.headers,
                body: JSON.stringify({
                    name: name,
                    about: about
                })
            }))
    }

    addCardRequest(name, link) {
        return this._checkResults(
            fetch(this.urlCards, {
                method: 'POST',
                headers: this.headers,
                body: JSON.stringify({
                    name: name,
                    link: link
                })
            })
        )
    }

    deleteCardRequest(cardId) {
        return this._checkResults(
            fetch(this.urlCards + '/' + cardId, {
                method: 'DELETE',
                headers: this.headers,
            }))

    }

    putLikeRequest(cardId) {
        return this._checkResults(
            fetch(this.urlCards + '/likes/' + cardId, {
                method: 'PUT',
                headers: this.headers,
            }))
    }

    deleteLikeRequest(cardId) {
        return this._checkResults(
            fetch(this.urlCards + '/likes/' + cardId, {
                method: 'DELETE',
                headers: this.headers,
            }))
    }

    editAvatarRequest(url) {
        return this._checkResults(
            fetch(this.urlOwnerMe + '/avatar', {
                method: 'PATCH',
                headers: this.headers,
                body: JSON.stringify({
                    avatar: url
                })
            }))
    }

}
