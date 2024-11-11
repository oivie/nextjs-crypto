// app/api/login/route.ts
import bcrypt from 'bcrypt';
import db from '../../utils/db';

interface LoginRequestBody {
    email: string;
    password: string;
}

export async function POST(req: Request): Promise<Response> {
    try {
        const { email, password }: LoginRequestBody = await req.json();

        // Find the user by email
        const [rows]: [any[], any] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (rows.length === 0) {
            return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
        }

        const user = rows[0];

        // Check if the password matches
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return new Response(JSON.stringify({ error: 'Incorrect password' }), { status: 401 });
        }

        // Return success response (you may want to generate a token here)
        return new Response(JSON.stringify({ message: 'Login successful' }), { status: 200 });
    } catch (error) {
        console.error('Login error:', error);
        return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
    }
}

export async function GET(req: Request): Promise<Response> {
    return new Response(JSON.stringify({ message: 'This API only supports POST requests' }), { status: 405 });
}
