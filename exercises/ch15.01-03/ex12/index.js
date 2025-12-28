
//毎月Wifiレンタルの立替レポートを作成している
//今回はレポート名、ポリシーを自動設定しキーボードを使わずにレポートの作成を試み
//社内ツールようなので、githubにアップロードすることはできない

(function () {
    //レポート名を設定する
    const nameField = document.querySelector("#name");

    // 月初日を yyyymmdd 形式で取得
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const dateStr = `${year}${month}01`;

    // 社員番号
    const EMPLOYEE_ID = '00000625';

    // レポート名を設定
    nameField.value = `${dateStr}-${EMPLOYEE_ID}-wifiレンタル`;
    //これだけだとReactが変更を検知しないので、valueTrackerの値も更新する(一番引っかかった)
    //参考：https://zenn.dev/pb/articles/b11a6beac6855c
    nameField._valueTracker?.setValue("");
    nameField.dispatchEvent(new Event("input", { bubbles: true }));
    alert('レポート名を設定しました');

    // ポリシー選択(レポート名の三秒後に実行)
        const combo = document.querySelector('[data-nuiexp="field-policy"]');

        // ポリシー選択のコンボボックスをクリック
        combo.click();

    setTimeout(function () {
        // <li id="cnqr-Ct51DmZPnW-_-_-9A5A3BB23628C2409C6ECF7929D7B690-_-_-0" aria-selected="false" class="sapcnqr-listbox-item" role="option"><div class="sapcnqr-listbox-item__wrapper">海外出張</div></li>
        //選択肢なので選ぶのはrole属性
        const items = document.querySelectorAll('[role="option"]');

        //選択肢の中から「立替」を探してクリック
        items.forEach(function (item) {
            if (item.textContent.includes('立替')) {
                item.click();
                found = true;
            }
        });

        alert('「立替」を選択しました');
    }, 3000);
})();

//ブックマークレット用
// javascript:(function(){const nameField=document.querySelector("#name");const now=new Date();const year=now.getFullYear();const month=String(now.getMonth()+1).padStart(2,'0');const dateStr=%60${year}${month}01%60;const EMPLOYEE_ID='00000625';nameField.value=%60${dateStr}-${EMPLOYEE_ID}-wifiレンタル%60;nameField._valueTracker?.setValue("");nameField.dispatchEvent(new Event("input",{bubbles:true}));alert('レポート名を設定しました');const combo=document.querySelector('[data-nuiexp="field-policy"]');combo.click();setTimeout(function(){const items=document.querySelectorAll('[role="option"]');items.forEach(function(item){if(item.textContent.includes('立替')){item.click();found=true;}});alert('「立替」を選択しました');},3000);})();