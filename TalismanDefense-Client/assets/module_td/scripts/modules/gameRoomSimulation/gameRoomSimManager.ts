import { Logger } from '../../../../Core/debugers/log';
import { EventDispatcher } from '../../../../Core/events/eventSystem';
import { ITicker } from '../../../../Core/ticker/ITicker';
import { TickSystem } from '../../../../Core/ticker/TickerSystem';
import { registerTimeoutTicker } from '../../../../Core/ticker/TickerUtils';
import { genDefaultGameRoomSim } from './gameRoomSimInterface';
import { GameRoomSimModel } from './gameRoomSimModel';

const gameRoomSimulatioEventDefine = {
  onRoundStart: (round: number) => {},
  onRoundEnd: (round: number) => {},
  onWaveStart: (wave: number) => {},
  onWaveEnd: (wave: number) => {},
  startDrawCard: () => {},
  endDrawCard: () => {},
  sessionOver: () => {},
  enemyChanged: (enemyCount: number) => {},
};

export class GameRoomSimulationManager {
  private static model = new GameRoomSimModel();

  static readonly event = new EventDispatcher<typeof gameRoomSimulatioEventDefine>();

  static start() {
    Logger.log('GameRoomSimulationManager', 'start');
    // 将玩家数据以及回合数据传入，开启tick
    GameRoomSimulationManager.model.init(genDefaultGameRoomSim());

    TickSystem.AddTicker(GameRoomSimulationManager.tick);
    GameRoomSimulationManager.isRunning = true;
    GameRoomSimulationManager.startSession();
  }

  static killEnemy() {
    Logger.log('GameRoomSimulationManager', ` killEnemy ${GameRoomSimulationManager.model.enemyAliveCount}`);
    GameRoomSimulationManager.model.enemyAliveCount--;
    this.event.emit('enemyChanged', GameRoomSimulationManager.model.enemyAliveCount);
  }

  static stop() {
    Logger.log('GameServerSimulationManager', 'stop');
    // 停止tick
    TickSystem.RemoveTicker(GameRoomSimulationManager.tick);
    // 清理所有数据
  }

  private static isRunning = false;

  private static isBattle = false;

  static startSession() {
    // 开始回合
    GameRoomSimulationManager.isBattle = false;
    GameRoomSimulationManager.model.data.session.currentRound = -1;
    GameRoomSimulationManager.model.roundLeft = 4;
    GameRoomSimulationManager.moveToNextRound();
  }

  static tick: ITicker = {
    Tick: (dt: number) => {
      if (!GameRoomSimulationManager.isRunning) {
        return;
      }

      // 模拟游戏逻辑
      if (!GameRoomSimulationManager.isBattle) {
        return;
      }

      if (GameRoomSimulationManager.model.enemyAliveCount !== 0) {
        return;
      }

      GameRoomSimulationManager.isBattle = false;
      GameRoomSimulationManager.event.emit('onRoundEnd', GameRoomSimulationManager.model.data.session.currentRound);
      GameRoomSimulationManager.moveToNextRound();
    },
  };

  static moveToNextWave(): boolean {
    // 移动到下一波

    if (GameRoomSimulationManager.model.waveLeft === 0) {
      return false;
    }
    GameRoomSimulationManager.model.enemyAliveCount += 3;
    GameRoomSimulationManager.model.waveLeft--;
    GameRoomSimulationManager.event.emit('onWaveStart', GameRoomSimulationManager.model.waveLeft);
    registerTimeoutTicker(() => {
      GameRoomSimulationManager.event.emit('onWaveEnd', GameRoomSimulationManager.model.waveLeft);
      GameRoomSimulationManager.moveToNextWave();
    }, 5);
    return true;
  }

  static moveToNextRound() {
    // 移动到下一回合
    GameRoomSimulationManager.isBattle = false;

    if (GameRoomSimulationManager.model.roundLeft === 0) {
      GameRoomSimulationManager.isRunning = false;
      GameRoomSimulationManager.event.emit('sessionOver');
      return;
    }

    GameRoomSimulationManager.model.waveLeft = 3;
    GameRoomSimulationManager.model.roundLeft--;
    GameRoomSimulationManager.model.data.session.currentRound++;
    Logger.log('GameRoomSimulationManager', `Round ${GameRoomSimulationManager.model.data.session.currentRound} start`);
    GameRoomSimulationManager.event.emit('onRoundStart', GameRoomSimulationManager.model.data.session.currentRound);
    GameRoomSimulationManager.event.emit('startDrawCard');

    registerTimeoutTicker(() => {
      GameRoomSimulationManager.event.emit('endDrawCard');
      GameRoomSimulationManager.moveToNextWave();
      GameRoomSimulationManager.isBattle = true;
    }, 2);
  }
}
