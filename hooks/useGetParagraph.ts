import { useCallback, useEffect, useState } from "react";

type ParagraphResponse = {
  text: string;
};

export default function useGetParagraph() {
  const [para, setPara] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchParagraph = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch("/api/paragraph");

      if (!res.ok) {
        throw new Error("Failed to fetch paragraph");
      }

      const data: ParagraphResponse = await res.json();

      setPara(data.text);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function loadInitialParagraph() {
      try {
        const res = await fetch("/api/paragraph");

        if (!res.ok) {
          throw new Error("Failed to fetch paragraph");
        }

        const data: ParagraphResponse = await res.json();

        if (!cancelled) {
          setPara(data.text);
          setLoading(false);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error
              ? err.message
              : "Something went wrong"
          );
          setLoading(false);
        }
      }
    }

    void loadInitialParagraph();

    return () => {
      cancelled = true;
    };
  }, []);

  return {
    para,
    loading,
    error,
    fetchParagraph,
  };
}