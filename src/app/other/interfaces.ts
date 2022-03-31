export type pieza = {
    col:string;
    fil:string;
    img:string;
    color:number; //-1 negras; 0 muertas; 1 blancas

}

export const initialGame: {[index:string]: string} = {
    'a8': 'black_rook',
    'b8': 'black_knight',
    'c8': 'black_bishop',
    'd8': 'black_queen',
    'e8': 'black_king',
    'f8': 'black_bishop',
    'g8': 'black_knight',
    'h8': 'black_rook',
    'a7': 'black_pawn',
    'b7': 'black_pawn',
    'c7': 'black_pawn',
    'd7': 'black_pawn',
    'e7': 'black_pawn',
    'f7': 'black_pawn',
    'g7': 'black_pawn',
    'h7': 'black_pawn',
    
    'a1': 'white_rook',
    'b1': 'white_knight',
    'c1': 'white_bishop',
    'd1': 'white_queen',
    'e1': 'white_king',
    'f1': 'white_bishop',
    'g1': 'white_knight',
    'h1': 'white_rook',
    'a2': 'white_pawn',
    'b2': 'white_pawn',
    'c2': 'white_pawn',
    'd2': 'white_pawn',
    'e2': 'white_pawn',
    'f2': 'white_pawn',
    'g2': 'white_pawn',
    'h2': 'white_pawn',
}

export const alphPosIn = {
    'a': '1',
    'b': '2',
    'c': '3',
    'd': '4',
    'e': '5',
    'f': '6',
    'g': '7',
    'h': '8',
}

export const alphPosOut = {
    1: 'a',
    2: 'b',
    3: 'c',
    4: 'd',
    5: 'e',
    6: 'f',
    7: 'g',
    8: 'h',
}


//Opcion A: piezas con caracteres
export const piecesImages: {[index:string]: string} = {
    'white_pawn': '♙',
    'white_rook': '♖',
    'white_knight': '♘',
    'white_bishop': '♗',
    'white_king': '♔',
    'white_queen': '♕',
    'black_pawn': '♟',
    'black_rook': '♜',
    'black_knight': '♞',
    'black_bishop': '♝',
    'black_king': '♚',
    'black_queen': '♛',
}

//Opcion B: piezas con imagenes (no funciona por la ruta)
/*export const piecesImages: {[index:string]: string} = {
    'white_pawn': '/img/WhitePawn.png',
    'white_rook': './img/WhiteRook.png',
    'white_knight': './img/WhiteKnight.png',
    'white_bishop': './img/WhiteBishop.png',
    'white_king': './img/WhiteKing.png',
    'white_queen': './img/WhiteQueen.png',
    'black_pawn': './img/BlackPawn.png',
    'black_rook': './img/BlackRook.png',
    'black_knight': './img/BlackKnight.png',
    'black_bishop': './img/BlackBishop.png',
    'black_king': './img/BlackKing.png',
    'black_queen': './img/BlackQueen.png',
}

*/

export type pieceInfo = {
    white: boolean; //1 blanca, 0 negra
    text: string;
    img: string;
};

export const piecesInfo:  {[index:string]: pieceInfo} = {
    'white_pawn': {white: true, text:'♙', img:"./assets/ajedrez/peon_blanco.png"},
    'white_rook': {white: true, text:'♖', img:"./assets/ajedrez/torre_blanca.png"},
    'white_knight': {white: true, text:'♘', img:"./assets/ajedrez/caballo_blanco.png"},
    'white_bishop': {white: true, text:'♗', img:"./assets/ajedrez/alfil_blanco.png"},
    'white_king': {white: true, text:'♔', img:"./assets/ajedrez/rey_blanco.png"},
    'white_queen': {white: true, text:'♕', img:"./assets/ajedrez/reina_blanca.png"},
    'black_pawn': {white: false, text:'♟', img:"./assets/ajedrez/peon_negro.png"},
    'black_rook': {white: false, text:'♜', img:"./assets/ajedrez/torre_negra.png"},
    'black_knight': {white: false, text:'♞', img:"./assets/ajedrez/caballo_negro.png"},
    'black_bishop': {white: false, text:'♝', img:"./assets/ajedrez/alfil_negro.png"},
    'black_king': {white: false, text:'♚', img:"./assets/ajedrez/rey_negro.png"},
    'black_queen': {white: false, text:'♛', img:"./assets/ajedrez/reina_negra.png"},
};

export type friend = {
    name:string;
    points:number;
    img:string;
}

export type user = {
    name:string;
    points:number;
    img:string;
    coins:number;
    friendList: friend[];
}