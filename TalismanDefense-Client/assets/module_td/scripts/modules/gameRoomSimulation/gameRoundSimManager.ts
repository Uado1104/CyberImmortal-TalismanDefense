import { Logger } from '../../../../Core/debugers/log';
import { EventDispatcher } from '../../../../Core/events/eventSystem';
import { ITicker } from '../../../../Core/ticker/ITicker';
import { TickSystem } from '../../../../Core/ticker/TickerSystem';
import { registerTimeoutTicker } from '../../../../Core/ticker/TickerUtils';
import { genDefaultSimGameModel } from './gameRoomSimInterface';
import { GameRoomSimModel } from './gameRoomSimModel';

const gameRoomSimulatioEventDefine = {
  onRoundStart: (round: number) => {},
  onRoundEnd: (round: number) => {},
  onWaveStart: (wave: number) => {},
  onWaveEnd: (wave: number) => {},
  startDrawCard: () => {},
  endDrawCard: () => {},
  sessionOver: () => {},
  enemyChanged: (ids: number[]) => {},
};

class GameRoomSimulationManager extends EventDispatcher<typeof gameRoomSimulatioEventDefine> {
  private model = new GameRoomSimModel();

  private isRunning = false;

  start() {
    Logger.log('GameRoomSimulationManager', 'start');
    // 将玩家数据以及回合数据传入，开启tick
    this.model.init(genDefaultSimGameModel());

    TickSystem.AddTicker(this.tick);
    this.isRunning = true;
    this.startSession();
  }

  killEnemy() {
    Logger.log('GameRoomSimulationManager', ` killEnemy ${this.model.enemies.length}`);
    if (this.model.enemies.length <= 0) {
      return;
    }
    const id = this.model.enemies.pop();
    if (!id) {
      return;
    }
    this.model.killEnemy();
    this.emit('enemyChanged', this.model.enemies);
  }

  stop() {
    Logger.log('GameServerSimulationManager', 'stop');
    // 停止tick
    TickSystem.RemoveTicker(this.tick);
    // 清理所有数据
  }

  startSession() {
    // 开始回合
    this.model.data.session.currentRound = 1;
    this.moveToNextRound();
  }

  tick: ITicker = {
    Tick: (dt: number) => {
      if (!this.isRunning) {
        return;
      }

      if (this.model.data.session.isDrawPhase) {
        return;
      }

      if (this.model.enemies.length !== 0) {
        return;
      }

      if (!this.model.isWaveEnd) {
        return;
      }

      this.emit('onRoundEnd', this.model.data.session.currentRound);
      this.moveToNextRound();
    },
  };

  moveToNextWave(): boolean {
    // 移动到下一波

    if (this.model.isWaveEnd) {
      return false;
    }
    this.model.moveToNextWave();
    this.emit('onWaveStart', this.model.wave);
    this.emit('enemyChanged', this.model.enemies);
    registerTimeoutTicker(() => {
      this.emit('onWaveEnd', this.model.wave);
      this.moveToNextWave();
    }, 5);
    return true;
  }

  moveToNextRound() {
    // 移动到下一回合

    if (this.model.isRoundEnd) {
      this.emit('sessionOver');
      return;
    }

    this.model.moveToNextRound();
    this.emit('onRoundStart', this.model.data.session.currentRound);
    this.emit('startDrawCard');
    Logger.log('GameRoomSimulationManager', `Round ${this.model.data.session.currentRound} start`);

    registerTimeoutTicker(() => {
      this.model.data.session.isDrawPhase = false;
      this.emit('endDrawCard');
      this.moveToNextWave();
    }, 2);
  }
}

export const GameRoomSimulation = new GameRoomSimulationManager();
