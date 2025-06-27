import { Test } from "./Test.interface";

export interface Question {
    questionId: number;
    questionContent: string;
    option1: string;
    option2: string;
    option3: string;
    option4: string;
    correctOption: string;

    selectedOption?: string;
    test?: Test
}

export interface NewQuestion {
    questionContent: string;
    option1: string;
    option2: string;
    option3: string;
    option4: string;
    correctOption: string;
    test?: Test | {};
}