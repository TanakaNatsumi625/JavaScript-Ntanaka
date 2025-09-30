export function countDaysInMonth(year, month) {
    // monthは0-11の範囲で指定
    if (month < 0 || month > 11) {
        throw new RangeError('月は0から11の範囲で指定してください');
    }
    // 次の月の1日の前日を取得することで、その月の日数を求める
    const nextMonth = month === 11 ? 0 : month + 1;
    const nextMonthYear = month === 11 ? year + 1 : year;
    //Dateオブジェクトの引数に日付を指定しない場合、1日として扱われる
    //したがって、次の月の1日の前日を取得するには、次の月の1日から1日分（24時間×60分×60秒×1000ミリ秒）を引く
    //Dateオブジェクトはミリ秒単位で扱うため、1日分は86400000ミリ秒
    //ただし、Dateオブジェクトに負の値を渡すと、1970年1月1日からの経過時間として扱われるため、注意が必要
    //そのため、次の月の1日をDateオブジェクトとして作成し、そのタイムスタンプから1日分を引くことで、正しい日付を取得できる
    const firstOfNextMonth = new Date(nextMonthYear, nextMonth, 1);
    const lastOfThisMonth = new Date(firstOfNextMonth - 1);
    return lastOfThisMonth.getDate();
}

// 動作確認
console.log(countDaysInMonth(2020, 1)); // 29 (2020年2月はうるう年)
console.log(countDaysInMonth(2025, 8));//2025/9は30日

export function countWorkingDays(startDate, endDate) {
    if (!(startDate instanceof Date) || !(endDate instanceof Date)) {
        throw new Error('Dateオブジェクトを渡してください');
    }
    if (startDate > endDate) {
        throw new Error('開始日は終了日より前の日付を指定してください');
    }
    let count = 0;
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
        // 0: 日曜日, 6: 土曜日なのでそれ以外の時カウントする
        //曜日の取得：getDay()メソッドを使用
        if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) {
            count++;
        }
        // 次の日に進む
        currentDate.setDate(currentDate.getDate() + 1);
    }
    return count;
}
// 動作確認
console.log(countWorkingDays(new Date('2025-09-01'), new Date('2025-09-30'))); // 20

export function getDayOfWeek(DayStr, locale) {
    const date = new Date(DayStr);
    if (isNaN(date)) {
        throw new Error('無効な日付文字列です');
    }
    // Intl.DateTimeFormatを使用して曜日を取得
    // optionsで曜日のフォーマットを指定→Longはフルスペル
    const options = { weekday: 'long' };
    const formatter = new Intl.DateTimeFormat(locale, options);
    return formatter.format(date);
}

// 動作確認
console.log(getDayOfWeek('2025-09-01', 'ja-JP'));
console.log(getDayOfWeek('2025-09-01', 'en-US'));
console.log(getDayOfWeek('2025-09-01', 'fr-FR'));//フランス

export function getStartLastMonth() {
    const date = new Date();

    // 現在の日を1にセット（月の1日にする）
    date.setDate(1);

    // 時分秒ミリ秒を0にセット
    date.setHours(0, 0, 0, 0);

    // 1日前に戻すことで前月の最終日になる
    date.setDate(0);

    // その月（前月）の1日にする
    date.setDate(1);

    return date;
}


// 動作確認
console.log(getStartLastMonth());