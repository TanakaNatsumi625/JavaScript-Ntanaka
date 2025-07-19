const data = [
    { name: "Alice", class: "A", math: 10, chemistry: 30, geography: 20 },
    { name: "Bob", class: "A", math: 50, chemistry: 50, geography: 60 },
    { name: "Carol", class: "A", math: 70, chemistry: 55, geography: 30 },
    { name: "Dave", class: "B", math: 40, chemistry: 20, geography: 60 },
    { name: "Ellen", class: "B", math: 60, chemistry: 70, geography: 40 },
    { name: "Frank", class: "B", math: 90, chemistry: 70, geography: 80 },
    { name: "Isaac", class: "C", math: 70, chemistry: 40, geography: 50 },
    { name: "Justin", class: "C", math: 80, chemistry: 40, geography: 30 },
    { name: "Mallet", class: "C", math: 60, chemistry: 70, geography: 90 },
];

//mathの合計点出す関数
function sumMath(data) {
    //mathの値があるものだけをフィルタリングし配列にしたものを全て足し合わせる
    let result = data.filter(item => item.math)
        .reduce((sum, item) => sum + item.math, 0);
    console.log(`mathの合計点: ${result}`);
    return result;
}

//クラスAのchemistryの平均点を出す
function chemistryAverage(data) {
    //クラスAのchemistryの値があるものだけをフィルタリングし配列にしたものを全て足し合わせる
    let chemistrySum = data.filter(item => item.class === "A" && item.chemistry)
        .reduce((sum, item) => sum + item.chemistry, 0);
    //クラスAの人数
    let classMates = data.filter(item => item.class === "A").length;
    let result = chemistrySum / classMates;
    console.log(`クラスAのchemistryの平均点: ${result}`);
    return result;
}

//3科目合計点が最も高い人の`name`
function highestTotal(data) {
    //各人の3科目の合計点を計算する
    const totals = data.map(item => ({
        name: item.name,
        total: (item.math || 0) + (item.chemistry || 0) + (item.geography || 0)
    }));
    //合計点が最も高い人を見つける
    const highest = totals.reduce((max, current) => {
        return (current.total > max.total) ? current : max;
    }, totals[0]);
    console.log(`3科目合計点が最も高い人: ${highest.name}`);
    return highest.name;
}

//全体の`geography`の標準偏差
function geographyStdDev(data) {
    //geographyの値があるものだけをフィルタリングし配列にする
    const geographyScores = data.filter(item => item.geography).map(item => item.geography);

    //平均値を計算
    const mean = geographyScores.reduce((sum, score) => sum + score, 0) / geographyScores.length;

    //標準偏差を計算
    const variance = geographyScores.reduce((sum, score) => sum + Math.pow(score - mean, 2), 0) / geographyScores.length;
    const stdDev = Math.sqrt(variance);

    console.log(`全体のgeographyの標準偏差: ${stdDev}`);
    return stdDev;
}

//実行
sumMath(data);
chemistryAverage(data);
highestTotal(data);
geographyStdDev(data);
//結果
// mathの合計点: 530
// クラスAのchemistryの平均点: 45
// 3科目合計点が最も高い人: Frank
// 全体のgeographyの標準偏差: 22.3330569358242
