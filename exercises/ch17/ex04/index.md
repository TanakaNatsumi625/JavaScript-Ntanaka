### Package-lock.jsonとは
- 参考：https://docs.npmjs.com/cli/v11/configuring-npm/package-lock-json
- 参考：https://qiita.com/sugurutakahashi12345/items/1f6bb7a372b8263500e5
- npm installした際に生成されるJsonファイル。
- package.jsonはインストールすべきパッケージが書かれているが、それぞれのバージョンは「○○以上」と含みを持つことがある
- pacage-lock.jsonは対して、実際にインストールされたパッケージを記録している
    - `npm ci`コマンドを使うことでpackage-lock.json を元にパッケージをインストールして node_modules を作成してくれる
        - よって、プロジェクトで同一の環境で開発することができる
### リポジトリにコミットすべきか
- すべき
- 上記記述の通り、プロジェクト全体で同じ依存関係をインストールすることを保証するため
    - npm公式にも「このファイルはソースリポジトリにコミットされることを想定しており、様々な目的に使用されます。」との記述が。