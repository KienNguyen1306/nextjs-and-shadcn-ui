"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  useMutation,
  useQueryClient
} from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from 'next/router';
const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

function LoginPage() {
    const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "kminchelle",
      password: "0lelplR",
    },
  });

  const queryClient = useQueryClient();
  const loginMutation = useMutation({
    mutationFn: (formData: z.infer<typeof formSchema>) => {
      return axios.post("https://dummyjson.com/auth/login", formData);
    },
    onSuccess: (data) => {
      localStorage.setItem("userData", JSON.stringify(data.data));
      router.push('/user');
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    loginMutation.mutate(values);
  }
  return (
    <div className="w-300">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username : kminchelle</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password : 0lelplR</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="********" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}

export default LoginPage;
