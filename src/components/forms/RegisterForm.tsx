"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/lib/utils/zodSchema";
import { api } from "@/trpc/react";
import { useToast } from "@/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { type inferProcedureInput } from "@trpc/server";
import { type AppRouter } from "@/server/api/root";

type RegisterInput = inferProcedureInput<AppRouter["user"]["register"]>;

const RegisterForm = () => {
  const { toast } = useToast();
  const form = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const {
    register,
    formState: { errors },
    reset,
  } = form;

  const mutation = api.user.register.useMutation();

  const onSubmit = (data: RegisterInput) => {
    mutation.mutate(data, {
      onSuccess: () => {
        reset();
        toast({
          title: "User registered successfully",
        });
      },
      onError: (error) => {
        console.error("Registration error:", error.message);
        toast({
          variant: "destructive",
          title: "Registration error",
          description: error.message,
        });
      },
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-1/3 flex-col gap-4 text-lg"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Name</FormLabel>
              <FormControl>
                <input {...register("name")} placeholder="Name" {...field} />
              </FormControl>
              {errors.name && <FormMessage>{errors.name.message}</FormMessage>}
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <input {...register("email")} placeholder="Email" {...field} />
              </FormControl>
              {errors.email && (
                <FormMessage>{errors.email.message}</FormMessage>
              )}
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Password</FormLabel>
              <FormControl>
                <input
                  {...register("password")}
                  type="password"
                  placeholder="Password"
                  {...field}
                />
              </FormControl>
              {errors.password && (
                <FormMessage>{errors.password.message}</FormMessage>
              )}
            </FormItem>
          )}
        />
        <button type="submit">Register</button>
      </form>
    </Form>
  );
};

export default RegisterForm;
