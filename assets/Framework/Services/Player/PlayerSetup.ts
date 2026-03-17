import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PlayerSetup')
export class PlayerSetup extends Component {

    @property
    damage: number = 100;

}


