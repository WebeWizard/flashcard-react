'use client';

import { login, ValidatedLoginDetails } from '@/services/auth';
import Form from 'next/form'
import Link from 'next/link';
import { useState } from 'react';

export function LoginComponent() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    return (
        <div className="flex">
            <Form action={performLogin}>
                Email: <input className="border-2" name="email" onInput={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} /><br />
                Password: <input className="border-2" name="password" onInput={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} />
                <button type="submit">Submit</button>
            </Form>
        </div>
    )

    function validateLogin(): ValidatedLoginDetails {
        return {
            email, pass: password
        }
    }


    function performLogin(formData: FormData) {
        const validatedDetails = validateLogin();
        login(validatedDetails).then((session) => {
            setErrorMessage('');
        }).catch((e: Error) => {
            setErrorMessage(e.toString())
        })
    }
}