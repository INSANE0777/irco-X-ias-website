import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
// import formidable from 'formidable'; // Removed unused import
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { PrismaClient } from '@prisma/client';

export async function POST(req: NextRequest) {
    const prisma = new PrismaClient();
    try {
        const formData = await req.formData();
        const title = formData.get('title') as string;
        const description = formData.get('description') as string;
        const file = formData.get('file') as File | null;

        if (!title || !description) {
            return NextResponse.json({ error: 'Title and description are required' }, { status: 400 });
        }

        let imageUrl: string | null = null;
        if (file) {
            const fileExtension = path.extname(file.name);
            const fileName = `${uuidv4()}${fileExtension}`;
            const filePath = path.join(process.cwd(), 'public', 'uploads', fileName);
            const fileBuffer = Buffer.from(await file.arrayBuffer());
            await fs.writeFile(filePath, fileBuffer);
            imageUrl = `/uploads/${fileName}`;
        }

        // const data = await prisma.cmsData.create({ // Removed unused variable 'data'
        await prisma.cmsData.create({
            data: {
                title,
                description,
                imageUrl,
            },
        });

        return NextResponse.json({ message: 'Data submitted successfully' });
    } catch (error: unknown) { // Changed 'any' to 'unknown'
        console.error('Error submitting data:', error);
        let errorMessage = 'Internal Server Error';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        return NextResponse.json({ error: 'Failed to submit data', details: errorMessage }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}

export async function GET() {
    const prisma = new PrismaClient();
    try {
        const data = await prisma.cmsData.findMany();
        return NextResponse.json(data);
    } catch (error: unknown) { // Changed 'any' to 'unknown'
        console.error('Error fetching data:', error);
        let errorMessage = 'Internal Server Error';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        return NextResponse.json({ error: 'Failed to fetch data', details: errorMessage }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
