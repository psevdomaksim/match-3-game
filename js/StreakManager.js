

class StreakManager {
    constructor(board) {
        this.board = board;
    }

    getMatches() {
        let result = [];

        this.board.fields.forEach(checkingField => {
            config.streakRules.forEach(rule => {
                let matches = [checkingField.tile];

                rule.forEach(position => {
                    const row = checkingField.row + position.row;
                    const col = checkingField.col + position.col;
                    const comparingField = this.board.getField(row, col);
                    if (comparingField && comparingField.tile.type === checkingField.tile.type) {
                        matches.push(comparingField.tile);
                    }
                });

                if (matches.length === rule.length + 1) {
                    result.push(matches);
                }
            });
        });

        return result;
    }
}