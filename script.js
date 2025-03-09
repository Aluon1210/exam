// Bảng Sudoku ban đầu
const initialData = [
    [6, 1, 3, 5, 4, 9, 8, 2, 7],
    [9, 8, 4, 6, 7, 2, 5, 3, 1],
    [2, 5, 7, 8, 3, 1, 6, 4, 9],
    [8, 3, 2, 1, 5, 7, 4, 9, 6],
    [7, 4, 5, 3, 9, 6, 2, 1, 8],
    [1, 9, 6, 2, 8, 4, 7, 5, 3],
    [3, 7, 8, 4, 1, 5, 9, 6, 2],
    [4, 2, 9, 7, 6, 3, 1, 8, 5],
    [5, 6, 1, 9, 2, 8, 3, 7, 4]
];

let board = [];
let difficulty = 20; // Mặc định xóa 20 ô

// Hàm khởi tạo trò chơi
function startGame() {
    difficulty = parseInt(document.getElementById('difficulty').value);
    board = JSON.parse(JSON.stringify(initialData)); // sao chép dữ liệu ban đầu
    removeCells(difficulty);
    renderBoard();
    document.getElementById('game-message').textContent = '';
}

// Hàm xóa các ô ngẫu nhiên
function removeCells(num) {
    let removed = 0;
    while (removed < num) {
        let row = Math.floor(Math.random() * 9);
        let col = Math.floor(Math.random() * 9);
        if (board[row][col] !== 0) {
            board[row][col] = 0;
            removed++;
        }
    }
}

// Hàm kiểm tra nếu game đã hoàn thành
function isGameOver() {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (board[i][j] === 0) return false;
        }
    }
    return true;
}

// Hàm render bảng Sudoku
function renderBoard() {
    const boardDiv = document.getElementById('sudoku-board');
    boardDiv.innerHTML = ''; // Xóa bảng hiện tại

    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            const cell = document.createElement('div');
            cell.classList.add('sudoku-cell');
            if (board[i][j] !== 0) {
                cell.textContent = board[i][j];
            } else {
                const input = document.createElement('input');
                input.type = 'number';
                input.max = '9';
                input.min = '1';
                input.addEventListener('input', (e) => handleInput(i, j, e.target.value));
                cell.appendChild(input);
            }
            boardDiv.appendChild(cell);
        }
    }
}

// Hàm xử lý nhập liệu của người chơi
function handleInput(row, col, value) {
    const num = parseInt(value);
    if (num >= 1 && num <= 9 && isValid(row, col, num)) {
        board[row][col] = num;
    } else {
        board[row][col] = 0;
    }

    // Cập nhật lại bảng
    renderBoard();

    // Kiểm tra nếu game hoàn thành
    if (isGameOver()) {
        document.getElementById('game-message').textContent = 'Chúc mừng bạn đã hoàn thành Sudoku!';
    }
}

// Kiểm tra số nhập vào có hợp lệ không
function isValid(row, col, num) {
    // Kiểm tra hàng
    for (let j = 0; j < 9; j++) {
        if (board[row][j] === num) return false;
    }

    // Kiểm tra cột
    for (let i = 0; i < 9; i++) {
        if (board[i][col] === num) return false;
    }

    // Kiểm tra ô 3x3
    let startRow = Math.floor(row / 3) * 3;
    let startCol = Math.floor(col / 3) * 3;
    for (let i = startRow; i < startRow + 3; i++) {
        for (let j = startCol; j < startCol + 3; j++) {
            if (board[i][j] === num) return false;
        }
    }

    return true;
}

// Khởi tạo trò chơi khi mở trang
startGame();
