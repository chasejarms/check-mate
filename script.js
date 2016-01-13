var chessBoard = [];

function Square(access, pieceObject, squareColor) {
    this.access = access;
    this.pieceObject = pieceObject;
    this.squareColor = squareColor;
}
//creating object constructors
function Pawn(pieceColor) {
    this.pieceColor = pieceColor;
    this.pieceType = 'pawn';
};
function Bishop(pieceColor) {
    this.pieceColor = pieceColor;
    this.pieceType = 'bishop';
};
function Rook(pieceColor) {
    this.pieceColor = pieceColor;
    this.pieceType = 'rook';
};
function Queen(pieceColor) {
    this.pieceColor = pieceColor;
    this.pieceType = 'queen';
};
function King(pieceColor) {
    this.pieceColor = pieceColor;
    this.pieceType = 'king';
};
function Knight(pieceColor) {
    this.pieceColor = pieceColor;
    this.pieceType = 'knight';
}

function createBoard() {
    for (var row = 0; row < 8; row++) {
        var thisRow = [];
        for (var cell = 0; cell < 8; cell++) {
            var color;
            //creates the checker board pattern
            if (isEven(row)) {
                if (isEven(cell)) {
                    color = 'lightGray';
                }
                else {
                    color = 'darkGray';
                }
            }
            else {
                if (isEven(cell)) {
                    color = 'darkGray';
                }
                else {
                    color = 'lightGray'
                }
            }
            //determines which piece object is put into the whichPiece of the square prototype
            var whichPiece;
            //sets up the first row of black pieces
            if (row === 0) {
                if (cell === 0 || cell === 7) {
                    whichPiece = new Rook('black');
                }
                else if (cell === 1 || cell === 6) {
                    whichPiece = new Knight('black');
                }
                else if (cell === 2 || cell === 5) {
                    whichPiece = new Bishop('black');
                }
                else if (cell === 3) {
                    whichPiece = new King('black');
                }
                else {
                    whichPiece = new Queen('black');
                }
            }
            //sets up the first row of white pieces
            else if (row === 7) {
                if (cell === 0 || cell === 7) {
                    whichPiece = new Rook('white');
                }
                else if (cell === 1 || cell === 6) {
                    whichPiece = new Knight('white');
                }
                else if (cell === 2 || cell === 5) {
                    whichPiece = new Bishop('white');
                }
                else if (cell === 3) {
                    whichPiece = new King('white');
                }
                else {
                    whichPiece = new Queen('white');
                }
            }
            //sets up the second row of black pieces
            else if (row === 1) {
                whichPiece = new Pawn("black");
            }
            //sets up the second row of white pieces
            else if (row === 6) {
                whichPiece = new Pawn('white');
            }
            //doesn't have a piece to start
            else {
                whichPiece = "none";
            }
            var thisSquare = new Square(row + "" + cell, whichPiece, color);
            //determine the pieceType
            thisRow.push(thisSquare);
        }
        chessBoard.push(thisRow);
    }
}
createBoard();
function isEven(num) {
    return num % 2 === 0;
}
function paintBoard() {
    var boardFrag = document.createDocumentFragment();
    var boardLength = chessBoard.length;
    var border = document.createElement('DIV');
    for (var x = 0; x < boardLength; x++) {
        var rowDiv = document.createElement('DIV');
        rowDiv.classList.add('row');
        var rowArray = chessBoard[x];
        var rowLength = rowArray.length;
        for (var i = 0; i < rowLength; i++) {
            var cellDiv = document.createElement('DIV');
            var pieceObj = rowArray[i]['pieceObject'];
            cellDiv.classList.add(rowArray[i].squareColor);
            cellDiv.id = rowArray[i].access;
            if (pieceObj !== "none") {
                cellDiv.innerHTML = addPiece(pieceObj.pieceColor, pieceObj.pieceType);
            }
            rowDiv.appendChild(cellDiv);
        }
        border.appendChild(rowDiv);
    }
    boardFrag.appendChild(border);
    document.getElementById('chess-board').appendChild(boardFrag);
}

function addPiece(pieceColor, pieceType) {
    if (pieceType === "none") {
        return;
    }
    if (pieceColor === 'white') {
        switch (pieceType) {
            case 'pawn':
                return String.fromCharCode(parseInt(2659, 16));
                break;
            case 'knight':
                return String.fromCharCode(parseInt(2658, 16));
                break;
            case 'bishop':
                return String.fromCharCode(parseInt(2657, 16));
                break;
            case 'rook':
                return String.fromCharCode(parseInt(2656, 16));
                break;
            case 'queen':
                return String.fromCharCode(parseInt(2655, 16));
                break;
            case 'king':
                return String.fromCharCode(parseInt(2654, 16));
                break;
            default:
                break;
        }
    }
    else if (pieceColor === 'black') {
        switch (pieceType) {
            case 'pawn':
                return String.fromCharCode(parseInt(9823, 10));
                break;
            case 'knight':
                return String.fromCharCode(parseInt(9822, 10));
                break;
            case 'bishop':
                return String.fromCharCode(parseInt(9821, 10));
                break;
            case 'rook':
                return String.fromCharCode(parseInt(9820, 10));
                break;
            case 'queen':
                return String.fromCharCode(parseInt(9819, 10));
                break;
            case 'king':
                return String.fromCharCode(parseInt(9818, 10));
                break;
            default:
                break;
        }
    }
}
paintBoard();

// function List() {};
// List.prototype.size = 0;
// List.prototype.add = function(el) {
//     this[this.size] = el;
//     this.size++;
// };
// List.prototype.remove = function(index) {
//     for (var x = 0; x < this.size; x++) {
//         if (this[x] === index) {
//             delete this[x];
//             this.size--;
//             return;
//         }
//     }
// }
// List.prototype.reverse = function() {
//     for (var i = 0; i < Math.floor(this.size/2); i++) {
//         var temp = this[i];
//         this[i] = this[this.size - i - 1];
//         this[this.size - i - 1] = temp;
//     }
// }
// var myList = new List();
//
// function People(age, weight, career) {
//     this.age = age;
//     this.weight = weight;
//     this.career = career;
// }
//
// People.prototype.marry = function(person) {
//     person ? console.log("You married " + person) : console.log("Well get married then!");
// }
//
// function MormonPeople(age, weight, career, active, sealed) {
//     People.call(this, age, weight, career);
//     this.active = active;
//     this.sealed = sealed;
// }
//
// MormonPeople.prototype.templeMarry = function(Boolean) {
//     this.templeMarriage = Boolean;
//     People.prototype.marry.call(this, "a beatiful girl");
// }
