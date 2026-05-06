const GET_API_URL = "https://la56xsj1l8.execute-api.us-east-1.amazonaws.com/tasks";

export async function getTasks() {
    const res = await fetch(GET_API_URL);
    const data = await res.json();
    console.log('fetched data:', data);

    return data;
  }
