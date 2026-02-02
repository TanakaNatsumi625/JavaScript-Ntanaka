const fileInput = document.getElementById("file-input");
const token = document.getElementById("access-token");
const uploadState = document.getElementById("upload-state");

document.getElementById("upload-button").addEventListener("click", async (e) => {
    console.log("Form submitted");
    //いつものようにフォーム送信をキャンセル
    e.preventDefault();
    try {
        // アップロードに必要な情報が揃っているか確認
        const file = fileInput.files[0];
        console.log("Selected file:", file);
        const accessToken = token.value.trim();
        if (!file) {
            alert("ファイルを選択してください");
            return;
        }
        if (!accessToken) {
            alert("アクセストークンを入力してください");
            return;
        }
        // ファイル情報からファイル名を取得
        const fileName = file.name;
        // OneDriveのアップロードURL
        // 今回はルートディレクトリにアップロード
        const uploadUrl = `https://graph.microsoft.com/v1.0/me/drive/root:/${fileName}:/content`;

         // ローディングを表示
        uploadState.textContent = "Uploading...";

        console.log("Uploading file to OneDrive:", fileName);
        // fetch APIを使ってファイルをアップロード
        // 参考：https://learn.microsoft.com/ja-jp/graph/api/driveitem-put-content?view=graph-rest-1.0&tabs=http
        const response = await fetch(uploadUrl, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                "Content-Type": file.type
            },
            body: file
        });

        const result = await response.json();
        console.log("Upload successful:", result);

        if (!response.ok) {
            throw new Error("ファイルのアップロードに失敗しました");
        }
        uploadState.textContent = "Upload successful: " + fileName;
    } catch (error) {
        console.error(error);
        uploadState.textContent = "Error: アップロードに失敗しました";
    }
});

// アクセストークンの表示/非表示切り替え
document.getElementById("toggle-token").addEventListener("change", (e) => {
    if (e.target.checked) {
        token.type = "text";
    } else {
        token.type = "password";
    }
});
