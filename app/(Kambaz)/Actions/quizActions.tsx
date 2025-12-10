"use server";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";

/**
 * Fetch all quizzes for a course
 */
export async function fetchQuizzesForCourse(courseId: string) {
    try {
        const response = await fetch(`${BACKEND_URL}/api/courses/${courseId}/quizzes`);
        if (!response.ok) {
            throw new Error("Failed to fetch quizzes");
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching quizzes:", error);
        throw error;
    }
}

/**
 * Fetch a quiz by its ID (includes embedded questions)
 */
export async function fetchQuizById(quizId: string) {
    try {
        const response = await fetch(`${BACKEND_URL}/api/quizzes/${quizId}`);
        if (!response.ok) {
            throw new Error("Failed to fetch quiz");
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching quiz:", error);
        throw error;
    }
}

/**
 * Create a new quiz
 */
export async function createQuiz(courseId: string, quizData: any) {
    try {
        const response = await fetch(`${BACKEND_URL}/api/courses/${courseId}/quizzes`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(quizData),
        });
        if (!response.ok) {
            throw new Error("Failed to create quiz");
        }
        return await response.json();
    } catch (error) {
        console.error("Error creating quiz:", error);
        throw error;
    }
}

/**
 * Update a quiz
 */
export async function updateQuiz(quizId: string, quizData: any) {
    try {
        const response = await fetch(`${BACKEND_URL}/api/quizzes/${quizId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(quizData),
        });
        if (!response.ok) {
            throw new Error("Failed to update quiz");
        }
        return await response.json();
    } catch (error) {
        console.error("Error updating quiz:", error);
        throw error;
    }
}

/**
 * Delete a quiz
 */
export async function deleteQuiz(quizId: string) {
    try {
        const response = await fetch(`${BACKEND_URL}/api/quizzes/${quizId}`, {
            method: "DELETE",
        });
        if (!response.ok) {
            throw new Error("Failed to delete quiz");
        }
        return await response.json();
    } catch (error) {
        console.error("Error deleting quiz:", error);
        throw error;
    }
}