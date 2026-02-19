export interface Employee {

    id: string, // it seems that they are actually numbers but encoded as strings, might look into conversion later
    firstName: string,
    lastName: string,
    avatar: string,
    registratonNumber: number, // typo in the api registratonNumber, took me a while to find it xD
    email: string,
    dateOfBirth: string,
    gender: 'male' | 'female',
    jobTitle: string,
    department: string,
    createdAt: string,

}
