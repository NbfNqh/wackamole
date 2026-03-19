import { _decorator, Component, log, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Entity')
export class Entity extends Component 
{
    // Component of the core framework. It's purpose is to have interaction between Player and Enemies without directly accessing the player service or the enemy service
    public id: number;
    public health: number;
    public maxHealth: number;

    protected Die(): void
    {

    }

    public Revive(): void
    {
        this.health = this.maxHealth;
    }

    public Damage(damage: number): void
    {
        this.health -= damage;
        if (this.health <= 0)
            this.Die();
    }
}


