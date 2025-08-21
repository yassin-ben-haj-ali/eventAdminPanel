import LoginLayout from "./LoginLayout"
import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import { loginSchema, type LoginSchemaType } from "./types"
import CustomInput from "@/components/ui/CustomInput"
import { Button } from "@/components/ui/button"
const LoginPage = () => {
    const form = useForm({
        resolver:zodResolver(loginSchema),
    })
    const {register, handleSubmit, formState} = form

    const {errors} = formState

    const onSubmit = (data:LoginSchemaType)=>{
        console.log(data)
    }

  return (
    <LoginLayout>
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
                <CustomInput
                type="email"
                label="Email"
                placeholder="Entrez votre email"
                {...register("email")}
                error={errors.email?.message}
                required
            />
            <CustomInput
                type="password"
                label="Mot de passe"
                placeholder="Entrez votre mot de passe"
                passwordInput
                {...register("password")}
                error={errors.password?.message}
                required
            />
            </div>
            <Button
                type="submit"
                className="w-full"
            >
                Login
            </Button>
        </form>
    </LoginLayout>
  )
}

export default LoginPage