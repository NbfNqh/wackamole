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

    private vulnerable : boolean;

    start() {
        this.setState(false);
    }

    public toggleState(): void
    {
        this.vulnerable = !this.vulnerable;
        this.setState(this.vulnerable);
    }

    public setState(vulnerable: boolean): void
    {
        this.hideSprite.enabled = !vulnerable;
        this.shownSprite.enabled = vulnerable;

        this.vulnerable = vulnerable;
    }

    update(deltaTime: number) {
        
    }
}

