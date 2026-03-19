import { _decorator, Component, Node, EventMouse, Vec3, UITransform } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('CursorFollower')
export class CursorFollower extends Component
{

    @property(Node)
    cursorNode: Node = null!;

    start()
    {
        this.cursorNode.active = true;

        // Listen on the Canvas node
        const canvas = this.node; // assuming this script is attached to Canvas
        const uiTransform = canvas.getComponent(UITransform)!;

        canvas.on(Node.EventType.MOUSE_MOVE, (event: EventMouse) =>
        {
            const screenPos = event.getLocation(); // Vec2

            // Convert Vec2 → Vec3 for convertToNodeSpaceAR
            const screenPos3 = new Vec3(screenPos.x, screenPos.y, 0);

            const canvasPos = uiTransform.convertToNodeSpaceAR(screenPos3);
            this.cursorNode.setPosition(canvasPos);
        }, this);

        this.cursorNode.setSiblingIndex(this.cursorNode.parent!.children.length - 1);
    }
}