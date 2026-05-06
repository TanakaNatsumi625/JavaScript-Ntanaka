import { useState, useEffect, useRef } from 'react'

import LeftPanel from "./compornents/leftPanel/leftPanel";
import TimeDisplay from "./compornents/TimeDisplay/timeDisplay";
import { getTasks } from './api/api';

function App() {
  // const GET_API_URL = "https://la56xsj1l8.execute-api.us-east-1.amazonaws.com/tasks";
  
  const [status, setStatus] = useState({ level: 0, exp: 0 }); // 0〜100
  const [tasks, setTasks] = useState([]); // {id, name, time}の配列
  const [currentTime, setCurrentTime] = useState('');
  const [showTime, setShowTime] = useState(false); // 時刻表示フラグ
  const prevLevelRef = useRef(0); // 前回のレベルを保持
  const isManualAdd = useRef(false); // 手動でタスクを追加したかどうか
  const hasFetchedData = useRef(false); // データを取得したかどうか

  useEffect(() => {
    if (hasFetchedData.current) return;

    const fetchData = async () => {
      const data = await getTasks();
      setTasks(data);
      // APIから取得したタスクの時間を合計して経験値を増やす
      const totalExp = data.reduce((sum, task) => sum + task.minutes, 0);
      isManualAdd.current = false; // fetch時は手動追加ではない
      addStatus(totalExp);
    };

    fetchData();
    // 初回レンダリング時にのみデータを取得するためのフラグ
    // 開発者モードではuseEffectが2回呼ばれるため、フラグで制御する
    hasFetchedData.current = true;
  }, []);

  // async function fetchTasks() {
  //   const res = await fetch(GET_API_URL);
  //   const data = await res.json();
  //   console.log('fetched data:', data);

  //   return data;
  // }

  const addStatus = (amount) => {
    console.log('[addStatus] Called with amount:', amount);
    console.log('[addStatus] Current status before update:', status);
    
    setStatus((prev) => {
      console.log('[addStatus] Previous status in callback:', prev);
      let newExp = prev.exp + amount;
      let newLevel = prev.level;

      const levelUpThreshold = 100; // レベルアップの閾値
      
      if(newExp/levelUpThreshold >= 1) {
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

  const handleAddTask = (task) => {
    console.log("[handleAddTask] Adding task:", task);
    // タスクを追加するロジック
    // 例: setTasks([...tasks, newTask]);
    setTasks((prev) => [...prev, { taskId: Date.now(), taskName: task.name, minutes: task.time }]);

    // 経験値を増やすロジック
    console.log("[handleAddTask] Adding experience for task time:", task.time);
    isManualAdd.current = true; // 手動追加フラグを立てる
    addStatus(task.time); // タスクの時間に応じて経験値を増やす例
  };

  console.log('[App] Rendering with status:', status);

  return (
    <div style={styles.app}
    >
      <div style={styles.container}>
        <LeftPanel
          status={status}
          tasks={tasks}
          onAddTask={handleAddTask}
        />
        <TimeDisplay
          time={currentTime}
          showTime={showTime}
        />
      </div>
    </div>
  )
}


const styles = {
  app: {
    width: "100%",
    height: "100%",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    display: "flex",
    flexDirection: "row",
    width: "90%",
    maxWidth: "1400px",
    height: "80vh",
    gap: "30px",
    boxSizing: "border-box",
  },
};


export default App
