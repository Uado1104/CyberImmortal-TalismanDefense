export interface IGameMonster {
  /** 怪物Id */
  monsterId: number;

  /** 怪物生成时的在地图上id */
  createIdOnMap: number;

  /** 怪物数量 */
  count: number;

  /** 生成间隔，为0时全部一起生成 */
  genInterval: number;
}

export interface IGamePlayerInfo {
  /** 玩家Id */
  Id: number;

  /** 玩家等级 */
  level: number;

  /** 放置在场上的 */
  placedCards: IGameCard[];

  /** 手牌 */
  handCards: IGameCard[];

  /**  */
  buffs: number[];

  /** 金币 */
  gold: number;

  /** 最大金币 */
  maxGold: number;

  /** 回合金 */
  roundGold: number;

  /** 血量 */
  hp: number;

  /** 最大血量 */
  maxHp: number;
}

export interface IGameHero {
  /** 唯一标识Id */
  key: number;

  /** 英雄Id */
  card: number;

  /** 英雄等级 */
  level: number;

  /** 当前生命值 */
  hp: number;

  /** 最大生命值 */
  maxHp: number;

  /** 技能id */
  abilities: number[];

  /** 攻击力 */
  attack: number;
}

export interface IGameCard {
  /** 唯一标识Id */
  key: number;

  /** 卡牌Id */
  cardId: number;

  /** 卡牌等级 */
  level: number;

  /** 是否已被抽取 */
  drawed: boolean;
}

export interface IGameRelic {
  /** 圣物Id */
  relicId: number;
}

export interface IGameModel {
  /** 局内数据 */
  currentRound: number;

  /** 当前波次 */
  currentWave: number;

  /** 是否为抽牌阶段 */
  isDrawPhase: boolean;

  /** 玩家数据 */
  player: IGamePlayerInfo;

  /** 牌池 */
  monsters: number[];
}

export function genSimPlayerInfo(): IGamePlayerInfo {
  return {
    Id: 0,
    level: 1,
    placedCards: [],
    handCards: [],
    buffs: [],
    gold: 0,
    maxGold: 0,
    roundGold: 0,
    hp: 30,
    maxHp: 0,
  };
}

export function genDefaultGameModel(): IGameModel {
  return {
    currentWave: 1,
    currentRound: 1,
    isDrawPhase: false,
    player: genSimPlayerInfo(),
    monsters: [],
  };
}
