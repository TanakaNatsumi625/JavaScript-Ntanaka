const GET_API_URL = "https://la56xsj1l8.execute-api.us-east-1.amazonaws.com/tasks";
const ADD_API_URL = "https://la56xsj1l8.execute-api.us-east-1.amazonaws.com/addTask";

export async function getTasks() {
    const res = await fetch(GET_API_URL);
    const data = await res.json();
    console.log('fetched data:', data);

    return data;
}

export async function addTask(task) {
    console.log('Adding task via API:', task);
    const res = await fetch(ADD_API_URL, {  
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            taskName: task.name,
            minutes: task.time,
        }),
    });
    const data = await res.json();
    console.log('added task:', data);

    return data;
}