import { useState, useEffect, useRef } from 'react'

import LeftPanel from "./compornents/leftPanel/LeftPanel";
import TimeDisplay from "./compornents/TimeDisplay/timeDisplay";
import Header from './header/Header';
import { getTasks, addTask } from './api/api';

/**
 * 時間の文字列を分に変換する
 * @param {string} timeString - 時間を表す文字列（例: "1時間半", "30分", "2時間30分"）
 * @returns {number|null} - 分に変換した値、パースできない場合はnull
 */
function parseTimeToMinutes(timeString) {
  // "1時間半" のパターン
  const hourAndHalfRegex = /(\d+(?:\.\d+)?)\s*時間半/;
  const hourAndHalfMatch = timeString.match(hourAndHalfRegex);
  if (hourAndHalfMatch) {
    const hours = parseFloat(hourAndHalfMatch[1]);
    return hours * 60 + 30; // 時間を分に変換して30分を加算
  }

  // "2時間30分" のパターン
  const hourAndMinuteRegex = /(\d+(?:\.\d+)?)\s*時間\s*(\d+)\s*分/;
  const hourAndMinuteMatch = timeString.match(hourAndMinuteRegex);
  if (hourAndMinuteMatch) {
    const hours = parseFloat(hourAndMinuteMatch[1]);
    const minutes = parseInt(hourAndMinuteMatch[2], 10);
    return hours * 60 + minutes;
  }

  // "1時間" のパターン
  const hourRegex = /(\d+(?:\.\d+)?)\s*時間/;
  const hourMatch = timeString.match(hourRegex);
  if (hourMatch) {
    const hours = parseFloat(hourMatch[1]);
    return hours * 60;
  }

  // "30分" のパターン
  const minuteRegex = /(\d+)\s*分/;
  const minuteMatch = timeString.match(minuteRegex);
  if (minuteMatch) {
    return parseInt(minuteMatch[1], 10);
  }

  // どのパターンにもマッチしない場合
  return null;
}

/**
 * 音声入力の結果をパースしてタスク名と時間を抽出する
 * @param {string} speechResult - 音声認識の結果（例: "タスク名を1時間半"）
 * @returns {{taskName: string, taskTime: number}|null} - タスク名と時間、パースできない場合はnull
 */
function parseVoiceInput(speechResult) {
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

function App() {
  const [status, setStatus] = useState({ level: 0, exp: 0 }); // 0〜100
  const [tasks, setTasks] = useState([]); // {id, name, time}の配列
  const [currentTime, setCurrentTime] = useState('');
  const [showTime, setShowTime] = useState(false); // 時刻表示フラグ
  const prevLevelRef = useRef(0); // 前回のレベルを保持
  const isManualAdd = useRef(false); // 手動でタスクを追加したかどうか→これが無いと、APIからタスクを取得して経験値を増やしたときにもレベルアップの演出が発生してしまう
  const hasFetchedData = useRef(false); // データを取得したかどうか

  // 初回レンダリング時にAPIからタスクを取得して状態を更新する
  // useEffect(() => {
  //   if (hasFetchedData.current) return;

  //   const fetchData = async () => {
  //     const data = await getTasks();
  //     setTasks(data);
  //     // APIから取得したタスクの時間を合計して経験値を増やす
  //     const totalExp = data.reduce((sum, task) => sum + task.minutes, 0);
  //     isManualAdd.current = false; // fetch時は手動追加ではない
  //     addStatus(totalExp);
  //   };

  //   fetchData();
  //   // 初回レンダリング時にのみデータを取得するためのフラグ
  //   // 開発者モードではuseEffectが2回呼ばれるため、フラグで制御する
  //   hasFetchedData.current = true;
  // }, []);

  const addStatus = (amount) => {
    console.log('[addStatus] Called with amount:', amount);
    console.log('[addStatus] Current status before update:', status);

    setStatus((prev) => {
      console.log('[addStatus] Previous status in callback:', prev);
      let newExp = prev.exp + amount;
      let newLevel = prev.level;

      const levelUpThreshold = 100; // レベルアップの閾値

      if (newExp / levelUpThreshold >= 1) {
        newLevel += Math.floor(newExp / levelUpThreshold); // レベルアップ分を加算
        newExp = newExp % levelUpThreshold; // 経験値をレベルアップ分で割った余りにする
      }
      console.log(`[addStatus] Calculated - New level: ${newLevel}, New exp: ${newExp}`);

      const newStatus = {
        level: newLevel,
        exp: newExp,
      };
      console.log('[addStatus] Returning new status:', newStatus);
      return newStatus;
    });
  };

  // 手動でタスクを追加してlevelが上がった時、showTimeをtrueにする
  useEffect(() => {
    // レベルが実際に上がった時かつ手動追加の時のみshowTimeをtrueにする
    if (status.level > prevLevelRef.current && isManualAdd.current) {
      console.log('[useEffect] Manual level up detected:', prevLevelRef.current, '->', status.level);
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
      console.log('[useEffect] Start showing time');

      // 時刻を更新し続ける
      const updateTime = () => {
        const now = new Date();
        setCurrentTime(`${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`);
      };

      updateTime(); // 初回実行
      const intervalId = setInterval(updateTime, 1000); // 1秒ごとに更新

      return () => {
        console.log('[useEffect] Stop showing time');
        clearInterval(intervalId);
      };
    }
  }, [showTime]);

  // 追加ボタンが押されたときの処理
  const handleAddTask = (task) => {
    console.log("[handleAddTask] Adding task:", task);
    // タスクを追加するロジック
    // APIでDBにタスクを追加する
    // addTask(task); 
    // 例: setTasks([...tasks, newTask]);
    setTasks((prev) => [...prev, { taskId: Date.now(), taskName: task.name, minutes: task.time }]);

    // 経験値を増やすロジック
    console.log("[handleAddTask] Adding experience for task time:", task.time);

    // 手動追加フラグを立てる
    isManualAdd.current = true;
    addStatus(task.time); // タスクの時間に応じて経験値を増やす例
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
      console.log('Speech recognition result:', event);
      const speechResult = event.results[0][0].transcript;
      console.log('Recognized speech:', speechResult);

      // 認識結果をパースする
      const parsedResult = parseVoiceInput(speechResult);
      console.log('Parsed voice input:', parsedResult);
      
      if (parsedResult) {
        const { taskName, taskTime } = parsedResult;
        console.log('Parsed task name:', taskName);
        console.log('Parsed task time (minutes):', taskTime);

        // タスクを追加する
        handleAddTask({ name: taskName, time: taskTime });
      } else {
        alert("認識した音声が「タスク名を 時間」の形式になっていません。\n例: 「資料作成を1時間半」「会議を30分」");
      }
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      alert(`音声認識エラー: ${event.error}`);
    };

    recognition.start();
  };

  console.log('[App] Rendering with status:', status);

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
