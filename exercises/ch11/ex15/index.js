export function modifyUrl({ base, addQuery, path }) {
    if (typeof base !== "string" || !base.startsWith("http")) {
        throw new Error("Invalid URL");
    }
    const url = new URL(base);
    if (path) {
        url.pathname = path;
    }
    if (Array.isArray(addQuery)) {
        //urlの?以降がクエリになる
        //URLSearchParamsのappendメソッドを使用してクエリを追加
        for (const [key, value] of addQuery) {
            url.searchParams.append(key, value);
        }
    }
    return url.toString();
}
