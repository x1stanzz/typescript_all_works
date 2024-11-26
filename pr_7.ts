//Створення enum
enum StudentStatus {
    Active, Academic_Leave, Graduated, Expelled
}

enum CourseType {
    Mandatory, Optional, Special
}

enum Semester { 
    First, Second
}

enum Grade {
    Excelellent = 5,
    Good = 4,
    Satisfactory = 3,
    Unsatisfactory = 2
}

enum Faculty {
    Computer_Science, Economics, Law, Engineering
}

//Створення інтерфейсів
interface Student {
    id: number;
    fullName: string;
    faculty: Faculty;
    year: number;
    status: StudentStatus;
    enrollmentDate: Date;
    groupNumber: string;
}

interface Course {
    id: number;
    name: string;
    type: CourseType;
    credits: number;
    semester: Semester;
    faculty: Faculty;
    maxStudents: number;
}

interface StudentGrade {
    studentId: number;
    courseId: number;
    grade: Grade;
    date: Date;
    semester: Semester;
}

//Реалізація класу UniversityManagementSystem
class UniversityManagementSyste {
    private students: Student[] = [];
    private courses: Course[] = [];
    private grades: StudentGrade[] = []
    private studentIdCounter = 1;
    private courseIdCounter= 1;

    //Зарахування студента
    enrollStudent(student: Omit<Student, "id">): Student {
        const newStudent: Student = { id: this.studentIdCounter++, ...student };
        this.students.push(newStudent);
        return newStudent;
    }

    //Реєстрація студента на курс
    registerForCourse(studentId: number, courseId: number): void {
        //Пошук на наявність студента та курсу 
        const student = this.students.find(s => s.id === studentId);
        const course = this.courses.find(c => c.id === courseId);

        //Видаємо помилку при відсутності студента з наведеним ідентифікатором
        if (!student) {
            throw new Error(`Студента з ID ${student} не знайдено.`);
        } 
        //Видаємо помилку при відсутності курсу з наведеним ідентифікатором
        if (!course) {
            throw new Error(`Курс з ID ${courseId} не знайдено.`);
        }
        //Видаємо помилку, якщо наведений студент вже зареєестрований на курс
        if (this.grades.some(g => g.studentId == studentId && g.courseId === courseId)) {
            throw new Error(`Студент з ID ${studentId} вже зареєстрований на курс.`)
        }
        
        //Перевірка курсу на заповненість
        const registeredStudents = this.grades.filter(g => g.courseId === courseId).length;
        if (registeredStudents >= course.maxStudents) {
            throw new Error(`Курс ${course.name} заповнений.`);
        }

        //Додавання запису про курс 
        this.grades.push({
            studentId,
            courseId,
            grade: Grade.Unsatisfactory,
            date: new Date(),
            semester: course.semester
        });
    }

    //Встановлення оцінки студенту
    setGrade(studentId: number, courseId: number, grade: Grade): void {
        //Знаходження студента 
        const gradeEntry = this.grades.find(g => g.studentId === studentId && g.courseId === courseId);

        if (!gradeEntry) {
            throw new Error(`Не знайдено запису про оцінку для студента з ID ${studentId} на курсі ${courseId}.`)
        }

        gradeEntry.grade = grade;
        gradeEntry.date = new Date();
    }

    //Оновлення статусу студента
    updateStudentStatus(studentId: number, newStatus: StudentStatus): void {
        const student = this.students.find(s => s.id === studentId);
        if (!student) {
            throw new Error(`Студента з ID ${studentId} не знайдено.`)
        }
        
        //Перевірка на задовільність оцінок студента для закінчення навчання
        if(newStatus === StudentStatus.Graduated && !this.grades.every(g => g.studentId === studentId && g.grade >= Grade.Satisfactory)) {
            throw new Error(`Студент ${studentId} не можу закінчити навчання, не склавши всі курси.`)
        }

        student.status = newStatus;
    }

    //Отримання студентів за факультетом
    getStudentsByFaculty(faculty: Faculty): Student[] {
        return this.students.filter(s => s.faculty === faculty);
    }

    //Отримання оцінок студента
    getStudentGrades(studentId: number): StudentGrade[] {
        return this.grades.filter(g => g.studentId === studentId);
    }

    //Отримання доступних курсів
    getAvailableCourses(faculty: Faculty, semester: Semester): Course[] {
        return this.courses.filter(c => c.faculty === faculty && c.semester === semester);
    }

    //Обчислення середнього балу студента
    calculateAverageGrade(studentId: number): number {
        //Отримання всіх оцінок студента
        const studentGrades = this.getStudentGrades(studentId);
        
        //Перевірка на наявність оцінок у студента
        if (studentGrades.length === 0) {
            throw new Error(`У студента з ID ${studentGrades} немає оцінок.`);
        }
        
        const totalGrades = studentGrades.reduce((sum, g) => sum + g.grade, 0);
        return totalGrades / studentGrades.length;
    }

    //Отримання списку відмінників за факультетом
    getTopStudentsByFaculty(faculty: Faculty): Student[] {
        //Отримання всіх студентів факультету
        const studentsInFaculty = this.getStudentsByFaculty(faculty);
        //Повернення студентів, у яких усі оцінки Excellent
        return studentsInFaculty.filter(student => {
            const studentGrades = this.getStudentGrades(student.id);
            const allGradesExcellent = studentGrades.every(g => g.grade === Grade.Excelellent);
            return allGradesExcellent;
        })
    }
}


