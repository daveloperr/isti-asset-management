import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import FormCardContent from "@/components/layout/FormCardContent";
import FormFieldText from "../fields/FormFieldText";
import { useNavigate } from "react-router-dom";
import { useLogin } from "@/hooks/useAuth";


interface LoginFormProps {
    onSuccess?: () => void;
}

export default function LoginForm({ onSuccess }: LoginFormProps) {
    const navigate = useNavigate();
    const { mutate, isPending } = useLogin();


    const form = useForm({
        defaultValues: {
            username: "",
            password: "",
        },
        mode: "all",
    });


    const onSubmit = (values: any) => {
        mutate(values, {
            onSuccess: () => {
                form.reset();
                onSuccess?.();
                navigate("/");
            },
            onError: () => {
                form.setError("root", { message: "Invalid username or password" });
            },
        });
    };

    return (
        <Form {...form}>
            <form
                id="login-form"
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5"
            >

                <FormCardContent title="Sign In">
                    <FormFieldText
                        control={form.control}
                        name="email"
                        label="Username"
                        placeholder="Enter your username"
                        showIcon={false}
                    />
                    <FormFieldText
                        control={form.control}
                        name="password"
                        label="Password"
                        placeholder="Enter your password"
                        type="password"
                        showIcon={false}
                    />
                    {form.formState.errors.root && (
                        <p className="text-sm text-red-500">
                            {form.formState.errors.root.message}
                        </p>
                    )}
                    <div>
                        <Button
                            className="w-full flex items-center justify-center rounded-xl p-6"
                            type="submit"
                            form="login-form"
                            disabled={isPending}
                        >
                            {isPending ? "SIGNING IN..." : "SIGN IN"}
                        </Button>
                    </div>
                </FormCardContent>




            </form>

        </Form>
    )

}