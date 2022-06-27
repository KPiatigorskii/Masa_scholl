import * as _ from "underscore";
import * as faker from "@faker-js/faker/locale/en_US"

import { firstNames, lastNames } from "./constants";
import { Faker } from "@faker-js/faker";

export function getRandomValueFromArray(array: string[]): string {
    return array[Math.floor(Math.random() * array.length)];
}

export function getRandomBirthDate(): Date {
    const year: number = _.random(2011,2014);
    const month: number = _.random(1,12);
    const daysInMonth: number =new  Date(year, month, 0).getDate(); // get count of current choose month
    const day: number = _.random(1,daysInMonth)
    return new Date(year, month, day);
}

export function fullName(firstName: string, lastName: string): string {
    return `${firstName} ${lastName}`
}