import { auth, signIn, signOut } from "@/auth"
 
export default async function SignIn() {
  const session = await auth();
  return (
    <div>
      <form
        action={async () => {
          "use server"
          await signIn("google")
        }}
        >
        <button type="submit">Signin with Google</button>
      </form>
      <form
        action={async () => {
          "use server"
          await signOut()
        }}
      >
        <button type="submit">Sign Out</button>
      </form>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  )
} 
