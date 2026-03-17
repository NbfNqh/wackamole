import { _decorator, Component, Node } from 'cc';
import { PlayerSetup } from './PlayerSetup';
import { ServiceLocator } from '../Core/ServiceLocator';
const { ccclass, property } = _decorator;

@ccclass('PlayerService')
export class PlayerService extends Component {
    private setup: PlayerSetup;

    constructor(setup: PlayerSetup)
    {
        super();
        this.setup = setup;
        ServiceLocator.onReady.push(this.startService);
    }

    public startService(): void
    {

    }
}


