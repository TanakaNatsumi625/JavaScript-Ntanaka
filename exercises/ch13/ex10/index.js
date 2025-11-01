import { join } from "node:path";
import fsPromises from "node:fs/promises";
const { readdir, stat } = fsPromises;

//Promise.all を使って並列に処理するバージョン

export async function fetchSumOfFileSizesParallel(path) {
    const files = await readdir(path);
    const size = await Promise.all(
        files.map(file => stat(join(path, file)).then(stats => stats.size))
    );
    return size.reduce((a, b) => a + b, 0);
}
// console.log(`fetchSumOfFileSizesParallel: ${await fetchSumOfFileSizesParallel(join('.', 'ch13', 'ex04'))}`);
