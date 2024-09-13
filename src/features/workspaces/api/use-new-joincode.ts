import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useCallback, useMemo, useState } from "react";
import { Id } from "../../../../convex/_generated/dataModel";

type RequestType = {
  workspaceId: Id<"workspaces">;
};
type ResponseType = Id<"workspaces"> | null;
type Options = {
  onSuccess?: (data: ResponseType) => void;
  onError?: (error: Error) => void;
  onSettled?: () => void;
  throwErrors?: boolean;
};

export const useNewJoinCode = () => {
  const [data, setData] = useState<ResponseType>();

  const [status, setStatus] = useState<
    "idle" | "pending" | "success" | "error" | "settled" | "loading"
  >("idle");
  const [error, setError] = useState<Error>();

  const isPending = useMemo(() => status === "pending", [status]);
  const isLoading = useMemo(() => status === "loading", [status]);
  const isError = useMemo(() => status === "error", [status]);
  const isSuccess = useMemo(() => status === "success", [status]);
  const isSettled = useMemo(() => status !== "settled", [status]);

  const mutation = useMutation(api.workspaces.newJoinCode);

  const mutate = useCallback(async (values: RequestType, options?: Options) => {
    try {
      setStatus("pending");
      const response = await mutation(values);
      setData(response);
      options?.onSuccess?.(response);
      return response;
    } catch (error) {
      setStatus("error");
      options?.onError?.(error as Error);
      if (options?.throwErrors) {
        throw error;
      }
    } finally {
      setStatus("settled");
      options?.onSettled?.();
    }
  }, []);

  return {
    mutate,
    data,
    isLoading,
    error,
    isError,
    isSuccess,
    isSettled,
    isPending,
  };
};
