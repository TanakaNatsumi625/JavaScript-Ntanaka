function executeWithTryCatchFinally() {
    try {
        console.log("try ");
        throw new Error("An error occurred in the try");
    } catch (error) {
        console.log("catch");
        console.error(error.message);
    } finally {
        console.log("finally");
    }
    }

    // 動作確認
executeWithTryCatchFinally();