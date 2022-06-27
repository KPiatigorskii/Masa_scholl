import * as _ from "underscore";
import * as falso from "@ngneat/falso"

import { firstNames, Geography, Mathematics, lastNames, professions } from "./constants";
import { getRandomBirthDate, getRandomValueFromArray } from "./helpers";

export interface IPerson {
    firstName: string;
    lastName: string;
    fullName: string;
};

export class Teacher implements IPerson {
    firstName: string;
    lastName: string;
    fullName: string;
    professions: string[];
    constructor(firstName: string, lastName: string, professions: string[]){
        this.firstName = firstName;
        this.lastName = lastName;
        this.fullName = `${this.firstName} ${this.lastName}`;
        this.professions = professions;
        };
};

export class Student implements IPerson {
    firstName: string;
    lastName: string;
    fullName: string;
    birthDate: Date;
    age: number;

    constructor(firstName: string, lastName: string, birthDate: Date){
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthDate = birthDate;
        this.fullName = `${this.firstName} ${this.lastName}`;
        const ageDiffferenceMilliseconds: number = Date.now() - birthDate.getTime();
        const ageDate: Date = new Date(ageDiffferenceMilliseconds);
        this.age =  Math.abs(ageDate.getUTCFullYear() - 1970);
    };
};

export class Classroom {
    name: string;
    teacher: Teacher;
    students: Student[];

    constructor(name: string, teacher: Teacher, students: Student[]){
        this.name = name;
        this.teacher = teacher;
        this.students = students;
    };

    getClassYoungestStudentFullName(): string {
        let studentsArray: Student[] = Object.assign(this.students)
        return studentsArray.sort((currentStudent: Student, nextStudent: Student) => 
            nextStudent.birthDate.getTime() - currentStudent.birthDate.getTime())[0].fullName;
    };

    static transferStudent(fullName: string, fromClassroom: Classroom, toClassrom: Classroom): void {
        const studentsMatchArray: Student[] = fromClassroom.students.filter((student) => student.fullName == fullName)
        if (studentsMatchArray.length > 1){
            console.error(`class have more than one students called ${fullName}`);
        }
        else if (studentsMatchArray.length < 1) {
            console.error(`student "${fullName}" not found`);
        }
        else {
            fromClassroom.students.splice(fromClassroom.students.findIndex(student => student.fullName == fullName),1);
            toClassrom.students.push(studentsMatchArray[0]);
        };
    };
};

export class School {
    name: string;
    address: string;
    phone: string;
    classes: Classroom[];

    constructor(name: string, address: string, phone: string, classes: Classroom[]){
        this.name = name;
        this.address = address;
        this.phone = phone;
        this.classes = classes;
    };

    printSchool(): void {
        let schoolObject: School = Object.assign(this)
        console.log("School data:");
        console.log("============");
        console.log(schoolObject.name);
        console.log(schoolObject.address);
        console.log(schoolObject.phone);
        console.log("Classes:");
        console.log("============");
        schoolObject.classes.sort((currentClass, nextClass) => currentClass.name > nextClass.name ? 1 : -1)   
        for (const [index, classValue] of schoolObject.classes.entries()){
            console.log(`Class ${index+1}: ${classValue.name}`);
            console.log(`Teacher: ${classValue.teacher.fullName} ${classValue.teacher.professions}`);
            classValue.students.sort((currentStudent, nextStudent) => currentStudent.lastName > nextStudent.lastName? 1 : -1)
                .sort((currentStudent, nextStudent) => currentStudent.firstName > nextStudent.firstName? 1 : -1);
            for (const [index, student] of classValue.students.entries()){
                console.log(`${index+1}: ${student.fullName}: ${student.age}`);
            };
            console.log("============"); 
        };
    };

    static generateSchool(numberOfClasses: number) : School {
        const classes : Classroom[] = [];
        for (let index = 0; index < numberOfClasses; index++) {
            let studentCount = _.random(5,8);
            let teacherProfessionsCount = _.random(1,3); //for example 1 teacher can have maximum 3 professions
            let teacherProfessions: string[] = [];
            let shuffleIndexes: number[] = _.shuffle(_.range(0,professions.length-1)) // shuffle all professions for make them unique in array
            for (let index = 0; index < teacherProfessionsCount; index++) {
                teacherProfessions.push(professions[shuffleIndexes[index]])
            }
            let teacher: Teacher = new Teacher(falso.randFirstName(), falso.randLastName(), teacherProfessions);
            let students : Student[] = [];
            for (let index = 0; index < studentCount; index++) {
                students.push(new Student(falso.randFirstName(), falso.randLastName(), getRandomBirthDate()));
            };
            classes.push(new Classroom(teacherProfessions[_.random(teacherProfessions.length-1)], teacher, students));
        };
        return new School(falso.randAmericanFootballTeam(), falso.randCity(), falso.randPhoneNumber(), classes);
    };

    static initializeSchool(): School {
        const student1: Student = new Student(getRandomValueFromArray(firstNames), getRandomValueFromArray(lastNames), getRandomBirthDate());
        const student2: Student = new Student(getRandomValueFromArray(firstNames), getRandomValueFromArray(lastNames), getRandomBirthDate());
        const student3: Student = new Student(getRandomValueFromArray(firstNames), getRandomValueFromArray(lastNames), getRandomBirthDate());
        const student4: Student = new Student(getRandomValueFromArray(firstNames), getRandomValueFromArray(lastNames), getRandomBirthDate());
    
        const teacher1: Teacher = new Teacher(getRandomValueFromArray(firstNames), getRandomValueFromArray(lastNames), [Mathematics]);
    
        const student5: Student = new Student(getRandomValueFromArray(firstNames), getRandomValueFromArray(lastNames), getRandomBirthDate());
        const student6: Student = new Student(getRandomValueFromArray(firstNames), getRandomValueFromArray(lastNames), getRandomBirthDate());
        const student7: Student = new Student(getRandomValueFromArray(firstNames), getRandomValueFromArray(lastNames), getRandomBirthDate());
        const student8: Student = new Student(getRandomValueFromArray(firstNames), getRandomValueFromArray(lastNames), getRandomBirthDate());
    
        const teacher2: Teacher = new Teacher(getRandomValueFromArray(firstNames), getRandomValueFromArray(lastNames), [Geography]);
    
        const mathClass: Classroom = new Classroom("Math", teacher1, [student1, student2, student3, student4]);
        const geographyClass: Classroom = new Classroom("Geography", teacher1, [student5, student6, student7, student8]);
    
        return new School("Big school","Moscow","+7 (916) 000 12 21",[ mathClass, geographyClass ]);
    };
};