## integrity 属性（サブリソース完全性：SRI）とは
- 参考①：https://developer.mozilla.org/ja/docs/Web/Security/Subresource_Integrity
- 参考②：https://improved-move.com/ja/blogs/subresource-integrity/
- `<script src="https://not-example.com/script.js"></script>`のように書くことは、攻撃者による悪意あるコンテンツが挿入されてしまう可能性がある。
    - ソースの改ざん
    - ソースの信頼性の低下
- サブリソース完全性を使うことで、webアプリやweb文書が取得したファイルについて、第三者によるファイルの中に別のものが挿入されていないか、それらのファイルが改ざんされていないかを検証することができ、攻撃のリスクを減らすことができる
- ブラウザが取得するリソース（ファイル）のハッシュ値をbase64エンコードし、その値を`<script>`要素などのintegrity 属性に指定することで使用できる
- ハッシュ値に一致した場合にのみ読み込むことができる
- ハッシュ値作成には‘OpenSSL’を利用する場合と自作する場合がある(インストール方法：https://tenshoku.mynavi.jp/engineer/guide/articles/ZOWfGBIAACMAFsFP)
- 今回はcreateSRI.jsというファイルを作成し、その中で作ったハッシュを使用した

## 実行結果
- 正しいハッシュの場合
    - コンソールに「integrity 属性のテスト」が表示された
- 間違ったハッシュの場合
    - 以下が出力された
    ```
    Failed to find a valid digest in the 'integrity' attribute for resource 'http://127.0.0.1:5500/exercises/ch15.01-03/ex03/index.js' with computed SHA-384 integrity 'Qsd5McqudOY0D7cMsW3TtDWt47hAtoeuh1EXWtQ5GFJNNyzMJEIOxJHl8949e6+1'. The resource has been blocked.
    ```

