import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/lib/supabase";

type ResponseData = {
  message?: string;
  data?: any;
  error?: string;
};

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb", // Adjust if you need to handle larger files
    },
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { title, content, images } = req.body as {
    title: string;
    content: string;
    images: File[];
  };

  try {
    // Upload multiple images to Supabase Storage
    const imagePaths: string[] = [];
    if (images && images.length > 0) {
      for (const image of images) {
        const fileName = `${Date.now()}-${image.name}`;
        const { data, error } = await supabase.storage
          .from("images")
          .upload(fileName, image);

        if (error) throw error;
        imagePaths.push(fileName);
      }
    }

    // Insert data into the SQL database
    const { data: postData, error: dbError } = await supabase
      .from("posts")
      .insert([{ title, content, image_paths: imagePaths }]);

    if (dbError) throw dbError;

    return res
      .status(200)
      .json({ message: "Post created successfully", data: postData });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}
