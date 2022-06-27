import * as _ from "underscore";

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
        return this.students.sort((student, next_student) => 
            student.birthDate < next_student.birthDate? -1 : 1)[0].fullName;
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
    }

    printSchool(school: School): void {
        console.log("School data:");
        console.log("============");
        console.log(school.name);
        console.log(school.address);
        console.log(school.phone);
        console.log("Classes:");
        console.log("============");   
        for (const [index, classValue] of school.classes.entries()){
            console.log(`Class ${index}: ${classValue.name}`);
            console.log(`Teacher: ${classValue.teacher.fullName}`);
            classValue.students.sort((student, next_student) => student.lastName > next_student.lastName? -1 : 1)
                .sort((student, next_student) => student.firstName > next_student.firstName? -1 : 1);
            for (const [index, student] of classValue.students.entries()){
                console.log(`${index}: ${student.fullName}: ${student.age}`);
            };
            console.log("============"); 
        };
    };

    static generateSchool(numberOfClasses: number) : School {
        const classes : Classroom[] = [];
        for (let index = 0; index < numberOfClasses; index++) {
            let studentCount = _.random(1,5);
            let teacherProfessionsCount = _.random(1,3); //for example 1 teacher can have maximum 3 professions
            let teacherProfessions: string[] = [];
            for (let index = 0; index < teacherProfessionsCount; index++) {
                teacherProfessions.push(professions[_.random(professions.length-1)])
            }
            let teacher: Teacher = new Teacher(getRandomValueFromArray(firstNames), getRandomValueFromArray(lastNames), teacherProfessions);
            let students : Student[] = [];
            for (let index = 0; index < studentCount; index++) {
                students.push(new Student(getRandomValueFromArray(firstNames), getRandomValueFromArray(lastNames), getRandomBirthDate()))
            };
            classes.push(new Classroom(teacherProfessions[_.random(teacherProfessions.length-1)], teacher, students));
        };
        return new School("Big school", "Moscow", "+7 (916) 000 12 21", classes);
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
    }
};