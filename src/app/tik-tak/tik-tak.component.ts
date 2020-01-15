import { Component, ElementRef, ViewChildren, QueryList } from '@angular/core';

@Component({
    selector: 'app-tik-tak',
    templateUrl: './tik-tak.component.html',
    styleUrls: ['./tik-tak.component.scss']
})

export class TikTakComponent {

    private sizeOfBoard = 9;
    private sizeOfLine = 3;

    @ViewChildren('cell', { read: ElementRef }) cellList: QueryList<ElementRef>;

    public boardSize = new Array(this.sizeOfBoard);
    public player: string;
    public showResult: string;
    private moveByX: number[];
    private moveByY: number[];
    private moveCount: number;
    private winnerArray: number[];
    private winnerResults = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    constructor() {
        this.initVariable();
    }

    public getClassActive(i: number): string {
        if (this.winnerArray.indexOf(i) > -1) {
            return `active${this.player}`;
        }
    }

    public move(i: number, event: HTMLElement): void {
        if (!event.innerText) {
            event.innerText = this.player;
            this.player === 'x' ? this.moveByX.push(i) : this.moveByY.push(i);
            this.moveCount++;
            if (!(this.moveCount === 9) && (this.moveByX.length >= this.sizeOfLine || this.moveByY.length >= this.sizeOfLine)) {
                this.player === 'x' ? this.checkWinner(this.moveByX) : this.checkWinner(this.moveByY);
                if (this.winnerArray.length) {
                    this.showResult = `Победитель игрок ${this.player}`;
                }
            }
            if (this.moveCount === this.sizeOfBoard) {
                this.showResult = 'Ничья!';
            }
            if (!this.showResult) {
                this.player = this.player === 'x' ? 'o' : 'x';
            }
        }
    }

    public clear(): void {
        this.cellList.forEach(item => item.nativeElement.innerText = '');
        this.initVariable();
    }

    private initVariable(): void {
        this.player = 'x';
        this.showResult = '';
        this.moveByX = [];
        this.moveByY = [];
        this.moveCount = 0;
        this.winnerArray = [];
    }

    private checkWinner(checkArray: number[]): boolean {
        if (checkArray.length >= this.sizeOfLine) {
            this.winnerArray = this.winnerResults.find(item => !item.some(elem => checkArray.indexOf(elem) === -1)) || [];
            if (this.winnerArray.length) {
                return true;
            }
        }
    }
}
