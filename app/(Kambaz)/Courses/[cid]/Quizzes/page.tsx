"use client";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useAuth } from "../../../Account/useAuth";
import * as client from "./client";
import QuizControls from "./QuizControls";
import QuizListItem from "./QuizListItem";

export default function QuizzesPage() {
  const { cid } = useParams();
  const { canEditCourse, isStudent } = useAuth();
  const [quizzes, setQuizzes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    loadQuizzes();
  }, [cid]);

  const loadQuizzes = async () => {
    try {
      const data = await client.findQuizzesForCourse(cid as string);
      setQuizzes(data);
    } catch (error) {
      console.error("Failed to load quizzes:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleQuizCreated = (newQuiz: any) => {
    setQuizzes([...quizzes, newQuiz]);
  };

  const handleDeleteQuiz = async (quizId: string) => {
    try {
      await client.deleteQuiz(quizId);
      setQuizzes(quizzes.filter(q => q._id !== quizId));
    } catch (error) {
      console.error("Failed to delete quiz:", error);
      alert("Failed to delete quiz");
    }
  };

  const handlePublishToggle = async (quizId: string, published: boolean) => {
    try {
      await client.updateQuiz(quizId, { published });
      setQuizzes(quizzes.map(q => q._id === quizId ? { ...q, published } : q));
    } catch (error) {
      console.error("Failed to update quiz:", error);
      alert("Failed to update quiz");
    }
  };

  const filteredQuizzes = quizzes.filter(quiz =>
    quiz.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const displayQuizzes = isStudent
    ? filteredQuizzes.filter(q => q.published)
    : filteredQuizzes;

  if (loading) {
    return <div className="p-4">Loading quizzes...</div>;
  }

  return (
    <div className="p-4">
      {canEditCourse && (
        <QuizControls
          onQuizCreated={handleQuizCreated}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
      )}

      {!canEditCourse && (
        <div className="mb-3">
          <input
            type="text"
            placeholder="Search for Quiz"
            className="form-control"
            style={{ maxWidth: "300px" }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      )}

      <div className="border-top border-bottom py-3 mb-0 d-flex justify-content-between align-items-center"
        style={{ backgroundColor: "#c6ccd1ff" }}>
        <h6 className="mb-0 ms-2">▼ Assignment Quizzes</h6>
      </div>

      {displayQuizzes.length === 0 && !searchQuery && (
        <div className="text-center py-5">
          <h3>No quizzes yet</h3>
          {canEditCourse ? (
            <p>Click the "+ Quiz" button to create your first quiz</p>
          ) : (
            <p>No quizzes are currently available</p>
          )}
        </div>
      )}

      {displayQuizzes.length === 0 && searchQuery && (
        <div className="text-center py-5">
          <h3>No quizzes found</h3>
          <p>No quizzes match "{searchQuery}"</p>
        </div>
      )}

      {displayQuizzes.length > 0 && (
        <div>
          {displayQuizzes.map(quiz => (
            <QuizListItem
              key={quiz._id}
              quiz={quiz}
              courseId={cid as string}
              onDelete={handleDeleteQuiz}
              onPublishToggle={handlePublishToggle}
            />
          ))}
        </div>
      )}
    </div>
  );
}