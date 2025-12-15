import type React from "react";
import { useState } from "react";
import { Copy, Check, AlertTriangle, Loader } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useCreateApiKeyMutation } from "@/features/apikeys/apikeysAPI";
import { toast } from "sonner";

const createApiKeySchema = z.object({
  name: z
    .string()
    .min(1, "Key name is required")
    .min(3, "Key name must be at least 3 characters")
    .max(50, "Key name must be less than 50 characters")
    .regex(
      /^[a-zA-Z0-9\s\-_]+$/,
      "Key name can only contain letters, numbers, spaces, hyphens, and underscores"
    ),
});

type CreateApiKeyFormData = z.infer<typeof createApiKeySchema>;

type CreateApiKeyDialogProps = {
  children: React.ReactNode;
};

const CreateApiKeyDialog = ({ children }: CreateApiKeyDialogProps) => {
  const [generatedKey, setGeneratedKey] = useState("");
  const [isKeyGenerated, setIsKeyGenerated] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<CreateApiKeyFormData>({
    resolver: zodResolver(createApiKeySchema),
    defaultValues: {
      name: "",
    },
  });

  const [createApiKey, { isLoading }] = useCreateApiKeyMutation();

  const onSubmit = async (values: CreateApiKeyFormData) => {
    createApiKey(values.name)
      .unwrap()
      .then((res) => {
        setGeneratedKey(res.key);
        setIsKeyGenerated(true);
      })
      .catch((error) => {
        console.error("Failed to create API key:", error);
        toast.error("Failed to create API key");
      });
  };

  const handleCopyKey = async () => {
    try {
      await navigator.clipboard.writeText(generatedKey);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleDialogClose = () => {
    // Reset all state when dialog closes
    setIsOpen(false);
    setTimeout(() => {
      setGeneratedKey("");
      form.reset();
      setIsKeyGenerated(false);
      setIsCopied(false);
    }, 100);
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      handleDialogClose();
      return;
    }
    setIsOpen(true);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => handleOpenChange(open)}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create API Key</DialogTitle>
          <DialogDescription>
            {!isKeyGenerated
              ? "Generate a new API key to access our services."
              : "Your API key has been generated successfully."}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {!isKeyGenerated ? (
            // Initial form
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Key Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., Production API Key"
                          className="h-10"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Choose a descriptive name to help you identify this key
                        later.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <DialogFooter>
                  <Button type="submit" disabled={isLoading} className="w-full">
                    {isLoading && <Loader className="w-4 h-4 animate-spin" />}
                    {isLoading ? "Creating Key..." : "Create Key"}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          ) : (
            // Generated key display
            <>
              <Alert className="border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/30">
                <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                <AlertDescription className="text-amber-800 dark:text-amber-200">
                  <strong>Important:</strong> This API key will only be shown
                  once. Make sure to copy and store it securely.
                </AlertDescription>
              </Alert>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="key-name-display">Key Name</Label>
                  <Input
                    id="key-name-display"
                    value={form.getValues("name")}
                    readOnly
                    className="h-10 bg-muted"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="generated-key">API Key</Label>
                  <div className="flex gap-2">
                    <Input
                      id="generated-key"
                      value={generatedKey}
                      readOnly
                      className="h-10 font-mono text-sm bg-muted !pointer-events-none focus-visible:ring-0"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={handleCopyKey}
                      className="h-10 w-10 shrink-0 !bg-black"
                    >
                      {isCopied ? (
                        <Check className="!h-5 !w-5 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4 text-white" />
                      )}
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {isCopied
                      ? "Copied to clipboard!"
                      : "Click the copy button to copy your API key."}
                  </p>
                </div>
              </div>

              <DialogFooter>
                <Button
                  onClick={handleDialogClose}
                  variant="outline"
                  className="w-full bg-transparent"
                >
                  Done
                </Button>
              </DialogFooter>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateApiKeyDialog;
