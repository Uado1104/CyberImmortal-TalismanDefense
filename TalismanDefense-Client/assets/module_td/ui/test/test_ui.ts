import { _decorator, Component, Node } from 'cc';
import { Logger } from '../../../Core/debugers/log';
const { ccclass, property } = _decorator;

@ccclass('test_ui')
export class test_ui extends Component {
  onClickKillEnemy() {
    Logger.log('test_ui', 'onKillEnemy');
  }
}
