import { signIn, signOut } from "@/auth"
 
export default function SignIn() {
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
    </div>
  )
} 
