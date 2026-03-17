import { _decorator, Component, Node, Prefab } from 'cc';
import { Enemy } from './Enemy';
const { ccclass, property } = _decorator;

@ccclass('EnemySetup')
export class EnemySetup extends Component
{
    @property(Enemy)
    enemies: Prefab;

    @property
    maxHealth: number = 100;

    @property
    amount: number = 12;
}


