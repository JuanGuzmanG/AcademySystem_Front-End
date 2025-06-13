import { Test } from "./test.interface";
import { User } from "./user.interface";

export interface Result{
    idResult: number;
    score: number;
    date: string | Date;

    user: User;
    test: Test;
}