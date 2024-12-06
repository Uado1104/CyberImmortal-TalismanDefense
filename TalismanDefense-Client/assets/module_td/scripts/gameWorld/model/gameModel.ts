import { ModelObserver, ObservableModel } from '../../../../Core/model/observableModel';
import { ECSWorld } from '../ecs/ECSWorld';
import { genDefaultGameModel, IGameModel } from './interface';

class CGameModel extends ObservableModel<IGameModel> {
  constructor() {
    super(genDefaultGameModel());
  }
}

export class GameModel {
  static readonly gameWorldEntities = new ECSWorld(1000);

  static data = new CGameModel();

  static addObserver(path: string, observer: ModelObserver): void {
    this.data.addObserver(path, observer);
  }

  static removeObserver(path: string, observer: ModelObserver): void {
    this.data.removeObserver(path, observer);
  }
}
