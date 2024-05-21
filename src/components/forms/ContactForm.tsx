"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { Button } from "@/components/ui/button";
import { contactFormSchema } from "@/lib/schemas/contactFormSchema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { sendEmail } from "@/lib/helpers/sendMail";
import { Loader2 } from "lucide-react";

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof contactFormSchema>) => {
    setIsSubmitting(true);
    console.log(values);
    const result = await sendEmail(values);
    if ("error" in result && result.error) {
      toast({
        variant: "destructive",
        title: result.message,
      });
      setIsSubmitting(false);
    } else {
      form.reset();
      toast({
        title: result.message,
      });
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex h-full w-full items-center justify-center sm:p-6">
      <div className="flex max-w-md flex-col rounded-b-lg border bg-muted/80 shadow-xl md:max-w-none md:flex-row md:rounded-l-lg">
        <div className="order-2 p-6 md:order-1 md:max-w-sm md:p-10 ">
          <h1 className=" pb-4 text-center text-2xl font-semibold md:pb-10 md:text-start md:text-4xl">
            Say Hi!
          </h1>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="yourmail@teamrandom.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your message</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Your message.." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {!isSubmitting ? (
                <Button className="mt-3 w-full" type="submit">
                  Submit
                </Button>
              ) : (
                <Button className="mt-3 w-full" disabled>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </Button>
              )}
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
