import { Test } from "./Test.interface";
import { User } from "./User.interface";

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