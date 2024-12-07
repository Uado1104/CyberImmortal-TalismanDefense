import { EventDispatcher } from '../../../../Core/events/eventSystem';
import { GameModel } from '../model/gameModel';
import { GameStrategyManager } from '../strategy/gameStrategy';

const gameStateEventDefine = {
  pause: () => {},
  resume: () => {},
};

export class GamePlayStateManager {
  static event = new EventDispatcher<typeof gameStateEventDefine>();

  static init() {
    GameStrategyManager.event.on('onRoundStart', GamePlayStateManager.onRoundDataChange);
    GameStrategyManager.event.on('onRoundEnd', GamePlayStateManager.onRoundDataChange);
    GameStrategyManager.event.on('onWaveStart', GamePlayStateManager.onWaveDataChange);
    GameStrategyManager.event.on('onWaveEnd', GamePlayStateManager.onWaveDataChange);
    GameStrategyManager.event.on('onEnemyChanged', GamePlayStateManager.onEnemyChanged);
  }

  static stop() {
    GameStrategyManager.event.remove('onRoundStart', GamePlayStateManager.onRoundDataChange);
    GameStrategyManager.event.remove('onRoundEnd', GamePlayStateManager.onRoundDataChange);
    GameStrategyManager.event.remove('onWaveStart', GamePlayStateManager.onWaveDataChange);
    GameStrategyManager.event.remove('onWaveEnd', GamePlayStateManager.onWaveDataChange);
    GameStrategyManager.event.remove('onEnemyChanged', GamePlayStateManager.onEnemyChanged);
  }

  private static onRoundDataChange(round: number) {
    GameModel.data.currentRound = round;
  }

  private static onWaveDataChange(wave: number) {
    GameModel.data.currentWave = wave;
  }

  private static onEnemyChanged(ids: number[]) {
    GameModel.data.monsters = ids;
  }
}
