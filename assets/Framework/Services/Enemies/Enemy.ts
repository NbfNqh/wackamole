import { _decorator, Component, log, Node } from 'cc';
import { Entity } from '../Core/Entity';
import { ServiceLocator } from '../Core/ServiceLocator';
import { StoreService } from '../Store/StoreService';
const { ccclass, property } = _decorator;

@ccclass('Enemy')
export class Enemy extends Entity 
{
    active: any;
    public Damage(damage: number): void
    {
        super.Damage(damage);

        const store = ServiceLocator.get(StoreService);
        store.dispatch({
            type: "ENEMY_DAMAGED",
            payload: { id: this.id, hp: this.health }
        });
    }
}


