import * as _ from "underscore";

export function getRandomValueFromArray(array: string[]): string {
    return array[Math.floor(Math.random() * array.length)];
};

export function getRandomBirthDate(): Date {
    const year: number = _.random(2011,2014);
    const month: number = _.random(0,11);
    const daysInMonth: number =new  Date(year, month, 0).getDate();
    const day: number = _.random(1,daysInMonth);
    return new Date(year, month, day);
};

export function fullName(firstName: string, lastName: string): string {
    return `${firstName} ${lastName}`;
};
