## それぞれの挙動の結果
### ToDo のリストをサーバで保存するのではなくブラウザの localStorage に保存し、一度閉じて再度開いても、画面更新しても、ToDo の内容が維持されるようにしなさい。
- 維持されるようにした
### 複数のタブで ToDo 管理アプリケーションを開いている状態で、あるタブでの変更が他のタブにも自動的に反映されるようにしなさい。
- 反映されるようにした
### ブラウザの設定で localStorage を無効化されていてもエラーが表示されずに、そのタブを開いている間だけは正常に動くようにしなさい。localStorage で実現していた機能は動かなくても構わない。
- ChromeではCookieを無効にしたにもかかわらずうまくいかなかった
- Edgeで検証した
- `Uncaught SecurityError: Failed to read the 'sessionStorage' property from 'Window': Access is denied for this document.`
- ![alt text](image.png)