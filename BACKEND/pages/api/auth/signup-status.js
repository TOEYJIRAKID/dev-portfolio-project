// pages/api/auth/signup-status.js

export default function handler(req, res) {
    // access env value
    const allowSignUp = process.env.ALLOW_SIGNUP === 'true';

    res.status(200).json({ allowSignUp });
}
