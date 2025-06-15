export interface Rol {
    idRol: number;
    nameRol: string;
}

export interface User {
    document: string;
    username?: string;
    password?: string;
    firstName: string;
    middleName?: string;
    lastName: string;
    secondLastName?: string;
    birthDate: string | Date;
    email: string;
    countryBirth: string;
    phoneNumber: number;
    gender: string;
    bloodType?: string;
    photo?: string;
    documentType: string;
    rols?: Rol[];
}