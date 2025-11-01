const wait = (msec) => {
    return new Promise((resolve) => setTimeout(resolve, msec));
};

function g1() {
    //  TODO: then のネストを無くしなさい→各thenで次のPromiseを返す形に書き換えなさい
    return wait(1000)
        .then(() => {
            console.log("A");
            return wait(2000);
        })
        .then(() => {
            console.log("B");
            return wait(3000);
        })
        .then(() => {
            console.log("C");
        });
}

//g1();

function g2() {
    // TODO: new Promise を使わないように書き換えなさい
    // →　wait()がPromiseを返すので、そのまま連鎖させれば良い
    return wait(1000)
        .then(() => console.log("A"))
        .then(() => wait(2000))
        .then(() => console.log("B"))
        .then(() => wait(3000))
        .then(() => console.log("C"))
}
//g2();

function g3() {
    // 以下2つの関数が存在するとします (中身は適当)
    function fetchUser() {
        return Promise.resolve({ id: 42, name: "John" });
    }
    function fetchUserFriends(user) {
        return Promise.resolve([
            { name: "Sam", id: 100 },
            { name: "Bob", id: 1 },
        ]);
    }

    // TODO: var, let, const による変数宣言を無くしなさい。async/awaitは使用しないこと。
    //→ fetchUserFriendsでfrendsを取得した後に user.name を使いたいので、
    //thenの中でチェーンさせ、friends, userのオブジェクトを作る
    return fetchUser()
    .then(user => fetchUserFriends(user).then(friends => [user, friends]))
    .then(([user, friends]) => {
        console.log(`${user.name} has ${friends.length} friends!`);
    });
}
g3();

function g4() {
    function someFunction() {
        return 42;
    }

    // NOTE: この関数 g4 は Promise を返す必要があるものとする
    // (利用しているフレームワークはライブラリがそういう関数を要求するとでも思って下さい)
    // TODO: new Promise を使わないように書き換えなさい。async/awaitは使用しないこと。
    // → someFunction() は同期関数なので、そのまま Promise.resolve() で包めば良い
    return Promise.resolve(someFunction());
}