import { _decorator, Component, Node } from 'cc';
import { UIMgr } from './ui/uiMgr';
import { GameProcessController } from './gameWorld/controller/gameProcessController';
import { TickSystem } from '../../Core/ticker/TickerSystem';
import { GameStrategyManager } from './gameWorld/strategy/gameStrategy';
import { DEBUG, PREVIEW, TEST } from 'cc/env';
import { GamePlayStateManager } from './gameWorld/manager/gameStateManager';
const { ccclass, property } = _decorator;

@ccclass('game')
export class game extends Component {
  async start() {
    // 初始化各种模块
    UIMgr.instance.init(this.node, 3);
    GameStrategyManager.init();
    GamePlayStateManager.init();
    // 开始游戏
    GameProcessController.start();
    await this.showTestUI();
  }

  update(deltaTime: number) {
    TickSystem.Tick(deltaTime);
  }

  stop() {
    GamePlayStateManager.stop();
    GameProcessController.stop();
  }

  private async showTestUI() {
    if (PREVIEW || TEST || DEBUG) {
      await UIMgr.instance.showUI('test');
    }
    await UIMgr.instance.showUI('gameProgress');
  }
}
