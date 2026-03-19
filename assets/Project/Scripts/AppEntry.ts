import { _decorator, Component, log, Node } from 'cc';
import { ServiceLocator } from '../../Framework/Services/Core/ServiceLocator';
import { StoreService } from '../../Framework/Services/Store/StoreService';
import { StoreSetup } from '../../Framework/Services/Store/StoreSetup';
import { PlayerService } from '../../Framework/Services/Player/PlayerService';
import { EnemyService } from '../../Framework/Services/Enemies/EnemyService';
import { PlayerSetup } from '../../Framework/Services/Player/PlayerSetup';
import { EnemySetup } from '../../Framework/Services/Enemies/EnemySetup';
import { enemyReducer } from '../../Framework/Services/Enemies/EnemyReducer';
import { Enemy } from '../../Framework/Services/Enemies/Enemy';
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

    //private gameState: GameStates;

    start() 
    { 
        log("Game Started");
        // Create app Scope
        const storeService = new StoreService(this.storeSetup);
        storeService.init({ enemies: {} });
        storeService.addReducer(enemyReducer);
        ServiceLocator.register(StoreService, storeService);

        const playerService = new PlayerService(this.playerSetup);
        ServiceLocator.register(PlayerService, playerService);

        const enemyService = new EnemyService(this.enemySetup);
        ServiceLocator.register(EnemyService, enemyService);

        ServiceLocator.onReady.forEach(cb => cb());

        // UI State, should have it's own service
        //this.gameState = GameState.Menu;

        this.schedule(this.randomEnableEnemy, 0.5);

        // Subscribe to store changes, should be in a UI component
        storeService.subscribe((state) =>
        {
            this.updateEnemyHP(state.enemies);
        });
    }

    randomRange(min: number, max: number): number
    {
        return Math.random() * (max - min) + min;
    }

    randomEnableEnemy()
    {
        const enemy = ServiceLocator.get(EnemyService).getRandomEnemy();

        const enableDelay = this.randomRange(this.enemySetup.minEnableTime, this.enemySetup.maxEnableTime);

        this.scheduleOnce(() => this.activateEnemy(enemy), enableDelay);
    }

    activateEnemy(enemy: Enemy)
    {
        if (!enemy) return;

        enemy.Revive();

        // random active time before deactivating
        const activeTime = this.randomRange(this.enemySetup.minActiveTime, this.enemySetup.maxActiveTime);

        this.scheduleOnce(() =>
        {
            if (enemy.health > 0)
            {
                // only disable if still alive
                enemy.active = false;
            }
        }, activeTime);
    }



    private updateEnemyHP(state: any): void
    {
        const enemies = state.enemies;

        if (!enemies) return;

        for (const id in enemies)
        {
            const enemyData = enemies[id];

            //const enemyView = this.enemyViews.get(enemyId);
            //if (!enemyView) continue;
            //
            //const ratio = enemyData.hp / enemyData.maxHp;
            //
            //enemyView.setHealth(ratio);
        }
    } 
}


