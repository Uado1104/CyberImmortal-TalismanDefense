import { UIController } from '../../scripts/ui/UIController';
import { Logger } from '../../../Core/debugers/log';
import { GameStrategyManager } from '../../scripts/gameWorld/strategy/gameStrategy';
import { test_ui } from './test_ui';

export class UiTestController extends UIController {
  protected onCreated(): void {
    Logger.log('UiTestController', 'oncreated');
  }
}
