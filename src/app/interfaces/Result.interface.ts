
export interface Result{
    resultId?: number;
    score: number;
    date: Date;

    user: {
        document: string;
    };
    test: {
        testId: number;
    };
}