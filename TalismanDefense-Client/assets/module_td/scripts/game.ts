import { _decorator, Component, Node } from 'cc';
import { UIMgr } from './ui/uiMgr';
import { GameProcessController } from './gameWorld/controller/gameProcessController';
import { TickSystem } from '../../Core/ticker/TickerSystem';
import { GameStrategyManager } from './gameWorld/strategy/gameStrategy';
const { ccclass, property } = _decorator;

@ccclass('game')
export class game extends Component {
  async start() {
    // 初始化各种模块
    UIMgr.instance.init(this.node, 3);
    GameStrategyManager.init();

    // 开始游戏
    GameProcessController.start();
    await this.showTestUI();
  }

  update(deltaTime: number) {
    TickSystem.Tick(deltaTime);
  }

  stop() {
    GameProcessController.stop();
  }

  private async showTestUI() {
    await UIMgr.instance.showUI('test');
  }
}
