import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PlayerSetup')
export class PlayerSetup extends Component {

    @property
    public damage: number = 100;

}


