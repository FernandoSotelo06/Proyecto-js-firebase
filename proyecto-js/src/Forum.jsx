import React, { useState, useEffect } from "react";
import { db } from "./firebase"; // Asegúrate de exportar la configuración de Firebase
import {
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";

const Forum = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [author, setAuthor] = useState("");

  useEffect(() => {
    const q = query(
      collection(db, "forumComments"),
      orderBy("timestamp", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const commentsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setComments(commentsData);
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (author.trim() === "" || newComment.trim() === "") {
      alert("Por favor, completa todos los campos.");
      return;
    }

    try {
      await addDoc(collection(db, "forumComments"), {
        author,
        comment: newComment,
        timestamp: serverTimestamp(),
      });
      setNewComment("");
      setAuthor("");
    } catch (error) {
      console.error("Error al agregar comentario:", error);
    }
  };

  return (
    <div className="forum-container">
      <h2>Foro</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Tu nombre"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <textarea
          placeholder="Escribe tu comentario..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button type="submit">Enviar</button>
      </form>
      <div className="comment-container">
        <h3>Comentarios:</h3>
        {comments.map((comment) => (
          <div className="comment" key={comment.id}>
            <strong>{comment.author}</strong>:
            <p>{comment.comment}</p>
            <small className="comment-time">
              {comment.timestamp
                ? new Date(comment.timestamp.seconds * 1000).toLocaleString()
                : "Pendiente de fecha"}
            </small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forum;
