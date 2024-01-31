import { API_BASE_URL }  from '../constraint/index'

const EmployeeApi = {

    get: async (id) => {

        const response = await fetch(`${API_BASE_URL}/employee/${id}`)
        const data = await response.json();

      return data.result;
    },
    getAll: async () => {

        const response = await fetch(`${API_BASE_URL}/employee`)
        const data = await response.json()

        return data.result.content
    },
    create: async (body) => {

        const rawResponse = await fetch(`${API_BASE_URL}/employee`, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        const content = await rawResponse.json();
        
        return content;
    },
    update: async(id ,body) => {

        const rawResponse = await fetch(`${API_BASE_URL}/employee/${id}`, {
            method: 'PUT',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        const content = await rawResponse.json();
        
        return content;
    },
    delete: async(id) => {

        const rawResponse = await fetch(`${API_BASE_URL}/employee/${id}`, {
            method: 'DELETE',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
        });
    }
}

export default EmployeeApi