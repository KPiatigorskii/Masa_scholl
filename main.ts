import { School, Classroom } from "./entities";

//const school: School = School.initializeSchool();
const school: School = School.generateSchool(3);
school.printSchool(school);
console.log(school.classes[0].getClassYoungestStudentFullName());
Classroom.transferStudent(school.classes[0].getClassYoungestStudentFullName(), school.classes[1], school.classes[0]);
school.printSchool(school);

