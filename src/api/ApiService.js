export default class ApiService{
    constructor(){
        this.domain = 'http://127.0.0.1:8000'
        this.token = document.cookie.split("; ").find((row) => row.startsWith('auth='))?.split('=')[1]

        this.header = new Headers({
            'Authorization': `Bearer ${this.token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        });
    }

    #getParams(method, body){
        return {
            method: method,
            headers: this.header,
            credentials: 'include',
            body: body ? JSON.stringify(body) : null
        }
    }

    #throwErr(json){
        // let msg = json.detail[0].msg;
        console.error(json);
        throw new Error(json)
    }

    async getAllPosts(skip=0, limit=100){
        let response = await fetch(`${this.domain}/tasks/?skip=${skip}&limit=${limit}`, this.#getParams('GET'))
        if (response.ok) return response.json()
        this.#throwErr(await response.json())
    }

    async addTask(body){
        let response = await fetch(`${this.domain}/tasks/`, this.#getParams('POST', body))

        if (!response.ok){ this.#throwErr(await response.json()) }
    }

    async removeTask(taskId){
        let response = await fetch(`${this.domain}/tasks/${taskId}/`, this.#getParams('DELETE'))

        if (!response.ok){ this.#throwErr(await response.json()) }
    }

    async updateTask(taskId, body){
        let response = await fetch(`${this.domain}/tasks/${taskId}/`, this.#getParams('PUT', body))

        if (!response.ok){ this.#throwErr(await response.json()) }
    }

    async getUserInfo(){
        let response = await fetch(`${this.domain}/users/me/`, this.#getParams('GET'))
        
        return response
    }

    async logOut(){
        let response = await fetch(`${this.domain}/logout`, this.#getParams('GET'))

        return response
    }
}