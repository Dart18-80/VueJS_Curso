export interface Client {
    address:  string;
    age:      number;
    company:  string;
    email:    string;
    eyeColor: string;
    gender:   Gender;
    id:       number;
    isActive: boolean;
    name:     string;
    phone:    string;
    picture:  string;
}

export enum Gender {
    Female = "female",
    Male = "male",
}