import { TickSystem } from '../../../../Core/ticker/TickerSystem';
import { GamePlayStateManager } from '../manager/gameStateManager';
import { GameStrategyManager } from '../strategy/gameStrategy';
import { GameSessionController } from './sessionController';

export class GameProcessController {
  static gameSessionController = new GameSessionController();

  private static ticker = {
    Tick: GameProcessController.gameSessionController.tick,
  };

  static start() {
    GamePlayStateManager.event.on('pause', GameProcessController.onPause);
    GamePlayStateManager.event.on('resume', GameProcessController.onResume);

    // 初始化各种模块
    TickSystem.AddTicker(GameProcessController.ticker);
    this.gameSessionController.start();
  }

  private static onPause() {
    GameProcessController.gameSessionController.pause();
  }

  private static onResume() {
    GameProcessController.gameSessionController.resume();
  }

  static stop() {
    GamePlayStateManager.event.remove('pause', GameProcessController.onPause);
    GamePlayStateManager.event.remove('resume', GameProcessController.onResume);
    TickSystem.RemoveTicker(GameProcessController.ticker);
    GameStrategyManager.destroy();
  }

  static killEnemy() {
    GameProcessController.gameSessionController.killEnemy();
  }
}
