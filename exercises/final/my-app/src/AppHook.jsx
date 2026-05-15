/**
 * 時間の文字列を分に変換する
 * @param {string} timeString - 時間を表す文字列（例: "1時間半", "30分", "2時間30分"）
 * @returns {number|null} - 分に変換した値、パースできない場合はnull
 */
export function parseTimeToMinutes(timeString) {
  let minutes = 0;

  // 時間を抽出
  const hourMatch = timeString.match(/([一二三四五六七八九十〇零\d]+)時間/);
  if(hourMatch){
    const hours = toNumber(hourMatch[1]);
    minutes += hours * 60;
  }
  // 「半」があれば＋30分
  if(timeString.includes('半')){
    minutes += 30;
  }
  // 分があれば抽出して足す
  const minutesMatch = timeString.match(/([一二三四五六七八九十〇零\d]+)分/);
  if(minutesMatch){
    minutes += toNumber(minutesMatch[1])
  }

  // 何も取れなかったらnull
  if(minutes === 0){
    return 0
  }  

  return minutes;
}

/**
 * 漢数字を数字に変換する
 * @param {string} kanji - 漢数字の文字列（例: "一", "二十", "三百")
 * @returns {number} - 数字に変換した値
 */
export function toNumber(str) {
  if (!str) return 0;

  // 全角 → 半角
  const normalized = str.replace(/[０-９]/g, s =>
    String.fromCharCode(s.charCodeAt(0) - 0xFEE0)
  );

  // 数字ならそのまま
  if (/^\d+$/.test(normalized)) {
    return Number(normalized);
  }

  // 漢数字
  return kanjiToNumber(normalized);
}

/**
 * 音声入力の結果をパースしてタスク名と時間を抽出する
 * @param {string} speechResult - 音声認識の結果（例: "タスク名を1時間半"）
 * @returns {{taskName: string, taskTime: number}|null} - タスク名と時間、パースできない場合はnull
 */
export function parseVoiceInput(speechResult) {
  // "タスク名を 時間" の形式をパース
  const regex = /(.+)を\s*(.+)/;
  const match = speechResult.match(regex);
  
  if (!match) {
    return null;
  }

  const taskName = match[1].trim();
  const timeString = match[2].trim();
  const taskTime = parseTimeToMinutes(timeString);

  if (taskTime === null) {
    return null;
  }

  return { taskName, taskTime };
}
