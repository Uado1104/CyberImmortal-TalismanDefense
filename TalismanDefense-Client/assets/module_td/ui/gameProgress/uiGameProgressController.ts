import { Logger } from '../../../Core/debugers/log';
import { GameModel } from '../../scripts/gameWorld/model/gameModel';
import { GameStrategyManager } from '../../scripts/gameWorld/strategy/gameStrategy';
import { UIController } from '../../scripts/ui/UIController';
import { ui_gameProgress } from './ui_gameProgress';

export class UIGameProgressController extends UIController {
  private onDataChanged() {
    const ui = this._layout as ui_gameProgress;
    ui.wave.string = `Wave: ${GameModel.data.proxy.CurrentWave}`;
    ui.round.string = `Round: ${GameModel.data.proxy.CurrentRound}`;
    ui.enemy.string = `Enemy: ${GameModel.data.proxy.EnemyAliveCount}`;
  }

  protected onCreated(): void {
    Logger.log('UIGameProgressController', 'onCreated');
    GameModel.addObserver('EnemyAliveCount', this.onDataChanged.bind(this));
    GameModel.addObserver('CurrentWave', this.onDataChanged.bind(this));
    GameModel.addObserver('CurrentRound', this.onDataChanged.bind(this));
    this.onDataChanged();
  }

  private onKillEnemy() {}
}
