import { _decorator, Canvas, Component, instantiate, Node, Vec3 } from 'cc';
import { EnemySetup } from './EnemySetup';
import { ServiceLocator } from '../Core/ServiceLocator';
import { Service } from '../Core/Service';
import { Enemy } from './Enemy';
import { PlayerService } from '../Player/PlayerService';
const { ccclass, property } = _decorator;

@ccclass('EnemyService')
export class EnemyService extends Service {
    private setup: EnemySetup;

    private enemyNodes: Enemy[] = []; // store all spawned enemies

    constructor(setup: EnemySetup)
    {
        super();
        this.setup = setup;

        ServiceLocator.onReady.push(() => this.startService());
    }

    public startService(): void
    {

        const canvas: Canvas = this.setup.canvas;
        
        const prefab = this.setup.enemies;

        const amount = this.setup.amount;

        const columns = Math.ceil(Math.sqrt(amount)); // grid width
        const spacingX = this.setup.spacingX;
        const spacingY = this.setup.spacingY;

        const rows = Math.ceil(amount / columns);

        const totalWidth = (columns - 1) * spacingX;
        const totalHeight = (rows - 1) * spacingY;

        const offsetX = -totalWidth / 2;
        const offsetY = totalHeight / 2;

        for (let i = 0; i < amount; i++)
        {
            const enemy = instantiate(prefab);
            enemy.setParent(canvas.node);

            const row = Math.floor(i / columns);
            const col = i % columns;

            const x = col * spacingX + offsetX;
            const y = -row * spacingY + offsetY;

            enemy.setPosition(new Vec3(x, y, 0));

            this.enemyNodes.push(enemy.getComponent(Enemy));

            enemy.on(Node.EventType.TOUCH_END, (event) =>
            {
                const enemyComp = enemy.getComponent(Enemy);
                if (enemyComp)
                {
                    if (enemyComp.health <= 0) return; // already dead, ignore clicks
                    enemyComp.maxHealth = this.setup.maxHealth; // reset health on click
                    enemyComp.health = 0;
                    enemyComp.id = i;
                    enemyComp.Damage(ServiceLocator.get(PlayerService).playerDamage);
                }
            }, this);
        }        
    }

    public getRandomEnemy(): Enemy | null
    {
        // pick a random inactive enemy Node
        const inactiveNodes = this.enemyNodes.filter(e => !e.active);
        if (inactiveNodes.length === 0) return null;

        const node = inactiveNodes[Math.floor(Math.random() * inactiveNodes.length)];

        // get its Enemy component
        const enemy = node.getComponent(Enemy);
        return enemy ?? null;
    }


}


