import { School } from "./entities";
import { getClassYoungestStudent as getClassYoungestStudentFullName, initializeSchool, printSchool, transferStudent, generateSchool} from "./services";

// const school: School = initializeSchool();

// printSchool(school);
// transferStudent(getClassYoungestStudentFullName(school.classes[0]), school.classes[0], school.classes[1]);
// printSchool(school);
const school: School = generateSchool(3)
printSchool(school);
// console.log("Yongest:")
// console.log(getClassYoungestStudentFullName(school.classes[0]));
transferStudent(getClassYoungestStudentFullName(school.classes[0]), school.classes[0], school.classes[1]);
printSchool(school)

