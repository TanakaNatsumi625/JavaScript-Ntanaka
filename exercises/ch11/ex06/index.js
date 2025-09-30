export function isEmailAddress(email) {
    // null, undefined チェック
    if (email == null || typeof email !== 'string') {
        return false;
    }
    
    // 全体の正規表現パターン
    const emailPattern = /^([a-zA-Z0-9!#$%&'*+\-/=?^_`{|}~]+(?:\.[a-zA-Z0-9!#$%&'*+\-/=?^_`{|}~]+)*)@([a-zA-Z0-9!#$%&'*+\-/=?^_`{|}~]+(?:\.[a-zA-Z0-9!#$%&'*+\-/=?^_`{|}~]+)*)$/;
    
    const match = email.match(emailPattern);
    if (!match) {
        return false;
    }
    
    const [, localPart, domainPart] = match;
    
    // 長さチェック
    if (localPart.length > 64 || domainPart.length > 252) {
        return false;
    }
    
    return true;
}

//memo
// const mailRegex = new RegExp(
//   // ローカル部
//   "^(?!\\.)" +                                   // 先頭にドット不可
//   "[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+" +           // 1文字以上
//   "(?:\\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*" +   // ドット区切り文字列（連続ドット不可）
//   "(?<!\\.)" +                                   // 末尾にドット不可
//   "@" +
//   // ドメイン部
//   "(?=.{1,255}$)" +                              // ドメイン長制限
//   "[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?" +  // ドメインラベル（先頭・末尾ハイフン不可）
//   "(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?)*" + // サブドメイン
//   "\\.[a-zA-Z]{2,}$"                             // TLDは必ず2文字以上
// );
