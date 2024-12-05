import { GameControllerBase } from '../../../../Core/controller/gameController';

export class BattleWaveController extends GameControllerBase {
  readonly key = 'waveController';

  protected async onStart(): Promise<void> {}

  protected async onPause(): Promise<void> {}

  protected async onResume(): Promise<void> {}

  protected async onEnd(): Promise<void> {}

  protected onTick(dt: number): void {}
}
