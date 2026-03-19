export function enemyReducer(state: any, action: any)
{
    switch (action.type)
    {
        case "ENEMY_DAMAGED":
            return {
                ...state,
                enemies: {
                    ...state.enemies,
                    [action.payload.id]: {
                        ...state.enemies[action.payload.id],
                        hp: action.payload.hp
                    }
                }
            };

        default:
            return state;
    }
}