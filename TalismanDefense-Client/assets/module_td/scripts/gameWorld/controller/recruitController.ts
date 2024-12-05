import { GameControllerBase } from '../../../../Core/controller/gameController';

export class GameRecruitController extends GameControllerBase {
  readonly key = 'RecruitController';
  protected async onStart(): Promise<void> {}

  protected async onPause(): Promise<void> {}

  protected async onResume(): Promise<void> {}

  protected async onEnd(): Promise<void> {}
  protected onTick(dt: number): void {}
}
