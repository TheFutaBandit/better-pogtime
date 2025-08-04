"use client"
import {
  useState
} from "react"
import {
  toast
} from "sonner"
import {
  useForm
} from "react-hook-form"
import {
  zodResolver
} from "@hookform/resolvers/zod"
import {
  z
} from "zod"
import {
  cn
} from "@/lib/utils"
import {
  Button
} from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Input
} from "@/components/ui/input"
import { Globe } from "lucide-react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useMutationData } from "@/hooks/useMutationData"
import { postUserWebsites } from "@/tanstackQuery/query-options"
import { useAuthToken } from "@/stores/authStore"

const formSchema = z.object({
  Website_value: z.string().min(1).min(0).max(100)
});

export default function MyForm({onFormSubmit} : {onFormSubmit: () => void}) {

const form = useForm < z.infer < typeof formSchema >> ({
    resolver: zodResolver(formSchema),
    defaultValues: {
        Website_value: ""
    }
  })

  const client = useQueryClient();

  const token = useAuthToken();

  const {mutate} = useMutation({
    mutationKey: ["mutate-website-data", token],
    mutationFn: (websiteValue: string) => postUserWebsites(token, websiteValue),
    onSettled: async() => {console.log("what the helli"); return await client.invalidateQueries({queryKey: ['website-data', token]});}
  })

  function onSubmit(values: z.infer < typeof formSchema > ) {
    try {
      // console.log(token);
      mutate(values.Website_value);
      toast(
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      );
      onFormSubmit();
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full mx-auto py-3">
        
        <FormField
          control={form.control}
          name="Website_value"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL</FormLabel>
              <FormControl>
                <Input 
                placeholder="www.placeholder.com"
                
                type="text"
                {...field} />
              </FormControl>
              <FormDescription>Enter the URL to be monitored</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Add</Button>
      </form>
    </Form>
  )
}