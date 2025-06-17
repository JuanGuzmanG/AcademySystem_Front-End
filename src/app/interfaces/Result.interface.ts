
export interface Result{
    idResult?: number;
    score: number;
    date: Date;

    user: {
        document: string;
    };
    test: {
        idTest: number;
    };
}