import { Test } from "./Test.interface";

export interface Question {
    idQuestion: number;
    contentQuestion: string;
    imageQuestion?: string;
    option1: string;
    option2: string;
    option3: string;
    option4: string;
    correctOption: string;

    selectedOption?: string;
    test?: Test
}