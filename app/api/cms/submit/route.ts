import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/lib/supabase";
import formidable from "formidable";

type ResponseData = {
  message?: string;
  data?: any;
  error?: string;
};

export const config = {
  api: {
    bodyParser: false, // Disable the default body parser
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const form = new formidable.IncomingForm();
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    const { title, content } = fields;
    const images = files.images as formidable.File[];

    try {
      // Upload multiple images to Supabase Storage
      const imagePaths: string[] = [];
      if (images && images.length > 0) {
        for (const image of images) {
          const fileName = `${Date.now()}-${image.name}`;
          const { data, error } = await supabase.storage
            .from("images")
            .upload(fileName, image.toJSON().filepath);

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
  });
}
