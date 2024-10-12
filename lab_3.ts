export type DayOfWeek = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday';

export type TimeSlot = '8:30-10:00' | '10:15-11:45' | '12:15-13:45' | '14:00-15:30' | '15:45-17:00';

export type CourseType = 'Lecture' | 'Seminar' | 'Lab' | 'Practice';

export type Professor = {
	id: number;
	name: string;
	department: string;
};

export type Classroom = {
	number: string;
	capacity: number;
	hasProjector: boolean;
};

export type Course = {
	id: number;
	name: string;
	type: CourseType;
};

export type Lesson = {
	courseId: number;
	professorId: number;
	classroomNumber: string;
	dayOfWeek: DayOfWeek;
	timeSlot: TimeSlot;
};

export const professors: Professor[] = [];
export const classrooms: Classroom[] = [];
export const courses: Course[] = [];
export const schedule: Lesson[] = [];

export function addProfessor(professor: Professor): void {
	// Перевірка на наявність професора з таким же id
	if (professors.some((p) => p.id === professor.id)) {
		console.error(`Professor with id ${professor.id} already exists.`);
		return;
	}
	professors.push(professor);
}

export function addLesson(lesson: Lesson): boolean {
	//Перевірка на наявність заняття в обраний час
	const conflict = schedule.some(
		(l) =>
			l.classroomNumber === lesson.classroomNumber &&
			l.dayOfWeek === lesson.dayOfWeek &&
			l.timeSlot === lesson.timeSlot,
	);

	if (!conflict) {
		schedule.push(lesson);
		return true;
	}

	return false;
}

export function findAvailableClassrooms(timeSlot: TimeSlot, dayOfWeek: DayOfWeek): string[] {
	//Пошук зайнятих аудиторій в обраний час
	const occupiedClassrooms = schedule
		.filter((lesson) => lesson.timeSlot === timeSlot && lesson.dayOfWeek === dayOfWeek)
		.map((lesson) => lesson.classroomNumber);

	return classrooms
		.filter((classroom) => !occupiedClassrooms.includes(classroom.number))
		.map((classroom) => classroom.number);
}

export function getProfessorSchedule(professorId: number): Lesson[] {
	return schedule.filter((lesson) => lesson.professorId === professorId);
}

export type ScheduleConflict = {
	type: 'ProfessorConflict' | 'ClassroomConflict';
	lessonDetails: Lesson;
};

export function validateLesson(lesson: Lesson): ScheduleConflict | null {
	// Перевірка на конфлікт професора
	const professorConflict = schedule.find(
		(l) => l.professorId === lesson.professorId && l.dayOfWeek === lesson.dayOfWeek && l.timeSlot === lesson.timeSlot,
	);

	if (professorConflict) {
		return {
			type: 'ProfessorConflict',
			lessonDetails: professorConflict,
		};
	}

	// Перевірка на конфлікт аудиторії
	const classroomConflict = schedule.find(
		(l) =>
			l.classroomNumber === lesson.classroomNumber && l.dayOfWeek == lesson.dayOfWeek && l.timeSlot === lesson.timeSlot,
	);

	if (classroomConflict) {
		return {
			type: 'ClassroomConflict',
			lessonDetails: classroomConflict,
		};
	}

	return null;
}

export function getClassroomUtilization(classroomNumber: string): number {
	const totalSlots = 5 * 5; // 5 робочих днів по 5 часових слотів
	const occupiedSlots = schedule.filter((lesson) => lesson.classroomNumber == classroomNumber).length;

	return (occupiedSlots / totalSlots) * 100;
}

export function getMostPopularCourseType(): CourseType {
	// Об'єкт для підрахунку типів курсів
	const typeCounts: Record<CourseType, number> = {
		Lecture: 0,
		Seminar: 0,
		Lab: 0,
		Practice: 0,
	};

	// Проходимось по масиву schedule для підрахунку кількості курсів кожного типу
	schedule.forEach((lesson) => {
		const course = courses.find((course) => course.id === lesson.courseId);
		if (course) {
			typeCounts[course.type]++; // Збільшуємо лічильнк для знайденого типу курсу
		}
	});

	// Визначення типу курсу з максимальною кількістю
	return Object.keys(typeCounts).reduce((a, b) =>
		//Порівняння лічильників типів курсів
		typeCounts[a as CourseType] > typeCounts[b as CourseType] ? a : b,
	) as CourseType;
}

export function reassingClassroom(lessonId: number, newClassroomNumber: string): boolean {
	// Пошук заняття за ідентифікатором
	const lessonIndex = schedule.findIndex((lesson) => lesson.courseId === lessonId);

	if (lessonIndex === -1) {
		return false;
	}

	const lesson = schedule[lessonIndex];

	// Перевірка на конфлікти
	const conflict = schedule.some(
		(existingLesson) =>
			existingLesson.classroomNumber === newClassroomNumber &&
			existingLesson.dayOfWeek === lesson.dayOfWeek &&
			existingLesson.timeSlot === lesson.timeSlot,
	);

	if (!conflict) {
		schedule[lessonIndex].classroomNumber = newClassroomNumber;
		return true;
	}

	return false;
}

export function cancelLesson(lessonId: number): void {
	const lessonIndex = schedule.findIndex((lesson) => lesson.courseId === lessonId);

	if (lessonIndex === -1) {
		console.error(`Lesson with id ${lessonId} was not found.`);
		return;
	}
	schedule.splice(lessonIndex, 1);
}
