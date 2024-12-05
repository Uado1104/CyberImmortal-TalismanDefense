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
  }

  static stop() {
    GameStrategyManager.event.remove('onRoundStart', GamePlayStateManager.onRoundDataChange);
    GameStrategyManager.event.remove('onRoundEnd', GamePlayStateManager.onRoundDataChange);
    GameStrategyManager.event.remove('onWaveStart', GamePlayStateManager.onWaveDataChange);
    GameStrategyManager.event.remove('onWaveEnd', GamePlayStateManager.onWaveDataChange);
  }

  private static onRoundDataChange(round: number) {
    GameModel.data.proxy.CurrentRound = round;
  }

  private static onWaveDataChange(wave: number) {
    GameModel.data.proxy.CurrentWave = wave;
  }
}
