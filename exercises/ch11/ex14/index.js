export function sortJapanese (strArray) {
    //  sensitivity: 'base': 大文字小文字、濁点・半濁点を区別しない
    const collator = new Intl.Collator('ja-JP', { sensitivity: 'base' });
    // 元の配列を変更しないようにコピーを作成(= slice())
    return strArray.slice().sort(collator.compare);
}

const test = ['カ', 'つ', 'あ', 'っ', 'ア', 'イ', 'が', 'ぴ'];
console.log('sort():', test.slice().sort())
console.log('Intl.collator:', sortJapanese(test));
//sort(): ['あ', 'が', 'っ','つ', 'ぴ', 'ア','イ', 'カ']
//Intl.collator: [ 'あ', 'ア', 'イ','が', 'カ', 'っ','つ', 'ぴ']

//sort()はUnicode順なので日本語の文字列を正しくソートできない
//sort(): [ 'ひあ', 'ひい', 'ひう', 'びあ', 'びい', 'びう' ]
//new Intl.Collator('ja-JP', { sensitivity: 'base' });: [ 'ひあ', 'びあ', 'ひい', 'びい', 'ひう', 'びう' ]

export function toJapaneseDateString(date) {
    if (!(date instanceof Date) || isNaN(date)) {
        throw new Error('Dateオブジェクトを渡してください');
    }
    const locale = 'ja-JP-u-ca-japanese';
    const options = {era: 'long', year: 'numeric', month: 'numeric', day: 'numeric'};
    const formattedDate = new Intl.DateTimeFormat(locale, options);
    //このままだと "令和1年5月1日" のように「年」「月」「日」が入らない場合がある（ブラウザやNodeの環境等）
    //確実に入れたい場合は、各オプションの値を取ってきて変換する
    const parts = formattedDate.formatToParts(date);

    const era = parts.find(part => part.type === 'era').value;
    const year = parts.find(part => part.type === 'year').value;
    const month = parts.find(part => part.type === 'month').value;
    const day = parts.find(part => part.type === 'day').value;

    return `${era}${year}年${month}月${day}日`;
}

// 動作確認
console.log(toJapaneseDateString(new Date('2025-09-01'))); 
console.log(toJapaneseDateString(new Date('1989-01-08'))); 
console.log(toJapaneseDateString(new Date('2019-05-01'))  === '令和1年5月1日');
console.log(toJapaneseDateString(new Date('2019-04-30'))  === '平成31/4/30');
