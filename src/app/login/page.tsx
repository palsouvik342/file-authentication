"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";


const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<userCredential>();
    const { toast } = useToast();
    const router = useRouter();

    const handleLogin = async (credData: userCredential) => {
        const res = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credData),
        });
        const data = await res.json() as RegisterResp;
        if (res.status == 200) {
            toast({
                title: "Success",
                description: data.message,
            })
            router.push('/')
        } else if (res.status == 400) {
            toast({
                title: "Failed",
                description: data.message,
            })
        } else {
            toast({
                title: "Failed",
                description: 'Something went wrong!',
            })

        }
    }
    return (
        <div className={'h-screen flex justify-center items-center'}>
            <Toaster />
            <form
                onSubmit={handleSubmit(handleLogin)}
                className="md:w-1/3 px-20 py-10 flex flex-col items-center gap-4 bg-gray-100"
            >
                <h2 className="text-center font-bold text-xl">Login</h2>
                <Input
                    placeholder="Enter your email"
                    {...register("usermail", {
                        required: "Email is required",
                        pattern: {
                            value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                            message: "Enter a valid email"
                        }
                    })}
                />
                <p className="text-red-500 mb-0">
                    {errors.usermail && errors.usermail.type == 'required' &&
                        'Username is required'
                    }
                </p>
                <p className="text-red-500 mb-0">
                    {errors.usermail && errors.usermail.type == 'pattern' &&
                        'Enter a valid email'
                    }
                </p>

                <Input
                    placeholder="Enter Password"
                    type="password"
                    {...register("password", { required: true })}
                />
                {errors.password && errors.password.type === "required" &&
                    <p className="text-red-500">Please enter a password</p>
                }

                <Button type="submit">Submit</Button>

            </form>
        </div>
    )
}

export default Login
