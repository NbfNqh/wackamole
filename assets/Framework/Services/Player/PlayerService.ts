import { _decorator, Component, Node } from 'cc';
import { PlayerSetup } from './PlayerSetup';
import { ServiceLocator } from '../Core/ServiceLocator';
import { Service } from '../Core/Service';
import { Entity } from '../Core/Entity';
const { ccclass, property } = _decorator;

@ccclass('PlayerService')
export class PlayerService extends Service {
    private setup: PlayerSetup;

    constructor(setup: PlayerSetup)
    {
        super();
        this.setup = setup;

        ServiceLocator.onReady.push(() => this.startService());
    }

    public startService(): void
    {

    }

    public attack(entity: Entity): void
    {
        entity.Damage(this.setup.damage);
    }

    public get playerDamage(): number
    {
        return this.setup.damage;
    }
}


