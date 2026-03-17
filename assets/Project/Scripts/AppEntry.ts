import { _decorator, Component, Node } from 'cc';
import { ServiceLocator } from '../../Framework/Services/Core/ServiceLocator';
import { StoreService } from '../../Framework/Services/Store/StoreService';
import { StoreSetup } from '../../Framework/Services/Store/StoreSetup';
import { PlayerService } from '../../Framework/Services/Player/PlayerService';
import { EnemyService } from '../../Framework/Services/Enemies/EnemyService';
import { PlayerSetup } from '../../Framework/Services/Player/PlayerSetup';
import { EnemySetup } from '../../Framework/Services/Enemies/EnemySetup';
const { ccclass, property } = _decorator;

@ccclass('AppEntry')
export class AppEntry extends Component 
{
    @property(StoreSetup)
    storeSetup: StoreSetup;

    @property(PlayerSetup)
    playerSetup: PlayerSetup;

    @property(EnemySetup)
    enemySetup: EnemySetup;

    private gameState: GameState;

    start() 
    {
        const storeService = new StoreService(this.storeSetup);
        //storeService.init({ player: { hp: 100 } });
        //storeService.dispatch({ type: "SET_HP", payload: 80 });

        ServiceLocator.register(StoreService, storeService);

        const playerService = new PlayerService(this.playerSetup);
        ServiceLocator.register(PlayerService, playerService);

        const enemyService = new EnemyService(this.enemySetup);
        ServiceLocator.register(EnemyService, enemyService);

        this.gameState = GameState.Menu;     

        ServiceLocator.onReady.forEach(cb => cb());
    }

    update(dt: number): void
    {

    }
}

