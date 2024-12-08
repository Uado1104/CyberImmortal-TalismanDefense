import { Logger } from '../../../../Core/debugers/log';
import { ISimGameModel } from './gameRoomSimInterface';

export class GameRoomSimModel {
  constructor() {
    Logger.log('GameRoomSimModel', 'GameRoomSimModel constructor');
  }

  private myData: ISimGameModel | undefined;

  init(data: ISimGameModel) {
    this.myData = data;
  }

  get data(): ISimGameModel {
    if (!this.myData) {
      Logger.error('GameRoomSimModel', 'data is undefined');
      throw new Error('data is undefined');
    }
    return this.myData;
  }

  /** 换一批卡牌 */
  drawCard() {}

  /** 选择一张卡 */
  pickCard() {}

  enemies: number[] = [];

  get wave() {
    return this.data.session.currentWave;
  }

  get isWaveEnd() {
    const currentRound = this.data.session.rounds[this.round - 1];
    return this.wave >= currentRound.waves.length;
  }

  moveToNextWave() {
    this.data.session.currentWave++;
    const currentRound = this.data.session.rounds[this.round - 1];

    const curentWave = currentRound.waves[this.wave - 1];
    this.enemies.push(...curentWave.enemies.map((e) => e.monsterId));
  }

  moveToNextRound() {
    this.data.session.currentRound++;
    this.data.session.currentWave = 1;
    this.data.session.isDrawPhase = true;
  }

  get round() {
    return this.data.session.currentRound;
  }

  get isRoundEnd() {
    return this.round >= this.data.session.rounds.length;
  }

  killEnemy(id?: number) {
    Logger.log('GameRoomSimulationManager', ` killEnemy ${this.enemies.length}`);
    if (this.enemies.length <= 0) {
      return;
    }
    const index = this.enemies.indexOf(id);
    if (index < 0) {
      this.enemies.pop();
      return;
    }
    this.enemies.splice(index, 1);
  }
}
