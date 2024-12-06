import { Logger } from '../../../../Core/debugers/log';
import { TEventHandleParams } from '../../../../Core/events/eventSystem';
import { GameRoomSimulationManager } from '../manager/gameRoundSimManager';
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

  private onEndRound(round: number) {
    this.event.emit('onRoundEnd', round);
  }

  private onWaveStart(wave: number) {
    this.event.emit('onWaveStart', wave);
  }

  private onWaveEnd(wave: number) {
    this.event.emit('onWaveEnd', wave);
  }

  private onDrawCard() {
    this.event.emit('onDrawCard');
  }

  private onEndDrawCard() {
    this.event.emit('onEndDrawCard');
  }

  private onDataChanged(data: number) {}

  private onStartGame() {
    GameRoomSimulationManager.event.on('onRoundStart', this.onRoundStart.bind(this));
    GameRoomSimulationManager.event.on('onRoundEnd', this.onEndRound.bind(this));
    GameRoomSimulationManager.event.on('onWaveStart', this.onWaveStart.bind(this));
    GameRoomSimulationManager.event.on('onWaveEnd', this.onWaveEnd.bind(this));
    GameRoomSimulationManager.event.on('startDrawCard', this.onDrawCard.bind(this));
    GameRoomSimulationManager.event.on('endDrawCard', this.onEndDrawCard.bind(this));
    GameRoomSimulationManager.event.on('enemyChanged', this.onDataChanged.bind(this));
    GameRoomSimulationManager.start();
  }
}
