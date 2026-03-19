import { _decorator, Component, Node, Sprite } from 'cc';
import { Enemy } from '../../Framework/Services/Enemies/Enemy';
const { ccclass, property } = _decorator;

@ccclass('MoleEnemy')
export class MoleEnemy extends Enemy 
{
    @property(Sprite)
    hideSprite: Sprite;
    @property(Sprite)
    shownSprite: Sprite;

    start() {
        this.setState(false);
    }

    protected Die(): void
    {
        super.Die();
        this.setState(false);
    }

    protected Revive(): void
    {
        super.Revive();
        this.setState(true);
    }

    protected Damage(damage: number): void
    {
        super.Damage(damage);
        // Play awesome visual effect I don't have time to make
    }

    public setState(vulnerable: boolean): void
    {
        this.hideSprite.enabled = !vulnerable;
        this.shownSprite.enabled = vulnerable;
    }
}


