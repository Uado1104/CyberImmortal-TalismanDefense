import { EventHandler } from 'cc';
import { GameProcessController } from '../gameWorld/controller/gameProcessController';
import { UIController } from './UIController';
import { Logger } from '../../../Core/debugers/log';

export class UiTestController extends UIController {
  private onEnenyNumberChanged(count: number) {}

  protected onCreated(): void {
    UIController.event.on('killEnemy', this.onKillEnemy);
  }

  private onKillEnemy() {
    Logger.log('game', 'onKillEnemy');
    // GameProcessController.killEnemy();
  }
}
