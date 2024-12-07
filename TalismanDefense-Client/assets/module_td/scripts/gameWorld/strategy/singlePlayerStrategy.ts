import { Logger } from '../../../../Core/debugers/log';
import { TEventHandleParams } from '../../../../Core/events/eventSystem';
import { GameRoomSimulation } from '../../modules/gameRoomSimulation/gameRoundSimManager';
import { IGamePlayStrategyBase, TCommand } from './commands';

export class SinglePlayerStrategy extends IGamePlayStrategyBase {
  onHandleCommand(command: TCommand, ...params: TEventHandleParams<never>): void {
    Logger.log('SinglePlayerStrategy.onHandleCommand', `command: ${command}, params: ${params}`);
    switch (command) {
      case 'startGame':
        Logger.log('SinglePlayerStrategy', 'startGame');
        this.execStartGame();
        break;
      case 'onEnemyChanged':
        Logger.log('SinglePlayerStrategy', 'killEnemy');
        GameRoomSimulation.killEnemy();
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

  private onEnemyChanged(datas: number[]) {
    this.event.emit('onEnemyChanged', datas);
  }

  private execStartGame() {
    GameRoomSimulation.on('onRoundStart', this.onRoundStart.bind(this));
    GameRoomSimulation.on('onRoundEnd', this.onEndRound.bind(this));
    GameRoomSimulation.on('onWaveStart', this.onWaveStart.bind(this));
    GameRoomSimulation.on('onWaveEnd', this.onWaveEnd.bind(this));
    GameRoomSimulation.on('startDrawCard', this.onDrawCard.bind(this));
    GameRoomSimulation.on('endDrawCard', this.onEndDrawCard.bind(this));
    GameRoomSimulation.on('enemyChanged', this.onEnemyChanged.bind(this));
    GameRoomSimulation.start();
  }
}
