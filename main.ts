import { School } from "./entities";
import * as c from "./constants"
import { getClassYoungestStudent as getClassYoungestStudentFullName, initializeSchool, printSchool, transferStudent } from "./services";

const school: School = initializeSchool();

printSchool(school);
transferStudent(getClassYoungestStudentFullName(school.classes[0]), school.classes[0], school.classes[1]);
printSchool(school);
// console.log("Yongest:")
// console.log(getClassYoungestStudentFullName(school.classes[0]));


