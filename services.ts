// Ideas:
// Build dynamically created classmates: collection of first names, collection of lastnames, randomly pick birth date

import { firstNames, Geography, lastNames, Mathematics } from "./constants";
import { Classroom, School, Student, Teacher } from "./entities";
import { getRandomBirthDate, getRandomValueFromArray, fullName } from "./helpers";

export function initializeSchool(): School {
    const student1: Student = createStudent(getRandomValueFromArray(firstNames), getRandomValueFromArray(lastNames), getRandomBirthDate());
    const student2: Student = createStudent(getRandomValueFromArray(firstNames), getRandomValueFromArray(lastNames), getRandomBirthDate());
    const student3: Student = createStudent(getRandomValueFromArray(firstNames), getRandomValueFromArray(lastNames), getRandomBirthDate());
    const student4: Student = createStudent(getRandomValueFromArray(firstNames), getRandomValueFromArray(lastNames), getRandomBirthDate());

    const teacher1: Teacher = createTeacher(getRandomValueFromArray(firstNames), getRandomValueFromArray(lastNames), [Mathematics]);

    const student5: Student = createStudent(getRandomValueFromArray(firstNames), getRandomValueFromArray(lastNames), getRandomBirthDate());
    const student6: Student = createStudent(getRandomValueFromArray(firstNames), getRandomValueFromArray(lastNames), getRandomBirthDate());
    const student7: Student = createStudent(getRandomValueFromArray(firstNames), getRandomValueFromArray(lastNames), getRandomBirthDate());
    const student8: Student = createStudent(getRandomValueFromArray(firstNames), getRandomValueFromArray(lastNames), getRandomBirthDate());

    const teacher2: Teacher = createTeacher(getRandomValueFromArray(firstNames), getRandomValueFromArray(lastNames), [Geography]);

    const mathClass: Classroom = createClassroom("Math", teacher1, [student1, student2, student3, student4]);
    const geographyClass: Classroom = createClassroom("Geography", teacher1, [student5, student6, student7, student8]);

    return {
        name: "Big school",
        address: "Moscow",
        phone: "+7 (916) 000 12 21",
        classes: [
            mathClass,
            geographyClass
        ]
    }
}

function createTeacher(firstName: string, lastName: string, professions: string[]): Teacher {
    return {
        firstName: firstName,
        lastName: lastName,
        professions: professions,
        fullName: () => `${firstName} ${lastName}`
    };
}

function createStudent(firstName: string, lastName: string, birthDate: Date): Student {
    return {
        firstName: firstName,
        lastName: lastName,
        birthDate: birthDate,
        age: () =>{
            const ageDiffferenceMilliseconds: number = Date.now() - birthDate.getTime();
            const ageDate: Date = new Date(ageDiffferenceMilliseconds)
            return Math.abs(ageDate.getUTCFullYear() - 1970)
        },
        fullName: () => {
            return `${firstName} ${lastName}`
        }
    };
}

function createClassroom(name: string, teacher: Teacher, students: Student[]): Classroom {
    return {
        name: name,
        teacher: teacher, 
        students: students
    };
}

export function getClassYoungestStudent(classroom: Classroom) {
    return classroom.students.sort((student, next_student) => 
        student.birthDate < next_student.birthDate? -1 : 1)[0];
}

export function printSchool(school: School): void {
    console.log("School data:");
    console.log("============");
    console.log(school.name);
    console.log(school.address);
    console.log(school.phone);
    console.log("Classes:");
    console.log("============");   
    for (const [index, classValue] of school.classes.entries()){
        console.log(`Class ${index}: ${classValue.name}`);
        console.log(`Teacher: ${classValue.teacher.fullName()}`);
        for (const [index, student] of classValue.students.entries()){
            console.log(`${index}: ${student.fullName()}: ${student.age()} : ${student.birthDate}`)
        }
        console.log("============"); 
    };

}