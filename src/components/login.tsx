'use client';

import { login, ValidatedLoginDetails } from '@/services/auth';
import Form from 'next/form'
import { useState } from 'react';
import { useRouter } from 'next/navigation'

export function LoginComponent() {
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loginPending, setLoginPending] = useState(false);

    return (
        <div>
            {loginPending &&
                <div>Logging in...<br /></div>
            }
            <Form action={performLogin}>
                Email: <input className="border-2" name="email" disabled={loginPending} onInput={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} /><br />
                Password: <input className="border-2" name="password" disabled={loginPending} onInput={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} /><br />
                <button type="submit" disabled={loginPending}>Submit</button>
            </Form><br />
            {errorMessage &&
                <div>{errorMessage}</div>
            }
        </div>
    )

    function validateLogin(): ValidatedLoginDetails {
        return {
            email, pass: password
        }
    }


    async function performLogin(formData: FormData) {
        setLoginPending(true);
        const validatedDetails = validateLogin();
        login(validatedDetails).then((session) => {
            router.replace('/')
        }).catch((e: Error) => {
            setErrorMessage(e.toString())
        }).finally(() => {
            setLoginPending(false)
        })
    }
}