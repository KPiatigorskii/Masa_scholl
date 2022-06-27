import { School } from "./entities";
import { getClassYoungestStudent as getClassYoungestStudentFullName, initializeSchool, printSchool } from "./services";

const school: School = initializeSchool();

printSchool(school);

console.log("Yongest:")
console.log(getClassYoungestStudentFullName(school.classes[0]));