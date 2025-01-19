'use client';

import { createAccount, ValidatedCreateAccountDetails, ValidatedVerifyDetails, verify } from '@/services/auth';
import Form from 'next/form'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'

export function SignUpComponent() {
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [_verifyPassword, setVerifyPassword] = useState('');
    const [verifyPasswordError, setVerifyPasswordError] = useState('');
    const [accountNeedsVerification, setAccountNeedsVerification] = useState(false);
    const [verifyCode, setVerifyCode] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [pending, setPending] = useState(false);

    return (
        !accountNeedsVerification ?
            // Signup Form
            (<Form action={performSignUp}>
                Email: <input className="border-2" name="email" onInput={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} /><br />
                Password: <input className="border-2" name="password" onInput={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} /><br />
                Verify Password: <input className="border-2" name="verifyPassword" onInput={(e: React.ChangeEvent<HTMLInputElement>) => validateVerifyPassword(e.target.value, password)} /><br />
                {verifyPasswordError &&
                    <div>{verifyPasswordError}</div>
                }
                {errorMessage &&
                    <div>{errorMessage}</div>
                }
                <button type="submit" disabled={pending}>{pending ? "Submitting..." : "Submit"}</button>
            </Form>) :
            // Verify Form
            (<Form action={performVerify}>
                Verification Code: <input className="border-2" name="verifyCode" onInput={(e: React.ChangeEvent<HTMLInputElement>) => setVerifyCode(e.target.value)} />
                <button type="submit" disabled={pending}>{pending ? "Submitting..." : "Submit"}</button>
            </Form>)
    )

    function validateVerifyPassword(input: string, password: string) {
        if (password !== input) {
            setVerifyPasswordError('Verify Password does not match Password')
        } else {
            setVerifyPasswordError('');
        }
        setVerifyPassword(input);
    }

    function validateSignUp(): ValidatedCreateAccountDetails {
        if (verifyPasswordError !== '') throw new Error("Form is not valid");
        return {
            email, secret: password
        }
    }

    async function performSignUp(_formData: FormData) {
        setPending(true);
        const validatedDetails = validateSignUp();
        createAccount(validatedDetails).then(() => {
            setErrorMessage('');
            setAccountNeedsVerification(true);
        }).catch((e: Error) => {
            setErrorMessage(e.toString())
        }).finally(() => {
            setPending(false);
        })
    }

    function validateVerify(): ValidatedVerifyDetails {
        if (verifyCode === '') throw new Error("Verify Code cannot be empty");
        return {
            email,
            pass: password,
            code: verifyCode
        }
    }

    async function performVerify(_formData: FormData) {
        setPending(true);
        const validatedDetails = validateVerify()
        verify(validatedDetails).then(() => {
            router.replace('/')
        }).catch((e: Error) => {
            setErrorMessage(e.toString())
        }).finally(() => {
            setPending(false);
        })
    }
}
