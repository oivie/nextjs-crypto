import bcrypt from 'bcrypt';
import db from '../../utils/db';

interface LoginRequestBody {
    email: string;
    password: string;
}

export async function POST(req: Request): Promise<Response> {
    try {
        const { email, password }: LoginRequestBody = await req.json();

        // Check if the user exists
        const [rows]: [any[], any] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (rows.length === 0) {
            return new Response(JSON.stringify({ error: 'Invalid email or password' }), { status: 401 });
        }

        const user = rows[0];

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return new Response(JSON.stringify({ error: 'Invalid email or password' }), { status: 401 });
        }

        // Here you might want to set up a session or a JWT token for the user
        return new Response(JSON.stringify({ message: 'Login successful' }), { status: 200 });
    } catch (error) {
        console.error('Login error:', error);
        return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
    }
}
