// 以下の型を定義すること
//  - User: { id: number, name: string }
//  - Task: { title: string, completed: boolean, user: User }
//  - Priority: "low"|"middle"|"high"のいずれかの値をとる
//  - PriorityTask: Taskかつ{ priority: Priority }を持つ型

type User = { id: number; name: string };
type Task = { title: string; completed: boolean; user: User };
type Priority = "low" | "middle" | "high";
export type PriorityTask = Task & { priority: Priority };

// Userオブジェクトであることを判定する
// 引数の型をanyにして、Userオブジェクトであるかどうかを判定する関数を定義する
function isUserObject(obj: any): obj is User {
    return (
        typeof obj === "object" &&
        typeof obj["id"] === "number" &&
        typeof obj["name"] === "string"
    );
}
// 以下のようにPriorityTask型のダミーオブジェクトを定義する
// これが無いと、caller.tsでPriorityTask型をインポートしても、型が存在しないというエラーになる(対処として正しいのか？)
export const PriorityTask = {} as PriorityTask;

// T extends Task = Taskとすることで、Taskを継承した型をジェネリクスで定義できるようにする
// = Task型かPriorityTask型のどちらかを指定できるようにする
export class TaskManager<T extends Task = Task> {
    // タスクのリストを入れる配列
    // 配列であることを示すよう型を追加
    _tasks: T[] = [];

    // タスクを追加する
    add(task: T) {
    this._tasks.push(task);
    }

    // タスクを完了にする
    // Userオブジェクトを指定した場合はそのUserのタスクを全て完了にする
    // 文字列を指定した場合は、そのタイトルのタスクを全て完了にする
    // 引数の型をUser|Stringにする
    completeTask(target: User | string) {
        if (isUserObject(target)) {
            this._tasks
                .filter((t) => t.user === target)
                .forEach((t) => (t.completed = true));
        } else {
            this._tasks
                .filter((t) => t.title === target)
                .forEach((t) => (t.completed = true));
        }
    }

    // 引数の関数にマッチするタスクを返す
    // 引数を省略した場合はすべてのタスクを返す
    // 引数の型を((task: T) => boolean) | undefinedにする
    // ↑タスクを引数にとって、真偽値を返す関数、もしくはundefined
    getTasks(predicate: ((task: T) => boolean) | undefined = undefined): T[] {
        if (predicate === undefined) {
            return this._tasks;
        } else {
            return this._tasks.filter(predicate);
        }
    }
}

// priority="low"または完了済のタスクを判定する
export function isLowOrCompletedTask(priorityTask: PriorityTask): boolean {
    return priorityTask.priority === "low" || priorityTask.completed;
}

// 判定関数の否定結果を返す関数を生成する
// fは判定関数
// argは判定関数の引数
// ジェネリクスを使って、引数の型を指定することで、どんな型の引数にも対応できるようにする
export function not<T>(f: (arg: T) => boolean){
    return (arg: T) => !f(arg);
}
