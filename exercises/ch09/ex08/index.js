//メソッドが呼ばれたとき、switchで分岐していると、始めたい状態までの前準備が長くなってしまう
//状態はオブジェクトとして定義し、状態遷移をオブジェクトで管理することで、コードをシンプルにできる
//状態表を全て書き出さないといけないので、拡張性という意味では疑問。ほかにいいやり方あるかも…
export const transitions = {
    normal: {
        setAlarm: { nextState: "alarmSet", action: "none" },
    },
    alarmSet: {
        cancelAlarm: { nextState: "normal", action: "none" },
        reachedToAlarmTime: { nextState: "alarmSounding", action: "soundAlarm" },
    },
    alarmSounding: {
        cancelAlarm: { nextState: "normal", action: "stopAlarm" },
        snooze: { nextState: "snoozing", action: "stopAlarm" },
    },
    snoozing: {
        cancelAlarm: { nextState: "normal", action: "none" },
        elapseSnoozeTime: { nextState: "alarmSounding", action: "soundAlarm" },
    },
};

//状態とイベントを受け取って、次の状態とアクションを返す関数
//ここで状態を指定してあげれば、状態遷移を簡単に管理できる→ここをテスト
export function getNextState(state, event) {
    const entry = transitions[state]?.[event];
    if (entry) {
        return { state: entry.nextState, action: entry.action };
    }
    return { state, action: "none" };
}

export class AlarmClock {
    constructor() {
        //オブジェクト作成時はじめの状態を設定
        this.state = "normal";
    }

    // 今の状態とイベントを渡して、次の状態とアクションを取得
    transition(event) {
        //getNextStateに現在の状態と、イベントを渡す
        //渡した状態とイベントから、次の状態とアクションが返ってくる
        //それを分割代入し、現在の状態を更新する
        const { state, action } = getNextState(this.state, event);
        this.state = state;
        return action;
    }

    //状態を取得するメソッド
    getState() {
        return this.state;
    }
}

//動作確認
const clock = new AlarmClock();
console.log(clock.getState()); // normal
clock.transition("setAlarm");
console.log(clock.getState()); // alarmSet