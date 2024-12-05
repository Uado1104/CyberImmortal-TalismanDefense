import { GameControllerBase } from '../../../../Core/controller/gameController';
import { BattleWaveController } from './battleWaveController';
import { GameRecruitController } from './recruitController';

export class GameRoundController extends GameControllerBase {
  readonly key = 'roundController';

  constructor(waveController = new BattleWaveController(), recruitController = new GameRecruitController()) {
    super([recruitController, waveController]);
  }

  private get waveController(): BattleWaveController {
    return this.childControllers[1] as BattleWaveController;
  }

  private get recruitController(): GameRecruitController {
    return this.childControllers[0] as GameRecruitController;
  }
  protected async onStart(): Promise<void> {}

  protected async onPause(): Promise<void> {}

  protected async onResume(): Promise<void> {}

  protected async onEnd(): Promise<void> {}

  protected onTick(dt: number): void {}
}
