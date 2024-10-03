import bcrypt from 'bcrypt';
import db from '../../utils/db';

export async function POST(req) {
    try {
        const { username, email, password } = await req.json();

        // Check if the user already exists
        const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (rows.length > 0) {
            return new Response(JSON.stringify({ error: 'User already exists' }), { status: 409 });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert the new user into the database
        await db.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [
            username,
            email,
            hashedPassword
        ]);

        return new Response(JSON.stringify({ message: 'User created successfully' }), { status: 201 });
    } catch (error) {
        console.error('Signup error:', error);
        return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
    }
}

export async function GET(req) {
    return new Response(JSON.stringify({ message: 'This API only supports POST requests' }), { status: 405 });
}
