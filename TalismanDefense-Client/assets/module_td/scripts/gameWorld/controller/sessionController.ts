import { GameControllerBase } from '../../../../Core/controller/gameController';
import { Logger } from '../../../../Core/debugers/log';
import { UIMgr } from '../../ui/uiMgr';
import { GameStrategyManager } from '../strategy/gameStrategy';
import { GameRoundController } from './roundController';

export class GameSessionController extends GameControllerBase {
  readonly key = 'sessionController';

  constructor(childController = new GameRoundController()) {
    super([childController]);
  }

  private get roundController(): GameRoundController {
    return this.childControllers[0] as GameRoundController;
  }

  protected async onStart(): Promise<void> {
    GameStrategyManager.event.on('onRoundStart', this.onRoundStart);
    GameStrategyManager.event.on('onRoundEnd', this.onRoundEnd.bind(this));
    GameStrategyManager.event.on('onWaveStart', this.onWaveStart.bind(this));
    GameStrategyManager.event.on('onWaveEnd', this.onWaveEnd.bind(this));
    GameStrategyManager.event.on('onDrawCard', this.onDrawCard.bind(this));
    GameStrategyManager.event.on('onEndDrawCard', this.onEndDrawCard.bind(this));

    await UIMgr.instance.showUI('gameProgress');

    GameStrategyManager.strategy.excute('startGame');
  }

  protected async onPause(): Promise<void> {}

  protected async onResume(): Promise<void> {}

  protected async onEnd(): Promise<void> {
    GameStrategyManager.event.remove('onRoundStart', this.onRoundStart.bind(this));
    GameStrategyManager.event.remove('onRoundEnd', this.onRoundEnd.bind(this));
    GameStrategyManager.event.remove('onWaveStart', this.onWaveStart.bind(this));
    GameStrategyManager.event.remove('onWaveEnd', this.onWaveEnd.bind(this));
    GameStrategyManager.event.remove('onDrawCard', this.onDrawCard.bind(this));
    GameStrategyManager.event.remove('onEndDrawCard', this.onEndDrawCard.bind(this));
  }
  protected onTick(dt: number): void {}

  private onRoundStart(round: number) {
    Logger.log('GameSessionController', `Round ${round} start`);
  }

  private onRoundEnd() {
    Logger.log('GameSessionController', `Round end`);
  }

  private onWaveStart() {
    Logger.log('GameSessionController', `Wave start`);
  }

  private onWaveEnd() {
    Logger.log('GameSessionController', `Wave end`);
  }

  private onDrawCard() {
    Logger.log('GameSessionController', `Draw card`);
  }

  private onEndDrawCard() {
    Logger.log('GameSessionController', `End draw card`);
  }
}
