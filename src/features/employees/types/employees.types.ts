export interface Employee {

    id: string, // it seems that they are actually numbers but encoded as strings, might look into conversion later
    firstName: string,
    lastName: string,
    avatar: string,
    registrationNumber: number,
    email: string,
    dateOfBirth: string, // date parsing?
    gender: 'male' | 'female',
    jobTitle: string,
    departement: string,
    createdAt: string,

}
