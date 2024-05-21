"use client";
import { api } from "@/trpc/react";

const Hello = ({ hello }: { hello: string }) => {
  const { data, error, isLoading } = api.test.hello.useQuery({
    text: `${hello}`,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <div className="w-1/2 animate-fadeIn">
        {data?.greeting} {/* Display the greeting */}
      </div>
    </>
  );
};

export default Hello;
