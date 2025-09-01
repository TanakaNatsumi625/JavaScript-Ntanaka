// alarm.test.js
import { AlarmClock, getNextState, transitions } from "./index.js";

describe("getNextState function", () => {
  // 状態遷移表に基づいて網羅テスト
  //normal, alarmSet, alarmSounding, snoozingの各状態からの遷移をテスト
  for (const [state, events] of Object.entries(transitions)) {
    //各状態からのイベントと期待される次の状態とアクションをテスト
    for (const [event, expected] of Object.entries(events)) {
      test(`from ${state} on ${event} -> ${expected.nextState} with action ${expected.action}`, () => {
        const result = getNextState(state, event);
        expect(result).toEqual({
          state: expected.nextState,
          action: expected.action,
        });
      });
    }

    test(`from ${state} on invalidEvent -> stay in same state`, () => {
      const result = getNextState(state, "invalidEvent");
      expect(result).toEqual({ state, action: "none" });
    });
  }
});

describe("AlarmClock class", () => {
  let clock;

  beforeEach(() => {
    clock = new AlarmClock();
  });

  test("initial state is normal", () => {
    expect(clock.getState()).toBe("normal");
  });

  test("normal -> alarmSet -> alarmSounding -> snoozing -> normal full cycle", () => {
    expect(clock.transition("setAlarm")).toBe("none");
    expect(clock.getState()).toBe("alarmSet");

    expect(clock.transition("reachedToAlarmTime")).toBe("soundAlarm");
    expect(clock.getState()).toBe("alarmSounding");

    expect(clock.transition("snooze")).toBe("stopAlarm");
    expect(clock.getState()).toBe("snoozing");

    expect(clock.transition("cancelAlarm")).toBe("none");
    expect(clock.getState()).toBe("normal");
  });
});

//テスト結果
// getNextState function                                                                                                                                                                                                                       
//     √ from normal on setAlarm -> alarmSet with action none (3 ms)                                                                                                                                                                             
//     √ from normal on invalidEvent -> stay in same state                                                                                                                                                                                       
//     √ from alarmSet on cancelAlarm -> normal with action none (1 ms)                                                                                                                                                                          
//     √ from alarmSet on reachedToAlarmTime -> alarmSounding with action soundAlarm (1 ms)                                                                                                                                                      
//     √ from alarmSet on invalidEvent -> stay in same state (1 ms)                                                                                                                                                                              
//     √ from alarmSounding on cancelAlarm -> normal with action stopAlarm (1 ms)                                                                                                                                                                
//     √ from alarmSounding on snooze -> snoozing with action stopAlarm (1 ms)                                                                                                                                                                   
//     √ from alarmSounding on invalidEvent -> stay in same state                                                                                                                                                                                
//     √ from snoozing on cancelAlarm -> normal with action none                                                                                                                                                                                 
//     √ from snoozing on elapseSnoozeTime -> alarmSounding with action soundAlarm (1 ms)                                                                                                                                                        
//     √ from snoozing on invalidEvent -> stay in same state                                                                                                                                                                                     
//   AlarmClock class                                                                                                                                                                                                                            
//     √ initial state is normal (1 ms)                                                                                                                                                                                                          
//     √ normal -> alarmSet -> alarmSounding -> snoozing -> normal full cycle   