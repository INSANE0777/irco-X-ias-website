import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import formidable from "formidable";
import { IncomingForm, File } from "formidable";
import fs from "fs";

export const config = {
  api: {
    bodyParser: false, // Disable default body parser for form-data
  },
};

export async function POST(req: Request): Promise<Response> {
  const form = new IncomingForm({ multiples: true });

  return new Promise((resolve) => {
    form.parse(req as any, async (err, fields, files) => {
      if (err) {
        return resolve(
          NextResponse.json({ error: err.message }, { status: 500 })
        );
      }

      const { title, content } = fields;
      const images = files.images as File[] | File;

      try {
        const imagePaths: string[] = [];

        const imageArray = Array.isArray(images) ? images : [images];

        for (const image of imageArray) {
          const filePath = image.filepath;
          const fileData = fs.readFileSync(filePath);
          const fileName = `${Date.now()}-${image.originalFilename}`;

          const { data, error } = await supabase.storage
            .from("images")
            .upload(fileName, fileData);

          if (error) throw error;
          imagePaths.push(fileName);
        }

        const { data: postData, error: dbError } = await supabase
          .from("posts")
          .insert([{ title, content, image_paths: imagePaths }]);

        if (dbError) throw dbError;

        return resolve(
          NextResponse.json(
            { message: "Post created successfully", data: postData },
            { status: 200 }
          )
        );
      } catch (error: any) {
        return resolve(
          NextResponse.json({ error: error.message }, { status: 500 })
        );
      }
    });
  });
}
