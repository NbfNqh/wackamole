import { _decorator, Component, Node } from 'cc';
import { EnemySetup } from './EnemySetup';
import { ServiceLocator } from '../Core/ServiceLocator';
const { ccclass, property } = _decorator;

@ccclass('EnemyService')
export class EnemyService extends Component {
    private setup: EnemySetup;

    constructor(setup: EnemySetup)
    {
        super();
        this.setup = setup;

        ServiceLocator.onReady.push(this.startService);
    }

    public startService(): void
    {
        // Create enemies based on the setup
        for (let i = 0; i < this.setup.amount; i++)
        {
            
        }
    }
}


