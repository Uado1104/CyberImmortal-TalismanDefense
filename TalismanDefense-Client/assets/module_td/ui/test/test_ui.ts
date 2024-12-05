import { _decorator, Component, Node } from 'cc';
import { Logger } from '../../../Core/debugers/log';
import { GameStrategyManager } from '../../scripts/gameWorld/strategy/gameStrategy';
const { ccclass, property } = _decorator;

@ccclass('test_ui')
export class test_ui extends Component {
  onClickKillEnemy() {
    Logger.log('test_ui', 'onKillEnemy');
    GameStrategyManager.excute('killEnemy');
  }
}
