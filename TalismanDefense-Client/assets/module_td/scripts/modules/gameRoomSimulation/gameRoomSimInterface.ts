export interface IGameEnemy {
  /** 怪物Id */
  monsterId: number;

  /** 怪物生成时的在地图上id */
  createIdOnMap: number;
}

export interface ISimGameWave {
  /** 怪物 */
  enemies: IGameEnemy[];
}

export interface ISimGameRound {
  /** 怪物波数 */
  waves: ISimGameWave[];
}

export interface ISimGameSession {
  /** 当前回合 */
  currentRound: number;

  /** 当前波次 */
  currentWave: number;

  /** 是否为抽牌阶段 */
  isDrawPhase: boolean;

  /** 回合数据，这里是静态的gameRound配置，不会动态变换 */
  rounds: ISimGameRound[];
}

export interface ISimGamePlayerInfo {
  /** 玩家Id */
  Id: number;

  /** 玩家等级 */
  level: number;

  /** 放置在场上的 */
  placedCards: ISimGameCard[];

  /** 手牌 */
  handCards: ISimGameCard[];

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

export interface ISimGameHero {
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

export interface ISimGameCard {
  /** 唯一标识Id */
  key: number;

  /** 卡牌Id */
  cardId: number;

  /** 卡牌等级 */
  level: number;

  /** 是否已被抽取 */
  drawed: boolean;
}

export interface ISimGameRelic {
  /** 圣物Id */
  relicId: number;
}

export interface ISimGameModel {
  /** 局内数据 */
  session: ISimGameSession;

  /** 玩家数据 */
  players: ISimGamePlayerInfo[];

  /** 牌池 */
  cardPool: ISimGameCard[];

  /** 圣物池 */
  relicPool: ISimGameRelic[];
}

export function genEnemies(count = 3): IGameEnemy[] {
  const enemies: IGameEnemy[] = [];
  for (let i = 0; i < count; i++) {
    enemies.push({
      monsterId: i,
      createIdOnMap: i,
    });
  }
  return enemies;
}

export function genSimGameRounds(roundCount: number, waveCount: number): ISimGameRound[] {
  const rounds: ISimGameRound[] = [];
  for (let i = 0; i < roundCount; i++) {
    const round: ISimGameRound = {
      waves: [],
    };
    rounds.push(round);
    for (let j = 0; j < waveCount; j++) {
      const wave: ISimGameWave = {
        enemies: genEnemies(),
      };
      round.waves.push(wave);
    }
  }
  return rounds;
}

export function genSimPlayerInfo(): ISimGamePlayerInfo {
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

export function genDefaultSimGameModel(): ISimGameModel {
  return {
    session: {
      currentWave: 1,
      currentRound: 1,
      isDrawPhase: true,
      rounds: genSimGameRounds(3, 3),
    },
    players: [genSimPlayerInfo()],
    cardPool: [],
    relicPool: [],
  };
}
