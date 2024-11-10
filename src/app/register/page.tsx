"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster";
import { useRouter } from "next/navigation";

const Register = () => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<userCredential>();
    const { toast } = useToast();
    const router = useRouter();

    const onRegister = async (credData: userCredential) => {
        const res = await fetch('/api/register', {
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
            router.push('/login')
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
    };

    return (
        <div className="h-screen flex justify-center items-center flex-col gap-2">
            <Toaster />
            <form
                onSubmit={handleSubmit(onRegister)}
                className="md:w-1/3 px-20 py-10 flex flex-col items-center gap-4 bg-gray-100 justify-start"
            >
                <h2 className="text-center font-bold text-xl">Register</h2>

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
            <p>Already have an account? <Link href="/login" className="text-blue-500 underline">Login</Link></p>
        </div>
    );
};

export default Register;
