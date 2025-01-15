import Form from 'next/form'

export function LoginComponent() {
    return (
        <Form action="/login">
            Username: <input className="border-2" name="username" /><br />
            Password: <input className="border-2" name="password" />
        </Form>
    )
}