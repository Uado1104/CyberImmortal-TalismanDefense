import { EventHandler } from 'cc';
import { GameProcessController } from '../../scripts/gameWorld/controller/gameProcessController';
import { UIController } from '../../scripts/ui/UIController';
import { Logger } from '../../../Core/debugers/log';

export class UiTestController extends UIController {
  private onEnenyNumberChanged(count: number) {}

  protected onCreated(): void {
    Logger.log('UiTestController', 'oncreated');
  }

  private onKillEnemy() {
    Logger.log('game', 'onKillEnemy');
    // GameProcessController.killEnemy();
  }
}
