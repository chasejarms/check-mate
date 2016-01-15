//the chessBoard
var chessBoard = [];
var available = [];
var clicked = [];
var whiteKingInCheck = false;
var blackKingInCheck = false;

//keeps track of the ones that were available previously and the one that was previously clicked
var prevAvailable = [];
var prevClicked = [];

function Square(access, pieceObject, squareColor) {
    this.access = access;
    this.pieceObject = pieceObject;
    this.squareColor = squareColor;
}
//creating object constructors
function Pawn(pieceColor) {
    this.pieceColor = pieceColor;
    this.pieceType = 'pawn';
    this.timesMoved = 0;
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
                var rightFunc = giveCorrectListener(pieceObj.pieceType);
                cellDiv.innerHTML = addPiece(pieceObj.pieceColor, pieceObj.pieceType);
                cellDiv.addEventListener('click', rightFunc);
            }
            rowDiv.appendChild(cellDiv);
        }
        border.appendChild(rowDiv);
    }
    boardFrag.appendChild(border);
    document.getElementById('chess-board').appendChild(boardFrag);
}

//assigns the right event listener to each piece
function giveCorrectListener(pieceType) {
    switch (pieceType) {
        case "pawn":
            return pawnOptions;
        case "rook":
            return rookOptions;
        case "knight":
            return knightOptions;
        case "bishop":
            return bishopOptions;
        case "king":
            return kingOptions;
        case "queen":
            return queenOptions;
    }
}

//finds the object in the chessBoard that triggered a particular event
function findAccess(triggerId) {
    for(var x = 0; x < chessBoard.length; x++) {
        var row = chessBoard[x];
        var objInArray = row.filter(function(obj) {
            return obj.access === triggerId;
        })
        if (objInArray.length > 0) {
            return objInArray;
        }

    }
}

//all possible pawn options
function pawnOptions() {
    //adds event listeners back that were taken when another piece was clicked
    if (prevAvailable.length > 0) {
        prevAvailable.forEach(function(obj) {
            var thisEvent = giveCorrectListener(obj.pieceObject.pieceType);
            document.getElementById(obj.access).addEventListener('click', thisEvent);
        })
    }
    //records the click history
    prevClicked = clicked;

    //clears the previous clicked button
    if (clicked.length > 0) {
        clicked = [];
    }

    var object = findAccess(event.target.id)[0];
    clicked.push(object);
    var pieceColor = object.pieceObject.pieceColor;
    if (object.pieceObject.timesMoved === 0) {
        //check the next two pieces
        if (pieceColor === 'black') {
            diagonalCheck(object, 1, 1, "right", "down", object.pieceObject.pieceColor, false, "pawn");
            diagonalCheck(object, 1, 1, "left", "down", object.pieceObject.pieceColor, false, "pawn");
            verticalCheck(object, 2, 1, false, "down", object.pieceObject.pieceColor, false, "pawn");
            updateBoard();
        }
        else {
            diagonalCheck(object, 1, 1, "right", "up", object.pieceObject.pieceColor, false, "pawn");
            diagonalCheck(object, 1, 1, "left", "up", object.pieceObject.pieceColor, false, "pawn");
            verticalCheck(object, 2, 1, false, "up", object.pieceObject.pieceColor, false, "pawn");
            updateBoard();
        }
    }
    else {
        //just check the next piece
        if (pieceColor === 'black') {
            diagonalCheck(object, 1, 1, "right", "down", object.pieceObject.pieceColor, false, "pawn");
            diagonalCheck(object, 1, 1, "left", "down", object.pieceObject.pieceColor, false, "pawn");
            verticalCheck(object, 1, 1, false, "down", object.pieceObject.pieceColor, false, "pawn");
            updateBoard();
        }
        else {
            diagonalCheck(object, 1, 1, "right", "up", object.pieceObject.pieceColor, false, "pawn");
            diagonalCheck(object, 1, 1, "left", "up", object.pieceObject.pieceColor, false, "pawn");
            verticalCheck(object, 1, 1, false, "up", object.pieceObject.pieceColor, false, "pawn");
            updateBoard();
        }
    }
}

//all possible bishop options
function bishopOptions() {
    //adds event listeners back that were taken when another piece was clicked
    if (prevAvailable.length > 0) {
        prevAvailable.forEach(function(obj) {
            var thisEvent = giveCorrectListener(obj.pieceObject.pieceType);
            document.getElementById(obj.access).addEventListener('click', thisEvent);
        })
    }
    //records the click history
    prevClicked = clicked;

    //clears the previous clicked button
    if (clicked.length > 0) {
        clicked = [];
    }
    var object = findAccess(event.target.id)[0];
    clicked.push(object);
    diagonalCheck(object, false, 1, "right", "up", object.pieceObject.pieceColor);
    diagonalCheck(object, false, 1, "right", "down", object.pieceObject.pieceColor);
    diagonalCheck(object, false, 1, "left", "up", object.pieceObject.pieceColor);
    diagonalCheck(object, false, 1, "left", "down", object.pieceObject.pieceColor);
    updateBoard();
}

//all possible rook options
function rookOptions() {
    //adds event listeners back that were taken when another piece was clicked
    if (prevAvailable.length > 0) {
        prevAvailable.forEach(function(obj) {
            var thisEvent = giveCorrectListener(obj.pieceObject.pieceType);
            document.getElementById(obj.access).addEventListener('click', thisEvent);
        })
    }
    //records the click history
    prevClicked = clicked;

    //clears the previous clicked button
    if (clicked.length > 0) {
        clicked = [];
    }

    var object = findAccess(event.target.id)[0];
    clicked.push(object);
    verticalCheck(object, false, 1, false, "up", object.pieceObject.pieceColor);
    verticalCheck(object, false, 1, false, "down", object.pieceObject.pieceColor);
    horizontalCheck(object, false, 1, "right", false, object.pieceObject.pieceColor);
    horizontalCheck(object, false, 1, "left", false, object.pieceObject.pieceColor);
    updateBoard();
}

//all possible king options
function kingOptions() {
    //adds event listeners back that were taken when another piece was clicked
    if (prevAvailable.length > 0) {
        prevAvailable.forEach(function(obj) {
            var thisEvent = giveCorrectListener(obj.pieceObject.pieceType);
            document.getElementById(obj.access).addEventListener('click', thisEvent);
        })
    }
    //records the click history
    prevClicked = clicked;

    //clears the previous clicked button
    if (clicked.length > 0) {
        clicked = [];
    }
    var object = findAccess(event.target.id)[0];
    clicked.push(object);
    verticalCheck(object, 1, 1, false, "up", object.pieceObject.pieceColor);
    verticalCheck(object, 1, 1, false, "down", object.pieceObject.pieceColor);
    horizontalCheck(object, 1, 1, "right", false, object.pieceObject.pieceColor);
    horizontalCheck(object, 1, 1, "left", false, object.pieceObject.pieceColor);
    diagonalCheck(object, 1, 1, "right", "up", object.pieceObject.pieceColor);
    diagonalCheck(object, 1, 1, "right", "down", object.pieceObject.pieceColor);
    diagonalCheck(object, 1, 1, "left", "up", object.pieceObject.pieceColor);
    diagonalCheck(object, 1, 1, "left", "down", object.pieceObject.pieceColor);
    updateBoard();
}

//all possible knight options
function knightOptions() {
    //adds event listeners back that were taken when another piece was clicked
    if (prevAvailable.length > 0) {
        prevAvailable.forEach(function(obj) {
            var thisEvent = giveCorrectListener(obj.pieceObject.pieceType);
            document.getElementById(obj.access).addEventListener('click', thisEvent);
        })
    }
    //records the click history
    prevClicked = clicked;

    //clears the previous clicked button
    if (clicked.length > 0) {
        clicked = [];
    }
    var object = findAccess(event.target.id)[0];
    clicked.push(object);
    lMoveCheck(object, 1, 1, "right", "up", object.pieceObject.pieceColor, "verticalTwo");
    lMoveCheck(object, 1, 1, "right", "up", object.pieceObject.pieceColor, "horizontalTwo");
    lMoveCheck(object, 1, 1, "left", "up", object.pieceObject.pieceColor, "verticalTwo");
    lMoveCheck(object, 1, 1, "left", "up", object.pieceObject.pieceColor, "horizontalTwo");
    lMoveCheck(object, 1, 1, "right", "down", object.pieceObject.pieceColor, "verticalTwo");
    lMoveCheck(object, 1, 1, "right", "down", object.pieceObject.pieceColor, "horizontalTwo");
    lMoveCheck(object, 1, 1, "left", "down", object.pieceObject.pieceColor, "verticalTwo");
    lMoveCheck(object, 1, 1, "left", "down", object.pieceObject.pieceColor, "horizontalTwo");
    updateBoard();
}

//all possible queen options
function queenOptions() {
    //adds event listeners back that were taken when another piece was clicked
    if (prevAvailable.length > 0) {
        prevAvailable.forEach(function(obj) {
            var thisEvent = giveCorrectListener(obj.pieceObject.pieceType);
            document.getElementById(obj.access).addEventListener('click', thisEvent);
        })
    }
    //records the click history
    prevClicked = clicked;

    //clears the previous clicked button
    if (clicked.length > 0) {
        clicked = [];
    }

    var object = findAccess(event.target.id)[0];
    clicked.push(object);
    verticalCheck(object, false, 1, false, "up", object.pieceObject.pieceColor);
    verticalCheck(object, false, 1, false, "down", object.pieceObject.pieceColor);
    horizontalCheck(object, false, 1, "right", false, object.pieceObject.pieceColor);
    horizontalCheck(object, false, 1, "left", false, object.pieceObject.pieceColor);
    diagonalCheck(object, false, 1, "right", "up", object.pieceObject.pieceColor);
    diagonalCheck(object, false, 1, "right", "down", object.pieceObject.pieceColor);
    diagonalCheck(object, false, 1, "left", "up", object.pieceObject.pieceColor);
    diagonalCheck(object, false, 1, "left", "down", object.pieceObject.pieceColor);
    updateBoard();
}

//will check to see if the given square already has a piece
function samePiece(moveablePieceColor, objectInQuestion) {
    if (objectInQuestion.pieceObject === 'none') {
        return "none";
    }
    else if (moveablePieceColor === objectInQuestion.pieceObject.pieceColor) {
        return true;
    }
    else {
        return false;
    }
}

//useful functions created from the check function
var diagonalCheck = check('diagonal');
var verticalCheck = check('vertical');
var horizontalCheck = check('horizontal');
var lMoveCheck = check('l-move');

//checks a direction recursively until a demand is met or a specified number of times is reached
function check(type) {
    return function (startObj, endTimes, timesCalled, rightOrLeft, upOrDown, originalPieceColor, lMove, optionalPiece) {

        //ends the recursive funcion to make this function usable for pawns, bishops, and the queen
        if (endTimes) {
            if (endTimes < timesCalled) {
                return;
            }
        }

        //break up the starting object into a row and a column
        var splitUp = startObj.access.split("");

        //give the row and column and will be adjusted based on the type
        var startRow = parseInt(splitUp[0]);
        var startColumn = parseInt(splitUp[1]);

        //allow us to return the correct function
        if (type === 'diagonal') {
            rightOrLeft === 'right' ? startColumn++ : startColumn--;
            upOrDown === 'up' ? startRow-- : startRow++;
        }
        else if (type === 'vertical') {
            upOrDown === 'up' ? startRow-- : startRow++;
        }
        else if (type === 'horizontal') {
            rightOrLeft === 'right' ? startColumn++ : startColumn--;
        }
        else if (type === 'l-move'){
            if (lMove === 'horizontalTwo') {
                rightOrLeft === 'right' ? startColumn+=2 : startColumn-=2;
                upOrDown === 'up' ? startRow--: startRow++;
            }
            else if (lMove === 'verticalTwo') {
                rightOrLeft === 'right' ? startColumn++ : startColumn--;
                upOrDown === 'up' ? startRow+= 2 : startRow-=2;
            }
        }


        //ensure nothing is off the board
        var exitFunc = startRow < 0 || startRow > 7 ? true : startColumn < 0 || startColumn > 7 ? true : false;
        if (exitFunc) {
            return;
        }

        //gets the object in question from the chessBoard array
        var objectInQuestion = chessBoard[startRow].filter(function(obj) {
            return obj.access === startRow + "" + startColumn;
        })[0];

        //checks to see if its the same piece as the original object's piece, different for pawns (see below)
        if (optionalPiece !== 'pawn') {
            if (samePiece(originalPieceColor, objectInQuestion) === 'none'){
                available.push(objectInQuestion);
            }
            else if (samePiece(originalPieceColor, objectInQuestion)) {
                return;
            }
            else {
                available.push(objectInQuestion);
                return;
            }
        }
        else if (optionalPiece === 'pawn' && type === 'vertical') {
            if (samePiece(originalPieceColor, objectInQuestion) === 'none') {
                available.push(objectInQuestion);
            }
            else {
                return;
            }
        }
        else if (optionalPiece === 'pawn' && type === 'diagonal'){
            if (samePiece(originalPieceColor, objectInQuestion) === false) {
                available.push(objectInQuestion);
            }
            else {
                return;
            }
        }

        //recursively calls this to make it useful for more than just the pawn
        if (type === 'diagonal') {
            diagonalCheck(objectInQuestion, endTimes, timesCalled + 1, rightOrLeft, upOrDown, originalPieceColor);
        }
        else if (type === 'vertical' && optionalPiece === 'pawn') {
            verticalCheck(objectInQuestion, endTimes, timesCalled + 1, rightOrLeft, upOrDown, originalPieceColor, false, 'pawn');
        }
        else if (type === 'vertical') {
            verticalCheck(objectInQuestion, endTimes, timesCalled + 1, rightOrLeft, upOrDown, originalPieceColor);
        }
        else if (type === 'horizontal') {
            horizontalCheck(objectInQuestion, endTimes, timesCalled + 1, rightOrLeft, upOrDown, originalPieceColor);
        }
        else if (type === 'l-move'){
            return;
        }
    }

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

//allows you to move pieces to squares with no piece or an opposite colored piece
function movePiece() {
    console.log(prevAvailable);

    //adds event listeners back that were taken when another piece was clicked
    if (prevAvailable.length > 0) {
        prevAvailable.forEach(function(obj) {
            var thisEvent = giveCorrectListener(obj.pieceObject.pieceType);
            document.getElementById(obj.access).addEventListener('click', thisEvent);
        })
    }


    var targetElemId = event.target.id;
    var targetRow = targetElemId.split("")[0];
    var targetColumn = targetElemId.split("")[1];

    var newContents = clicked[0].pieceObject;
    //adjust the chessBoard array first

    for (var x = 0; x <chessBoard[targetRow].length; x++) {
        if (chessBoard[targetRow][x].access === targetRow + "" + targetColumn) {

            //gets Rid of the old event listener
            var getRidOfMe = chessBoard[targetRow][x].pieceObject === 'none' ? 'none' : chessBoard[targetRow][x].pieceObject.pieceType;

            if (getRidOfMe !== 'none') {
                var eventListenerToRemove = giveCorrectListener(getRidOfMe);
                document.getElementById(targetRow + "" + targetColumn).removeEventListener('click', eventListenerToRemove);
            }

            //places the clicked object in the chessBoard array
            var color = newContents.pieceColor;
            var type = newContents.pieceType;
            newContents.timesMoved === 0 ? newContents.timesMoved++ : 1;
            chessBoard[targetRow][x].pieceObject = newContents;
            //then places it in the document with the necessary event listener
            event.target.innerHTML = (addPiece(color, type));

            //find which event listener to add
            var whichEvent = giveCorrectListener(newContents.pieceType);
            event.target.addEventListener('click', whichEvent)

        }
    }
    var oldAccess = clicked[0].access;
    var oldRow = oldAccess.split("")[0];
    var oldColumn = oldAccess.split("")[1];
    //then gets rid of the innerHTML
    document.getElementById(oldRow + "" + oldColumn).innerHTML = "";
    //and the associated event listener
    document.getElementById(oldRow + '' + oldColumn).removeEventListener('click', whichEvent);
    clicked = [];

    //gets rid of the previous clicked event listener if the piece is no longer there
    var oldObjectBug = prevClicked[0];
    if (document.getElementById(oldObjectBug.access).innerHTML === "") {
        var listener = giveCorrectListener(oldObjectBug.pieceObject.pieceType);
        document.getElementById(oldObjectBug.access).removeEventListener('click', listener);
    }
    //gets rid of the piece object in the chessBoard array
    chessBoard[oldRow][oldColumn].pieceObject = 'none';

    //clear the available
    updateBoard();
    console.log(available);

}

//updates the board on everyclick
function updateBoard () {
    //removes the competing event listeners
    if (prevAvailable.length > 0) {
        prevAvailable.forEach(function(obj) {
            document.getElementById(obj.access).removeEventListener('click', movePiece);
            document.getElementById(obj.access).classList.remove('available');
        });
    }

    //highlights the appropriate cells on the page and adds the necessary event listener
    if (available.length > 0) {
        available.forEach(function(obj) {
            var thisEvent = giveCorrectListener(obj.pieceObject.pieceType);
            document.getElementById(obj.access).removeEventListener('click', thisEvent)
            document.getElementById(obj.access).addEventListener('click', movePiece);
            document.getElementById(obj.access).classList.add('available');
        });
    }

    //important to clear previous event listeners and classes
    prevAvailable = available;

    //cleans the arrays that need to be utilized only on the click
    cleanSlate();
}

//clear the respective array after each click
function cleanSlate() {
    available = [];
}
paintBoard();

//this will check for a king being in check
function checkForCheck() {
    prevAvailable.forEach(function(obj) {
        if (obj.pieceObject.pieceType === 'king') {
            if (obj.pieceObject.pieceColor === 'black') {
                blackKingInCheck = true;
            }
            else {
                whiteKingInCheck = true;
            }
        }
    })
}
//add in turn based logic
