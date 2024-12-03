import { Logger } from '../../../../Core/debugers/log';
import { TEventHandleParams } from '../../../../Core/events/eventSystem';
import { GameRoomSimulationManager } from '../../modules/gameRoomSimulation/gameRoomSimManager';
import { GameModel } from '../model/gameModel';
import { IGamePlayStrategyBase, TCommand } from './commands';

export class SinglePlayerStrategy extends IGamePlayStrategyBase {
  onHandleCommand(command: TCommand, ...params: TEventHandleParams<never>): void {
    Logger.log('SinglePlayerStrategy.onHandleCommand', `command: ${command}, params: ${params}`);
    switch (command) {
      case 'startGame':
        Logger.log('SinglePlayerStrategy', 'startGame');
        this.onStartGame();
        break;
      case 'killEnemy':
        Logger.log('SinglePlayerStrategy', 'killEnemy');
        GameRoomSimulationManager.killEnemy();
        break;
      default:
        Logger.warn('SinglePlayerStrategy.onHandleCommand', `unknown command ${command}`);
        break;
    }
  }

  private onRoundStart(round: number) {
    this.event.emit('onRoundStart', round);
  }

  private onEndRound() {
    this.event.emit('onRoundEnd');
  }

  private onWaveStart() {
    this.event.emit('onWaveStart');
  }

  private onWaveEnd() {
    this.event.emit('onWaveEnd');
  }

  private onDrawCard() {
    this.event.emit('onDrawCard');
  }

  private onEndDrawCard() {
    this.event.emit('onEndDrawCard');
  }

  private onDataChanged(data: number) {
    GameModel.data.proxy.EnemyAliveCount = data;
  }

  private onStartGame() {
    GameRoomSimulationManager.event.on('startRound', this.onRoundStart.bind(this));
    GameRoomSimulationManager.event.on('endRound', this.onEndRound.bind(this));
    GameRoomSimulationManager.event.on('startWave', this.onWaveStart.bind(this));
    GameRoomSimulationManager.event.on('endWave', this.onWaveEnd.bind(this));
    GameRoomSimulationManager.event.on('startDrawCard', this.onDrawCard.bind(this));
    GameRoomSimulationManager.event.on('endDrawCard', this.onEndDrawCard.bind(this));
    GameRoomSimulationManager.event.on('enemyChanged', this.onDataChanged.bind(this));
    GameRoomSimulationManager.start();
  }
}
