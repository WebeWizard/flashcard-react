'use client';

import { createAccount, ValidatedCreateAccountDetails } from '@/services/auth';
import Form from 'next/form'
import React, { useState } from 'react';
import { useFormStatus } from 'react-dom';

export function SignUpComponent() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [verifyPassword, setVerifyPassword] = useState('');
    const [verifyPasswordError, setVerifyPasswordError] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const { pending } = useFormStatus();
    return (
        <Form action={performSignUp}>
            Email: <input className="border-2" name="email" onInput={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} /><br />
            Password: <input className="border-2" name="password" onInput={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} /><br />
            Verify Password: <input className="border-2" name="password" onInput={(e: React.ChangeEvent<HTMLInputElement>) => validateVerifyPassword(e.target.value, password)} /><br />
            {verifyPasswordError &&
                <div>{verifyPasswordError}</div>
            }
            {errorMessage &&
                <div>{errorMessage}</div>
            }
            <button type="submit" disabled={pending}>{pending ? "Submitting..." : "Submit"}</button>
        </Form>
    )

    function validateVerifyPassword(verifyPassword: string, password: string) {
        if (password !== verifyPassword) {
            setVerifyPasswordError('Verify Password does not match Password')
        } else {
            setVerifyPasswordError('');
        }
        setVerifyPassword(verifyPassword);
    }

    function validateSignUp(): ValidatedCreateAccountDetails {
        return {
            email, secret: password
        }
    }

    async function performSignUp(formData: FormData) {
        const validatedDetails = validateSignUp();
        createAccount(validatedDetails).then(() => {
            setErrorMessage('');
        }).catch((e: Error) => {
            setErrorMessage(e.toString())
        })
    }
}

