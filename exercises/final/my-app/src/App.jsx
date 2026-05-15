import { useEffect, useRef, useState } from 'react';
import { addTask, getTasks } from './api/api';
import { parseVoiceInput } from './AppHook';
import LeftPanel from "./compornents/leftPanel/LeftPanel";
import TimeDisplay from "./compornents/TimeDisplay/timeDisplay";
import Header from './header/Header';

function App() {
  const [status, setStatus] = useState({ level: 0, exp: 0 }); // 0〜100
  const [tasks, setTasks] = useState([]); // {id, name, time}の配列
  const [currentTime, setCurrentTime] = useState('');
  const [showTime, setShowTime] = useState(false); // 時刻表示フラグ
  const prevLevelRef = useRef(0); // 前回のレベルを保持
  const isManualAdd = useRef(false); // 手動でタスクを追加したかどうか→これが無いと、APIからタスクを取得して経験値を増やしたときにもレベルアップの演出が発生してしまう

  // 初回レンダリング時にAPIからタスクを取得して状態を更新する
  useEffect(() => {
    isManualAdd.current = false; // fetch時は手動追加ではない

    const fetchData = async () => {
      const data = await getTasks();

      setTasks(data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const totalExp = tasks.reduce((sum, task) => sum + Number(task.minutes), 0);
    const levelUpThreshold = 100;
    setStatus({
      level: Math.floor(totalExp / levelUpThreshold),
      exp: totalExp % levelUpThreshold,
    });
  }, [tasks]);


  // 追加ボタンが押されたときの処理
  const handleAddTask = (task) => {
    // 手動追加フラグを立てる
    isManualAdd.current = true;
    // タスクを追加するロジック
    // APIでDBにタスクを追加する
    addTask(task);
    // 例: setTasks([...tasks, newTask]);
    setTasks((prev) => [...prev, { taskId: Date.now(), taskName: task.name, minutes: Number(task.time) }]);
  };

  // 音声認識を開始する
  const handleVoiceRecognition = () => {
    const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;

    if (!SpeechRecognition) {
      alert("このブラウザは音声認識に対応していません。");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'ja-JP'; // 日本語を指定

    recognition.onresult = (event) => {
      const speechResult = event.results[0][0].transcript;

      // 認識結果をパースする
      const parsedResult = parseVoiceInput(speechResult);
     
      if (parsedResult) {
        const { taskName, taskTime } = parsedResult;
        
        // タスクを追加する
        handleAddTask({ name: taskName, time: taskTime });
      } else {
        alert("認識した音声が「タスク名を 時間」の形式になっていません。\n例: 「資料作成を1時間半」「会議を30分」");
      }
    };

    recognition.onerror = (event) => {
      alert(`音声認識エラー: ${event.error}`);
    };

    recognition.start();
  };

  // 手動でタスクを追加してlevelが上がった時、showTimeをtrueにする
  useEffect(() => {
    // レベルが実際に上がった時かつ手動追加の時のみshowTimeをtrueにする
    if (status.level > prevLevelRef.current && isManualAdd.current) {
      setShowTime(true);

      // 30秒後にshowTimeをfalseにする
      const timerId = setTimeout(() => {
        setShowTime(false);
      }, 30000);

      // フラグをリセット
      isManualAdd.current = false;

      // 前回のレベルを更新
      prevLevelRef.current = status.level;

      return () => {
        clearTimeout(timerId);
      };
    }

    // レベルが変化したら前回のレベルを更新
    prevLevelRef.current = status.level;
  }, [status.level]);

  // showTimeが変化したら時計の更新を開始/停止する
  useEffect(() => {
    if (showTime) {
      // 時刻を更新し続ける
      const updateTime = () => {
        const now = new Date();
        setCurrentTime(`${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`);
      };

      updateTime(); // 初回実行
      const intervalId = setInterval(updateTime, 1000); // 1秒ごとに更新

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [showTime]);

  return (
    <div style={styles.wrapper}>
      <Header />
      <div style={styles.app}>
        <div style={styles.container}>
          <LeftPanel
            status={status}
            tasks={tasks}
            onAddTask={handleAddTask}
            onVoiceRecognition={handleVoiceRecognition}
          />
          <TimeDisplay
            time={currentTime}
            showTime={showTime}
          />
        </div>
      </div>
    </div>
  )
}


const styles = {
  wrapper: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  },
  app: {
    flex: 1,
    width: "100%",
    background: '#ece9c9',
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  container: {
    display: "flex",
    flexDirection: "row",
    width: "90%",
    maxWidth: "1400px",
    height: "85%",
    maxHeight: "calc(100vh - 100px)",
    gap: "30px",
    boxSizing: "border-box",
  },
};


export default App
