import { ModelObserver, ObservableModel } from '../../../../Core/model/observableModel';
import { ECSWorld } from '../ecs/ECSWorld';

export interface IGameModel {
  EnemyAliveCount: number;
  CurrentRound: number;
  CurrentWave: number;
}

class CGameModel extends ObservableModel<IGameModel> {
  constructor() {
    super({
      EnemyAliveCount: 0,
      CurrentRound: 0,
      CurrentWave: 0,
    });
  }
}

export class GameModel {
  static readonly gameWorld = new ECSWorld(1000);

  static data = new CGameModel();

  static addObserver(path: keyof IGameModel, observer: ModelObserver): void {
    this.data.addObserver(path, observer);
  }

  static removeObserver(path: keyof IGameModel, observer: ModelObserver): void {
    this.data.removeObserver(path, observer);
  }
}
