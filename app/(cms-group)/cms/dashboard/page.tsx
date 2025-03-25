"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

interface Post {
  id: number;
  title: string;
  content: string;
  image_paths: string[] | null;
}

export default function Home() {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [images, setImages] = useState<File[]>([]);
  const [message, setMessage] = useState<string>("");
  const [posts, setPosts] = useState<Post[]>([]);

  // Fetch posts on load
  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase.from("posts").select("*");
      if (!error && data) setPosts(data as Post[]);
    };
    fetchPosts();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    images.forEach((image) => formData.append("images", image));

    const res = await fetch("/api/cms/submit", {
      method: "POST",
      body: formData,
    });

    const result = await res.json();
    setMessage(result.message || result.error);
    setTitle("");
    setContent("");
    setImages([]);

    // Refresh posts after submission
    const { data } = await supabase.from("posts").select("*");
    if (data) setPosts(data as Post[]);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h1>Create a Post</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{ width: "100%", marginBottom: "10px" }}
          />
        </div>
        <div>
          <label>Content:</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            style={{ width: "100%", marginBottom: "10px" }}
          />
        </div>
        <div>
          <label>Images (select multiple):</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) =>
              setImages(e.target.files ? Array.from(e.target.files) : [])
            }
            style={{ marginBottom: "10px" }}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}

      <h2>Posts</h2>
      {posts.map((post) => (
        <div key={post.id} style={{ marginBottom: "20px" }}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          {post.image_paths && post.image_paths.length > 0 && (
            <div>
              {post.image_paths.map((path, index) => (
                <img
                  key={index}
                  src={
                    supabase.storage.from("images").getPublicUrl(path).data
                      .publicUrl
                  }
                  alt={`${post.title} - Image ${index + 1}`}
                  style={{ maxWidth: "100%", margin: "5px 0" }}
                />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
