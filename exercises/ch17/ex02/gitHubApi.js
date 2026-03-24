// GitHub APIを呼び出す共通関数
export async function gitHubAPIRequest(path, method = "GET", body, verbose = false, token) {
    console.log('Token in gitHubAPIRequest:', process.env.GITHUB_TOKEN);

    console.log("GitHub API Request:", method, path);
    const url = `https://api.github.com${path}`;
    const options = {
        method,
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: body ? JSON.stringify(body) : undefined
    };

    if (body) {
        options.headers["Content-Type"] = "application/json";
        options.body = JSON.stringify(body);
    }
    // verboseオプションがある場合は、リクエストの内容をログに出力する
    if (verbose) {
        console.log("HTTP REQUEST");
        console.log(method, url);
        // はじめはただのheadersを出すようにしたが、コンソール上にトークンが出てしまうためContent-Typeのみになるようにした
        console.log("Headers:", options.headers["Content-Type"]);
        if (body) console.log("Body:", body);
    }
    const response = await fetch(url, options);
    console.log("GitHub API Response:", response.status);

    if (!response.ok) {
        const text = await response.text();
        throw new Error(`GitHub API error! status: ${response.status}, message: ${text}`);
    }

    return response.json();
}