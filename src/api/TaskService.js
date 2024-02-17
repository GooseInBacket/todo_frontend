class TaskService {
    static DOMAIN = 'http://127.0.0.1:8000'
    static TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJidXNpbmdvb3NlIiwic2NvcGVzIjpbIm1lIiwiaXRlbXMiXSwiZXhwIjoxNzA4MjY2NTQ0fQ.8d0LmuNs45UUJ3a_bYebSU9xsQgRmd66-2kXmsyQjCI"

    static header = new Headers({
        'Authorization': `Bearer ${TaskService.TOKEN}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    });

    static async getAll(){
        let response = await fetch(`${TaskService.DOMAIN}/tasks/?skip=0&limit=100`, {
            method: 'GET',
            headers: TaskService.header,
        })
        let tasks = response.json()
        return tasks
    }

    static async add(body){
        try{
            let response = await fetch(`${TaskService.DOMAIN}/tasks/`, {
                method: 'POST',
                headers: this.header,
                body: JSON.stringify(body)
            })
    
            if (!response.ok){
                let json = await response.json()
                let msg = json.detail[0].msg;
                console.log(msg);
                throw new Error(msg)
            }
        } catch (err){
            return new Error(err)
        }
    }

    static async remove(taskId){
        let response = await fetch(`${TaskService.DOMAIN}/tasks/${taskId}/`, {
            method: 'DELETE',
            headers: this.header,
        })

        if (!response.ok){
            console.error(response.json());
        }
    }

    static async update(taskId, body){
        let response = await fetch(`${TaskService.DOMAIN}/tasks/${taskId}/`, {
            method: 'PUT',
            headers: this.header,
            body: JSON.stringify(body)
        })

        if (!response.ok){
            console.error(response.json());
        }
    }
}


export default TaskService