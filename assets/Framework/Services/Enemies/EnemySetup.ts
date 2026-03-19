import { _decorator, Canvas, Component, Prefab } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('EnemySetup')
export class EnemySetup extends Component
{
    @property(Prefab)
    enemies: Prefab = null!; // ✅ correct

    @property(Canvas)
    canvas: Canvas = null!;

    @property
    spacingX: number = 200;
    @property
    spacingY: number = 150;

    @property
    maxHealth: number = 100;

    @property
    amount: number = 12;

    @property
    minEnableTime: number = 1; // min seconds before enabling
    @property
    maxEnableTime: number = 5; // max seconds before enabling
    @property
    minActiveTime: number = 2; // min seconds enemy stays active
    @property
    maxActiveTime: number = 6; // max seconds enemy stays active
}